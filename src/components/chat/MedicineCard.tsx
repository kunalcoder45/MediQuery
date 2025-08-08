"use client";

import React, { useState, useRef } from "react";
import type { MedicineSuggestion, Pharmacy } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPinIcon, Volume2Icon, PillIcon, InfoIcon, CalendarDaysIcon, Loader2, Search, Filter } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "@/components/ui/morphing-popover";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { PharmacyCard } from "./PharmacyCard";
import { useClickOutside } from "@/hooks/use-click-outside";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mediquery-server.onrender.com";

interface MedicineCardProps {
  suggestion: MedicineSuggestion;
}

interface ApiResponse {
  data: any;
  stores: Pharmacy[];
  location?: { name: string; lat: number; lon: number };
  total?: number;
  radius?: number;
  message?: string;
  success: boolean;
  error?: string;
}

const speakText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

export function MedicineCard({ suggestion }: MedicineCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Pharmacy search states
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(5);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInfo, setSearchInfo] = useState<{ location?: string; total?: number; radius?: number }>({});

  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => {
    setIsPopoverOpen(false); // Close popover when clicking outside
  });

  const fetchStores = async (loc: string, searchRadius: number = 5) => {
    if (!loc.trim()) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError(null);
    setPharmacies([]);
    setSearchInfo({});

    try {
      const res = await fetch(`${API_URL}/api/medical-stores`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ location: loc.trim(), radius: searchRadius }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned invalid response format");
      }

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      // New code:
      setPharmacies(data.data?.stores || []);
      setSearchInfo({
        location: data.data?.location?.name || loc,
        total: data.data?.searchParams?.total || 0,
        radius: data.data?.searchParams?.radius || searchRadius
      });

      if (data.message && data.stores.length === 0) {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch medical stores.");
      setPharmacies([]);
      setSearchInfo({});
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }
    fetchStores(location, radius);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const popoverVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: 10,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 10,
    },
  };

  return (
    <Card className="max-w-md mx-auto bg-white shadow rounded-lg overflow-hidden">
      <CardHeader className="bg-primary/10 p-4">
        <CardTitle className="flex items-center text-black text-xl">
          <PillIcon className="w-6 h-6 mr-2" />
          {suggestion.medicineName}
          <button
            type="button"
            className="ml-3 p-1 rounded hover:bg-gray-300 transition"
            onClick={() => speakText(suggestion.medicineName)}
          >
            <Volume2Icon className="w-5 h-5 text-primary hover:text-black" />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-semibold flex items-center">
            <InfoIcon className="w-4 h-4 mr-1" />
            Common Use
          </h4>
          <p className="text-sm text-foreground">{suggestion.commonUse}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold flex items-center">
            <CalendarDaysIcon className="w-4 h-4 mr-1" />
            Recommended Dosage
          </h4>
          <p className="text-sm text-foreground">{suggestion.dosage}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        {/* MorphingPopover with a button trigger */}
        <MorphingPopover
          open={isPopoverOpen}
          onOpenChange={(open) => setIsPopoverOpen(open)}
          variants={popoverVariants}
        >
          <MorphingPopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              <motion.span
                layout='position'
              >
                Check Nearby Stores
              </motion.span>
            </Button>
          </MorphingPopoverTrigger>

          <AnimatePresence>
            {isPopoverOpen && (
              <MorphingPopoverContent
                className="w-full h-screen p-4 fixed left-0 top-0 z-50 backdrop-blur-sm bg-gray/10 rounded-md shadow-lg"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={popoverVariants}
              // transition={{ duration: 0.3 }}
              >
                <div
                  ref={popoverRef}
                  className="w-[90%] md:w-[30%] p-4 fixed left-2/4 top-2/4 md:mt-6 mt-8 -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-100 rounded shadow-lg"
                >
                  <motion.div
                    layout>
                    <h3 className="text-lg font-semibold mb-2">Find Nearby Medical Stores</h3>
                    <div className="relative mb-3">
                      <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-3 flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        disabled={loading}
                        className="border border-gray-300 rounded px-3 py-1 w-full"
                      >
                        {[1, 2, 5, 10, 15, 25].map((r) => (
                          <option key={r} value={r}>
                            {r} km
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <Button
                        variant="default"
                        className="flex-grow"
                        onClick={handleSearch}
                        disabled={loading || !location.trim()}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {loading ? "Searching..." : "Search"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (!navigator.geolocation) {
                            setError("Geolocation not supported");
                            return;
                          }
                          setError(null);
                          setLoading(true);

                          navigator.geolocation.getCurrentPosition(
                            async (pos) => {
                              const { latitude, longitude } = pos.coords;
                              try {
                                const res = await fetch(
                                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                                  {
                                    headers: { "User-Agent": "MediQuery/1.0" },
                                  }
                                );
                                if (!res.ok) throw new Error("Failed reverse geocoding");
                                const data = await res.json();
                                const addr = data.display_name || `${latitude}, ${longitude}`;
                                setLocation(addr);
                                await fetchStores(addr, radius);
                              } catch {
                                const coordsLoc = `${latitude}, ${longitude}`;
                                setLocation(coordsLoc);
                                await fetchStores(coordsLoc, radius);
                              }
                            },
                            (err) => {
                              setLoading(false);
                              setError("Unable to get location. Please enter manually.");
                            }
                          );
                        }}
                        disabled={loading}
                      >
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        My Location
                      </Button>
                    </div>

                    {error && <p className="text-black rounded p-2 border border-red-500 bg-red-100">{error}</p>}

                    {searchInfo.location && !loading && (
                      <p className="text-sm mb-2">
                        Found <span className="font-semibold">{searchInfo.total || pharmacies.length}</span> stores within{" "}
                        <span className="font-semibold">{searchInfo.radius} km</span> of <span>{searchInfo.location}</span>
                      </p>
                    )}

                    <div className="max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                      {loading && (
                        <div className="flex justify-center py-4">
                          <Loader2 className="animate-spin text-primary" size={24} />
                        </div>
                      )}

                      {!loading && pharmacies.length === 0 && searchInfo.location && !error && (
                        <p>No stores found near {searchInfo.location}</p>
                      )}

                      <div className="space-y-2">
                        {pharmacies.map((pharmacy) => (
                          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} userLocation={location} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </MorphingPopoverContent>
            )};
          </AnimatePresence>
        </MorphingPopover>
      </CardFooter>
    </Card>
  );
}
