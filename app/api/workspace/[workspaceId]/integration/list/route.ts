import { getIntegrationsByWorkspaceId } from "@/app/_db/integration";
import { getUserSession } from "@/app/_lib/session";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getUserSession(req);
  const workspaceId = session.workspaceId;

  const integrations = await getIntegrationsByWorkspaceId(
    ObjectId.createFromHexString(workspaceId)
  );

  return NextResponse.json({ integrations }, { status: 200 });
}
