import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ImageGenerateParams } from "openai/resources/images.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateImages = async ({ description, count, size = "1024x1024" }: { description: string; count: number; size?: ImageGenerateParams["size"] }) => {
    const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: description,
        n: count,
        size,
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
    const images = await generateImages({ description, count, size });
    return NextResponse.json(images, { status: 200 });
};