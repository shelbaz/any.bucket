import { findWorkspaceById } from "@/app/_db/workspace";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const workspace = await findWorkspaceById(new ObjectId(params.workspaceId));

  return NextResponse.json({ workspace }, { status: 200 });
}
