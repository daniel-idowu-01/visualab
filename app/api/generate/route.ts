import axios from "axios";
import { NextResponse } from "next/server";
import type { ConfigOptions, ImageResult } from "@/types/app";

export async function POST(request: Request) {
  // await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  try {
    const formData = await request.formData();
    const prompt = formData.get("prompt") as string;
    const aiPromptEnhancement = formData.get("aiPromptEnhancement") === "true";
    const configString = formData.get("config") as string;
    const referenceImage = formData.get("referenceImage") as File | null;

    const config: ConfigOptions = JSON.parse(configString);

    const modelVersion = "2.3";
    const response = await fetch(
      `https://engine.prod.bria-api.com/v1/text-to-image/base/${modelVersion}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_token: process.env.BRIA_API_KEY as string,
        },
        body: JSON.stringify({
          prompt,
          num_results: 1,
        }),
      }
    );
    const data = await response.json();
    const imageUrl = data.result[0].urls[0];
    // console.log("Bria generate image response: ", data);
    //  console.log("1: ", data.result[0].urls);

    const form = new FormData();
    form.append("file", imageUrl);
    form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

    const cloudinaryRequest = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      form
    );
    const fileUrl = cloudinaryRequest?.data.secure_url;

    const newImage: ImageResult = {
      id: `img_${Date.now()}`,
      src: fileUrl,
      alt: prompt || "Generated product ad",
      configUsed: config,
    };

    // if (config.lifestyleShot && config.lifestylePrompt) {
    //   newImage.src = `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(config.lifestylePrompt)}`
    // } else if (config.ctaText) {
    //   newImage.src = `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(config.ctaText)}`
    // }

    return NextResponse.json(newImage);
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
