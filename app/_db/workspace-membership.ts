import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";
import { Workspace } from "./workspace";
import { createMongoDBDataAPI } from "../_lib/mongo-data-api";

const mongoApi = createMongoDBDataAPI({
  apiKey: process.env.MONGODB_DATA_API_KEY ?? "",
  appId: process.env.MONGODB_DATA_API_APP_ID ?? "",
  region: "us-east-2",
});

export interface WorkspaceMembership extends BaseEntity {
  workspaceId: ObjectId;
  userId: ObjectId;
  role: "owner" | "member";
}

export const getWorkspacesByUserId = async (userId: ObjectId) => {
  const mongoWorkspaceMemberships = await mongoApi.find<WorkspaceMembership>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspace-memberships",
    filter: { userId: { $oid: userId } },
  });
  const workspaceMemberships = mongoWorkspaceMemberships?.documents;

  const workspaceIds = workspaceMemberships.map(
    (workspaceMembership) => workspaceMembership.workspaceId
  );

  const mongoWorkspaces = await mongoApi.find<Workspace>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspaces",
    // @ts-ignore
    filter: { _id: { $in: workspaceIds.map((id) => ({ $oid: id })) } },
  });
  const workspaces = mongoWorkspaces?.documents;

  return workspaces;
};

export const createWorkspaceMembership = async ({
  workspaceId,
  userId,
  role,
}: {
  workspaceId: ObjectId;
  userId: ObjectId;
  role: "owner" | "member";
}) => {
  const workspaceMembership = await mongoApi.insertOne<WorkspaceMembership>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspace-memberships",
    document: {
      workspaceId: { $oid: workspaceId },
      userId: { $oid: userId },
      role,
      updatedAt: { $date: new Date() },
      createdAt: { $date: new Date() },
    },
  });

  return workspaceMembership;
};

// This only finds the first workspace membership
// TODO: Find all workspace memberships
export const findWorkspaceMembershipByUserId = async (userId: ObjectId) => {
  const workspaceMembership = await mongoApi.findOne<WorkspaceMembership>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "workspace-memberships",
    filter: { userId: { $oid: userId } },
  });

  return workspaceMembership?.document;
};
