import { getBuckets, updateBucket } from "@/app/_db/bucket";
import { generateThumbnailFromImage } from "./generate-thumbnail";
import {
  S3Client,
  _Object,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "../../s3/objects/presign/generate-presigned-url";

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  // Get all buckets with lastSynced < 24 hours
  const buckets = await getBuckets({
    $or: [
      {
        thumbnails: true,
        lastSynced: {
          $lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      {
        thumbnails: true,
        lastSynced: { $exists: false },
      },
    ],
  });

  const thumbnailsCreated = [];

  // Get objects for each of those buckets, but do it 1 at a time
  for (const bucket of buckets) {
    const s3Url = bucket.endpoint;

    const client = new S3Client({
      endpoint: s3Url,
      forcePathStyle: true,
      region: bucket.region || "auto",
      credentials: {
        accessKeyId: bucket.accessKeyId ?? "",
        secretAccessKey: bucket.secretAccessKey ?? "",
      },
    });

    const objects = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket.name,
      })
    );

    if (!objects?.Contents) {
      continue;
    }

    // Get existing thumbnails
    const thumbnails = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket.name,
        Prefix: "_thumbnails/",
      })
    );

    for (const object of objects.Contents) {
      // For all images, shrink the image to 40px x 40px
      if (
        object?.Key &&
        ["jpg", "jpeg", "png", "webp"].includes(
          object.Key.split(".").pop() ?? ""
        ) &&
        !object.Key.startsWith("_thumbnails/")
      ) {
        // Check if thumbnail exists
        if (
          thumbnails?.Contents?.find(
            (thumbnail) => thumbnail.Key === `_thumbnails/${object.Key}`
          )
        ) {
          // If thumbnail exists, skip
          continue;
        }
        // Get the image
        const command = new GetObjectCommand({
          Bucket: bucket.name,
          Key: object.Key,
        });
        const url = await generatePresignedUrl({
          bucket,
          command,
        });
        const imageResponse = await fetch(url);
        const imageBuffer = await imageResponse.arrayBuffer();
        // Generate a thumbnail
        const newThumbnail = await generateThumbnailFromImage(imageBuffer);
        // Save to S3
        const putCommand = new PutObjectCommand({
          Bucket: bucket.name,
          Key: `_thumbnails/${object.Key}`,
          Body: newThumbnail,
        });
        await client.send(putCommand);
        thumbnailsCreated.push(`_thumbnails/${object.Key}`);
      }
    }
    await updateBucket(bucket._id, {
      lastSynced: new Date(),
    });
  }

  // Return success
  const response = { thumbnailsCreated: thumbnailsCreated.length };
  return NextResponse.json(response, { status: 200 });
}
