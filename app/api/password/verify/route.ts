import { NextRequest, NextResponse } from "next/server";

const submitPassword = async ({ password }: { password: string }) => {
    if (password === process.env.PASSWORD) {
        return { secret: process.env.AUTH_SECRET, verified: true };
    } else {
        return { secret: undefined, verified: false };
    }
};

export async function POST(
    req: NextRequest,
  ) {
    const body = await req.json();
    const password = body.password;
    const response = await submitPassword({ password });
    return NextResponse.json(response, { status: 200 });
};