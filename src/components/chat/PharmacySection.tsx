
"use client";

import type { Pharmacy } from "@/lib/types";
import { PharmacyCard } from "./PharmacyCard";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mediquery-server.onrender.com";

export function PharmacySection() {
  const [location, setLocation] = useState<string>("");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async (loc: string) => {
    setLoading(true);
    setError(null);
    setPharmacies([]);
    try {
      const res = await fetch(`${API_URL}/api/medical-stores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: loc }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server did not return JSON");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch stores");
      }

      setPharmacies(data.stores);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.display_name || `${latitude},${longitude}`;
          setLocation(address);
          fetchStores(address);
        } catch {
          setError("Failed to get address from coordinates");
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied or unable to get location");
        setLoading(false);
      }
    );
  };

  const handleSearch = () => {
    if (!location.trim()) {
      alert("Please enter a location");
      return;
    }
    fetchStores(location);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center text-primary">
        Find Nearby Medical Stores
      </h3>

      <div className="flex gap-2 max-w-2xl mx-auto px-4">
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-grow p-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-md hover:text-black hover:bg-green-400 transition-colors duration-300 ease-in-out"
        >
          {loading ? "Searching..." : "Find"}
        </button>
        <button
          onClick={handleUseMyLocation}
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-md hover:text-black hover:bg-green-400 transition-colors duration-300 ease-in-out"
        >
          Use My Location
        </button>
      </div>

      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {!loading && pharmacies.length === 0 && (
        <p className="text-center text-muted-foreground pt-4">
          No stores found
        </p>
      )}

      {!loading && pharmacies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {pharmacies.map((pharmacy) => (
            <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} userLocation={location} />
          ))}
        </div>
      )}
    </div>
  );
}
