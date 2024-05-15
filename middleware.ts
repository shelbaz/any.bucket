import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./app/_lib";

const validateSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return [session && session.isLoggedIn, session] as const;
};

export async function middleware(request: NextRequest) {
  const url = request.url;
  const [hasValidSession, session] = await validateSession();

  if (session) {
    request.cookies.set("session", JSON.stringify(session));
  }

  if (url.includes("api/s3/objects/list")) {
    if (!hasValidSession) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
  }

  if (url.includes("api/s3") && !hasValidSession) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  if (url.includes("api/images")) {
    if (!hasValidSession) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
  }

  if (
    url.includes("/files") ||
    url.includes("/settings") ||
    url.includes("/profile") ||
    url.includes("/create")
  ) {
    if (!hasValidSession) {
      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname = "/login";
      return NextResponse.redirect(nextUrl);
    }
  }

  return NextResponse.next({
    request,
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
