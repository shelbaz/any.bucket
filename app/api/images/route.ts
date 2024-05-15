import { getIntegrationByNameAndWorkspaceId } from "@/app/_db/integration";
import { getUserSession } from "@/app/_lib/session";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ImageGenerateParams } from "openai/resources/images.mjs";

export const maxDuration = 300;

const openai = new OpenAI();

const generateImages = async ({
  model = "dall-e-3",
  description,
  count,
  quality,
  size = "1024x1024",
}: {
  model: ImageGenerateParams["model"];
  description: ImageGenerateParams["prompt"];
  count: ImageGenerateParams["n"];
  size?: ImageGenerateParams["size"];
  quality?: ImageGenerateParams["quality"];
}) => {
  const imageResponse = await openai.images.generate({
    model,
    prompt: description,
    n: count,
    size,
    quality,
    response_format: "b64_json",
  });

  return imageResponse.data;
};

export async function POST(req: NextRequest) {
  const session = await getUserSession(req);
  const { workspaceId } = session;
  const body = await req.json();
  const description = body.description;
  const count = body.count;
  const size = body.size;
  const model = body.model;
  const quality = body.quality;
  const openAiIntegration = await getIntegrationByNameAndWorkspaceId(
    "openai",
    ObjectId.createFromHexString(workspaceId)
  );

  if (!openAiIntegration) {
    return NextResponse.json("OpenAI integration not found", { status: 404 });
  }

  openai.apiKey = openAiIntegration.key;

  const images = await generateImages({
    model,
    description,
    count,
    size,
    quality,
  });
  return NextResponse.json(images, { status: 200 });
}
