import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Compass, Share2, Sparkles, Map } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Destination Planning",
    description:
      "Add destinations with beautiful imagery and organize your trips with ease",
  },
  {
    icon: Calendar,
    title: "Day-by-Day Itinerary",
    description:
      "Plan activities for each day with precise timing and detailed descriptions",
  },
  {
    icon: Compass,
    title: "Smart Recommendations",
    description:
      "Get personalized suggestions for activities and places based on your interests",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share your itineraries with travel companions with a single click",
  },
  {
    icon: Sparkles,
    title: "Beautiful Design",
    description:
      "Enjoy a clean, elegant interface that makes planning a pleasure",
  },
  {
    icon: Map,
    title: "Anywhere Access",
    description: "Access your itineraries from any device, anytime, anywhere",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      {/* Decorative Elements*/}
      <div className="absolute top-40 -left-20 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-blue-500/20 dark:from-teal-400/10 dark:to-blue-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-400/20 to-pink-500/20 dark:from-purple-400/10 dark:to-pink-500/10 rounded-full blur-2xl" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-teal-500 to-blue-500 bg-clip-text text-transparent">
                Everything You Need to Plan
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Powerful features designed to make travel planning effortless and
              enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const gradients = [
                "from-teal-500 to-blue-500",
                "from-purple-500 to-pink-500",
                "from-amber-500 to-orange-500",
                "from-emerald-500 to-teal-500",
                "from-blue-500 to-indigo-500",
                "from-rose-500 to-pink-500",
              ];

              return (
                <Card
                  key={feature.title}
                  className="group border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                >
                  {/* Card Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <CardContent className="p-8 relative">
                    <div
                      className={`rounded-2xl bg-gradient-to-br ${gradients[index]} w-16 h-16 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>

                    <div
                      className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradients[index]} group-hover:w-full transition-all duration-500`}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
