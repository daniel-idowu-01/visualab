"use client"

import Image from "next/image"
import { useVisuaLabStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { DownloadIcon, EditIcon, ZoomInIcon, Loader2Icon, ImagePlusIcon } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { ImageResult } from "@/types/app"
import { useImageGeneration } from "@/hooks/use-image-generation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function ImageGallery() {
  const { generatedImages, config, isLoading } = useVisuaLabStore()
  const { reEditImage } = useImageGeneration()
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null)

  const latestImage = generatedImages[generatedImages.length - 1]

  const handleDownload = (imageSrc: string, format: "png" | "jpeg") => {
    const link = document.createElement("a")
    link.href = imageSrc
    link.download = `visualab-ad-${Date.now()}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReEdit = (image: ImageResult) => {
    // For simplicity, re-editing will apply the *current* sidebar config to the selected image.
    // In a real app, you might load the image's original config into the sidebar.
    reEditImage(image, config)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg border border-neutral-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-neutral-900">Latest Generation</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 bg-opacity-60 z-10 rounded-lg">
              <Loader2Icon className="h-12 w-12 text-softblue-500 animate-spin" />
              <p className="mt-4 text-white text-lg font-medium">Generating your ad...</p>
            </div>
          )}
          {latestImage ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={latestImage.src || "/placeholder.svg"}
                alt={latestImage.alt}
                width={800}
                height={800}
                className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-100 transition-opacity duration-300">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                    >
                      <ZoomInIcon className="h-5 w-5 text-neutral-700" />
                      <span className="sr-only">Zoom In</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
                    <Image
                      src={latestImage.src || "/placeholder.svg"}
                      alt={latestImage.alt}
                      width={1200}
                      height={1200}
                      className="w-full h-auto object-contain rounded-lg"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                  onClick={() => handleDownload(latestImage.src, latestImage.configUsed.outputFormat)}
                >
                  <DownloadIcon className="h-5 w-5 text-neutral-700" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                  onClick={() => handleReEdit(latestImage)}
                >
                  <EditIcon className="h-5 w-5 text-neutral-700" />
                  <span className="sr-only">Re-edit</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-neutral-500 p-8">
              <ImagePlusIcon className="h-16 w-16 mx-auto mb-4 text-neutral-300" />
              <p className="text-lg">Your generated ad will appear here.</p>
              <p className="text-sm mt-2">Start by entering a description and clicking "Generate Ad"!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {generatedImages.length > 1 && (
        <Card className="bg-white shadow-sm border border-neutral-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-neutral-900">Previous Generations</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
              <div className="flex w-max space-x-4 p-4">
                {generatedImages.slice(0, -1).map((image) => (
                  <div
                    key={image.id}
                    className="relative group overflow-hidden rounded-lg shadow-md bg-neutral-50 flex-shrink-0 w-[150px] h-[150px]"
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-60 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                          >
                            <ZoomInIcon className="h-4 w-4 text-neutral-700" />
                            <span className="sr-only">Zoom In</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            width={1200}
                            height={1200}
                            className="w-full h-auto object-contain rounded-lg"
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                        onClick={() => handleDownload(image.src, image.configUsed.outputFormat)}
                      >
                        <DownloadIcon className="h-4 w-4 text-neutral-700" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                        onClick={() => handleReEdit(image)}
                      >
                        <EditIcon className="h-4 w-4 text-neutral-700" />
                        <span className="sr-only">Re-edit</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
