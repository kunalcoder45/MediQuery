// "use client";

// import React, { useState, useRef } from "react";
// import type { MedicineSuggestion, Pharmacy } from "@/lib/types";
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { MapPinIcon, Volume2Icon, PillIcon, InfoIcon, CalendarDaysIcon, Loader2, Search, Filter } from "lucide-react";
// import {
//   MorphingPopover,
//   MorphingPopoverContent,
//   MorphingPopoverTrigger,
// } from "@/components/ui/morphing-popover";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { PharmacyCard } from "./PharmacyCard";
// import { useClickOutside } from "@/hooks/use-click-outside";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mediquery-server.onrender.com";

// interface MedicineCardProps {
//   suggestion: MedicineSuggestion;
// }

// interface ApiResponse {
//   data: any;
//   stores: Pharmacy[];
//   location?: { name: string; lat: number; lon: number };
//   total?: number;
//   radius?: number;
//   message?: string;
//   success: boolean;
//   error?: string;
// }

// const speakText = (text: string) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   speechSynthesis.speak(utterance);
// };

// export function MedicineCard({ suggestion }: MedicineCardProps) {
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

//   // Pharmacy search states
//   const [location, setLocation] = useState("");
//   const [radius, setRadius] = useState(5);
//   const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchInfo, setSearchInfo] = useState<{ location?: string; total?: number; radius?: number }>({});

//   const popoverRef = useRef<HTMLDivElement>(null);

//   useClickOutside(popoverRef, () => {
//     setIsPopoverOpen(false); // Close popover when clicking outside
//   });

//   const fetchStores = async (loc: string, searchRadius: number = 5) => {
//     if (!loc.trim()) {
//       setError("Please enter a location");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setPharmacies([]);
//     setSearchInfo({});

//     try {
//       const res = await fetch(`${API_URL}/api/medical-stores`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json" },
//         body: JSON.stringify({ location: loc.trim(), radius: searchRadius }),
//       });

//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Server returned invalid response format");
//       }

//       const data: ApiResponse = await res.json();

//       if (!res.ok || !data.success) {
//         throw new Error(data.error || `Request failed with status ${res.status}`);
//       }

//       // New code:
//       setPharmacies(data.data?.stores || []);
//       setSearchInfo({
//         location: data.data?.location?.name || loc,
//         total: data.data?.searchParams?.total || 0,
//         radius: data.data?.searchParams?.radius || searchRadius
//       });

//       if (data.message && data.stores.length === 0) {
//         setError(data.message);
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch medical stores.");
//       setPharmacies([]);
//       setSearchInfo({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     if (!location.trim()) {
//       setError("Please enter a location");
//       return;
//     }
//     fetchStores(location, radius);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const popoverVariants: Variants = {
//     initial: {
//       opacity: 0,
//       scale: 0.9,
//       y: 10,
//     },
//     animate: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.9,
//       y: 10,
//     },
//   };

//   return (
//     <Card className="max-w-md mx-auto bg-white shadow rounded-lg overflow-hidden">
//       <CardHeader className="bg-primary/10 p-4">
//         <CardTitle className="flex items-center text-black text-xl">
//           <PillIcon className="w-6 h-6 mr-2" />
//           {suggestion.medicineName}
//           <button
//             type="button"
//             className="ml-3 p-1 rounded hover:bg-gray-300 transition"
//             onClick={() => speakText(suggestion.medicineName)}
//           >
//             <Volume2Icon className="w-5 h-5 text-primary hover:text-black" />
//           </button>
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="p-4 space-y-3">
//         <div>
//           <h4 className="text-sm font-semibold flex items-center">
//             <InfoIcon className="w-4 h-4 mr-1" />
//             Common Use
//           </h4>
//           <p className="text-sm text-foreground">{suggestion.commonUse}</p>
//         </div>

