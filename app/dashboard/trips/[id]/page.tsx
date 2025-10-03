import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, ArrowLeft, Droplets, Wind } from "lucide-react";
import type { Trip, Activity } from "@/lib/types";
import { getDestinationImage } from "@/lib/pexels";
import { getWeather } from "@/lib/weather";
import { ShareButton } from "@/components/share-button";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ItineraryDay } from "@/components/dashboard/itinerary-day";

async function getTrip(id: string, userId: string): Promise<Trip | null> {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id, userId },
      include: { activities: true },
    });
    return trip as Trip | null;
  } catch (error) {
    console.error("Error fetching trip:", error);
    return null;
  }
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function groupActivitiesByDay(activities: Activity[]) {
  const grouped = new Map<number, Activity[]>();

  activities.forEach((activity) => {
    if (!grouped.has(activity.day)) {
      grouped.set(activity.day, []);
    }
    grouped.get(activity.day)!.push(activity);
  });

  grouped.forEach((dayActivities) => {
    dayActivities.sort((a, b) => a.time.localeCompare(b.time));
  });

  return Array.from(grouped.entries()).sort(([dayA], [dayB]) => dayA - dayB);
}

function getDayDate(startDate: Date | string, dayNumber: number) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayNumber - 1);
  return formatDate(date);
}

export default async function TripPage({ params }: { params: { id: string } }) {
  const session = await getSession();
   const { id } = await params;
  if (!session) {
    redirect("/login");
  }

  const trip = await getTrip(id, session.user.id);

  if (!trip) {
    notFound();
  }

  const imageUrl = await getDestinationImage(trip.destination);
  const weather = await getWeather(trip.destination);

  const groupedActivities = groupActivitiesByDay(trip.activities || []);
  const tripDuration =
    Math.ceil(
      (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Trips
        </Button>
      </Link>

      <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-6 shadow-lg">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={trip.destination}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3 text-balance tracking-tight">
            <MapPin className="h-8 w-8 flex-shrink-0" />
            <span>{trip.destination}</span>
          </h1>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDate(trip.startDate)}</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDate(trip.endDate)}</span>
              </div>
            </div>

            {weather && (
              <Card className="bg-primary/5 border-primary/20 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{weather.icon}</span>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {weather.temperature}°C
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {weather.condition}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Droplets className="h-4 w-4" />
                        <span>{weather.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="h-4 w-4" />
                        <span>{weather.windSpeed} mph</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <ShareButton tripId={trip.id} destination={trip.destination} />
        </div>

        <div className="flex gap-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {tripDuration}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Days</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {trip.activities?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Activities</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Itinerary
        </h2>

        {groupedActivities.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No activities planned yet</p>
            </CardContent>
          </Card>
        ) : (
          groupedActivities.map(([day, activities]) => (
            <ItineraryDay
              key={day}
              day={day}
              date={getDayDate(trip.startDate, day)}
              activities={activities}
            />
          ))
        )}
      </div>
    </div>
  );
}
