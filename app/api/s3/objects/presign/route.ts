import { PutObjectCommand, _Object } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { getBucketById } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import { ObjectId } from "mongodb";
import { generatePresignedUrl } from "./generate-presigned-url";

export async function POST(req: NextRequest) {
  const session = await getUserSession(req);
  const body = await req.json();
  const fileName = body.fileName;
  const folder = body.folder;
  const bucket = await getBucketById(
    ObjectId.createFromHexString(session.bucketId)
  );

  if (!bucket) {
    return NextResponse.json("Bucket not found", { status: 404 });
  }

  const command = new PutObjectCommand({
    Bucket: bucket.name,
    Key: folder ? `${folder}/${fileName}` : fileName,
  });

  const response = await generatePresignedUrl({
    bucket,
    command,
  });

  if (!response) {
    return NextResponse.json("Failed to get presigned S3 URL", { status: 500 });
  }

  return NextResponse.json(
    {
      url: response,
    },
    { status: 200 }
  );
}