//         <div>
//           <h4 className="text-sm font-semibold flex items-center">
//             <CalendarDaysIcon className="w-4 h-4 mr-1" />
//             Recommended Dosage
//           </h4>
//           <p className="text-sm text-foreground">{suggestion.dosage}</p>
//         </div>
//       </CardContent>

//       <CardFooter className="p-4">
//         {/* MorphingPopover with a button trigger */}
//         <MorphingPopover
//           open={isPopoverOpen}
//           onOpenChange={(open) => setIsPopoverOpen(open)}
//           variants={popoverVariants}
//         >
//           <MorphingPopoverTrigger asChild>
//             <Button variant="outline" className="w-full">
//               <motion.span
//                 layout='position'
//               >
//                 Check Nearby Stores
//               </motion.span>
//             </Button>
//           </MorphingPopoverTrigger>

//           <AnimatePresence>
//             {isPopoverOpen && (
//               <MorphingPopoverContent
//                 className="w-full h-screen p-4 fixed left-0 top-0 z-50 backdrop-blur-sm bg-gray/10 rounded-md shadow-lg"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={popoverVariants}
//               // transition={{ duration: 0.3 }}
//               >
//                 <div
//                   ref={popoverRef}
//                   className="w-[90%] md:w-[30%] p-4 fixed left-2/4 top-2/4 md:mt-6 mt-8 -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-100 rounded shadow-lg"
//                 >
//                   <motion.div
//                     layout>
//                     <h3 className="text-lg font-semibold mb-2">Find Nearby Medical Stores</h3>
//                     <div className="relative mb-3">
//                       <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <Input
//                         type="text"
//                         placeholder="Enter your location"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         onKeyDown={handleKeyPress}
//                         className="pl-10"
//                         disabled={loading}
//                       />
//                     </div>

//                     <div className="mb-3 flex items-center space-x-2">
//                       <Filter className="w-5 h-5 text-gray-400" />
//                       <select
//                         value={radius}
//                         onChange={(e) => setRadius(Number(e.target.value))}
//                         disabled={loading}
//                         className="border border-gray-300 rounded px-3 py-1 w-full"
//                       >
//                         {[1, 2, 5, 10, 15, 25].map((r) => (
//                           <option key={r} value={r}>
//                             {r} km
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="flex gap-2 mb-3">
//                       <Button
//                         variant="default"
//                         className="flex-grow"
//                         onClick={handleSearch}
//                         disabled={loading || !location.trim()}
//                       >
//                         <Search className="w-4 h-4 mr-2" />
//                         {loading ? "Searching..." : "Search"}
//                       </Button>
//                       <Button
//                         variant="secondary"
//                         onClick={() => {
//                           if (!navigator.geolocation) {
//                             setError("Geolocation not supported");
//                             return;
//                           }
//                           setError(null);
//                           setLoading(true);

//                           navigator.geolocation.getCurrentPosition(
//                             async (pos) => {
//                               const { latitude, longitude } = pos.coords;
//                               try {
//                                 const res = await fetch(
//                                   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
//                                   {
//                                     headers: { "User-Agent": "MediQuery/1.0" },
//                                   }
//                                 );
//                                 if (!res.ok) throw new Error("Failed reverse geocoding");
//                                 const data = await res.json();
//                                 const addr = data.display_name || `${latitude}, ${longitude}`;
//                                 setLocation(addr);
//                                 await fetchStores(addr, radius);
//                               } catch {
//                                 const coordsLoc = `${latitude}, ${longitude}`;
//                                 setLocation(coordsLoc);
//                                 await fetchStores(coordsLoc, radius);
//                               }
//                             },
//                             (err) => {
//                               setLoading(false);
//                               setError("Unable to get location. Please enter manually.");
//                             }
//                           );
//                         }}
//                         disabled={loading}
//                       >
//                         <MapPinIcon className="w-4 h-4 mr-1" />
//                         My Location
//                       </Button>
//                     </div>

//                     {error && <p className="text-black rounded p-2 border border-red-500 bg-red-100">{error}</p>}

