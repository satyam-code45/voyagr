"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { AuthenticatedNavbar } from "@/components/landing/authenticated-navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import type { User } from "@/lib/auth";

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
      // If not authenticated, user stays null (which is fine)
    } catch (error) {
      console.error("Auth check error:", error);
      // If there's an error, user stays null (which is fine)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user ? <AuthenticatedNavbar user={user} /> : <Navbar />}
      <HeroSection isAuthenticated={!!user} />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection isAuthenticated={!!user} />
      <Footer />
    </div>
  );
}
