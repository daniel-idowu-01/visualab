"use client"

import type React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useVisuaLabStore } from "@/lib/store"
import { UploadCloudIcon, SparklesIcon, Loader2Icon } from "lucide-react"
import { useImageGeneration } from "@/hooks/use-image-generation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PromptInput() {
  const {
    productDescription,
    setProductDescription,
    referenceImageFile,
    setReferenceImageFile,
    aiPromptEnhancement,
    toggleAiPromptEnhancement,
    isLoading,
    error,
  } = useVisuaLabStore()
  const { generateImage } = useImageGeneration()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReferenceImageFile(event.target.files[0])
    } else {
      setReferenceImageFile(null)
    }
  }

  const handleGenerate = () => {
    if (!productDescription.trim()) {
      useVisuaLabStore.setState({ error: "Please enter a product description." })
      return
    }
    generateImage()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="product-description" className="text-lg font-semibold text-neutral-800">
          Product Description
        </Label>
        <Textarea
          id="product-description"
          placeholder="e.g., A sleek coffee mug on a wooden table, a luxury watch on a black background"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="min-h-[120px] text-base p-3 border-neutral-300 focus-visible:ring-softblue-500"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="reference-image" className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <UploadCloudIcon className="h-5 w-5 text-softblue-500" />
          Upload Reference Image (Optional)
        </Label>
        <Input
          id="reference-image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-neutral-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-softblue-50 file:text-softblue-700
            hover:file:bg-softblue-100 cursor-pointer"
        />
        {referenceImageFile && (
          <p className="text-sm text-neutral-500 mt-2">
            Selected: {referenceImageFile.name} ({(referenceImageFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-softblue-500" />
          <Label htmlFor="ai-prompt-enhancement" className="text-base font-medium text-neutral-800">
            AI Prompt Enhancement
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-neutral-400 cursor-help">ⓘ</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-sm">
                Let Bria AI refine your prompt for better image generation results.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Switch
          id="ai-prompt-enhancement"
          checked={aiPromptEnhancement}
          onCheckedChange={toggleAiPromptEnhancement}
          className="data-[state=checked]:bg-softblue-500"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full py-3 text-lg font-semibold bg-softblue-500 hover:bg-softblue-600 text-white rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01]"
      >
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
            Generating Ad...
          </>
        ) : (
          "Generate Ad"
        )}
      </Button>
      {error && (
        <div className="text-red-500 text-center text-sm font-medium mt-2" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
