import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ImageGenerateParams } from "openai/resources/images.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateImages = async ({ model = "dall-e-3", description, count, quality, size = "1024x1024" }: { model: ImageGenerateParams["model"];description: string; count: number; size?: ImageGenerateParams["size"]; quality?: ImageGenerateParams["quality"] }) => {
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

export async function POST(
    req: NextRequest,
  ) {
    const body = await req.json();
    const description = body.description;
    const count = body.count;
    const size = body.size;
    const model = body.model;
    const quality = body.quality;
    const images = await generateImages({ model, description, count, size, quality });
    return NextResponse.json(images, { status: 200 });
};