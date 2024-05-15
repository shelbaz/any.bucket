import { findWorkspaceById, updateWorkspace } from "@/app/_db/workspace";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const workspace = await findWorkspaceById(
    ObjectId.createFromHexString(params.workspaceId)
  );

  return NextResponse.json({ workspace }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const body = await req.json();
  const workspace = await updateWorkspace(
    ObjectId.createFromHexString(params.workspaceId),
    body
  );

  return NextResponse.json({ workspace }, { status: 200 });
}
