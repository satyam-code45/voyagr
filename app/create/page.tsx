"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, Calendar, MapPin } from "lucide-react";

interface ActivityInput {
  day: number;
  time: string;
  description: string;
}

export default function CreateTripPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState<ActivityInput[]>([
    { day: 1, time: "09:00", description: "" },
  ]);

  const addActivity = () => {
    const lastDay =
      activities.length > 0 ? activities[activities.length - 1].day : 1;
    setActivities([
      ...activities,
      { day: lastDay, time: "09:00", description: "" },
    ]);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const updateActivity = (
    index: number,
    field: keyof ActivityInput,
    value: string | number
  ) => {
    const updated = [...activities];
    updated[index] = { ...updated[index], [field]: value };
    setActivities(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          activities: activities.filter((a) => a.description.trim() !== ""),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create trip");
      }

      const data = await response.json();
      router.push(`/trips/${data.id}`);
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTripDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 text-balance">
            Plan Your Adventure
          </h1>
          <p className="text-slate-600 text-lg">
            Create a detailed itinerary for your next trip
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Trip Details
              </CardTitle>
              <CardDescription>
                Where and when are you traveling?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, France"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="startDate"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="endDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    min={startDate}
                    className="mt-1.5"
                  />
                </div>
              </div>

              {getTripDuration() > 0 && (
                <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                  Trip duration:{" "}
                  <span className="font-semibold text-blue-700">
                    {getTripDuration()} days
                  </span>
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Activities & Itinerary</CardTitle>
              <CardDescription>
                Add activities for each day of your trip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 border border-slate-200 rounded-lg bg-white space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      Activity {index + 1}
                    </h3>
                    {activities.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeActivity(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`day-${index}`}>Day</Label>
                      <Input
                        id={`day-${index}`}
                        type="number"
                        min="1"
                        max={getTripDuration() || 999}
                        value={activity.day}
                        onChange={(e) =>
                          updateActivity(
                            index,
                            "day",
                            Number.parseInt(e.target.value)
                          )
                        }
                        required
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`time-${index}`}>Time</Label>
                      <Input
                        id={`time-${index}`}
                        type="time"
                        value={activity.time}
                        onChange={(e) =>
                          updateActivity(index, "time", e.target.value)
                        }
                        required
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="What will you do?"
                      value={activity.description}
                      onChange={(e) =>
                        updateActivity(index, "description", e.target.value)
                      }
                      required
                      rows={2}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addActivity}
                className="w-full border-dashed border-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Creating..." : "Create Trip"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
