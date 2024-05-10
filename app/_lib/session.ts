"use server"

import { SessionData } from "./";
import { defaultSession, sessionOptions } from "./";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../_db/client";
import bcrypt from "bcrypt";

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/login")
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
}

const doesUserExist = async (email: string) => {
  const db = await connectToDatabase();
  const user = await db.collection("users").findOne({ email
  });

  return !!user;
}

const findUser = async (email: string, password: string) => {
  const db = await connectToDatabase();

  const user = await db.collection("users").findOne({ email });

  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
};

const createUser = async (email: string, password: string) => {
  const db = await connectToDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  return user;
}

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
    // If user visits for the first time session returns an empty object.
    // Let's add the isLoggedIn property to this object and its value will be the default value which is false
    if (!session.isLoggedIn) {
      session.isLoggedIn = defaultSession.isLoggedIn;
    }
  
    return session;
};

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

  session.isLoggedIn = true;
  session.userId = user._id.toString();
  session.email = user.email;

  await session.save();
  redirect("/files")
};

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

  const user = await createUser(formEmail, formPassword);

  if (!user) {
    return { error: "Something went wrong!" };
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.userId = user.insertedId.toString();
  session.email = formEmail;
  session.plan = "free";

  session.save();
  redirect("/files");
};