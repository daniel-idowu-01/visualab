"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PromptInput } from "@/components/prompt-input"
import { GenerateConfig } from "@/components/generate-config"
import { ImageGallery } from "@/components/image-gallery"

export function GenerateImageTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <Card className="bg-white shadow-lg border border-neutral-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-neutral-900">Create Your Ad</CardTitle>
          </CardHeader>
          <CardContent>
            <PromptInput />
          </CardContent>
        </Card>
        <GenerateConfig />
      </div>

      <div className="space-y-6">
        <ImageGallery />
      </div>
    </div>
  )
}
