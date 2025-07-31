"use client";

import type React from "react";
import { useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  UploadCloudIcon,
  ImagePlusIcon,
  Loader2Icon,
  DownloadIcon,
  Trash2Icon,
  UndoIcon,
  RedoIcon,
  PenToolIcon,
} from "lucide-react";
import { useState } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { useVisuaLabStore } from "@/lib/store";
import { useImageFillGeneration } from "@/hooks/use-generative-fill";

export function GenerativeFillTab() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [editedImageSrc, setEditedImageSrc] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(20);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const {
    isLoading,
    setIsLoading,
    setMaskData,
    productDescription,
    setProductDescription,
    productImageFile,
    setProductImageFile,
    error,
  } = useVisuaLabStore();
  const { generateImageFill } = useImageFillGeneration();

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProductImageFile(event.target.files[0]);
      setEditedImageSrc(null); // Reset edited image on new upload

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    } else {
      setUploadedFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleGenerate = async () => {
    if (!canvasRef.current || !productImageFile) return;

    setIsLoading(true);

    try {
      // Get the mask data from the canvas
      const maskData = await canvasRef.current.exportImage("png");
      // console.log("Mask data:", maskData);
      setMaskData(maskData);

      generateImageFill();
    } catch (error) {
      console.error("Error generating fill:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (editedImageSrc) {
      const link = document.createElement("a");
      link.href = editedImageSrc;
      link.download = `generative-fill-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  const undoCanvas = () => {
    canvasRef.current?.undo();
  };

  const redoCanvas = () => {
    canvasRef.current?.redo();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
      {/* Left Column: Controls & Canvas */}
      <div className="space-y-6">
        <Card className="bg-white shadow-lg border border-neutral-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-neutral-900">
              Image & Mask
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="image-upload"
                className="text-lg font-semibold text-neutral-800 flex items-center gap-2"
              >
                <UploadCloudIcon className="h-5 w-5 text-softblue-500" />
                Upload Image
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-neutral-500
                  file:mr-4 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-softblue-50 file:text-softblue-700
                  hover:file:bg-softblue-100 cursor-pointer"
              />
              {productImageFile && (
                <p className="text-sm text-neutral-500 mt-2">
                  Selected: {productImageFile.name}
                </p>
              )}
            </div>

            {productImageFile && imagePreviewUrl && (
              <>
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <PenToolIcon className="h-5 w-5 text-softblue-500" />
                    Draw Mask
                  </Label>

                  {/* Brush Controls */}
                  <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="brush-size"
                        className="text-sm font-medium"
                      >
                        Brush Size:
                      </Label>
                      <Input
                        id="brush-size"
                        type="range"
                        min="5"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-neutral-600 min-w-[2rem]">
                        {brushSize}px
                      </span>
                    </div>

                    <div className="flex gap-2 ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={undoCanvas}
                        className="p-2"
                      >
                        <UndoIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={redoCanvas}
                        className="p-2"
                      >
                        <RedoIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCanvas}
                        className="p-2"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative w-full aspect-video bg-neutral-100 border border-neutral-300 rounded-lg overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={imagePreviewUrl}
                        alt="Uploaded for mask"
                        fill
                        className="object-contain"
                        style={{
                          objectPosition: "center",
                        }}
                      />
                    </div>

                    {/* Drawing Canvas Overlay */}
                    <div className="absolute inset-0">
                      <ReactSketchCanvas
                        ref={canvasRef}
                        style={{
                          border: "none",
                          borderRadius: "0.5rem",
                        }}
                        width="100%"
                        height="100%"
                        strokeWidth={brushSize}
                        strokeColor="rgba(239, 68, 68, 0.8)" // Semi-transparent red
                        canvasColor="transparent"
                        backgroundImage={imagePreviewUrl}
                        preserveBackgroundImageAspectRatio="xMidYMid meet"
                        allowOnlyPointerType="all"
                        withTimestamp={false}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-neutral-500">
                    Draw on the image to mark areas where you want to generate
                    new content. The red areas will be replaced with
                    AI-generated content based on your prompt.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="fill-prompt"
                    className="text-lg font-semibold text-neutral-800"
                  >
                    Describe what to generate
                  </Label>
                  <Textarea
                    id="fill-prompt"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="e.g., A vintage lamp, a blooming flower, a mountain landscape"
                    className="min-h-[100px] text-base p-3 border-neutral-300 focus-visible:ring-softblue-500"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !productImageFile}
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
            <CardTitle className="text-xl font-semibold text-neutral-900">
              Result
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[300px] flex items-center justify-center relative">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 bg-opacity-60 z-10 rounded-lg">
                <Loader2Icon className="h-12 w-12 text-softblue-500 animate-spin" />
                <p className="mt-4 text-white text-lg font-medium">
                  Processing...
                </p>
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
                <Button
                  onClick={handleDownload}
                  className="mt-4 bg-softblue-500 hover:bg-softblue-600 text-white"
                >
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Download Result
                </Button>
              </div>
            ) : (
              <div className="text-center text-neutral-500 p-8">
                <ImagePlusIcon className="h-16 w-16 mx-auto mb-4 text-neutral-300" />
                <p className="text-lg">
                  Upload an image and draw on it to define areas for generative
                  fill.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
