"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Compass, LogOut, Menu, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";


export const AuthenticatedNavbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />

          {/* Dashboard Link */}
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-base font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-all duration-300 "
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

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
                  <Compass className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-foreground">Voyagr</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                </nav>

                <div className="px-4 py-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                  
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
