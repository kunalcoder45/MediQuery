// 'use server';

// import { ai } from '@/ai/genkit';
// import { z } from 'genkit';

// const SymptomAnalysisInputSchema = z.object({
//   symptoms: z.string().describe("User symptom description with additional details."),
// });
// export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

// const SymptomAnalysisOutputSchema = z.object({
//   medicineSuggestions: z.array(
//     z.object({
//       medicineName: z.string().describe('The name of the suggested medicine available in Indian market.'),
//       dosage: z.string().describe('The recommended dosage for Indian adults.'),
//       commonUse: z.string().describe('The common uses and symptoms this medicine treats.'),
//       precautions: z.string().describe('Important precautions and warnings.'),
//       sideEffects: z.string().describe('Common side effects to watch for.'),
//       price: z.string().describe('Approximate price range in Indian Rupees.'),
//       availability: z.string().describe('Availability information - prescription required or OTC.'),
//       type: z.string().describe('Type of medicine - tablet, syrup, capsule, cream, etc.'),
//       prescription: z.string().describe('Whether prescription is required or over-the-counter (OTC).')
//     })
//   ).describe('A list of medicine suggestions with complete details for Indian market.'),
//   generalAdvice: z.string().describe('General health advice and home remedies.'),
//   redFlags: z.string().describe('Warning signs when to see doctor immediately.'),
//   disclaimer: z.string().describe('Medical disclaimer about consulting healthcare professionals.')
// });
// export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

// export async function analyzeSymptomsAndSuggestMedicines(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
//   return symptomAnalysisFlow(input);
// }

// const prompt = ai.definePrompt({
//   name: 'symptomAnalysisPrompt',
//   input: { schema: SymptomAnalysisInputSchema },
//   output: { schema: SymptomAnalysisOutputSchema },
//   prompt: `You are an experienced Indian medical AI assistant with deep knowledge of medicines available in the Indian pharmaceutical market. 

// IMPORTANT INSTRUCTIONS:
// - You are NOT a replacement for a doctor - always emphasize consulting healthcare professionals
// - Recommend only medicines commonly available in Indian pharmacies  
// - Include both branded and generic Indian medicines
// - Consider Indian climate, lifestyle, and common health conditions
// - Provide proper dosages for Indian adults
// - Include price ranges in Indian Rupees (₹)
// - Specify if prescription is required or available over-the-counter
// - Focus on affordable, accessible treatments

// ANALYZE THESE SYMPTOMS, INCLUDING ADDITIONAL DETAILS: {{symptoms}}

// Provide comprehensive medicine recommendations considering:
// 1. Common Indian brands (like Cipla, Sun Pharma, Dr. Reddy's products)
// 2. Ayurvedic and allopathic options where appropriate  
// 3. Seasonal factors (monsoon diseases, summer heat-related issues, winter cold/flu)
// 4. Indian dietary habits and lifestyle factors
// 5. Cost-effective solutions for middle-class families

// For each medicine suggestion, provide:
// - Medicine name (with popular Indian brand names)
// - Exact dosage for adults
// - Common uses and symptoms it treats
// - Important precautions specific to Indian context
// - Side effects to watch for
// - Approximate price in ₹ (Indian Rupees)
// - Availability (prescription required or OTC)
// - Medicine type (tablet/syrup/capsule/gel etc.)

// Also include:
// - General advice with home remedies popular in India
// - Red flag symptoms requiring immediate medical attention
// - Professional medical disclaimer

// Format your response as valid JSON with all the specified fields. Focus on practical, affordable solutions available across India.`
// });

// const symptomAnalysisFlow = ai.defineFlow(
//   {
//     name: 'symptomAnalysisFlow',
//     inputSchema: SymptomAnalysisInputSchema,
//     outputSchema: SymptomAnalysisOutputSchema,
//   },
//   async (input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> => {
//     const { output } = await prompt(input);
//     return output!;
//   }
// );


