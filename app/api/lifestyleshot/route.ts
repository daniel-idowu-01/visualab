import { NextResponse } from "next/server";
import uploadToCloudinary from "@/helpers/cloudinary";
import type { ConfigOptions, ImageResult } from "@/types/app";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const sceneDescription = formData.get("scene_description") as string;
    const lifeStyleShotType = formData.get("lifestyle_shot_type");
    const configString = formData.get("config") as string;
    const productImage = formData.get("image_url") as File | null;
    const referenceImage = formData.get("ref_image_urls") as File | null;

    const config: ConfigOptions = JSON.parse(configString);

    const productImageUrl = await uploadToCloudinary(
      productImage!,
      `generated_${Date.now()}`
    );

    let referenceImageUrl: string | null = null;
    if (referenceImage)
      referenceImageUrl = await uploadToCloudinary(
        referenceImage!,
        `generated_${Date.now()}`
      );

    const body: any = {
      image_url: productImageUrl,
      placement_type: "original",
      num_results: 1,
      original_quality: true,
      // optimize_description: true,
      sync: true,
    };

    if (lifeStyleShotType === "image") {
      body.ref_image_url = referenceImageUrl;
    } else if (lifeStyleShotType === "text") {
      body.scene_description = sceneDescription;
    }

    const briaResponse = await fetch(
      `https://engine.prod.bria-api.com/v1/product/lifestyle_shot_by_${lifeStyleShotType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_token: process.env.BRIA_API_KEY as string,
        },
        body: JSON.stringify(body),
      }
    );
    
    if (!briaResponse.ok) {
        throw new Error(
            `Bria API error: ${briaResponse.status} ${briaResponse.statusText}`
        );
    }
    
    const briaData = await briaResponse.json();

    // if (
    //   !briaData.result ||
    //   !briaData.result[0] ||
    //   !briaData.result[0].urls ||
    //   !briaData.result[0].urls[0]
    // ) {
    //   throw new Error("Invalid response structure from Bria API");
    // }

    const imageUrl = briaData.result[0];

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

      const fileUrl = await uploadToCloudinary(
        imageUrl,
        `generated_${Date.now()}`
      );

      const newImage: ImageResult = {
        id: `img_${Date.now()}`,
        src: fileUrl,
        alt: sceneDescription || "Generated product ad",
        configUsed: config,
      };

      return NextResponse.json(newImage);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    console.log("Image fetched successfully, size:", imageBuffer.byteLength);

    const imageFile = new File([imageBuffer], "generated-image.png", {
      type: "image/png",
    });

    const fileUrl = await uploadToCloudinary(
      imageFile,
      `generated_${Date.now()}`
    );

    console.log("Image successfully uploaded to Cloudinary");

    const newImage: ImageResult = {
      id: `img_${Date.now()}`,
      src: fileUrl,
      alt: sceneDescription || "Generated lifestyle shot",
      configUsed: config,
    };

    return NextResponse.json(newImage);
  } catch (error) {
    console.error("Error in /api/lifestyleshot: ", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
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
