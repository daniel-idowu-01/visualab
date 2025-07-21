import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] p-4 md:p-6 bg-neutral-50">
      <Card className="w-full max-w-2xl bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>Manage all your generated and edited product ads.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-neutral-600 py-8">
            <p>No projects found yet. Start a new project to see your work here!</p>
          </div>
          {/* Placeholder for project list/grid */}
        </CardContent>
      </Card>
    </div>
  )
}
