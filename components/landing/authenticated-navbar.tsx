"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Compass, LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { User as UserType } from "@/lib/auth";

interface AuthenticatedNavbarProps {
  user: UserType;
}

export const AuthenticatedNavbar: React.FC<AuthenticatedNavbarProps> = ({
  user,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

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
          <span className="text-2xl font-serif font-bold text-gray-900 dark:bg-gradient-to-r dark:from-foreground dark:to-primary dark:bg-clip-text dark:text-transparent">
            Voyagr
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Dashboard Link */}
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              Dashboard
            </Button>
          </Link>

          {/* Logout Button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 text-base font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
