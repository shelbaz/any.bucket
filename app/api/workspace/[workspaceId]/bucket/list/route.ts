import { getBucketsByWorkspaceId } from "@/app/_db/bucket";
import { getUserSession } from "@/app/_lib/session";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getUserSession(req);
  const workspaceId = session.workspaceId;

  const buckets = await getBucketsByWorkspaceId(new ObjectId(workspaceId));

  return NextResponse.json({ buckets }, { status: 200 });
}
