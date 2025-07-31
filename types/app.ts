export interface ConfigOptions {
  backgroundRemoval: boolean;
  backgroundColor: string;
  shadowEffects: number; // 0-100
  shadowStyle: "soft" | "hard" | "none";
  lifestyleShot: boolean;
  lifestylePrompt: string;
  ctaText: string;
  ctaFontSize: number;
  ctaTextColor: string;
  imageResolution: "sd" | "hd";
  aspectRatio: "1:1" | "16:9" | "9:16";
  outputFormat: "png" | "jpeg";
}

export interface ImageResult {
  id: string;
  src: string;
  alt: string;
  configUsed: ConfigOptions;
}

export interface VisuaLabState {
  lifestyleShotType: string;
  productDescription: string;
  sceneDescription: string;
  productImageFile: File | null;
  referenceImageFile: File | null;
  aiPromptEnhancement: boolean;
  config: ConfigOptions;
  generatedImages: ImageResult[];
  isLoading: boolean;
  error: string | null;
  user: boolean;
  maskData: string;
  setProductDescription: (desc: string) => void;
  setLifestyleShotType: (type: string) => void;
  setSceneDescription: (desc: string) => void;
  setProductImageFile: (file: File | null) => void;
  setReferenceImageFile: (file: File | null) => void;
  setMaskData: (desc: string) => void
  toggleAiPromptEnhancement: () => void;
  updateConfig: (key: keyof ConfigOptions, value: any) => void;
  addImage: (image: ImageResult) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}
