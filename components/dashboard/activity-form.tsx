"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"

interface ActivityInput {
  day: number
  time: string
  description: string
}

interface ActivityFormProps {
  activity: ActivityInput
  index: number
  maxDays: number
  canRemove: boolean
  onUpdate: (index: number, field: keyof ActivityInput, value: string | number) => void
  onRemove: (index: number) => void
}

export function ActivityForm({ activity, index, maxDays, canRemove, onUpdate, onRemove }: ActivityFormProps) {
  return (
    <div className="p-4 border border-border rounded-lg bg-card/50 space-y-3 hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Activity {index + 1}</h3>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
            max={maxDays || 999}
            value={activity.day}
            onChange={(e) => onUpdate(index, "day", Number.parseInt(e.target.value))}
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
            onChange={(e) => onUpdate(index, "time", e.target.value)}
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
          onChange={(e) => onUpdate(index, "description", e.target.value)}
          required
          rows={2}
          className="mt-1.5 resize-none"
        />
      </div>
    </div>
  )
}
