import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";
import {
  createWorkspaceMembership,
  findWorkspaceMembershipByUserId,
} from "./workspace-membership";
import { createMongoDBDataAPI } from "../_lib/mongo-data-api";

export interface Workspace extends BaseEntity {
  name: string;
  ownerId: ObjectId;
  plan: "free" | "pro";
  defaultBucketId?: ObjectId;
}

const mongoApi = createMongoDBDataAPI({
  apiKey: process.env.MONGODB_DATA_API_KEY ?? "",
  appId: process.env.MONGODB_DATA_API_APP_ID ?? "",
  region: "us-east-2",
  cloud: "aws",
});

export const findOrCreateWorkspace = async (userId: string) => {
  const workspaceMembership = await findWorkspaceMembershipByUserId(
    ObjectId.createFromHexString(userId)
  );

  // If user has a workspace membership, return the workspace
  if (workspaceMembership) {
    const workspace = await findWorkspaceById(workspaceMembership.workspaceId);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }

  // If user does not have a workspace membership, create a new workspace
  const workspace = await mongoApi.insertOne<Workspace>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspaces",
    document: {
      name: "My Workspace",
      ownerId: ObjectId.createFromHexString(userId),
      plan: "free",
      updatedAt: { $date: new Date() },
      createdAt: { $date: new Date() },
    },
  });

  if (!workspace) {
    throw new Error("Workspace not created");
  }

  await createWorkspaceMembership({
    workspaceId: ObjectId.createFromHexString(workspace.insertedId),
    userId: ObjectId.createFromHexString(userId),
    role: "owner",
  });

  return workspace;
};

export const findWorkspaceById = async (workspaceId: ObjectId) => {
  const mongoWorkspace = await mongoApi.findOne<Workspace>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspaces",
    filter: { _id: { $oid: workspaceId } },
  });
  const workspace = mongoWorkspace?.document;

  return workspace;
};

export const createWorkspace = async (name: string, userId: ObjectId) => {
  const mongoWorkspace = await mongoApi.insertOne<Workspace>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspaces",
    document: {
      name,
      ownerId: userId,
      updatedAt: { $date: new Date() },
      createdAt: { $date: new Date() },
    },
  });
  const workspace = mongoWorkspace;

  return workspace;
};

export const updateWorkspace = async (
  workspaceId: ObjectId,
  workspaceDetails: Partial<Workspace>
) => {
  const workspace = await mongoApi.updateOne<Workspace>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspaces",
    filter: { _id: { $oid: workspaceId } },
    update: {
      $set: {
        ...workspaceDetails,
        ...(workspaceDetails.defaultBucketId
          ? { defaultBucketId: new ObjectId(workspaceDetails.defaultBucketId) }
          : {}),
        // @ts-ignore
        updatedAt: { $date: new Date() },
      },
    },
  });

  return workspace;
};

export const renameWorkspace = async (workspaceId: string, name: string) => {
  const workspace = await mongoApi.updateOne<Workspace>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspaces",
    filter: { _id: { $oid: workspaceId } },
    update: {
      $set: {
        name,
        // @ts-ignore
        updatedAt: { $date: new Date() },
      },
    },
  });

  return workspace;
};