'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z.string().describe("User symptom description with additional details including treatment preference."),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  medicineSuggestions: z.array(
    z.object({
      medicineName: z.string().describe('The name of the suggested medicine available in Indian market.'),
      dosage: z.string().describe('The recommended dosage for Indian adults.'),
      commonUse: z.string().describe('The common uses and symptoms this medicine treats.'),
      precautions: z.string().describe('Important precautions and warnings.'),
      sideEffects: z.string().describe('Common side effects to watch for.'),
      price: z.string().describe('Approximate price range in Indian Rupees.'),
      availability: z.string().describe('Availability information - prescription required or OTC.'),
      type: z.string().describe('Type of medicine - tablet, syrup, capsule, cream, etc.'),
      prescription: z.string().describe('Whether prescription is required or over-the-counter (OTC).')
    })
  ).describe('A list of medicine suggestions with complete details for Indian market.').optional(),
  homeRemedies: z.array(
    z.object({
      remedyName: z.string().describe('Name of the home remedy or natural treatment.'),
      ingredients: z.string().describe('Natural ingredients needed, easily available in Indian households.'),
      preparation: z.string().describe('Step-by-step preparation method.'),
      usage: z.string().describe('How to use this remedy and frequency.'),
      benefits: z.string().describe('How this remedy helps with the symptoms.'),
      precautions: z.string().describe('Any precautions or contraindications.'),
      duration: z.string().describe('How long to continue this remedy.'),
      effectiveness: z.string().describe('Expected time to see improvement.')
    })
  ).describe('A list of natural home remedies popular in Indian culture.').optional(),
  generalAdvice: z.string().describe('General health advice and lifestyle recommendations.'),
  redFlags: z.string().describe('Warning signs when to see doctor immediately.'),
  disclaimer: z.string().describe('Medical disclaimer about consulting healthcare professionals.')
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptomsAndSuggestMedicines(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: { schema: SymptomAnalysisInputSchema },
  output: { schema: SymptomAnalysisOutputSchema },
  prompt: `You are an experienced Indian medical AI assistant with deep knowledge of both modern medicines and traditional home remedies available in India.

IMPORTANT INSTRUCTIONS:
- You are NOT a replacement for a doctor - always emphasize consulting healthcare professionals
- Analyze the user's treatment preference (medicine recommendations, home remedies, or both)
- For medicines: Recommend only medicines commonly available in Indian pharmacies
- For home remedies: Focus on traditional Indian/Ayurvedic treatments using household ingredients
- Consider Indian climate, lifestyle, and cultural preferences
- Provide practical, affordable, and accessible solutions

ANALYZE THESE SYMPTOMS AND TREATMENT PREFERENCES: {{symptoms}}

Based on the user's treatment preference, provide appropriate recommendations:

FOR MEDICINE RECOMMENDATIONS:
- Common Indian brands (Cipla, Sun Pharma, Dr. Reddy's products)
- Both allopathic and Ayurvedic medicines where appropriate
- Seasonal factors and Indian dietary habits
- Cost-effective solutions with Indian Rupee pricing
- Prescription requirements and OTC availability

FOR HOME REMEDIES:
- Traditional Indian home treatments (turmeric, ginger, honey, tulsi, etc.)
- Ayurvedic principles and natural ingredients
- Kitchen ingredients easily found in Indian homes
- Traditional preparation methods passed down generations
- Seasonal remedies (summer cooling drinks, winter warming treatments)
- Regional variations popular across India

PROVIDE COMPREHENSIVE DETAILS:
For Medicines: Name, dosage, uses, precautions, side effects, price (₹), availability, type
For Home Remedies: Name, ingredients, preparation, usage, benefits, precautions, duration, effectiveness

Also include:
- General lifestyle and dietary advice
- Red flag symptoms requiring immediate medical attention
- Professional medical disclaimer

Focus on practical, culturally appropriate solutions that respect Indian traditions while maintaining scientific accuracy. Format as valid JSON with all specified fields.`
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async (input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> => {
    const { output } = await prompt(input);
    return output!;
  }
);
