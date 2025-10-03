import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Clock,
  Droplets,
  Wind,
} from "lucide-react";
import type { Trip, Activity } from "@/lib/types";
import { getDestinationImage } from "@/lib/pexels";
import { getWeather } from "@/lib/weather";
import { ShareButton } from "@/components/share-button";
import { prisma } from "@/lib/prisma";

async function getTrip(id: string): Promise<Trip | null> {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id },
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

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const hour = Number.parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
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
  const { id } = await params;
  const trip = await getTrip(id);

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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 hover:bg-white/50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trips
          </Button>
        </Link>

        <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-6 shadow-lg">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={trip.destination}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3 text-balance">
              <MapPin className="h-8 w-8 flex-shrink-0" />
              <span>{trip.destination}</span>
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(trip.startDate)}</span>
                </div>
                <span className="text-slate-400">→</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(trip.endDate)}</span>
                </div>
              </div>

              {weather && (
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{weather.icon}</span>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">
                            {weather.temperature}°C
                          </div>
                          <div className="text-sm text-slate-600">
                            {weather.condition}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-slate-600">
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

          <div className="flex gap-4 pt-4 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {tripDuration}
              </div>
              <div className="text-sm text-slate-600">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {trip.activities?.length || 0}
              </div>
              <div className="text-sm text-slate-600">Activities</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Itinerary</h2>

          {groupedActivities.length === 0 ? (
            <Card className="border-slate-200">
              <CardContent className="py-12 text-center">
                <p className="text-slate-600">No activities planned yet</p>
              </CardContent>
            </Card>
          ) : (
            groupedActivities.map(([day, activities]) => (
              <Card key={day} className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Day {day}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2 text-slate-700">
                        {getDayDate(trip.startDate, day)}
                      </CardDescription>
                    </div>
                    <div className="text-sm text-slate-600">
                      {activities.length} activities
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold flex-shrink-0">
                            <Clock className="h-4 w-4" />
                          </div>
                          {index < activities.length - 1 && (
                            <div className="w-0.5 h-full bg-slate-200 mt-2 flex-1 min-h-[20px]" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-blue-600">
                              {formatTime(activity.time)}
                            </span>
                          </div>
                          <p className="text-slate-900 leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
