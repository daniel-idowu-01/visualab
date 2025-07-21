"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { UploadCloudIcon, ImagePlusIcon, Loader2Icon, DownloadIcon } from "lucide-react"
import { useState } from "react"

export function GenerativeFillTab() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [editedImageSrc, setEditedImageSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0])
      setEditedImageSrc(null) // Reset edited image on new upload
    } else {
      setUploadedFile(null)
    }
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setEditedImageSrc("/placeholder.svg?height=600&width=600&text=Generative%20Fill%20Result")
    setIsLoading(false)
  }

  const handleDownload = () => {
    if (editedImageSrc) {
      const link = document.createElement("a")
      link.href = editedImageSrc
      link.download = `generative-fill-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
      {/* Left Column: Controls & Canvas */}
      <div className="space-y-6">
        <Card className="bg-white shadow-lg border border-neutral-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-neutral-900">Image & Mask</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="image-upload" className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <UploadCloudIcon className="h-5 w-5 text-softblue-500" />
                Upload Image
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-neutral-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-softblue-50 file:text-softblue-700
                  hover:file:bg-softblue-100 cursor-pointer"
              />
              {uploadedFile && <p className="text-sm text-neutral-500 mt-2">Selected: {uploadedFile.name}</p>}
            </div>

            {uploadedFile && (
              <>
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-neutral-800">Draw Mask</Label>
                  <div className="relative w-full aspect-video bg-neutral-100 border border-neutral-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Placeholder for drawing canvas */}
                    <Image
                      src={URL.createObjectURL(uploadedFile) || "/placeholder.svg"}
                      alt="Uploaded for mask"
                      width={600}
                      height={400}
                      className="object-contain max-h-[400px]"
                      style={{
                        width: "auto",
                        height: "auto",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 bg-opacity-70 text-neutral-600 text-center p-4">
                      <p>
                        Drawing canvas placeholder.
                        <br />
                        (Requires a dedicated React drawing library like `react-sketch-canvas`)
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500">Draw on the image to define the area for generative fill.</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="fill-prompt" className="text-lg font-semibold text-neutral-800">
                    Describe what to generate
                  </Label>
                  <Textarea
                    id="fill-prompt"
                    placeholder="e.g., A vintage lamp, a blooming flower"
                    className="min-h-[100px] text-base p-3 border-neutral-300 focus-visible:ring-softblue-500"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !uploadedFile}
                  className="w-full py-3 text-lg font-semibold bg-softblue-500 hover:bg-softblue-600 text-white rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01]"
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                      Generating Fill...
                    </>
                  ) : (
                    "Generate Fill"
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Image Display */}
      <div className="space-y-6">
        <Card className="bg-white shadow-lg border border-neutral-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-neutral-900">Result</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[300px] flex items-center justify-center relative">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 bg-opacity-60 z-10 rounded-lg">
                <Loader2Icon className="h-12 w-12 text-softblue-500 animate-spin" />
                <p className="mt-4 text-white text-lg font-medium">Processing...</p>
              </div>
            )}
            {editedImageSrc ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <Image
                  src={editedImageSrc || "/placeholder.svg"}
                  alt="Generative Fill Result"
                  width={600}
                  height={600}
                  className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
                <Button onClick={handleDownload} className="mt-4 bg-softblue-500 hover:bg-softblue-600 text-white">
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Download Result
                </Button>
              </div>
            ) : (
              <div className="text-center text-neutral-500 p-8">
                <ImagePlusIcon className="h-16 w-16 mx-auto mb-4 text-neutral-300" />
                <p className="text-lg">Upload an image and use the canvas to define areas for generative fill.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
