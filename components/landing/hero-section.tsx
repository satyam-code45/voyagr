import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Plane,
  ArrowRight,
  Camera,
  MapPin,
  Compass,
  Mountain,
} from "lucide-react";
import React from "react";

interface HeroSectionProps {
  isAuthenticated?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isAuthenticated = false }) => {
  return (
    <section className="relative min-h-[calc(100vh)] flex items-center justify-center overflow-hidden">
      {/* Travel Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-32 left-32 w-24 h-24 bg-gradient-to-br from-blue-300/30 to-cyan-400/30 rounded-full blur-lg animate-pulse">
          <MapPin className="h-6 w-6 text-gray-600/60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div
          className="absolute top-80 right-40 w-20 h-20 bg-gradient-to-br from-purple-300/30 to-pink-400/30 rounded-full blur-md animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-48 left-16 w-16 h-16 bg-gradient-to-br from-green-300/30 to-teal-400/30 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        {/* Travel Image Cards */}
        <div className="hidden lg:block absolute top-10 left-10 w-48 h-32 rounded-2xl shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-700 overflow-hidden border-4 border-gray-200 backdrop-blur-sm group">
          <Image
            src="/t1.jpg"
            alt="Beautiful travel destination"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Lighter overlay for better contrast on text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white">
            <Mountain className="h-4 w-4 mb-1" />
            <span className="text-xs font-semibold">Adventure</span>
          </div>
        </div>
        <div className="hidden lg:block absolute top-20 right-16 w-44 h-28 rounded-2xl shadow-xl transform -rotate-12 hover:-rotate-6 transition-transform duration-700 overflow-hidden border-4 border-gray-200 backdrop-blur-sm group">
          <Image
            src="/t2.jpg"
            alt="Stunning travel location"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white">
            <Plane className="h-4 w-4 mb-1" />
            <span className="text-xs font-semibold">Journey</span>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-24 left-16 w-40 h-28 rounded-2xl shadow-xl transform rotate-6 hover:rotate-3 transition-transform duration-700 overflow-hidden border-4 border-gray-200 backdrop-blur-sm">
          <Image
            src="/t3.jpg"
            alt="Capture memories"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-semibold">Capture</span>
            </div>
          </div>
        </div>{" "}
        <div className="hidden lg:block absolute bottom-16 right-20 w-52 h-32 rounded-2xl shadow-xl transform -rotate-6 hover:-rotate-3 transition-transform duration-700 overflow-hidden border-4 border-gray-200 backdrop-blur-sm group">
          <Image
            src="/t4.jpg"
            alt="Incredible travel destination"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white">
            <Compass className="h-4 w-4 mb-1" />
            <span className="text-xs font-semibold">Explore</span>
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-36">
        <div className="max-w-5xl mx-auto text-center">
          {/* Travel Badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-primary mb-8 border border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 animate-pulse text-blue-500" />
              <MapPin
                className="h-4 w-4 animate-bounce text-teal-500"
                style={{ animationDelay: "0.5s" }}
              />
              <Compass
                className="h-4 w-4 animate-pulse text-purple-500"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <span className="text-sm font-semibold">
              🌍 Your adventure awaits
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance tracking-tight leading-tight px-4 sm:px-0">
            <span className="bg-gradient-to-r from-primary via-teal-500 to-blue-500 bg-clip-text text-transparent">
              Your Journey Starts Here
            </span>
          </h1>

          {/* Description text */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed px-4 sm:px-0">
            Create detailed travel itineraries, organize activities day by day,
            and never miss a moment of your adventure. All in one beautiful,
            easy-to-use platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-16 px-4 sm:px-0">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="text-base px-8 py-3 shadow-xl shadow-primary/25 bg-gradient-to-r from-primary via-teal-500 to-blue-500 hover:shadow-2xl hover:shadow-primary/40 transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/create">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-3 border-2 border-primary/30 bg-white/60 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/60 transform hover:scale-105 transition-all duration-300"
                  >
                    Create New Trip
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="text-base px-8 py-3 shadow-xl shadow-primary/25 bg-gradient-to-r from-primary via-teal-500 to-blue-500 hover:shadow-2xl hover:shadow-primary/40 transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    Plan Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-3 border-2 border-primary/30 bg-white/60 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/60 transform hover:scale-105 transition-all duration-300"
                  >
                    View Demo
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Travel Destinations Gallery  */}
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-500 dark:text-muted-foreground mb-6 font-medium">
              ✈️ Popular destinations our travelers love
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-80 hover:opacity-100 transition-opacity duration-500">
              {/* Card 1 */}
              <div className="group relative h-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/t1.jpg"
                  alt="Travel destination 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs font-semibold">⛰️ Mountains</div>
                    <div className="text-xs opacity-75">Adventure</div>
                  </div>
                </div>
              </div>
              <div className="group relative h-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/t2.jpg"
                  alt="Travel destination 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs font-semibold">🌊 Beaches</div>
                    <div className="text-xs opacity-75">Paradise</div>
                  </div>
                </div>
              </div>
              <div className="group relative h-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/t3.jpg"
                  alt="Travel destination 3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs font-semibold">🏙️ Cities</div>
                    <div className="text-xs opacity-75">Culture</div>
                  </div>
                </div>
              </div>
              <div className="group relative h-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/t4.jpg"
                  alt="Travel destination 4"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs font-semibold">🏛️ Heritage</div>
                    <div className="text-xs opacity-75">History</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
