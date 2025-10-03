"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Globe, LayoutDashboard, Plus, Plane, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [{ name: "My Trips", href: "/dashboard", icon: Plane }];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-border bg-card/30 backdrop-blur-sm">
      <Link
        href={"/"}
        className="flex items-center gap-2 px-6 py-5 border-b border-border"
      >
        <Globe className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-foreground">Voyagr</span>
      </Link>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent",
                  isActive && "bg-accent text-foreground font-medium"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}

        <div className="pt-4">
          <Link href="/dashboard/create">
            <Button className="w-full justify-start gap-3 shadow-sm">
              <Plus className="h-5 w-5" />
              New Trip
            </Button>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
