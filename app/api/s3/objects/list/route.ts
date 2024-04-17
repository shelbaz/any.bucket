import { S3Client, _Object, ListObjectsV2Command, CommonPrefix } from "@aws-sdk/client-s3";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const formatFolders = (prefixes?: CommonPrefix[]) => {
    if (!prefixes) return [];

    return prefixes.map(prefixObj => {
        const prefix = prefixObj.Prefix?.slice(0, -1);
        const split = prefixObj.Prefix?.split("/");
        const label = split?.[split.length - 2] ?? "";
        return { prefix, label };
    });
};

const listObjects = async (options?: { prefix?: string, startsAfter?: string }) => {
    const prefix = options?.prefix;
    const startsAfter = options?.startsAfter;
    const s3Url = process.env.S3_ENDPOINT;
    const bucket = process.env.S3_BUCKET_NAME;

    const client = new S3Client({
        endpoint: s3Url,
        forcePathStyle: true,
        region: "auto",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
    });

    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        Delimiter: "/",
        StartAfter: startsAfter,
    });

    try {
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export async function GET(
    req: NextApiRequest,
  ) {
    const { searchParams } = new URL(req.url ?? "");
    const folder = searchParams.get("folder") as string | undefined;
    const objects = await listObjects({ prefix: folder });

    if (!objects) {
        return NextResponse.json("Failed to list objects", { status: 500 });
    }

    return NextResponse.json({objects: objects?.Contents ?? [], folders: formatFolders(objects?.CommonPrefixes) }, { status: 200 });
  }
