import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-accent" />
            <span className="font-serif font-semibold text-foreground text-lg">
              Voyagr
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Voyagr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
