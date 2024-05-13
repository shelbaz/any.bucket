import { Bucket, getBucketById } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import {
  S3Client,
  _Object,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const renameOrMoveObject = async ({
  oldKey,
  newKey,
  bucket,
}: {
  oldKey: string;
  newKey: string;
  bucket: Bucket;
}) => {
  const s3Url = bucket.endpoint;
  const name = bucket.name;

  const client = new S3Client({
    endpoint: s3Url,
    forcePathStyle: true,
    region: bucket.region ?? "auto",
    credentials: {
      accessKeyId: bucket.accessKeyId ?? "",
      secretAccessKey: bucket.secretAccessKey ?? "",
    },
  });

  const copyCommand = new CopyObjectCommand({
    Bucket: name,
    CopySource: `${name}/${oldKey}`,
    Key: newKey,
  });
  const deleteCommand = new DeleteObjectCommand({
    Bucket: name,
    Key: oldKey,
  });

  try {
    const copyResponse = await client.send(copyCommand);

    if (copyResponse.$metadata.httpStatusCode === 200) {
      const deleteResponse = await client.send(deleteCommand);
      return deleteResponse;
    } else {
      return "Failed to rename or move object";
    }
  } catch (error) {
    console.error(error);
    return "Failed to rename or move object";
  }
};

export async function PUT(req: NextRequest) {
  const session = await getUserSession(req);
  const body = await req.json();
  const oldKey = body.oldKey;
  const newKey = body.newKey;

  const bucket = await getBucketById(new ObjectId(session.bucketId));
  if (!bucket) {
    return NextResponse.json("Bucket not found", { status: 404 });
  }
  const response = await renameOrMoveObject({ oldKey, newKey, bucket });

  return NextResponse.json(response, { status: 200 });
}
