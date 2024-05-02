import { NextRequest, NextResponse } from "next/server";

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

export function middleware(request: NextRequest) {
    const url = request.url;
    const readonly = process.env.NEXT_PUBLIC_READONLY;

    if (url.includes("api/s3/objects/list")) {
        if (!checkBearerTokenIsValid(request)) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        return NextResponse.next();
    }

    if (url.includes("api/s3") && !checkBearerTokenIsValid(request) || readonly) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (url.includes("api/images")) {
        if (!checkBearerTokenIsValid(request)) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        if (process.env.NEXT_PUBLIC_READONLY) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
    }

    return NextResponse.next();
  }
   
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: ["/api/:path*"],
  }
