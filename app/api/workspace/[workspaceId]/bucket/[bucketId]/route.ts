import { getBucketById, getBucketsByWorkspaceId } from "@/app/_db/bucket";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { bucketId: string } }
) {
  const bucket = await getBucketById(new ObjectId(params.bucketId));

  return NextResponse.json({ bucket }, { status: 200 });
}
