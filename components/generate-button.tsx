"use client"

import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { useVisuaLabStore } from "@/lib/store"
import { useImageGeneration } from "@/hooks/use-image-generation"

export function GenerateButton() {
  const { isLoading, error, productDescription } = useVisuaLabStore()
  const { generateImage } = useImageGeneration()

  const handleGenerate = () => {
    if (!productDescription.trim()) {
      useVisuaLabStore.setState({ error: "Please enter a product description." })
      return
    }
    generateImage()
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
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
        <div className="text-red-500 text-center text-sm" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
