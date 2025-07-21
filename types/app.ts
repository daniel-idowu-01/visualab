export interface ConfigOptions {
  backgroundRemoval: boolean
  backgroundColor: string
  shadowEffects: number // 0-100
  shadowStyle: "soft" | "hard" | "none"
  lifestyleShot: boolean
  lifestylePrompt: string
  ctaText: string
  ctaFontSize: number
  ctaTextColor: string
  imageResolution: "sd" | "hd" // Standard Definition, High Definition
  aspectRatio: "1:1" | "16:9" | "9:16"
  outputFormat: "png" | "jpeg"
}

export interface ImageResult {
  id: string
  src: string
  alt: string
  configUsed: ConfigOptions
}

export interface VisuaLabState {
  productDescription: string
  referenceImageFile: File | null
  aiPromptEnhancement: boolean
  config: ConfigOptions
  generatedImages: ImageResult[]
  isLoading: boolean
  error: string | null
  setProductDescription: (desc: string) => void
  setReferenceImageFile: (file: File | null) => void
  toggleAiPromptEnhancement: () => void
  updateConfig: (key: keyof ConfigOptions, value: any) => void
  addImage: (image: ImageResult) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetState: () => void
}
