import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, _Object, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { Bucket, getBucketById } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import { ObjectId } from "mongodb";

const generatePresignedUrl = async ({
  fileName,
  folder,
  bucket,
}: {
  fileName: string;
  folder: string | undefined;
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

  const command = new PutObjectCommand({
    Bucket: name,
    Key: `${folder ? `${folder}/` : ""}${fileName}`,
  });
  return await getSignedUrl(client, command, { expiresIn: 60 });
};

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

  const response = await generatePresignedUrl({ fileName, folder, bucket });

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
