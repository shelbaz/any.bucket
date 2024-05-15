import { Bucket, getBucketById } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import {
  S3Client,
  _Object,
  ListObjectsV2Command,
  CommonPrefix,
} from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const formatFolders = (prefixes?: CommonPrefix[]) => {
  if (!prefixes) return [];

  return prefixes.map((prefixObj) => {
    const prefix = prefixObj.Prefix?.slice(0, -1);
    const split = prefixObj.Prefix?.split("/");
    const label = split?.[split.length - 2] ?? "";
    return { prefix, label };
  });
};

const listObjects = async (options?: { bucket: Bucket; prefix?: string }) => {
  const prefix = options?.prefix;
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

  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
    Delimiter: "/",
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function GET(req: NextRequest) {
  const session = await getUserSession(req);
  const { searchParams } = new URL(req.url ?? "");
  const folder = searchParams.get("folder") ?? undefined;
  const size = Number(searchParams.get("size") ?? 24);
  const page = Number(searchParams.get("page") ?? 1);

  const bucketId = session.bucketId;
  const bucket = await getBucketById(ObjectId.createFromHexString(bucketId));

  if (!bucket) {
    return NextResponse.json("Bucket not found", { status: 404 });
  }

  const response = await listObjects({ bucket, prefix: folder });

  if (!response) {
    return NextResponse.json("Failed to list objects", { status: 500 });
  }

  const pageContents =
    response.Contents?.slice(size * (page - 1), size * page) ?? [];

  const totalPages = Math.ceil((response.Contents?.length ?? 0) / size);

  const moreBeforeContinue = (response.Contents?.length ?? 0) > size * page;

  return NextResponse.json(
    {
      objects: pageContents,
      folders: formatFolders(response.CommonPrefixes),
      isTruncated: response.IsTruncated,
      continuationToken: response.NextContinuationToken,
      moreBeforeContinue,
      totalPages,
    },
    { status: 200 }
  );
}
