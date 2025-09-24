// types.ts - Fixed type definitions
import type { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

// Pharmacy interface
export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  hours?: string; // e.g., "9:00 AM - 7:00 PM"
  phone?: string;
  lat?: number;
  lng?: number;
}
// File: src/lib/types.ts

export interface MedicineSuggestion {
  medicineName: string;
  dosage: string;
  commonUse: string;
  precautions?: string;
  sideEffects?: string;
  price?: string;
  availability?: string;
  type?: string;
  prescription?: string;
}

export interface HomeRemedy {
  remedyName: string;
  ingredients: string;
  preparation: string;
  usage: string;
  benefits: string;
  precautions: string;
  duration: string;
  effectiveness: string;
}

// Message interface
export interface Message {
  id: string;
  sender: "user" | "bot" | "system";
  text?: string;
  timestamp: Date;
  isLoading?: boolean;
  suggestions?: MedicineSuggestion[];
  homeRemedies?: HomeRemedy[];
  pharmacies?: Pharmacy[];
}


// in types.ts
export interface PartialMedicineSuggestion {
  medicineName: string;
  dosage: string;
  commonUse: string;
}