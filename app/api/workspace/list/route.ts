import { getWorkspacesByUserId } from "@/app/_db/workspace-membership";
import { getUserSession } from "@/app/_lib/session";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getUserSession(req);
  const user = session.userId;

  const workspaces = await getWorkspacesByUserId(
    ObjectId.createFromHexString(user)
  );

  return NextResponse.json({ workspaces }, { status: 200 });
}
