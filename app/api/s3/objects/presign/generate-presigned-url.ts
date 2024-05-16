import { Bucket } from "@/app/_db/bucket";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const generatePresignedUrl = async ({
  bucket,
  command,
}: {
  fileName: string;
  folder: string | undefined;
  bucket: Bucket;
  command: PutObjectCommand | GetObjectCommand;
}) => {
  const s3Url = bucket.endpoint;
  const name = bucket.name;

  const client = new S3Client({
    endpoint: s3Url,
    forcePathStyle: true,
    region: bucket.region ?? "auto",
    credentials: {
      accessKeyId: bucket.accessKeyId || "",
      secretAccessKey: bucket.secretAccessKey ?? "",
    },
  });
  return await getSignedUrl(client, command, { expiresIn: 120 });
};
