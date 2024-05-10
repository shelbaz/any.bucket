import { SessionOptions } from "iron-session";

export interface SessionData {
  userId: string;
  email: string;
  img: string;
  isLoggedIn: boolean;
  plan: string;
  workspaceId: string;
  bucketId: string;
}

export const defaultSession: SessionData = {
  userId: "",
  isLoggedIn: false,
  email: "",
  img: "",
  plan: "",
  workspaceId: "",
  bucketId: "",
};

export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: process.env.SESSION_SECRET!,
  cookieName: "file.rocks-session",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: process.env.NODE_ENV === "production",
  },
};
