import { NextResponse } from "next/server"
import type { ConfigOptions, ImageResult } from "@/types/app"

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

  try {
    const formData = await request.formData()
    const productDescription = formData.get("productDescription") as string
    const aiPromptEnhancement = formData.get("aiPromptEnhancement") === "true"
    const configString = formData.get("config") as string
    const referenceImage = formData.get("referenceImage") as File | null

    const config: ConfigOptions = JSON.parse(configString)

    // Simulate AI processing and generate a placeholder image
    const newImage: ImageResult = {
      id: `img_${Date.now()}`,
      src: `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(productDescription || "Product Ad")}`,
      alt: productDescription || "Generated product ad",
      configUsed: config,
    }

    if (config.lifestyleShot && config.lifestylePrompt) {
      newImage.src = `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(config.lifestylePrompt)}`
    } else if (config.ctaText) {
      newImage.src = `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(config.ctaText)}`
    }

    return NextResponse.json(newImage)
  } catch (error) {
    console.error("Error in /api/generate:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
