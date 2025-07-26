import { useVisuaLabStore } from "@/lib/store";
import type { ConfigOptions, ImageResult } from "@/types/app";

export function useLifestyleShot() {
  const {
    setError,
    addImage,
    setIsLoading,
    productImageFile,
    sceneDescription,
    referenceImageFile,
    lifestyleShotType,
  } = useVisuaLabStore();

  const generateLifestyleShot = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image_url", productImageFile!);
      formData.append("scene_description", sceneDescription);
      formData.append("lifestyle_shot_type", lifestyleShotType);

      if (lifestyleShotType === "image" && referenceImageFile) {
        formData.append("ref_image_urls", referenceImageFile);
      }

      const response = await fetch("/api/lifestyleshot", {
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

  return { generateLifestyleShot };
}
