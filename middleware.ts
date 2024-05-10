import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./app/_lib";

export const getBearerToken = (request: NextRequest) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
        return null;
    }
    
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
        return null;
    }
    
    return token;
};

export const checkBearerTokenIsValid = (request: NextRequest) => {
    const token = getBearerToken(request);
    if (!process.env.AUTH_SECRET || !process.env.APP_PASSWORD) {
        return true;
    }

    if (!token) {
        return false;
    }

    if (token !== process.env.AUTH_SECRET) {
        return false;
    }

    return true;
};

const validateSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return session && session.isLoggedIn;
}

export async function middleware(request: NextRequest) {
    const url = request.url;
    const readonly = process.env.NEXT_PUBLIC_READONLY === "true";
    const hasValidSession = await validateSession();

    if (url.includes("api/s3/objects/list")) {
        if (!hasValidSession) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        return NextResponse.next();
    }

    if (url.includes("api/s3") && (!hasValidSession || readonly)) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (url.includes("api/images")) {
        if (!hasValidSession) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        if (readonly) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
    }

    if (url.includes("login") || url.includes("signup")) {
        return NextResponse.next();
    }

    if (url === "/") {
        return NextResponse.next();
    }

    if (url.includes("/files") || url.includes("/settings") || url.includes("/profile") || url.includes("/create")) {
        if (!hasValidSession) {
            const nextUrl = request.nextUrl.clone();
            nextUrl.pathname = '/login'
            return NextResponse.redirect(nextUrl);
        }
    }


    return NextResponse.next();
  }
   
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: ["/:path*"],
  }
