"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  UploadCloudIcon,
  ImagePlusIcon,
  Loader2Icon,
  DownloadIcon,
} from "lucide-react";
import { useState } from "react";
import { useVisuaLabStore } from "@/lib/store";
import { useLifestyleShot } from "@/hooks/use-lifestyle-shot";
import { ImageGallery } from "../image-gallery";

export function LifestyleShotTab() {
  const [uploadedFile, setUploadedFile] = useState<boolean | null>(null);
  const [editedImageSrc, setEditedImageSrc] = useState<string | null>(null);
  const {
    isLoading,
    setIsLoading,
    lifestyleShotType,
    setLifestyleShotType,
    sceneDescription,
    setSceneDescription,
    productImageFile,
    referenceImageFile,
    setReferenceImageFile,
    setProductImageFile,
    error,
  } = useVisuaLabStore();
  const { generateLifestyleShot } = useLifestyleShot();

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      if (type === "image") {
        setReferenceImageFile(event.target.files[0]);
        setEditedImageSrc(null);
      } else {
        setProductImageFile(event.target.files[0]);
      }
    } else {
      setUploadedFile(null);
    }
  };

  const handleGenerate = async () => {
    if (!sceneDescription.trim() && lifestyleShotType === "text") {
      useVisuaLabStore.setState({
        error: "Please enter a scene description.",
      });
      return;
    }
    generateLifestyleShot();
  };

  const handleDownload = () => {
    if (editedImageSrc) {
      const link = document.createElement("a");
      link.href = editedImageSrc;
      link.download = `lifestyle-shot-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
      {/* Left Column: Controls */}
      <div className="space-y-6">
        <Card className="bg-white shadow-lg border border-neutral-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-neutral-900">
              Product Image & Options
            </CardTitle>
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
                onChange={(e) => {
                  handleFileUpload(e, "product");
                  setUploadedFile(true);
                }}
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

            {uploadedFile && (
              <>
                <div className="space-y-3">
                  <Label
                    htmlFor="shot-type"
                    className="text-lg font-semibold text-neutral-800"
                  >
                    Shot Type
                  </Label>
                  <Select
                    defaultValue="text"
                    onValueChange={(value: "text" | "image") =>
                      setLifestyleShotType(value)
                    }
                  >
                    <SelectTrigger className="h-10 text-neutral-700 focus:ring-softblue-500">
                      <SelectValue placeholder="Select shot type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Prompt</SelectItem>
                      <SelectItem value="image">Reference Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {lifestyleShotType === "text" ? (
                  <div className="space-y-3">
                    <Label
                      htmlFor="environment-description"
                      className="text-lg font-semibold text-neutral-800"
                    >
                      Describe the Environment
                    </Label>
                    <Textarea
                      value={sceneDescription}
                      onChange={(e) => setSceneDescription(e.target.value)}
                      id="environment-description"
                      placeholder="e.g., A bustling city street at night, a serene beach at sunset"
                      className="min-h-[100px] text-base p-3 border-neutral-300 focus-visible:ring-softblue-500"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Label
                      htmlFor="product-image-upload"
                      className="text-lg font-semibold text-neutral-800 flex items-center gap-2"
                    >
                      <UploadCloudIcon className="h-5 w-5 text-softblue-500" />
                      Upload Reference Image
                    </Label>
                    <Input
                      id="product-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "image")}
                      className="block w-full text-sm text-neutral-500
                  file:mr-4 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-softblue-50 file:text-softblue-700
                  hover:file:bg-softblue-100 cursor-pointer"
                    />
                    {referenceImageFile && (
                      <p className="text-sm text-neutral-500 mt-2">
                        Selected: {referenceImageFile.name}
                      </p>
                    )}
                  </div>
                )}

                {/* <div className="flex items-center justify-between">
                  <Label
                    htmlFor="force-rmbg"
                    className="font-medium text-neutral-800"
                  >
                    Force Background Removal
                  </Label>
                  <Switch
                    id="force-rmbg"
                    className="data-[state=checked]:bg-softblue-500"
                  />
                </div> */}

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !productImageFile}
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
                {error && (
                  <div
                    className="text-red-500 text-center text-sm font-medium mt-2"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <ImageGallery />
    </div>
  );
}
