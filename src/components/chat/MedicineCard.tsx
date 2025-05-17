import type { MedicineSuggestion } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PillIcon, InfoIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";

interface MedicineCardProps {
  suggestion: MedicineSuggestion;
  onCheckNearbyStores: (medicineName: string) => void;
}

export function MedicineCard({ suggestion, onCheckNearbyStores }: MedicineCardProps) {
  return (
    <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-primary/10 p-4">
        <CardTitle className="flex items-center text-primary">
          <PillIcon className="h-6 w-6 mr-2" />
          {suggestion.medicineName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground flex items-center">
            <InfoIcon className="h-4 w-4 mr-1 text-accent" />
            Common Use
          </h4>
          <p className="text-sm text-foreground">{suggestion.commonUse}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground flex items-center">
            <CalendarDaysIcon className="h-4 w-4 mr-1 text-accent" />
            Recommended Dosage
          </h4>
          <p className="text-sm text-foreground">{suggestion.dosage}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full"
          onClick={() => onCheckNearbyStores(suggestion.medicineName)}
        >
          <MapPinIcon className="h-4 w-4 mr-2" />
          Check Nearby Stores
        </Button>
      </CardFooter>
    </Card>
  );
}
