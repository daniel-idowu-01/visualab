"use client";

import Link from "next/link";
import { useVisuaLabStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { SparklesIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  const { user } = useVisuaLabStore();
  return (
    <header className="flex h-16 items-center w-full justify-between px-4 md:px-6 border-b bg-white shadow-sm">
      <Link className="flex items-center gap-2" href="/">
        <SparklesIcon className="h-7 w-7 text-softblue-500" />
        <span className="text-xl font-bold text-neutral-900">
          VisuaLab Studio
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {user ? (
          <>
            <Link
              className="font-medium text-neutral-600 hover:text-softblue-600 transition-colors"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="font-medium text-neutral-600 hover:text-softblue-600 transition-colors"
              href="/projects"
            >
              Projects
            </Link>
            <Link
              className="font-medium text-neutral-600 hover:text-softblue-600 transition-colors"
              href="/settings"
            >
              Settings
            </Link>
            <Button
              variant="ghost"
              className="font-medium text-neutral-600 hover:text-softblue-600 transition-colors"
            >
              User Profile
            </Button>
          </>
        ) : (
          <>
            <Link
              className="font-medium text-neutral-600 hover:text-softblue-600 transition-colors"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="font-medium text-neutral-600 hover:text-softblue-600 transition-colors"
              href="/signup"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="md:hidden bg-transparent"
            variant="outline"
            size="icon"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col gap-4 py-6">
            <Link
              className="font-medium text-neutral-700 hover:text-softblue-600"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="font-medium text-neutral-700 hover:text-softblue-600"
              href="/projects"
            >
              Projects
            </Link>
            <Link
              className="font-medium text-neutral-700 hover:text-softblue-600"
              href="/settings"
            >
              Settings
            </Link>
            <Button
              variant="ghost"
              className="font-medium text-neutral-700 hover:text-softblue-600 justify-start px-0"
            >
              User Profile
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
