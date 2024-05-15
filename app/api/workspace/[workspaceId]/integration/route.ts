import { createIntegration, getIntegrationById } from "@/app/_db/integration";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const integrationDetails = await req.json();
  const { workspaceId } = params;
  const integrationId = await createIntegration({
    ...integrationDetails,
    workspaceId: ObjectId.createFromHexString(workspaceId),
  });
  const bucket = await getIntegrationById(integrationId);

  return NextResponse.json({ bucket }, { status: 200 });
}
