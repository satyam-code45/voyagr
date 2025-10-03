import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Plane } from "lucide-react"

export function EmptyState() {
  return (
    <Card className="border-dashed border-2 border-border bg-card/50">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-primary/10 p-6 mb-4 border border-primary/20">
          <Plane className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">No trips yet</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md leading-relaxed">
          Start planning your next adventure by creating your first trip itinerary
        </p>
        <Link href="/dashboard/create">
          <Button className="shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Trip
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
