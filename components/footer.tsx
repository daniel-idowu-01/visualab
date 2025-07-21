import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white text-neutral-600 text-sm">
      <p className="text-xs">© 2025 VisuaLab Studio. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="hover:underline underline-offset-4 transition-colors hover:text-softblue-600" href="#">
          Help
        </Link>
        <Link className="hover:underline underline-offset-4 transition-colors hover:text-softblue-600" href="#">
          Terms
        </Link>
        <Link
          className="hover:underline underline-offset-4 transition-colors hover:text-softblue-600"
          href="mailto:support@bria.ai"
        >
          Contact: support@bria.ai
        </Link>
      </nav>
    </footer>
  )
}
