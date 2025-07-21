"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SettingsIcon } from "lucide-react"
import { useState } from "react"

export function SidebarSettings() {
  // In a real application, this would likely come from environment variables
  // or a secure backend configuration, not directly from user input on the frontend.
  const [apiKey, setApiKey] = useState("")

  return (
    <Card className="bg-white shadow-sm border border-neutral-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-neutral-900">
          <SettingsIcon className="h-5 w-5 text-softblue-500" />
          Global Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key" className="font-medium text-neutral-800">
            Bria AI API Key
          </Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="focus-visible:ring-softblue-500"
          />
          <p className="text-sm text-neutral-500">
            (For demonstration purposes. In production, use server-side environment variables.)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
