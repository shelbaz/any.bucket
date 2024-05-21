import { Bucket, getBucketById } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import {
  S3Client,
  _Object,
  CommonPrefix,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

async function emptyS3Directory(bucket: Bucket, prefix: string) {
  const s3Url = bucket.endpoint;
  const bucketName = bucket.name;

  const client = new S3Client({
    endpoint: s3Url,
    forcePathStyle: true,
    region: bucket.region || "auto",
    credentials: {
      accessKeyId: bucket.accessKeyId ?? "",
      secretAccessKey: bucket.secretAccessKey ?? "",
    },
  });
  const listParams = {
    Bucket: bucketName,
    Prefix: `${prefix}/`,
    Delimiter: "/",
  };

  const command = new ListObjectsV2Command(listParams);
  const listedObjects = await client.send(command);

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    if (
      listedObjects.CommonPrefixes &&
      listedObjects.CommonPrefixes.length > 0
    ) {
      const prefixes = listedObjects.CommonPrefixes;
      const folders = formatFolders(prefixes);

      for (const folder of folders) {
        if (!folder.prefix) return;
        await emptyS3Directory(bucket, folder.prefix);
      }
    } else {
      return;
    }
  }

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: bucketName,
    Delete: { Objects: [] as { Key: string }[] },
  };

  listedObjects.Contents?.forEach(({ Key }) => {
    if (!Key) return;
    deleteParams.Delete.Objects.push({ Key });
  });

  const deleteCommand = new DeleteObjectsCommand(deleteParams);

  await client.send(deleteCommand);

  if (listedObjects.IsTruncated) await emptyS3Directory(bucket, prefix);

  return { message: "Folder deleted" };
}

const formatFolders = (prefixes?: CommonPrefix[]) => {
  if (!prefixes) return [];

  return prefixes.map((prefixObj) => {
    const prefix = prefixObj.Prefix?.slice(0, -1);
    const split = prefixObj.Prefix?.split("/");
    const label = split?.[split.length - 2] ?? "";
    return { prefix, label };
  });
};

const createFolder = async (options?: { bucket: Bucket; key?: string }) => {
  const s3Url = options?.bucket.endpoint;
  const bucket = options?.bucket.name;

  const client = new S3Client({
    endpoint: s3Url,
    forcePathStyle: true,
    region: options?.bucket.region || "auto",
    credentials: {
      accessKeyId: options?.bucket.accessKeyId ?? "",
      secretAccessKey: options?.bucket.secretAccessKey ?? "",
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${options?.key}/`,
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function POST(req: NextRequest) {
  const session = await getUserSession(req);
  const body = await req.json();
  const bucketId = session.bucketId;
  const bucket = await getBucketById(ObjectId.createFromHexString(bucketId));

  if (!bucket) {
    return NextResponse.json("Bucket not found", { status: 404 });
  }

  const response = await createFolder({ bucket, key: body.key });

  if (!response) {
    return NextResponse.json("Failed to create folder", { status: 500 });
  }

  return NextResponse.json(
    {
      folder: { label: body.key.split("/").pop(), prefix: body.key },
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const session = await getUserSession(req);
  const body = await req.json();
  const prefix = body.prefix;
  const bucket = await getBucketById(
    ObjectId.createFromHexString(session.bucketId)
  );

  if (!bucket) {
    return NextResponse.json("Bucket not found", { status: 404 });
  }

  const response = await emptyS3Directory(bucket, prefix);

  return NextResponse.json(response, { status: 200 });
}
