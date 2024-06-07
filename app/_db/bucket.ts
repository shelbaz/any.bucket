import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";
import { createMongoDBDataAPI } from "../_lib/mongo-data-api";

const mongoApi = createMongoDBDataAPI({
  apiKey: process.env.MONGODB_DATA_API_KEY ?? "",
  appId: process.env.MONGODB_DATA_API_APP_ID ?? "",
  region: "us-east-2",
  cloud: "aws",
});

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
  lastSynced?: Date;
  thumbnails?: boolean;
}

export const createBucket = async (
  bucketDetails: Omit<Bucket, "_id" | "updatedAt" | "createdAt">
) => {
  const newBucket = await mongoApi.insertOne<Bucket>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "buckets",
    document: {
      ...bucketDetails,
      workspaceId: { $oid: bucketDetails.workspaceId },
      updatedAt: { $date: new Date() },
      createdAt: { $date: new Date() },
    },
  });

  return newBucket.insertedId;
};

export const updateBucket = async (
  bucketId: ObjectId,
  bucketDetails: Partial<Bucket>
) => {
  await mongoApi.updateOne<Bucket>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "buckets",
    filter: { _id: { $oid: bucketId } },
    update: {
      $set: {
        ...bucketDetails,
        // @ts-ignore
        updatedAt: { $date: new Date() },
      },
    },
  });
  const updatedBucket = await getBucketById(bucketId);

  return updatedBucket;
};

export const getBucketsByUserId = async (userId: ObjectId) => {
  const mongoBuckets = await mongoApi.find<Bucket>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "buckets",
    filter: { userId: { $oid: userId } },
  });
  const buckets = mongoBuckets?.documents;

  return buckets;
};

export const getBuckets = async (filter?: any) => {
  const mongoBuckets = await mongoApi.find<Bucket>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "buckets",
    filter,
  });
  const buckets = mongoBuckets?.documents;

  return buckets;
};

export const getBucketsByWorkspaceId = async (workspaceId: ObjectId) => {
  const mongoBuckets = await mongoApi.find<Bucket>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "buckets",
    filter: { workspaceId: { $oid: workspaceId } },
  });
  const buckets = mongoBuckets?.documents;

  return buckets;
};

export const getBucketById = async (bucketId: ObjectId) => {
  const mongoBucket = await mongoApi.findOne<Bucket>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "buckets",
    filter: { _id: { $oid: bucketId } },
  });
  const bucket = mongoBucket?.document;

  return bucket;
};

export const deleteBucket = async (bucketId: ObjectId) => {
  const deletedBucket = await mongoApi.deleteOne<Bucket>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "buckets",
    filter: { _id: { $oid: bucketId } },
  });

  return deletedBucket;
};
