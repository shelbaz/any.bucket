import bcrypt from "bcrypt";
import { connectToDatabase } from "./client";
import { BaseEntity } from "./base-entity";
import { createWorkspace } from "./workspace";
import { createWorkspaceMembership } from "./workspace-membership";

export interface User extends BaseEntity {
  email: string;
  password: string;
}

export const doesUserExist = async (email: string) => {
  const db = await connectToDatabase();
  const user = await db.collection("users").findOne<User>({ email });

  return !!user;
};

export const findUser = async (email: string, password: string) => {
  const db = await connectToDatabase();

  const user = await db.collection("users").findOne<User>({ email });

  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
};

export const createUser = async (email: string, password: string) => {
  const db = await connectToDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    updatedAt: new Date(),
    createdAt: new Date(),
  });

  // Create workspace for user
  const workspace = await createWorkspace("My Workspace", user.insertedId);

  // Create workspace membership for user
  await createWorkspaceMembership({
    workspaceId: workspace.insertedId,
    userId: user.insertedId,
    role: "owner",
  });

  return { user, workspace: workspace.insertedId };
};
