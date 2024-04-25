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
    if (!token) {
        return false;
    }

    if (token !== process.env.AUTH_SECRET) {
        return false;
    }

    return true;
};

export function middleware(request: NextRequest) {
    if (!checkBearerTokenIsValid(request)) {
        return NextResponse.json("Unauthorized", { status: 401 });
    } else {
        return NextResponse.next();
    }
  }
   
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: ["/api/s3/:path*"],
  }
