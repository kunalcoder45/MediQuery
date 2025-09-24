// "use server";

// import { analyzeSymptomsAndSuggestMedicines, type SymptomAnalysisInput, type SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

// export async function handleSymptomAnalysis(
//   symptoms: string
// ): Promise<SymptomAnalysisOutput | { error: string }> {
//   if (!symptoms || symptoms.trim().length === 0) {
//     return { error: "Symptoms cannot be empty." };
//   }

//   const input: SymptomAnalysisInput = { symptoms };

//   try {
//     const result = await analyzeSymptomsAndSuggestMedicines(input);
//     if (!result || !result.medicineSuggestions) {
//       return { error: "AI could not process the symptoms. Please try again or rephrase." };
//     }
//     return result;
//   } catch (e) {
//     console.error("Error in symptom analysis flow:", e);
//     return { error: "An unexpected error occurred while analyzing symptoms." };
//   }
// }




"use server";

import { analyzeSymptomsAndSuggestMedicines, type SymptomAnalysisInput, type SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

export async function handleSymptomAnalysis(
  symptoms: string
): Promise<SymptomAnalysisOutput | { error: string }> {
  if (!symptoms || symptoms.trim().length === 0) {
    return { error: "Symptoms cannot be empty." };
  }

  const input: SymptomAnalysisInput = { symptoms };

  try {
    const result = await analyzeSymptomsAndSuggestMedicines(input);
    if (!result || !result.medicineSuggestions) {
      return { error: "AI could not process the symptoms. Please try again or rephrase." };
    }
    return result;
  } catch (e) {
    console.error("Error in symptom analysis flow:", e);
    return { error: "An unexpected error occurred while analyzing symptoms. Please try again." };
  }
}
