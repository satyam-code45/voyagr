import type React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar user={session.user} />

        <main className="flex-1 overflow-y-auto px-4 md:px-0">{children}</main>
      </div>
    </div>
  );
}
