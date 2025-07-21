"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { UploadCloudIcon, ImagePlusIcon, Loader2Icon, DownloadIcon } from "lucide-react"
import { useState } from "react"

export function LifestyleShotTab() {
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
    setEditedImageSrc("/placeholder.svg?height=600&width=800&text=Lifestyle%20Shot%20Result")
    setIsLoading(false)
  }

  const handleDownload = () => {
    if (editedImageSrc) {
      const link = document.createElement("a")
      link.href = editedImageSrc
      link.download = `lifestyle-shot-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
      {/* Left Column: Controls */}
      <div className="space-y-6">
        <Card className="bg-white shadow-lg border border-neutral-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-neutral-900">Product Image & Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="product-image-upload"
                className="text-lg font-semibold text-neutral-800 flex items-center gap-2"
              >
                <UploadCloudIcon className="h-5 w-5 text-softblue-500" />
                Upload Product Image
              </Label>
              <Input
                id="product-image-upload"
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
                  <Label htmlFor="shot-type" className="text-lg font-semibold text-neutral-800">
                    Shot Type
                  </Label>
                  <Select defaultValue="text-prompt">
                    <SelectTrigger className="h-10 text-neutral-700 focus:ring-softblue-500">
                      <SelectValue placeholder="Select shot type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-prompt">Text Prompt</SelectItem>
                      <SelectItem value="reference-image">Reference Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="environment-description" className="text-lg font-semibold text-neutral-800">
                    Describe the Environment
                  </Label>
                  <Textarea
                    id="environment-description"
                    placeholder="e.g., A bustling city street at night, a serene beach at sunset"
                    className="min-h-[100px] text-base p-3 border-neutral-300 focus-visible:ring-softblue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="force-rmbg" className="font-medium text-neutral-800">
                    Force Background Removal
                  </Label>
                  <Switch id="force-rmbg" className="data-[state=checked]:bg-softblue-500" />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !uploadedFile}
                  className="w-full py-3 text-lg font-semibold bg-softblue-500 hover:bg-softblue-600 text-white rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01]"
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                      Generating Lifestyle Shot...
                    </>
                  ) : (
                    "Generate Lifestyle Shot"
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
                  alt="Edited Lifestyle Shot"
                  width={800}
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
                <p className="text-lg">Upload an image and generate a lifestyle shot.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
