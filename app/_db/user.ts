import bcrypt from "bcrypt";
import { BaseEntity } from "./base-entity";
import { createWorkspace } from "./workspace";
import { createWorkspaceMembership } from "./workspace-membership";
import { createMongoDBDataAPI } from "../_lib/mongo-data-api";
import { ObjectId } from "mongodb";

const mongoApi = createMongoDBDataAPI({
  apiKey: process.env.MONGODB_DATA_API_KEY ?? "",
  appId: process.env.MONGODB_DATA_API_APP_ID ?? "",
});

export interface User extends BaseEntity {
  email: string;
  password: string;
}

export const getUserByEmail = async (email: string) => {
  const mongoUser = await mongoApi.findOne<User>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "users",
    filter: { email },
  });

  const user = mongoUser?.document;
  return user;
};

export const findUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
};

export const doesUserExist = async (email: string) => {
  const user = await getUserByEmail(email);

  return !!user;
};

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await mongoApi.insertOne<User>({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "users",
    document: {
      email,
      password: hashedPassword,
      updatedAt: { $date: new Date() },
      createdAt: { $date: new Date() },
    },
  });

  // Create workspace for user
  // TODO: Update
  const workspace = await createWorkspace(
    "My Workspace",
    ObjectId.createFromHexString(user.insertedId)
  );

  if (!workspace) return { user, workspace };

  // Create workspace membership for user
  await createWorkspaceMembership({
    workspaceId: ObjectId.createFromHexString(workspace.insertedId),
    userId: ObjectId.createFromHexString(user.insertedId),
    role: "owner",
  });

  return { user, workspace: workspace.insertedId };
};

export const createResetToken = async (email: string) => {
  const newToken = await bcrypt.hash(
    Math.random().toString(36).substring(7),
    10
  );

  const mongoToken = await mongoApi.insertOne({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "resetTokens",
    document: {
      token: newToken,
      createdAt: { $date: new Date() },
      email,
    },
  });

  if (!mongoToken.insertedId) return null;

  return newToken;
};

export const validateResetToken = async (token: string, email: string) => {
  const mongoToken = await mongoApi.findOne({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "resetTokens",
    filter: { token, email },
  });
  const resetToken = mongoToken?.document;

  return !!resetToken;
};

export const updateUserPassword = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const updated = await mongoApi.updateOne({
    dataSource: "Cluster0",
    database: process.env.MONGODB_DB_NAME,
    collection: "users",
    filter: { email },
    update: {
      $set: { password: hashedPassword },
    },
  });

  return updated;
};
