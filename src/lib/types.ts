import type { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

export interface Message {
  id: string;
  sender: "user" | "bot" | "system";
  text?: string;
  suggestions?: SymptomAnalysisOutput['medicineSuggestions'];
  pharmacies?: Pharmacy[];
  isLoading?: boolean;
  timestamp: Date;
}

export type MedicineSuggestion = NonNullable<SymptomAnalysisOutput['medicineSuggestions']>[0];

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  hours?: string; // e.g., "9:00 AM - 7:00 PM"
  phone?: string;
  lat?: number;
  lng?: number;
}
