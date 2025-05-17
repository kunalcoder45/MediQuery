// // src/components/PharmacyCard.tsx
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPinIcon, ClockIcon, PhoneIcon, NavigationIcon } from "lucide-react";
// import type { Pharmacy } from "@/lib/types";

// interface PharmacyCardProps {
//   pharmacy: Pharmacy;
//   userLocation: string;
// }


// export function PharmacyCard({ pharmacy, userLocation }: PharmacyCardProps) {
//   return (
//     <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//       <CardHeader className="p-4">
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
//           className="w-full"
//           onClick={() => {
//             const query = pharmacy.address
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
} from "lucide-react";
import type { Pharmacy } from "@/lib/types";

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  userLocation: string;
}

export function PharmacyCard({ pharmacy, userLocation }: PharmacyCardProps) {
  return (
    <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center text-lg text-primary">
          <MapPinIcon className="h-5 w-5 mr-2" />
          {pharmacy.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2 text-sm">
        <p className="text-foreground">{pharmacy.address}</p>
        {pharmacy.hours && (
          <p className="text-muted-foreground flex items-center">
            <ClockIcon className="h-4 w-4 mr-2 text-accent" /> {pharmacy.hours}
          </p>
        )}
        {pharmacy.phone && (
          <p className="text-muted-foreground flex items-center">
            <PhoneIcon className="h-4 w-4 mr-2 text-accent" /> {pharmacy.phone}
          </p>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => {
            const query = pharmacy.name
              ? `${pharmacy.name} near ${userLocation}`
              : userLocation;

            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
              "_blank"
            );
          }}
        >
          <NavigationIcon className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
      </CardFooter>
    </Card>
  );
}
