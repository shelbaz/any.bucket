import { Bucket, getBucketById } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import { S3Client, _Object, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const deleteObject = async ({
  key,
  bucket,
}: {
  key: string;
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

  const command = new DeleteObjectCommand({
    Bucket: name,
    Key: key,
  });
  return await client.send(command);
};

export async function DELETE(req: NextRequest) {
  const session = await getUserSession(req);
  const body = await req.json();
  const key = body.key;
  const bucket = await getBucketById(
    ObjectId.createFromHexString(session.bucketId)
  );

  if (!bucket) {
    return NextResponse.json("Bucket not found", { status: 404 });
  }
  const response = await deleteObject({ key, bucket });
  return NextResponse.json(response, { status: 200 });
}
