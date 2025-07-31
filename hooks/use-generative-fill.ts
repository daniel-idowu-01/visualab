import { useVisuaLabStore } from "@/lib/store";
import type { ConfigOptions, ImageResult } from "@/types/app";

export function useImageFillGeneration() {
  const {
    productDescription,
    productImageFile,
    setIsLoading,
    maskData,
    setError,
    addImage,
  } = useVisuaLabStore();

  const generateImageFill = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image_url", productImageFile!);
      formData.append("mask_url", maskData);
      formData.append("prompt", productDescription);

      const response = await fetch("/api/generate/fill", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setIsLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate image.");
      }

      const data: ImageResult = await response.json();
      setIsLoading(false);
      addImage(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return { generateImageFill };
}
