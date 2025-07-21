import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] p-4 md:p-6 bg-neutral-50">
      <Card className="w-full max-w-2xl bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account and application preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-neutral-600 py-8">
            <p>Settings options will be available here soon!</p>
          </div>
          {/* Placeholder for various settings forms */}
        </CardContent>
      </Card>
    </div>
  )
}
