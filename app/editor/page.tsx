"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PanelLeftOpenIcon, PanelLeftCloseIcon, XIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarSettings } from "@/components/sidebar-settings"
import { GenerateImageTab } from "@/components/tabs/generate-image-tab"
import { LifestyleShotTab } from "@/components/tabs/lifestyle-shot-tab"
import { GenerativeFillTab } from "@/components/tabs/generative-fill-tab"
import { EraseElementsTab } from "@/components/tabs/erase-elements-tab"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-[calc(100vh-128px)] bg-neutral-50 lg:grid lg:grid-cols-[auto_1fr]">
      {/* Sidebar Toggle Button for smaller screens */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white shadow-md"
        >
          {isSidebarOpen ? <PanelLeftCloseIcon className="h-5 w-5" /> : <PanelLeftOpenIcon className="h-5 w-5" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      {/* Configuration Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-full lg:w-80 bg-neutral-50 border-r border-neutral-200 p-4 md:p-6 overflow-y-auto transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:sticky lg:top-0 lg:translate-x-0 lg:flex-shrink-0`}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-2xl font-bold text-neutral-900">Settings</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <XIcon className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <SidebarSettings />
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "lg:col-start-2" : ""}`}
      >
        <Tabs defaultValue="generate-image" className="flex-1 flex flex-col">
          <div className="sticky top-0 z-10 bg-neutral-50 border-b border-neutral-200 px-4 md:px-6 lg:px-8 pt-4">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1 bg-neutral-100 rounded-lg">
              <TabsTrigger
                value="generate-image"
                className="py-2 px-4 text-base font-medium data-[state=active]:bg-white data-[state=active]:text-softblue-700 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-neutral-200 rounded-md transition-all"
              >
                Generate Image
              </TabsTrigger>
              <TabsTrigger
                value="lifestyle-shot"
                className="py-2 px-4 text-base font-medium data-[state=active]:bg-white data-[state=active]:text-softblue-700 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-neutral-200 rounded-md transition-all"
              >
                Lifestyle Shot
              </TabsTrigger>
              <TabsTrigger
                value="generative-fill"
                className="py-2 px-4 text-base font-medium data-[state=active]:bg-white data-[state=active]:text-softblue-700 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-neutral-200 rounded-md transition-all"
              >
                Generative Fill
              </TabsTrigger>
              <TabsTrigger
                value="erase-elements"
                className="py-2 px-4 text-base font-medium data-[state=active]:bg-white data-[state=active]:text-softblue-700 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-neutral-200 rounded-md transition-all"
              >
                Erase Elements
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="generate-image" className="flex-1">
            <GenerateImageTab />
          </TabsContent>
          <TabsContent value="lifestyle-shot" className="flex-1">
            <LifestyleShotTab />
          </TabsContent>
          <TabsContent value="generative-fill" className="flex-1">
            <GenerativeFillTab />
          </TabsContent>
          <TabsContent value="erase-elements" className="flex-1">
            <EraseElementsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
