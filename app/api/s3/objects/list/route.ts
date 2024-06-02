import { Bucket, getBucketById } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import {
  S3Client,
  _Object,
  ListObjectsV2Command,
  CommonPrefix,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "../presign/generate-presigned-url";
import _ from "lodash";
import { Folder } from "@/app/_types";

const formatFolders = (prefixes?: CommonPrefix[]) => {
  if (!prefixes) return [];

  return prefixes.map((prefixObj) => {
    const prefix = prefixObj.Prefix?.slice(0, -1);
    const split = prefixObj.Prefix?.split("/");
    const label = split?.[split.length - 2] ?? "";
    return { prefix, label };
  });
};

const getFolderOrderBy = (sortBy: string) => {
  if (sortBy === "Key") return "prefix";
  return sortBy;
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
  const orderBy = searchParams.get("orderBy") ?? "Key";
  const folderOrderBy = getFolderOrderBy(orderBy);
  const orderDir = (searchParams.get("orderDir") ?? "asc") as "asc" | "desc";
  const search = searchParams.get("search") ?? "";

  const bucketId = session.bucketId;
  const bucket = await getBucketById(ObjectId.createFromHexString(bucketId));

  if (!bucket) {
    return NextResponse.json("Bucket not found", { status: 404 });
  }

  const response = await listObjects({ bucket, prefix: folder });
  const thumbnailsResponse = await listObjects({
    bucket,
    prefix: "_thumbnails/",
  });

  if (!response) {
    return NextResponse.json("Failed to list objects", { status: 500 });
  }

  const pageContents = (
    response.Contents?.slice(size * (page - 1), size * page) ?? []
  )
    .filter((object: _Object) =>
      object.Key?.toLowerCase()?.includes(search.toLowerCase())
    )
    .filter((object: _Object) => !object.Key?.startsWith("_thumbnails/"));

  const thumbnails = thumbnailsResponse?.Contents;

  const pageContentsWithPresignedUrl = await Promise.all(
    pageContents.map(async (object: _Object) => {
      const command = new GetObjectCommand({
        Bucket: bucket.name,
        Key: object.Key,
      });
      const url = await generatePresignedUrl({
        bucket,
        command,
      });
      let thumbnail;
      if (
        thumbnails?.find(
          (thumbnail) => thumbnail.Key === `_thumbnails/${object.Key}`
        )
      ) {
        thumbnail = await generatePresignedUrl({
          bucket,
          command: new GetObjectCommand({
            Bucket: bucket.name,
            Key: `_thumbnails/${object.Key}`,
          }),
        });
      }
      return { ...object, url, thumbnail };
    })
  );

  const folders = formatFolders(response.CommonPrefixes)
    .filter((folder) =>
      folder.prefix?.toLowerCase()?.includes(search.toLowerCase())
    )
    .filter((folder) => folder.prefix !== "_thumbnails");

  const totalPages = Math.ceil((response.Contents?.length ?? 0) / size);

  const moreBeforeContinue = (response.Contents?.length ?? 0) > size * page;

  return NextResponse.json(
    {
      objects: _.orderBy(
        pageContentsWithPresignedUrl,
        [
          (object: _Object) => {
            if (typeof object?.[orderBy as keyof _Object] === "string") {
              return (
                object?.[orderBy as keyof _Object] as string
              )?.toLowerCase();
            }
            return object?.[orderBy as keyof _Object];
          },
        ],
        orderDir
      ),
      folders: _.orderBy(
        folders,
        [
          (folder: Folder) => {
            if (typeof folder?.[folderOrderBy as keyof Folder] === "string") {
              return (
                folder?.[folderOrderBy as keyof Folder] as string
              )?.toLowerCase();
            }
            return folder?.[folderOrderBy as keyof Folder];
          },
        ],
        orderDir
      ),
      isTruncated: response.IsTruncated,
      continuationToken: response.NextContinuationToken,
      moreBeforeContinue,
      totalPages,
    },
    { status: 200 }
  );
}
