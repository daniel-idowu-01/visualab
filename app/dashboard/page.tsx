import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, ImagePlusIcon, SettingsIcon, FolderOpenIcon } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] p-4 md:p-8 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-4xl w-full space-y-10 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl leading-tight">
            Unleash Your Product's Visual Potential
          </h1>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
            Generate stunning product ads, packshots, and lifestyle shots with Bria AI's powerful image generation and
            manipulation.
          </p>
          <Link href="/editor">
            <Button
              size="lg"
              className="bg-softblue-500 hover:bg-softblue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              <PlusIcon className="mr-2 h-6 w-6" />
              Start New Project
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-200">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <FolderOpenIcon className="h-8 w-8 text-softblue-500" />
              <CardTitle className="text-2xl font-bold">Recent Projects</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="text-left text-neutral-700 space-y-3">
                <li className="py-1 border-b border-neutral-100 last:border-b-0">
                  <Link
                    href="#"
                    className="hover:text-softblue-600 transition-colors flex justify-between items-center"
                  >
                    <span>Coffee Mug Ad</span>
                    <span className="text-sm text-neutral-500">2 days ago</span>
                  </Link>
                </li>
                <li className="py-1 border-b border-neutral-100 last:border-b-0">
                  <Link
                    href="#"
                    className="hover:text-softblue-600 transition-colors flex justify-between items-center"
                  >
                    <span>Luxury Watch Packshot</span>
                    <span className="text-sm text-neutral-500">1 week ago</span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    href="#"
                    className="hover:text-softblue-600 transition-colors flex justify-between items-center"
                  >
                    <span>Sneaker Lifestyle Shot</span>
                    <span className="text-sm text-neutral-500">2 weeks ago</span>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-200">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <ImagePlusIcon className="h-8 w-8 text-softblue-500" />
              <CardTitle className="text-2xl font-bold">Templates & Inspiration</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-neutral-700 mb-4">
                Explore a curated collection of templates and inspiring examples to kickstart your creativity.
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent border-softblue-500 text-softblue-500 hover:bg-softblue-50 hover:text-softblue-600"
              >
                Browse Templates
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-200">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <SettingsIcon className="h-8 w-8 text-softblue-500" />
              <CardTitle className="text-2xl font-bold">Account & Settings</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-neutral-700 mb-4">Manage your profile, subscription, and application preferences.</p>
              <Button
                variant="outline"
                className="w-full bg-transparent border-softblue-500 text-softblue-500 hover:bg-softblue-50 hover:text-softblue-600"
              >
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
