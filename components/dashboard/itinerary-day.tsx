import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { Activity } from "@/lib/types"

interface ItineraryDayProps {
  day: number
  date: string
  activities: Activity[]
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function ItineraryDay({ day, date, activities }: ItineraryDayProps) {
  return (
    <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-primary/5 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary">
                Day {day}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-2 text-foreground/70">{date}</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">{activities.length} activities</div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0 border border-primary/20">
                  <Clock className="h-4 w-4" />
                </div>
                {index < activities.length - 1 && <div className="w-0.5 h-full bg-border mt-2 flex-1 min-h-[20px]" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-primary">{formatTime(activity.time)}</span>
                </div>
                <p className="text-foreground leading-relaxed">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