//                     {searchInfo.location && !loading && (
//                       <p className="text-sm mb-2">
//                         Found <span className="font-semibold">{searchInfo.total || pharmacies.length}</span> stores within{" "}
//                         <span className="font-semibold">{searchInfo.radius} km</span> of <span>{searchInfo.location}</span>
//                       </p>
//                     )}

//                     <div className="max-h-80 overflow-y-auto pr-1 custom-scrollbar">
//                       {loading && (
//                         <div className="flex justify-center py-4">
//                           <Loader2 className="animate-spin text-primary" size={24} />
//                         </div>
//                       )}

//                       {!loading && pharmacies.length === 0 && searchInfo.location && !error && (
//                         <p>No stores found near {searchInfo.location}</p>
//                       )}

//                       <div className="space-y-2">
//                         {pharmacies.map((pharmacy) => (
//                           <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} userLocation={location} />
//                         ))}
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </MorphingPopoverContent>
//             )};
//           </AnimatePresence>
//         </MorphingPopover>
//       </CardFooter>
//     </Card>
//   );
// }


// "use client";

// import React, { useState, useRef } from "react";
// import type { MedicineSuggestion, Pharmacy } from "@/lib/types";
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   MapPinIcon, 
//   Volume2Icon, 
//   PillIcon, 
//   InfoIcon, 
//   CalendarDaysIcon, 
//   Loader2, 
//   Search, 
//   Filter,
//   Clock,
//   DollarSign,
//   AlertTriangle,
//   ShieldAlert,
//   PackageIcon,
//   X
// } from "lucide-react";
// import {
//   MorphingPopover,
//   MorphingPopoverContent,
//   MorphingPopoverTrigger,
// } from "@/components/ui/morphing-popover";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { PharmacyCard } from "./PharmacyCard";
// import { useClickOutside } from "@/hooks/use-click-outside";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mediquery-server.onrender.com";

// interface MedicineCardProps {
//   suggestion: MedicineSuggestion;
// }

// interface ApiResponse {
//   data: any;
//   stores: Pharmacy[];
//   location?: { name: string; lat: number; lon: number };
//   total?: number;
//   radius?: number;
//   message?: string;
//   success: boolean;
//   error?: string;
// }

// const speakText = (text: string) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   speechSynthesis.speak(utterance);
// };

// export function MedicineCard({ suggestion }: MedicineCardProps) {
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

//   // Pharmacy search states
//   const [location, setLocation] = useState("");
//   const [radius, setRadius] = useState(5);
//   const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchInfo, setSearchInfo] = useState<{ location?: string; total?: number; radius?: number }>({});

//   const popoverRef = useRef<HTMLDivElement>(null);

//   useClickOutside(popoverRef, () => {
//     setIsPopoverOpen(false);
//   });

//   // Helper function to determine prescription status
//   // const getPrescriptionStatus = (prescription?: string) => {
//   //   if (!prescription) return { text: 'Consultation Recommended', color: 'bg-blue-100 text-blue-700 border-blue-200' };

//   //   const lowerCase = prescription.toLowerCase();
//   //   if (lowerCase.includes('required') || lowerCase.includes('prescription')) {
//   //     return { text: 'Prescription Required', color: 'bg-red-100 text-red-700 border-red-200' };
//   //   }
//   //   return { text: 'Over-the-Counter', color: 'bg-green-100 text-green-700 border-green-200' };
//   // };

//   // const prescriptionStatus = getPrescriptionStatus(suggestion.prescription);

//   const fetchStores = async (loc: string, searchRadius: number = 5) => {
//     if (!loc.trim()) {
//       setError("Please enter a location");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setPharmacies([]);
//     setSearchInfo({});

//     try {
//       const res = await fetch(`${API_URL}/api/medical-stores`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json" },
//         body: JSON.stringify({ location: loc.trim(), radius: searchRadius }),
//       });

//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Server returned invalid response format");
//       }

//       const data: ApiResponse = await res.json();

