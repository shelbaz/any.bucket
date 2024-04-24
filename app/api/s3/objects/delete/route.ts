import { S3Client, _Object, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const deleteObject = async ({ key }: { key: string }) => {
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

    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    });
    return await client.send(command);
};

export async function DELETE(
    req: NextRequest,
  ) {
    const body = await req.json();
    const key = body.key;
    const response = await deleteObject({ key });
    return NextResponse.json(response, { status: 200 });
};
