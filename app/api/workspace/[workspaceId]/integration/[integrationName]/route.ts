import {
  getIntegrationByNameAndWorkspaceId,
  updateIntegration,
} from "@/app/_db/integration";
import { getUserSession } from "@/app/_lib/session";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { integrationName: string } }
) {
  const session = await getUserSession(req);
  const workspaceId = session.workspaceId;
  const bucket = await getIntegrationByNameAndWorkspaceId(
    params.integrationName,
    ObjectId.createFromHexString(workspaceId)
  );

  return NextResponse.json({ bucket }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { integrationName: string } }
) {
  const session = await getUserSession(req);
  const workspaceId = session.workspaceId;
  const body = await req.json();
  const integration = await updateIntegration({
    integrationName: params.integrationName,
    integrationDetails: body,
    workspaceId: ObjectId.createFromHexString(workspaceId),
  });

  return NextResponse.json({ integration }, { status: 200 });
}
