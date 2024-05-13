import { createBucket, getBucketById } from "@/app/_db/bucket";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, params: { workspaceId: string }) {
  const bucketDetails = await req.json();
  const workspaceId = params.workspaceId;
  console.log("PARAMS:", params);
  const bucketId = await createBucket({
    ...bucketDetails,
    workspaceId: new ObjectId(workspaceId),
  });
  const bucket = await getBucketById(new ObjectId(bucketId));

  return NextResponse.json({ bucket }, { status: 200 });
}
