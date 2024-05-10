import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";
import { connectToDatabase } from "./client";
import { Workspace } from "./workspace";

export interface WorkspaceMembership extends BaseEntity {
  workspaceId: ObjectId;
  userId: ObjectId;
  role: "owner" | "member";
}

export const getWorkspacesByUserId = async (userId: string) => {
  const db = await connectToDatabase();
  const workspaceMemberships = await db
    .collection("workspace-memberships")
    .find<WorkspaceMembership>({ userId })
    .toArray();

  const workspaceIds = workspaceMemberships.map(
    (workspaceMembership) => workspaceMembership.workspaceId
  );

  const workspaces = await db
    .collection("workspaces")
    .find<Workspace>({ _id: { $in: workspaceIds } })
    .toArray();

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
  const db = await connectToDatabase();
  const workspaceMembership = await db
    .collection("workspace-memberships")
    .insertOne({
      workspaceId,
      userId,
      role,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

  return workspaceMembership;
};
