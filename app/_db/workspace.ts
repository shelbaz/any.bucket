import { ObjectId } from "mongodb";
import { connectToDatabase } from "./client";
import { BaseEntity } from "./base-entity";
import { WorkspaceMembership } from "./workspace-membership";

export interface Workspace extends BaseEntity {
  name: string;
  ownerId: ObjectId;
}

export const findOrCreateWorkspace = async (userId: string) => {
  const db = await connectToDatabase();
  //   Check if user has a workspace membership
  const workspaceMembership = await db
    .collection("workspace-memberships")
    .findOne<WorkspaceMembership>({
      userId: userId,
    });

  // If user has a workspace membership, return the workspace
  if (workspaceMembership) {
    const workspace = await db.collection("workspaces").findOne<Workspace>({
      _id: workspaceMembership.workspaceId,
    });

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }

  // If user does not have a workspace membership, create a new workspace
  const workspace = await db.collection("workspaces").insertOne({
    name: "My Workspace",
    ownerId: userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  });

  await db.collection("workspace-memberships").insertOne({
    workspaceId: workspace.insertedId,
    userId: userId,
    role: "owner",
    updatedAt: new Date(),
    createdAt: new Date(),
  });

  return workspace;
};

export const findWorkspaceById = async (workspaceId: ObjectId) => {
  const db = await connectToDatabase();
  const workspace = await db
    .collection("workspaces")
    .findOne<Workspace>({ _id: new ObjectId(workspaceId) });

  return workspace;
};

export const createWorkspace = async (name: string, userId: ObjectId) => {
  const db = await connectToDatabase();
  const workspace = await db.collection("workspaces").insertOne({
    name,
    ownerId: userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  });

  return workspace;
};

export const renameWorkspace = async (workspaceId: string, name: string) => {
  const db = await connectToDatabase();
  const workspace = await db.collection("workspaces").findOneAndUpdate(
    { _id: new ObjectId(workspaceId) },
    {
      $set: {
        name,
        updatedAt: new Date(),
      },
    }
  );

  return workspace;
};
