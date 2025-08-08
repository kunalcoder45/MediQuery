"use client";

import type { Pharmacy } from "@/lib/types";
import { PharmacyCard } from "./PharmacyCard";
import { useState } from "react";
import { Loader2, MapPin, Search, Filter } from "lucide-react";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface ApiResponse {
  data: any;
  stores: Pharmacy[];
  location?: {
    name: string;
    lat: number;
    lon: number;
  };
  total?: number;
  radius?: number;
  message?: string;
  success: boolean;
  error?: string;
}

export function PharmacySection() {
  const [location, setLocation] = useState<string>("");
  const [radius, setRadius] = useState<number>(5);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInfo, setSearchInfo] = useState<{
    location?: string;
    total?: number;
    radius?: number;
  }>({});

  // const fetchStores = async (loc: string, searchRadius: number = 5) => {
  //   if (!loc.trim()) {
  //     setError("Please enter a location");
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);
  //   setPharmacies([]);
  //   setSearchInfo({});

  //   try {
  //     console.log(`Searching for stores near: ${loc} within ${searchRadius}km`);

  //     const res = await fetch(`${API_URL}/api/medical-stores`, {
  //       method: "POST",
  //       headers: { 
  //         "Content-Type": "application/json",
  //         "Accept": "application/json"
  //       },
  //       body: JSON.stringify({ 
  //         location: loc.trim(),
  //         radius: searchRadius
  //       }),
  //     });

  //     const contentType = res.headers.get("content-type");
  //     if (!contentType || !contentType.includes("application/json")) {
  //       throw new Error("Server returned invalid response format");
  //     }

  //     const data: ApiResponse = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.error || `Server error: ${res.status}`);
  //     }

  //     if (!data.success) {
  //       throw new Error(data.error || "Request failed");
  //     }

  //     setPharmacies(data.stores || []);
  //     setSearchInfo({
  //       location: data.location?.name || loc,
  //       total: data.total || data.stores?.length || 0,
  //       radius: data.radius || searchRadius
  //     });

  //     // Show message if no stores found
  //     if (data.message && data.stores.length === 0) {
  //       setError(data.message);
  //     }

  //   } catch (err: any) {
  //     console.error("Fetch error:", err);
  //     setError(err.message || "Failed to fetch medical stores. Please try again.");
  //     setPharmacies([]);
  //     setSearchInfo({});
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // Add debugging in fetchStores function

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
      console.log(`🔍 API URL: ${API_URL}`);
      console.log(`🔍 Searching for stores near: ${loc} within ${searchRadius}km`);

      const res = await fetch(`${API_URL}/api/medical-stores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          location: loc.trim(),
          radius: searchRadius
        }),
      });

      console.log(`📡 Response status: ${res.status}`);
      console.log(`📡 Response headers:`, res.headers);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned invalid response format");
      }

      const data: ApiResponse = await res.json();
      console.log(`📤 API Response:`, data);
      console.log(`📤 Stores array:`, data.stores);
      console.log(`📤 Success status:`, data.success);

      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      if (!data.success) {
        throw new Error(data.error || "Request failed");
      }

      console.log(`✅ Setting ${data.stores?.length || 0} pharmacies`);
      // New code:
      setPharmacies(data.data?.stores || []);
      setSearchInfo({
        location: data.data?.location?.name || loc,
        total: data.data?.searchParams?.total || 0,
        radius: data.data?.searchParams?.radius || searchRadius
      });

      // Show message if no stores found
      if (data.message && data.stores.length === 0) {
        setError(data.message);
      }

    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      console.error("❌ Error details:", err.message);
      setError(err.message || "Failed to fetch medical stores. Please try again.");
      setPharmacies([]);
      setSearchInfo({});
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
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // Cache for 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Get readable address from coordinates
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'MediQuery/1.0'
              }
            }
          );

          if (!res.ok) {
            throw new Error("Failed to get address from coordinates");
          }

          const data = await res.json();
          const address = data.display_name || `${latitude}, ${longitude}`;

          setLocation(address);
          await fetchStores(address, radius);

        } catch (geoError) {
          console.error("Geocoding error:", geoError);
          // Fallback to coordinates if reverse geocoding fails
          const coordsLocation = `${latitude}, ${longitude}`;
          setLocation(coordsLocation);
          await fetchStores(coordsLocation, radius);
        }
      },
      (geoError) => {
        setLoading(false);
        let errorMessage = "Unable to get your location. ";

        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            errorMessage += "Please allow location access and try again.";
            break;
          case geoError.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case geoError.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "Please enter your location manually.";
        }

        setError(errorMessage);
      },
      options
    );
  };

  const handleSearch = () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }
    fetchStores(location, radius);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-primary">
          Find Nearby Medical Stores
        </h3>
        <p className="text-muted-foreground text-sm">
          Discover pharmacies and medical stores in your area
        </p>
      </div>

      {/* Search Controls */}
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {/* Location and Radius Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow flex gap-2">
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Enter your location (city, area, or address)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="flex items-center gap-2 min-w-fit">
              <Filter className="text-gray-400 h-4 w-4" />
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loading}
              >
                <option value={1}>1 km</option>
                <option value={2}>2 km</option>
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={15}>15 km</option>
                <option value={25}>25 km</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              disabled={loading || !location.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Search className="h-4 w-4" />
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              onClick={handleUseMyLocation}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <MapPin className="h-4 w-4" />
              My Location
            </button>
          </div>
        </div>
      </div>

      {/* Search Info */}
      {searchInfo.location && !loading && (
        <div className="text-center text-sm text-muted-foreground">
          {searchInfo.total ? (
            <p>
              Found <span className="font-semibold text-primary">{searchInfo.total}</span> medical stores
              within <span className="font-semibold">{searchInfo.radius}km</span> of{" "}
              <span className="font-medium">{searchInfo.location}</span>
            </p>
          ) : (
            <p>Searched within {searchInfo.radius}km of {searchInfo.location}</p>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Searching for medical stores in your area...
          </p>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && pharmacies.length === 0 && searchInfo.location && (
        <div className="text-center py-12">
          <div className="space-y-3">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900">No medical stores found</h4>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any medical stores within {searchInfo.radius}km of your location.
              Try increasing the search radius or searching in a different area.
            </p>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!loading && pharmacies.length > 0 && (
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacies.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy.id}
                pharmacy={pharmacy}
                userLocation={location}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
