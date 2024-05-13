import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";
import { connectToDatabase } from "./client";

export interface Bucket extends BaseEntity {
  workspaceId: ObjectId;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  name: string;
  provider: string;
  displayName?: string;
  region?: string;
  publicDomain?: string;
  connected?: boolean;
}

export const createBucket = async (
  bucketDetails: Omit<Bucket, "_id" | "updatedAt" | "createdAt">
) => {
  console.log("DETAILS:", bucketDetails);
  const db = await connectToDatabase();
  const newBucket = await db.collection("buckets").insertOne({
    ...bucketDetails,
    updatedAt: new Date(),
    createdAt: new Date(),
  });

  return newBucket.insertedId;
};

export const updateBucket = async (
  bucketId: ObjectId,
  bucketDetails: Partial<Bucket>
) => {
  const db = await connectToDatabase();
  const updatedBucket = await db.collection("buckets").findOneAndUpdate(
    { _id: bucketId },
    {
      $set: {
        ...bucketDetails,
        updatedAt: new Date(),
      },
    }
  );

  return updatedBucket as Bucket;
};

export const getBucketsByUserId = async (userId: ObjectId) => {
  const db = await connectToDatabase();
  const buckets = await db
    .collection("buckets")
    .find<Bucket>({ userId })
    .toArray();

  return buckets;
};

export const getBucketsByWorkspaceId = async (workspaceId: ObjectId) => {
  const db = await connectToDatabase();
  const buckets = await db
    .collection("buckets")
    .find<Bucket>({ workspaceId })
    .toArray();

  return buckets;
};

export const getBucketById = async (bucketId: ObjectId) => {
  const db = await connectToDatabase();
  const bucket = await db
    .collection("buckets")
    .findOne<Bucket>({ _id: bucketId });

  return bucket;
};
