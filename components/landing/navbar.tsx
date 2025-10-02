import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-background/80 border-b border-gray-200 dark:border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Compass className="h-5 w-5 text-white" />
          </div>
          {/* Text color must be visible on the light background */}
          <span className="text-2xl font-serif font-bold text-gray-900 dark:bg-gradient-to-r dark:from-foreground dark:to-primary dark:bg-clip-text dark:text-transparent">
            Voyagr
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="text-base font-medium bg-gradient-to-r from-primary to-teal-500 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 border-0">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
