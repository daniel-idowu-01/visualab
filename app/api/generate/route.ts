import axios from "axios";
import { NextResponse } from "next/server";
import type { ConfigOptions, ImageResult } from "@/types/app";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const prompt = formData.get("prompt") as string;
    const aiPromptEnhancement = formData.get("aiPromptEnhancement") === "true";
    const configString = formData.get("config") as string;
    const referenceImage = formData.get("referenceImage") as File | null;

    const config: ConfigOptions = JSON.parse(configString);

    const modelVersion = "3.2";
    const briaResponse = await fetch(
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
          prompt_enhancement: aiPromptEnhancement,
          enhance_image: config.imageResolution === "hd" ? true : false,
          sync: true,
        }),
      }
    );

    if (!briaResponse.ok) {
      throw new Error(
        `Bria API error: ${briaResponse.status} ${briaResponse.statusText}`
      );
    }

    const briaData = await briaResponse.json();

    if (
      !briaData.result ||
      !briaData.result[0] ||
      !briaData.result[0].urls ||
      !briaData.result[0].urls[0]
    ) {
      throw new Error("Invalid response structure from Bria API");
    }

    const imageUrl = briaData.result[0].urls[0];

    console.log("Fetching image from Bria URL...");
    const imageResponse = await fetch(imageUrl, {
      method: "GET",
      headers: {
        "User-Agent": "VisuaLab/1.0",
        Accept: "image/*",
        "Cache-Control": "no-cache",
      },
    });

    if (!imageResponse.ok) {
      console.log("Direct fetch failed, trying Cloudinary URL upload...");

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", imageUrl);
      cloudinaryFormData.append(
        "upload_preset",
        process.env.CLOUDINARY_UPLOAD_PRESET!
      );
      cloudinaryFormData.append("folder", "visualab-generated");
      cloudinaryFormData.append("public_id", `generated_${Date.now()}`);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        cloudinaryFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const fileUrl = cloudinaryResponse?.data?.secure_url;
      if (!fileUrl) {
        throw new Error("Failed to get secure URL from Cloudinary response");
      }

      const newImage: ImageResult = {
        id: `img_${Date.now()}`,
        src: fileUrl,
        alt: prompt || "Generated product ad",
        configUsed: config,
      };

      return NextResponse.json(newImage);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    console.log("Image fetched successfully, size:", imageBuffer.byteLength);

    const imageFile = new File([imageBuffer], "generated-image.png", {
      type: "image/png",
    });

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", imageFile);
    cloudinaryFormData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET!
    );

    cloudinaryFormData.append("folder", "visualab-generated");
    cloudinaryFormData.append("public_id", `generated_${Date.now()}`);

    console.log("Uploading to Cloudinary...");
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      cloudinaryFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const fileUrl = cloudinaryResponse?.data?.secure_url;

    if (!fileUrl) {
      throw new Error("Failed to get secure URL from Cloudinary response");
    }

    console.log("Image successfully uploaded to Cloudinary");

    const newImage: ImageResult = {
      id: `img_${Date.now()}`,
      src: fileUrl,
      alt: prompt || "Generated product ad",
      configUsed: config,
    };

    return NextResponse.json(newImage);
  } catch (error) {
    console.error("Error in /api/generate:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    if (axios.isAxiosError(error)) {
      console.error("Axios error details:");
      console.error("Status:", error.response?.status);
      console.error("Status text:", error.response?.statusText);
      console.error("Response data:", error.response?.data);
      console.error("Request URL:", error.config?.url);

      return NextResponse.json(
        {
          message: "Upload to Cloudinary failed",
          error: error.response?.data || error.message,
          status: error.response?.status,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
