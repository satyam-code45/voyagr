const steps = [
  {
    number: 1,
    title: "Create Your Trip",
    description:
      "Enter your destination, travel dates, and start building your itinerary",
  },
  {
    number: 2,
    title: "Add Activities",
    description:
      "Plan what you'll do each day with specific times and detailed descriptions",
  },
  {
    number: 3,
    title: "Travel with Confidence",
    description:
      "Access your itinerary anytime and share it with your travel companions",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/*  Decorative Elements  */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-teal-500/20 dark:from-blue-400/10 dark:to-teal-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 dark:from-purple-400/10 dark:to-pink-500/10 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <span className="text-sm font-semibold">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-teal-500 to-blue-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Three simple steps to your perfect trip
            </p>
          </div>

          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-8 items-start group mb-16 last:mb-0">
                {/* Step Number */}
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 relative z-10">
                    {step.number}
                  </div>
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-20 w-0.5 h-24 bg-gradient-to-b from-primary/50 to-transparent transform -translate-x-px" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-4 group-hover:transform group-hover:translate-x-1 transition-all duration-300">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
