import { useVisuaLabStore } from "@/lib/store";
import type { ConfigOptions, ImageResult } from "@/types/app";

export function useImageGeneration() {
  const {
    productDescription,
    referenceImageFile,
    aiPromptEnhancement,
    config,
    setIsLoading,
    setError,
    addImage,
  } = useVisuaLabStore();

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("prompt", productDescription);
      // formData.append("aiPromptEnhancement", String(aiPromptEnhancement));
      // formData.append("config", JSON.stringify(config));
      if (referenceImageFile) {
        formData.append("referenceImage", referenceImageFile);
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        setIsLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate image.");
      }

      const data: ImageResult = await response.json();
      console.log("data in hook: ", data)
      setIsLoading(false);
      addImage(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////
  const reEditImage = async (
    imageToEdit: ImageResult,
    newConfig: ConfigOptions
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: imageToEdit.id,
          currentSrc: imageToEdit.src,
          newConfig,
          productDescription, // Pass current description for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to re-edit image.");
      }

      const data: ImageResult = await response.json();
      // Replace the old image with the new one in the store
      useVisuaLabStore.setState((state) => ({
        generatedImages: state.generatedImages.map((img) =>
          img.id === imageToEdit.id ? data : img
        ),
      }));
    } catch (err: any) {
      setError(
        err.message || "An unexpected error occurred during re-editing."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { generateImage, reEditImage };
}
