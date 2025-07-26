import { create } from "zustand";
import type { ConfigOptions, VisuaLabState } from "@/types/app";

const initialConfig: ConfigOptions = {
  backgroundRemoval: false,
  backgroundColor: "#ffffff",
  shadowEffects: 50,
  shadowStyle: "soft",
  lifestyleShot: false,
  lifestylePrompt: "",
  ctaText: "",
  ctaFontSize: 24,
  ctaTextColor: "#ffffff",
  imageResolution: "sd",
  aspectRatio: "1:1",
  outputFormat: "png",
};

const user = false;

export const useVisuaLabStore = create<VisuaLabState>((set) => ({
  productDescription: "",
  lifestyleShotType: "text", // image
  sceneDescription: "",
  productImageFile: null,
  referenceImageFile: null,
  aiPromptEnhancement: false,
  config: initialConfig,
  generatedImages: [],
  isLoading: false,
  error: null,

  user,
  setProductDescription: (desc) => set({ productDescription: desc }),
  setLifestyleShotType: (type) => set({ lifestyleShotType: type }),
  setSceneDescription: (desc) => set({ sceneDescription: desc }),
  setProductImageFile: (file) => set({ productImageFile: file }),
  setReferenceImageFile: (file) => set({ referenceImageFile: file }),
  toggleAiPromptEnhancement: () =>
    set((state) => ({ aiPromptEnhancement: !state.aiPromptEnhancement })),
  updateConfig: (key, value) =>
    set((state) => ({ config: { ...state.config, [key]: value } })),
  addImage: (image) =>
    set((state) => ({ generatedImages: [...state.generatedImages, image] })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  resetState: () =>
    set({
      productDescription: "",
      referenceImageFile: null,
      aiPromptEnhancement: false,
      config: initialConfig,
      generatedImages: [],
      isLoading: false,
      error: null,
    }),
}));
