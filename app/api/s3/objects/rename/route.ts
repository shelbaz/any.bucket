import { S3Client, _Object, CopyObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const renameOrMoveObject = async ({ oldKey, newKey }: { oldKey: string, newKey: string }) => {
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

    const command = new CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${oldKey}`,
        Key: newKey,
    });
    return await client.send(command);
};

export async function PUT(
    req: NextRequest,
  ) {
    const body = await req.json();
    const oldKey = body.oldKey;
    const newKey = body.newKey;
    const response = await renameOrMoveObject({ oldKey, newKey });
    
    return NextResponse.json(response, { status: 200 });
};
