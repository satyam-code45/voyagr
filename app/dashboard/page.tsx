"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Plane, Loader2, LogOut } from "lucide-react";
import type { User } from "@/lib/auth";
import type { Trip } from "@/lib/types";
import { TripCard } from "@/components/dashboard/trip-card";
import { EmptyState } from "@/components/dashboard/empty-state";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Dashboard: Checking authentication...");
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      console.log("Dashboard: Auth response status:", response.status);
      console.log("Dashboard: Response headers:", Object.fromEntries(response.headers.entries()));

      if (response.status === 401) {
        console.log("Dashboard: Not authenticated, redirecting to login...");
        // Add a small delay to prevent rapid redirects
        setTimeout(() => {
          router.push("/login");
        }, 100);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Dashboard: User authenticated:", data.user);
        setUser(data.user);
      } else {
        console.log("Dashboard: Auth check failed, redirecting to login...");
        // Add a small delay to prevent rapid redirects
        setTimeout(() => {
          router.push("/login");
        }, 100);
      }
    } catch (err) {
      console.error("Dashboard: Auth check error:", err);
      setError("Authentication failed");
      // Don't redirect on network errors, show error instead
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/trips", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      } else if (response.status === 401) {
        router.push("/login");
      } else {
        console.error("Failed to fetch trips");
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include"
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Redirect anyway
      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
        <div className="text-center max-w-md">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
            <p className="font-medium">Authentication Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <div className="space-x-4">
            <Button onClick={checkAuth} variant="outline">
              Try Again
            </Button>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3 tracking-tight">
              <Plane className="h-8 w-8 text-primary" />
              Welcome back, {user.name || user.email}!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Plan and manage your travel adventures
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="items-center gap-2 hidden md:flex"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">Your Trips</h2>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
              {trips.length} {trips.length === 1 ? 'trip' : 'trips'}
            </div>
          </div>
          <Link href="/dashboard/create">
            <Button className="shadow-lg shadow-primary/20 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create New Trip
            </Button>
          </Link>
        </div>

        {/* Trips Grid */}
        <div className="space-y-6">
          {trips.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