//       if (!res.ok || !data.success) {
//         throw new Error(data.error || `Request failed with status ${res.status}`);
//       }

//       setPharmacies(data.data?.stores || []);
//       setSearchInfo({
//         location: data.data?.location?.name || loc,
//         total: data.data?.searchParams?.total || 0,
//         radius: data.data?.searchParams?.radius || searchRadius
//       });

//       if (data.message && data.stores.length === 0) {
//         setError(data.message);
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch medical stores.");
//       setPharmacies([]);
//       setSearchInfo({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     if (!location.trim()) {
//       setError("Please enter a location");
//       return;
//     }
//     fetchStores(location, radius);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const popoverVariants: Variants = {
//     initial: {
//       opacity: 0,
//       scale: 0.9,
//       y: 10,
//     },
//     animate: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.9,
//       y: 10,
//     },
//   };

//   return (
//     <Card className="w-full bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 shadow-lg rounded-xl overflow-hidden border border-blue-100/50 hover:shadow-xl transition-all duration-300">
//       {/* Header with Medicine Name */}
//       <CardHeader className="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-5 border-b border-blue-100/50">
//         <div className="flex justify-between items-start mb-3">
//           <CardTitle className="flex items-center text-gray-800 text-xl font-bold">
//             <PillIcon className="w-6 h-6 mr-3 text-blue-600" />
//             {suggestion.medicineName}
//             <button
//               type="button"
//               className="ml-3 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
//               onClick={() => speakText(suggestion.medicineName)}
//             >
//               <Volume2Icon className="w-5 h-5 text-blue-600 hover:text-blue-700" />
//             </button>
//           </CardTitle>

//           {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${prescriptionStatus.color} shadow-sm`}>
//             {prescriptionStatus.text}
//           </span> */}
//         </div>

//         {/* <p className="text-sm text-gray-600 leading-relaxed">{suggestion.commonUse}</p> */}
//       </CardHeader>

//       <CardContent className="p-5 space-y-4">
//         {/* Key Information Grid */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
//             <div className="flex items-center mb-2">
//               <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-600" />
//               <span className="text-xs font-semibold text-blue-700">Dosage</span>
//             </div>
//             <p className="text-sm text-gray-700 font-medium">{suggestion.dosage}</p>
//           </div>

//           <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
//             <div className="flex items-center mb-2">
//               <DollarSign className="w-4 h-4 mr-2 text-green-600" />
//               <span className="text-xs font-semibold text-green-700">Price Range</span>
//             </div>
//             <p className="text-sm text-gray-700 font-medium">{suggestion.price || "₹50-200"}</p>
//           </div>
//         </div>

//         {/* Medicine Type */}
//         {suggestion.type && (
//           <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100">
//             <div className="flex items-center mb-2">
//               <PackageIcon className="w-4 h-4 mr-2 text-purple-600" />
//               <span className="text-xs font-semibold text-purple-700">Medicine Type</span>
//             </div>
//             <p className="text-sm text-gray-700 font-medium capitalize">{suggestion.type}</p>
//           </div>
//         )}

//         {suggestion.commonUse && (
//           <div className="bg-green-50/50 p-3 rounded-lg border border-green-200">
//             <div className="flex items-start mb-2">
//               <InfoIcon className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
//               <span className="text-xs font-semibold text-green-700">Common Use</span>
//             </div>
//             <p className="text-sm text-foreground">{suggestion.commonUse}</p>
//           </div>
//         )}

//         {/* Precautions */}
//         {suggestion.precautions && (
//           <div className="bg-yellow-50/50 p-3 rounded-lg border border-yellow-200">
//             <div className="flex items-start mb-2">
//               <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600 mt-0.5 flex-shrink-0" />
//               <span className="text-xs font-semibold text-yellow-700">Precautions</span>
//             </div>
//             <p className="text-sm text-gray-700 leading-relaxed">{suggestion.precautions}</p>
//           </div>
//         )}

//         {/* Side Effects */}
//         {suggestion.sideEffects && (
//           <div className="bg-red-50/50 p-3 rounded-lg border border-red-200">
//             <div className="flex items-start mb-2">
//               <ShieldAlert className="w-4 h-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
//               <span className="text-xs font-semibold text-red-700">Side Effects</span>
//             </div>
//             <p className="text-sm text-gray-700 leading-relaxed">{suggestion.sideEffects}</p>
//           </div>
//         )}

//         {/* Availability */}
//         {suggestion.availability && (
//           <div className="bg-gray-50/50 p-3 rounded-lg border border-gray-200">
//             <div className="flex items-center mb-2">
//               <InfoIcon className="w-4 h-4 mr-2 text-gray-600" />
//               <span className="text-xs font-semibold text-gray-700">Availability</span>
//             </div>
//             <p className="text-sm text-gray-700">{suggestion.availability}</p>
//           </div>
//         )}
//       </CardContent>

//       <CardFooter className="p-5 pt-0">
//         <MorphingPopover
//           open={isPopoverOpen}
//           onOpenChange={(open) => setIsPopoverOpen(open)}
//           variants={popoverVariants}
//         >
//           <MorphingPopoverTrigger asChild>
//             <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//               <motion.span layout="position" className="flex items-center">
//                 <MapPinIcon className="w-4 h-4 mr-2" />
//                 Find Nearby Pharmacy
//               </motion.span>
//             </Button>
//           </MorphingPopoverTrigger>

//           <AnimatePresence>
//             {isPopoverOpen && (
//               <MorphingPopoverContent
//                 className="w-full h-screen p-4 fixed left-0 top-0 z-50 backdrop-blur-sm bg-black/20 rounded-md"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={popoverVariants}
//               >
//                 <div
//                   ref={popoverRef}
//                   className="w-[90%] md:w-[32%] max-w-lg p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl border border-gray-200"
//                 >
//                   <motion.div layout>
//                     {/* Header */}
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                         <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
//                         Find Nearby Stores
//                       </h3>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setIsPopoverOpen(false)}
//                         className="rounded-full p-2 hover:bg-gray-100"
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>

//                     {/* Location Input */}
//                     <div className="relative mb-4">
//                       <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <Input
//                         type="text"
//                         placeholder="Enter your location"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         onKeyDown={handleKeyPress}
//                         className="pl-10 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         disabled={loading}
//                       />
//                     </div>

//                     {/* Radius Filter */}
//                     <div className="mb-4 flex items-center space-x-3">
//                       <Filter className="w-5 h-5 text-gray-400" />
//                       <select
//                         value={radius}
//                         onChange={(e) => setRadius(Number(e.target.value))}
//                         disabled={loading}
//                         className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-blue-500"
//                       >
//                         {[1, 2, 5, 10, 15, 25].map((r) => (
//                           <option key={r} value={r}>
//                             Within {r} km
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-3 mb-4">
//                       <Button
//                         variant="default"
//                         className="flex-grow bg-blue-600 hover:bg-blue-700"
//                         onClick={handleSearch}
//                         disabled={loading || !location.trim()}
//                       >
//                         <Search className="w-4 h-4 mr-2" />
//                         {loading ? "Searching..." : "Search Stores"}
//                       </Button>
//                       <Button
//                         variant="outline"
//                         onClick={() => {
//                           if (!navigator.geolocation) {
//                             setError("Geolocation not supported");
//                             return;
//                           }
//                           setError(null);
//                           setLoading(true);

//                           navigator.geolocation.getCurrentPosition(
//                             async (pos) => {
//                               const { latitude, longitude } = pos.coords;
//                               try {
//                                 const res = await fetch(
//                                   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
//                                   {
//                                     headers: { "User-Agent": "MediQuery/1.0" },
//                                   }
//                                 );
//                                 if (!res.ok) throw new Error("Failed reverse geocoding");
//                                 const data = await res.json();
//                                 const addr = data.display_name || `${latitude}, ${longitude}`;
//                                 setLocation(addr);
//                                 await fetchStores(addr, radius);
//                               } catch {
//                                 const coordsLoc = `${latitude}, ${longitude}`;
//                                 setLocation(coordsLoc);
//                                 await fetchStores(coordsLoc, radius);
//                               }
//                             },
//                             (err) => {
//                               setLoading(false);
//                               setError("Unable to get location. Please enter manually.");
//                             }
//                           );
//                         }}
//                         disabled={loading}
//                         className="px-4"
//                       >
//                         <MapPinIcon className="w-4 h-4 mr-1" />
//                         My Location
//                       </Button>
//                     </div>

//                     {/* Error Message */}
//                     {error && (
//                       <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                         <p className="text-red-700 text-sm">{error}</p>
//                       </div>
//                     )}

//                     {/* Search Info */}
//                     {searchInfo.location && !loading && (
//                       <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                         <p className="text-sm text-blue-800">
//                           Found <span className="font-semibold">{searchInfo.total || pharmacies.length}</span> stores within{" "}
//                           <span className="font-semibold">{searchInfo.radius} km</span> of{" "}
//                           <span className="font-semibold">{searchInfo.location}</span>
//                         </p>
//                       </div>
//                     )}

//                     {/* Results */}
//                     <div className="max-h-80 overflow-y-auto pr-1 custom-scrollbar">
//                       {loading && (
//                         <div className="flex justify-center py-8">
//                           <Loader2 className="animate-spin text-blue-600" size={32} />
//                         </div>
//                       )}

//                       {!loading && pharmacies.length === 0 && searchInfo.location && !error && (
//                         <div className="text-center py-8">
//                           <p className="text-gray-500">No stores found near {searchInfo.location}</p>
//                         </div>
//                       )}

//                       <div className="space-y-3">
//                         {pharmacies.map((pharmacy) => (
//                           <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} userLocation={location} />
//                         ))}
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </MorphingPopoverContent>
//             )}
//           </AnimatePresence>
//         </MorphingPopover>
//       </CardFooter>

//       {/* Custom Scrollbar Styles */}
//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </Card>
//   );
// }





// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { MapPin, Clock, AlertTriangle, DollarSign } from "lucide-react";
// // import type { MedicineSuggestion } from "@/lib/types";

// // interface MedicineCardProps {
// //   suggestion: MedicineSuggestion;
// //   onCheckNearbyStores: (medicineName: string) => void;
// // }

// // export function MedicineCard({ suggestion, onCheckNearbyStores }: MedicineCardProps) {
// //   // // Helper function to determine prescription status display
// //   // const getPrescriptionStatus = (prescription: string) => {
// //   //   const lowerCase = prescription.toLowerCase();
// //   //   if (lowerCase.includes('required') || lowerCase.includes('prescription')) {
// //   //     return { text: 'Prescription Required', color: 'bg-red-100 text-red-700 border-red-200' };
// //   //   }
// //   //   return { text: 'Over-the-Counter', color: 'bg-green-100 text-green-700 border-green-200' };
// //   // };

// //   // const prescriptionStatus = getPrescriptionStatus(suggestion.prescription ?? ''); 

// //   return (
// //     <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 space-y-3 shadow-md hover:shadow-lg transition-shadow">
// //       {/* Header */}
// //       <div className="flex justify-between items-start">
// //         <div>
// //           <h5 className="font-bold text-green-800 text-lg">{suggestion.medicineName}</h5>
// //           <p className="text-sm text-gray-600">{suggestion.commonUse}</p>
// //         </div>
// //         {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${prescriptionStatus.color}`}>
// //           {prescriptionStatus.text}
// //         </span> */}
// //       </div>

// //       {/* Medicine Details Grid */}
// //       <div className="grid md:grid-cols-2 gap-3 text-sm">
// //         <div className="flex items-center gap-2">
// //           <Clock className="h-4 w-4 text-blue-500" />
// //           <div>
// //             <strong>Dosage:</strong>
// //             <div className="text-gray-700">{suggestion.dosage}</div>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-2">
// //           <DollarSign className="h-4 w-4 text-green-500" />
// //           <div>
// //             <strong>Price:</strong>
// //             <div className="text-gray-700">{suggestion.price || "₹50-200"}</div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Detailed Information */}
// //       <div className="space-y-2 text-sm">
// //         <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
// //           <strong className="text-blue-700">Medicine Type:</strong>
// //           <div className="text-gray-700 capitalize">{suggestion.type || "Tablet"}</div>
// //         </div>

// //         {suggestion.precautions && (
// //           <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
// //             <strong className="text-yellow-700 flex items-center gap-1">
// //               <AlertTriangle className="h-4 w-4" />
// //               Precautions:
// //             </strong>
// //             <div className="text-gray-700 mt-1">{suggestion.precautions}</div>
// //           </div>
// //         )}

// //         {suggestion.sideEffects && (
// //           <div className="p-3 bg-red-50 rounded-lg border border-red-100">
// //             <strong className="text-red-700">Side Effects:</strong>
// //             <div className="text-gray-700 mt-1">{suggestion.sideEffects}</div>
// //           </div>
// //         )}

// //         {suggestion.availability && (
// //           <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
// //             <strong className="text-gray-700">Availability:</strong>
// //             <div className="text-gray-600 mt-1">{suggestion.availability}</div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Action Button */}
// //       <Button 
// //         onClick={() => onCheckNearbyStores(suggestion.medicineName)}
// //         className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
// //       >
// //         <MapPin className="h-4 w-4 mr-2" />
// //         Find Nearby Pharmacy
// //       </Button>
// //     </div>
// //   );
// // }











"use client";

import React, { useState, useRef } from "react";
import type { MedicineSuggestion, Pharmacy } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPinIcon,
  Volume2Icon,
  PillIcon,
  InfoIcon,
  CalendarDaysIcon,
  Loader2,
  Search,
  Filter,
  DollarSign,
  AlertTriangle,
  ShieldAlert,
  PackageIcon,
  X,
  Hospital,
  ScanSearch
} from "lucide-react";
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
  // New prop to hide the chat input
  onHideChatInput: () => void;
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

