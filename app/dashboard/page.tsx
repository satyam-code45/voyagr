import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Plane } from "lucide-react";
import type { Trip } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TripCard } from "@/components/dashboard/trip-card";
import { EmptyState } from "@/components/dashboard/empty-state";

async function getUserTrips(userId: string): Promise<Trip[]> {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId },
      include: { activities: true },
      orderBy: { createdAt: "desc" },
    });
    return trips as Trip[];
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const trips = await getUserTrips(session.user.id);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3 tracking-tight">
            <Plane className="h-8 w-8 text-primary" />
            My Trips
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Plan and manage your travel adventures
          </p>
        </div>
        <Link href="/dashboard/create" className="hidden md:block">
          <Button className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            New Trip
          </Button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}

      <Link
        href="/dashboard/create"
        className="md:hidden fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg shadow-primary/30"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
