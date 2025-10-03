import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import type { Trip } from "@/lib/types";
import { getDestinationImage } from "@/lib/pexels";

interface TripCardProps {
  trip: Trip;
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTripDuration(startDate: Date | string, endDate: Date | string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return days === 1 ? "1 day" : `${days} days`;
}

export function TripCard({ trip }: TripCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getDestinationImage(trip.destination).then(setImageUrl);
  }, [trip.destination]);

  return (
    <Link href={`/dashboard/trips/${trip.id}`}>
      <Card className="hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border bg-card h-full overflow-hidden group">
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={trip.destination}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <CardHeader>
          <CardTitle className="flex items-start gap-2 text-balance">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{trip.destination}</span>
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2">
            <Calendar className="h-4 w-4" />
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-semibold text-foreground">
                {getTripDuration(trip.startDate, trip.endDate)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Activities</span>
              <span className="font-semibold text-foreground">
                {trip.activities?.length || 0}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/10"
          >
            View Itinerary →
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
