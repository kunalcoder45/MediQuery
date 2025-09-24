// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   MapPinIcon,
//   ClockIcon,
//   PhoneIcon,
//   NavigationIcon,
// } from "lucide-react";
// import type { Pharmacy } from "@/lib/types";

// interface PharmacyCardProps {
//   pharmacy: Pharmacy;
//   userLocation: string;
// }

// export function PharmacyCard({ pharmacy, userLocation }: PharmacyCardProps) {
//   return (
//     <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//       <CardHeader className="pt-2 px-3 pb-0">
//         <CardTitle className="flex items-center text-lg text-primary">
//           <MapPinIcon className="h-5 w-5 mr-2" />
//           {pharmacy.name}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-4 space-y-2 text-sm">
//         <p className="text-foreground">{pharmacy.address}</p>
//         {pharmacy.hours && (
//           <p className="text-muted-foreground flex items-center">
//             <ClockIcon className="h-4 w-4 mr-2 text-accent" /> {pharmacy.hours}
//           </p>
//         )}
//         {pharmacy.phone && (
//           <p className="text-muted-foreground flex items-center">
//             <PhoneIcon className="h-4 w-4 mr-2 text-accent" /> {pharmacy.phone}
//           </p>
//         )}
//       </CardContent>
//       <CardFooter className="bg-muted/50 p-4">
//         <Button
//           variant="outline"
//           size="sm"
//           className="w-full px-4 py-2 bg-primary text-white rounded-md"
//           onClick={() => {
//             const query = pharmacy.name
//               ? `${pharmacy.name} near ${userLocation}`
//               : userLocation;

//             window.open(
//               `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
//               "_blank"
//             );
//           }}
//         >
//           <NavigationIcon className="h-4 w-4 mr-2" />
//           Get Directions
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  NavigationIcon,
  CarIcon,
  MapPinHouse
} from "lucide-react";
import { motion } from "framer-motion";

// Assuming a basic type for Pharmacy, similar to the original context
interface Pharmacy {
  id: string;
  name: string;
  address: string;
  hours?: string;
  phone?: string;
  distance?: number; // Added distance property
}

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  userLocation: string;
}

export function PharmacyCard({ pharmacy, userLocation }: PharmacyCardProps) {
  const formattedDistance = pharmacy.distance
    ? pharmacy.distance < 1
      ? `${Math.round(pharmacy.distance * 1000)} m`
      : `${pharmacy.distance.toFixed(1)} km`
    : "N/A";

  return (
    <Card className="w-full bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform">
      {/* Card Header with Name, Icon, and Distance */}
      <CardHeader className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-t-xl">
        <CardTitle className="flex items-center text-xl text-blue-700 font-bold justify-between">
          <div className="flex items-center">
            {/* <MapPinIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-blue-500" /> */}
            <span className="break-words leading-tight">{pharmacy.name}</span>
          </div>
        </CardTitle>
      </CardHeader>

      {/* Card Content with Details and Icons */}
      <CardContent className="p-4 space-y-3 text-sm text-gray-700">
        <p className="flex items-start text-base font-medium">
          <MapPinHouse className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
          <span>{formattedDistance}</span>
        </p>
        <p className="flex items-start text-base font-medium">
          <MapPinIcon className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
          {pharmacy.address}
        </p>
        {pharmacy.hours && (
          <p className="text-sm text-gray-600 flex items-center">
            <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-semibold">Hours:</span> {pharmacy.hours}
          </p>
        )}
        {pharmacy.phone && (
          <p className="text-sm text-gray-600 flex items-center">
            <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-semibold">Call:</span>{" "}
            <a
              href={`tel:${pharmacy.phone}`}
              className="text-blue-500 hover:underline ml-1"
            >
              {pharmacy.phone}
            </a>
          </p>
        )}
      </CardContent>

      {/* Card Footer with Action Button */}
      <CardFooter className="p-4 bg-gray-50/50 rounded-b-xl border-t border-gray-100">
        <Button
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          onClick={() => {
            const query = pharmacy.name
              ? `${pharmacy.name} near ${userLocation}`
              : userLocation;
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                query
              )}`,
              "_blank"
            );
          }}
        >
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <NavigationIcon className="h-4 w-4 mr-2" />
            Get Directions
          </motion.div>
        </Button>
      </CardFooter>
    </Card>
  );
}


// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   MapPinIcon,
//   ClockIcon,
//   PhoneIcon,
//   NavigationIcon,
// } from "lucide-react";
// import type { Pharmacy } from "@/lib/types";

// interface PharmacyCardProps {
//   pharmacy: Pharmacy;
//   userLocation: string;
// }

// export function PharmacyCard({ pharmacy, userLocation }: PharmacyCardProps) {
//   return (
//     <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
//       <CardHeader className="pt-2 px-3 pb-0">
//         <CardTitle className="flex items-start text-base sm:text-lg text-primary">
//           <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-1 flex-shrink-0" />
//           <span className="break-words">{pharmacy.name}</span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-3 sm:p-4 space-y-1 sm:space-y-2 text-sm">
//         <p className="text-foreground">{pharmacy.address}</p>
//         {pharmacy.hours && (
//           <p className="text-muted-foreground flex items-center">
//             <ClockIcon className="h-4 w-4 mr-2 text-accent" /> {pharmacy.hours}
//           </p>
//         )}
//         {pharmacy.phone && (
//           <p className="text-muted-foreground flex items-center">
//             <PhoneIcon className="h-4 w-4 mr-2 text-accent" /> {pharmacy.phone}
//           </p>
//         )}
//       </CardContent>
//       <CardFooter className="bg-muted/50 p-3 sm:p-4">
//         <Button
//           variant="outline"
//           size="sm"
//           className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
//           onClick={() => {
//             const query = pharmacy.name
//               ? `${pharmacy.name} near ${userLocation}`
//               : userLocation;
//             window.open(
//               `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
//               "_blank"
//             );
//           }}
//         >
//           <NavigationIcon className="h-4 w-4 mr-2" />
//           Get Directions
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }