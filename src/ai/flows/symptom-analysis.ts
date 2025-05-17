'use server';

/**
 * @fileOverview Analyzes user-described symptoms and suggests appropriate over-the-counter medicines and dosages.
 *
 * - analyzeSymptomsAndSuggestMedicines - A function that handles the symptom analysis and medicine suggestion process.
 * - SymptomAnalysisInput - The input type for the analyzeSymptomsAndSuggestMedicines function.
 * - SymptomAnalysisOutput - The return type for the analyzeSymptomsAndSuggestMedicines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z.string().describe('A description of the symptoms the user is experiencing.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  medicineSuggestions: z.array(
    z.object({
      medicineName: z.string().describe('The name of the suggested medicine.'),
      dosage: z.string().describe('The recommended dosage for the medicine.'),
      commonUse: z.string().describe('The common uses for the medicine.'),
    })
  ).describe('A list of over-the-counter medicine suggestions with dosages and common uses.'),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptomsAndSuggestMedicines(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are a helpful AI assistant that analyzes a user's described symptoms and suggests appropriate over-the-counter medicines with dosages and common uses.

  Analyze the following symptoms:
  {{symptoms}}

  Provide a list of medicine suggestions. For each medicine, include the medicine name, dosage, and common use.  Format your output as a JSON array of medicine suggestions.  Each suggestion should have the keys 'medicineName', 'dosage', and 'commonUse'.`,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
