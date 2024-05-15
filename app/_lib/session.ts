"use server";

import { SessionData } from "./";
import { defaultSession, sessionOptions } from "./";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createUser, doesUserExist, findUser } from "../_db/user";
import { NextRequest } from "next/server";
import { getWorkspacesByUserId } from "../_db/workspace-membership";
import { getBucketById } from "../_db/bucket";
import { ObjectId } from "mongodb";

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}

const validateEmail = (email: string) => {
  if (!email) {
    return "Please enter an email.";
  }
  if (!email.includes("@") || !email.includes(".")) {
    return "Please enter a valid email.";
  }

  return null;
};

const validatePassword = (password: string) => {
  if (!password) {
    return "Please enter a password.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return null;
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // If user visits for the first time session returns an empty object.
  // Let's add the isLoggedIn property to this object and its value will be the default value which is false
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function login(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const session = await getSession();

  const formEmail = formData.get("email") as string;
  const formPassword = formData.get("password") as string;

  const emailError = validateEmail(formEmail);
  const passwordError = validatePassword(formPassword);

  if (emailError || passwordError) {
    return { error: emailError || passwordError };
  }

  const user = await findUser(formEmail, formPassword);

  if (!user) {
    return { error: "This email and password combo don't match. Try again!" };
  }

  const workspaces = await getWorkspacesByUserId(user._id);
  const defaultBucketId = workspaces[0].defaultBucketId;
  if (defaultBucketId) {
    const defaultBucket = await getBucketById(defaultBucketId);
    session.bucketId = defaultBucket?._id.toString() ?? "";
    session.publicDomain = defaultBucket?.publicDomain ?? "";
  }

  session.isLoggedIn = true;
  session.userId = user._id.toString();
  session.email = user.email;
  session.workspaceId = workspaces[0]._id.toString();
  session.plan = workspaces[0].plan ?? "free";

  await session.save();
  redirect("/files");
}

export async function signup(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const formEmail = formData.get("email") as string;
  const formPassword = formData.get("password") as string;

  const emailError = validateEmail(formEmail);
  const passwordError = validatePassword(formPassword);

  if (emailError || passwordError) {
    return { error: emailError || passwordError };
  }

  const userCheck = await doesUserExist(formEmail);

  if (userCheck) {
    return { error: "A user already exists with that email." };
  }

  const { user, workspace } = await createUser(formEmail, formPassword);

  if (!user) {
    return { error: "Something went wrong!" };
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.userId = user.insertedId.toString();
  session.email = formEmail;
  session.plan = "free";
  session.workspaceId = workspace.toString();

  await session.save();
  redirect("/files");
}

export const getUserSession = async (
  request: NextRequest
): Promise<SessionData> => {
  const session = request.cookies.get("session")?.value;
  return session ? JSON.parse(session) : defaultSession;
};

export const updateSession = async (updatedSession: Partial<SessionData>) => {
  let session = await getSession();
  Object.keys(updatedSession).forEach((key) => {
    // @ts-ignore
    session[key] = updatedSession[key as keyof SessionData];
  });
  await session.save();
};