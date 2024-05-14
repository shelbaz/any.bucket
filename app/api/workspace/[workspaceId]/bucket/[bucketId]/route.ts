import { getBucketById, updateBucket } from "@/app/_db/bucket";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { bucketId: string } }
) {
  const bucket = await getBucketById(
    ObjectId.createFromHexString(params.bucketId)
  );

  return NextResponse.json({ bucket }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { bucketId: string } }
) {
  const body = await req.json();
  const bucket = await updateBucket(
    ObjectId.createFromHexString(params.bucketId),
    body
  );

  return NextResponse.json({ bucket }, { status: 200 });
}
