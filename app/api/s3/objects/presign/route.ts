import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, _Object, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const generatePresignedUrl = async ({ fileName }: { fileName: string }) => {
    const s3Url = process.env.S3_ENDPOINT;
    const bucket = process.env.S3_BUCKET_NAME;

    const client = new S3Client({
        endpoint: s3Url,
        forcePathStyle: true,
        region: process.env.S3_REGION ?? "auto",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
    });
    
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
      });
      return await getSignedUrl(client, command, { expiresIn: 60 });
};

export async function POST(
    req: NextRequest,
  ) {
    const body = await req.json();
    const fileName = body.fileName;
      const response = await generatePresignedUrl({ fileName });
    
    if (!response) {
        return NextResponse.json("Failed to get presigned S3 URL", { status: 500 });
    }

    return NextResponse.json({
        url: response,
    }, { status: 200 });
};
