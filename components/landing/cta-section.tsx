import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = ["Free forever", "No credit card", "Unlimited trips"];

interface CTASectionProps {
  isAuthenticated?: boolean;
}

export function CTASection({ isAuthenticated = false }: CTASectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-teal-500/10 to-blue-500/10" />

      {/*  Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-teal-400/30 to-blue-500/30 dark:from-teal-400/20 dark:to-blue-500/20 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-500/30 dark:from-purple-400/20 dark:to-pink-500/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-semibold">Start Your Journey</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-teal-500 to-blue-500 bg-clip-text text-transparent">
              Ready to Start Planning?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers who trust TravelPlan to organize their
            adventures and create unforgettable memories
          </p>

          {/* CTA Button */}
          <div className="mb-10">
            <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button
                size="lg"
                className="text-base px-12 py-4 shadow-xl shadow-primary/30 bg-gradient-to-r from-primary via-teal-500 to-blue-500 hover:shadow-2xl hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-0"
              >
                {isAuthenticated ? "Go to Dashboard" : "Create Free Account"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-lg">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CheckCircle2 className="h-6 w-6 text-primary animate-pulse" />
                <span className="font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
