import { getBuckets } from "@/app/_db/bucket";
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

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Get all buckets with lastSynced < 24 hours
  const buckets = await getBuckets({
    thumbnails: true,
  });

  // Get objects for each of those buckets, but do it 1 at a time
  for (const bucket of buckets) {
    const s3 = new S3Client({
      region: bucket.region,
      credentials: {
        accessKeyId: bucket.accessKeyId,
        secretAccessKey: bucket.secretAccessKey,
      },
    });
    const objects = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket.name,
        MaxKeys: 1000,
      })
    );

    if (!objects?.Contents) {
      continue;
    }

    // Get existing thumbnails
    const thumbnails = await s3.send(
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
        await s3.send(putCommand);
      }
    }
  }

  // Return success
  const response = {};
  return NextResponse.json(response, { status: 200 });
}
