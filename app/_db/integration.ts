import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";
import { connectToDatabase } from "./client";

export interface Integration extends BaseEntity {
  workspaceId: ObjectId;
  value: string;
  name: "openai";
}

export const createIntegration = async (
  integrationDetails: Omit<Integration, "_id" | "updatedAt" | "createdAt">
) => {
  const db = await connectToDatabase();
  const newIntegration = await db.collection("integrations").insertOne({
    ...integrationDetails,
    updatedAt: new Date(),
    createdAt: new Date(),
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
  const db = await connectToDatabase();
  const updatedIntegration = await db
    .collection("integrations")
    .findOneAndUpdate(
      { name: integrationName, workspaceId },
      {
        $set: {
          ...integrationDetails,
          updatedAt: new Date(),
        },
      }
    );

  return updatedIntegration as Integration;
};

export const getIntegrationsByUserId = async (userId: ObjectId) => {
  const db = await connectToDatabase();
  const integrations = await db
    .collection("integrations")
    .find<Integration>({ userId })
    .toArray();

  return integrations;
};

export const getIntegrationsByWorkspaceId = async (workspaceId: ObjectId) => {
  const db = await connectToDatabase();
  const integrations = await db
    .collection("integrations")
    .find<Integration>({ workspaceId })
    .toArray();

  return integrations;
};

export const getIntegrationById = async (integrationId: ObjectId) => {
  const db = await connectToDatabase();
  const integration = await db
    .collection("integrations")
    .findOne<Integration>({ _id: integrationId });

  return integration;
};

export const getIntegrationByNameAndWorkspaceId = async (
  name: string,
  workspaceId: ObjectId
) => {
  const db = await connectToDatabase();
  const integration = await db
    .collection("integrations")
    .findOne<Integration>({ name, workspaceId });

  return integration;
};
