import { createBucket, getBucketById } from "@/app/_db/bucket";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, params: { workspaceId: string }) {
  const bucketDetails = await req.json();
  const workspaceId = params.workspaceId;
  console.log(
    "WORKSPACE ID LOGGED:",
    ObjectId.createFromHexString(workspaceId)
  );
  const bucketId = await createBucket({
    ...bucketDetails,
    workspaceId: ObjectId.createFromHexString(workspaceId),
  });
  const bucket = await getBucketById(ObjectId.createFromHexString(bucketId));

  return NextResponse.json({ bucket }, { status: 200 });
}
