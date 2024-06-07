import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";
import { createMongoDBDataAPI } from "../_lib/mongo-data-api";

const mongoApi = createMongoDBDataAPI({
  apiKey: process.env.MONGODB_DATA_API_KEY ?? "",
  appId: process.env.MONGODB_DATA_API_APP_ID ?? "",
  region: "us-east-2",
  cloud: "aws",
});

export interface Integration extends BaseEntity {
  workspaceId: ObjectId;
  key: string;
  name: string;
}

export const createIntegration = async (
  integrationDetails: Omit<Integration, "_id" | "updatedAt" | "createdAt">
) => {
  const newIntegration = await mongoApi.insertOne<Integration>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "integrations",
    document: {
      ...integrationDetails,
      workspaceId: { $oid: integrationDetails.workspaceId },
      updatedAt: { $date: new Date() },
      createdAt: { $date: new Date() },
    },
  });

  return newIntegration.insertedId;
};

export const updateIntegration = async ({
  integrationName,
  integrationDetails,
  workspaceId,
}: {
  integrationName: string;
  integrationDetails: Partial<Integration>;
  workspaceId: ObjectId;
}) => {
  const updatedIntegration = await mongoApi.updateOne<Integration>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "integrations",
    filter: { name: integrationName, workspaceId: { $oid: workspaceId } },
    update: {
      $set: {
        ...integrationDetails,
        // @ts-ignore
        updatedAt: { $date: new Date() },
      },
    },
  });

  return updatedIntegration;
};

export const getIntegrationsByUserId = async (userId: ObjectId) => {
  const mongoIntegrations = await mongoApi.find<Integration>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "integrations",
    filter: { userId: { $oid: userId } },
  });
  const integrations = mongoIntegrations?.documents;

  return integrations;
};

export const getIntegrationsByWorkspaceId = async (workspaceId: ObjectId) => {
  const mongoIntegrations = await mongoApi.find<Integration>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "integrations",
    filter: { workspaceId: { $oid: workspaceId } },
  });
  const integrations = mongoIntegrations?.documents;

  return integrations;
};

export const getIntegrationById = async (integrationId: ObjectId) => {
  const mongoIntegration = await mongoApi.findOne<Integration>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "integrations",
    filter: { _id: { $oid: integrationId } },
  });
  const integration = mongoIntegration?.document;

  return integration;
};

export const getIntegrationByNameAndWorkspaceId = async (
  name: string,
  workspaceId: ObjectId
) => {
  const mongoIntegration = await mongoApi.findOne<Integration>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "integrations",
    filter: { name, workspaceId: { $oid: workspaceId } },
  });
  const integration = mongoIntegration?.document;

  return integration;
};
