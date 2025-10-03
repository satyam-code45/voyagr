"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Calendar, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ActivityForm } from "@/components/dashboard/activity-form"

interface ActivityInput {
  day: number
  time: string
  description: string
}

export default function CreateTripPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [activities, setActivities] = useState<ActivityInput[]>([{ day: 1, time: "09:00", description: "" }])

  const addActivity = () => {
    const lastDay = activities.length > 0 ? activities[activities.length - 1].day : 1
    setActivities([...activities, { day: lastDay, time: "09:00", description: "" }])
  }

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index))
  }

  const updateActivity = (index: number, field: keyof ActivityInput, value: string | number) => {
    const updated = [...activities]
    updated[index] = { ...updated[index], [field]: value }
    setActivities(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
      })

      if (!response.ok) {
        throw new Error("Failed to create trip")
      }

      const data = await response.json()
      router.push(`/dashboard/trips/${data.id}`)
    } catch (error) {
      console.error("Error creating trip:", error)
      alert("Failed to create trip. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getTripDuration = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance tracking-tight">
          Plan Your Adventure
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Create a detailed itinerary for your next trip
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Trip Details
            </CardTitle>
            <CardDescription>Where and when are you traveling?</CardDescription>
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
                <Label htmlFor="startDate" className="flex items-center gap-2">
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
              <div className="text-sm text-muted-foreground bg-primary/10 p-3 rounded-lg border border-primary/20">
                Trip duration: <span className="font-semibold text-primary">{getTripDuration()} days</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Activities & Itinerary</CardTitle>
            <CardDescription>Add activities for each day of your trip</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityForm
                key={index}
                activity={activity}
                index={index}
                maxDays={getTripDuration()}
                canRemove={activities.length > 1}
                onUpdate={updateActivity}
                onRemove={removeActivity}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addActivity}
              className="w-full border-dashed border-2 hover:bg-primary/10 hover:border-primary bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard")} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1 shadow-sm">
            {isLoading ? "Creating..." : "Create Trip"}
          </Button>
        </div>
      </form>
    </div>
  )
}
