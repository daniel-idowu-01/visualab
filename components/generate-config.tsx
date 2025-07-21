"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDownIcon, PaletteIcon, CameraIcon, TextCursorInputIcon, SettingsIcon } from "lucide-react"
import { useVisuaLabStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GenerateConfig() {
  const { config, updateConfig } = useVisuaLabStore()

  return (
    <div className="w-full space-y-6">
      <Card className="bg-white shadow-sm border border-neutral-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-neutral-900">
            <PaletteIcon className="h-5 w-5 text-softblue-500" />
            Image Adjustments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Background Removal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="background-removal" className="font-medium text-neutral-800">
                Background Removal
              </Label>
              <Switch
                id="background-removal"
                checked={config.backgroundRemoval}
                onCheckedChange={(checked) => updateConfig("backgroundRemoval", checked)}
                className="data-[state=checked]:bg-softblue-500"
              />
            </div>
            {config.backgroundRemoval && (
              <div>
                <Label htmlFor="background-color" className="block text-sm font-medium text-neutral-700 mb-2">
                  Background Color
                </Label>
                <Input
                  id="background-color"
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                  className="w-full h-10 p-1 border rounded-md cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Shadow Effects */}
          <div className="space-y-3">
            <Label htmlFor="shadow-effects" className="font-medium text-neutral-800">
              Shadow Effects
            </Label>
            <Slider
              id="shadow-effects"
              min={0}
              max={100}
              step={1}
              value={[config.shadowEffects]}
              onValueChange={(value) => updateConfig("shadowEffects", value[0])}
              className="w-full [&>span:first-child]:bg-softblue-500"
            />
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <span>Intensity: {config.shadowEffects}%</span>
              <Select
                value={config.shadowStyle}
                onValueChange={(value: "soft" | "hard" | "none") => updateConfig("shadowStyle", value)}
              >
                <SelectTrigger className="w-[120px] h-9 text-neutral-700">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="soft">Soft</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-neutral-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-neutral-900">
            <CameraIcon className="h-5 w-5 text-softblue-500" />
            Scene & Context
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lifestyle Shots */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="lifestyle-shot" className="font-medium text-neutral-800">
                Lifestyle Shot
              </Label>
              <Switch
                id="lifestyle-shot"
                checked={config.lifestyleShot}
                onCheckedChange={(checked) => updateConfig("lifestyleShot", checked)}
                className="data-[state=checked]:bg-softblue-500"
              />
            </div>
            {config.lifestyleShot && (
              <div>
                <Label htmlFor="lifestyle-prompt" className="block text-sm font-medium text-neutral-700 mb-2">
                  Contextual Prompt
                </Label>
                <Input
                  id="lifestyle-prompt"
                  placeholder="e.g., Place product in a cozy café"
                  value={config.lifestylePrompt}
                  onChange={(e) => updateConfig("lifestylePrompt", e.target.value)}
                  className="focus-visible:ring-softblue-500"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-neutral-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-neutral-900">
            <TextCursorInputIcon className="h-5 w-5 text-softblue-500" />
            Text Overlay
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* CTA Text Overlay */}
          <div className="space-y-3">
            <Label htmlFor="cta-text" className="font-medium text-neutral-800">
              Call-to-Action Text
            </Label>
            <Input
              id="cta-text"
              placeholder="e.g., Shop Now!"
              value={config.ctaText}
              onChange={(e) => updateConfig("ctaText", e.target.value)}
              className="focus-visible:ring-softblue-500"
            />
            {config.ctaText && (
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Label htmlFor="cta-font-size" className="block text-sm font-medium text-neutral-700 mb-2">
                    Font Size
                  </Label>
                  <Input
                    id="cta-font-size"
                    type="number"
                    min={12}
                    max={72}
                    value={config.ctaFontSize}
                    onChange={(e) => updateConfig("ctaFontSize", Number.parseInt(e.target.value))}
                    className="focus-visible:ring-softblue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="cta-text-color" className="block text-sm font-medium text-neutral-700 mb-2">
                    Text Color
                  </Label>
                  <Input
                    id="cta-text-color"
                    type="color"
                    value={config.ctaTextColor}
                    onChange={(e) => updateConfig("ctaTextColor", e.target.value)}
                    className="w-full h-10 p-1 border rounded-md cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Collapsible className="w-full space-y-4 p-4 bg-white rounded-lg shadow-sm border border-neutral-200">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-neutral-900 [&[data-state=open]>svg]:rotate-180">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-softblue-500" />
            Advanced Settings
          </div>
          <ChevronDownIcon className="h-5 w-5 transition-transform" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-6 pt-2">
          {/* Image Resolution */}
          <div className="space-y-3">
            <Label htmlFor="image-resolution" className="font-medium text-neutral-800">
              Image Resolution
            </Label>
            <Select
              value={config.imageResolution}
              onValueChange={(value: "sd" | "hd") => updateConfig("imageResolution", value)}
            >
              <SelectTrigger className="h-10 text-neutral-700 focus:ring-softblue-500">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sd">Standard Definition (SD)</SelectItem>
                <SelectItem value="hd">High Definition (HD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-3">
            <Label htmlFor="aspect-ratio" className="font-medium text-neutral-800">
              Aspect Ratio
            </Label>
            <Select
              value={config.aspectRatio}
              onValueChange={(value: "1:1" | "16:9" | "9:16") => updateConfig("aspectRatio", value)}
            >
              <SelectTrigger className="h-10 text-neutral-700 focus:ring-softblue-500">
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1 (Square)</SelectItem>
                <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Output Format */}
          <div className="space-y-3">
            <Label htmlFor="output-format" className="font-medium text-neutral-800">
              Output Format
            </Label>
            <Select
              value={config.outputFormat}
              onValueChange={(value: "png" | "jpeg") => updateConfig("outputFormat", value)}
            >
              <SelectTrigger className="h-10 text-neutral-700 focus:ring-softblue-500">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