export function MedicineCard({ suggestion, onHideChatInput }: MedicineCardProps) {
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
    setIsPopoverOpen(false);
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
    <Card className="w-full bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 shadow-lg rounded-xl overflow-hidden border border-blue-100/50 hover:shadow-xl transition-all duration-300">
      {/* Header with Medicine Name */}
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-5 border-b border-blue-100/50">
        <div className="flex justify-between items-start mb-3">
          <CardTitle className="flex items-center text-gray-800 text-xl font-bold">
            <PillIcon className="w-6 h-6 mr-3 text-blue-600" />
            {suggestion.medicineName}
            <button
              type="button"
              className="ml-3 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
              onClick={() => speakText(suggestion.medicineName)}
            >
              <Volume2Icon className="w-5 h-5 text-blue-600 hover:text-blue-700" />
            </button>
          </CardTitle>

          {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${prescriptionStatus.color} shadow-sm`}>
            {prescriptionStatus.text}
          </span> */}
        </div>

        {/* <p className="text-sm text-gray-600 leading-relaxed">{suggestion.commonUse}</p> */}
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Key Information Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">Dosage</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">{suggestion.dosage}</p>
          </div>

          <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <DollarSign className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-xs font-semibold text-green-700">Price Range</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">{suggestion.price || "₹50-200"}</p>
          </div>
        </div>

        {/* Medicine Type */}
        {suggestion.type && (
          <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <PackageIcon className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-xs font-semibold text-purple-700">Medicine Type</span>
            </div>
            <p className="text-sm text-gray-700 font-medium capitalize">{suggestion.type}</p>
          </div>
        )}

        {suggestion.commonUse && (
          <div className="bg-green-50/50 p-3 rounded-lg border border-green-200">
            <div className="flex items-start mb-2">
              <InfoIcon className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-green-700">Common Use</span>
            </div>
            <p className="text-sm text-foreground">{suggestion.commonUse}</p>
          </div>
        )}

        {/* Precautions */}
        {suggestion.precautions && (
          <div className="bg-yellow-50/50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-start mb-2">
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-yellow-700">Precautions</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{suggestion.precautions}</p>
          </div>
        )}

        {/* Side Effects */}
        {suggestion.sideEffects && (
          <div className="bg-red-50/50 p-3 rounded-lg border border-red-200">
            <div className="flex items-start mb-2">
              <ShieldAlert className="w-4 h-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-red-700">Side Effects</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{suggestion.sideEffects}</p>
          </div>
        )}

        {/* Availability */}
        {suggestion.availability && (
          <div className="bg-gray-50/50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center mb-2">
              <InfoIcon className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700">Availability</span>
            </div>
            <p className="text-sm text-gray-700">{suggestion.availability}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <MorphingPopover
          open={isPopoverOpen}
          onOpenChange={(open) => {
            setIsPopoverOpen(open);
            // Hide the chat input when the popover opens
            if (open) {
              onHideChatInput();
            }
          }}
          variants={popoverVariants}
        >
          <MorphingPopoverTrigger asChild>
            <Button className="flex items-center gap-2 rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition">
              <ScanSearch className="w-4 h-4" />
              <span>Find Nearby Pharmacy</span>
            </Button>
          </MorphingPopoverTrigger>

          <AnimatePresence>
            {isPopoverOpen && (
              <MorphingPopoverContent
                className="w-full h-screen p-4 fixed left-0 top-0 z-50 backdrop-blur-sm bg-black/10 rounded-md"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={popoverVariants}
              >
                <div
                  ref={popoverRef}
                  className="w-[90%] md:w-[32%] max-w-lg p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl border border-gray-200"
                >
                  <motion.div layout>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <Hospital className="w-5 h-5 mr-2 text-blue-600" />
                        Find Nearby Stores
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPopoverOpen(false)}
                        className="rounded-full p-2 hover:bg-gray-100"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Location Input */}
                    <div className="relative mb-4">
                      <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="pl-10 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        disabled={loading}
                      />
                    </div>

                    {/* Radius Filter */}
                    <div className="mb-4 flex items-center space-x-3">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        disabled={loading}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-blue-500"
                      >
                        {[1, 2, 5, 10, 15, 25].map((r) => (
                          <option key={r} value={r}>
                            Within {r} km
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-4">
                      <Button
                        variant="default"
                        className="flex-grow text-white bg-blue-600 hover:bg-blue-700"
                        onClick={handleSearch}
                        disabled={loading || !location.trim()}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {loading ? "Searching..." : "Search Stores"}
                      </Button>
                      <Button
                        variant="outline"
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
                        className="px-4 bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                      >
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        My Location
                      </Button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Search Info */}
                    {searchInfo.location && !loading && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Found <span className="font-semibold">{searchInfo.total || pharmacies.length}</span> stores within{" "}
                          <span className="font-semibold">{searchInfo.radius} km</span> of{" "}
                          <span className="font-semibold">{searchInfo.location}</span>
                        </p>
                      </div>
                    )}

                    {/* Results */}
                    <div className="max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                      {loading && (
                        <div className="flex justify-center py-8">
                          <Loader2 className="animate-spin text-blue-600" size={32} />
                        </div>
                      )}

                      {!loading && pharmacies.length === 0 && searchInfo.location && !error && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No stores found near {searchInfo.location}</p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {pharmacies.map((pharmacy) => (
                          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} userLocation={location} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </MorphingPopoverContent>
            )}
          </AnimatePresence>
        </MorphingPopover>
      </CardFooter>
    </Card>
  );
}
