// import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai';

// export const ai = genkit({
//   plugins: [googleAI()],
//   model: 'googleai/gemini-2.0-flash',
// });



// // File: src/ai/genkit.ts

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// CORRECT CODE: This is all you need to use the Gemini API with Genkit.
// Genkit will automatically read your API key from the environment variable.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});


// ///
// // genkit.ts - Library file (no "use server")
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini AI
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBB4nD1_FayJnu6SJ6MKXsWuGuKBb5dkJ4");

// // ----------- TYPES -------------
// export interface PromptDefinition<I = any, O = any> {
//   name: string;
//   input: { schema: ZodSchema<I> };
//   output: { schema: ZodSchema<O> };
//   prompt: string;
// }

// export interface FlowDefinition<I = any, O = any> {
//   name: string;
//   inputSchema: ZodSchema<I>;
//   outputSchema: ZodSchema<O>;
// }

// // Zod-like schema types
// export interface ZodSchema<T = any> {
//   _type?: T;
//   parse: (data: any) => T;
//   describe?: (desc: string) => ZodSchema<T>;
// }

// interface ZodStringSchema extends ZodSchema<string> {
//   type: "string";
//   description?: string;
// }

// interface ZodObjectSchema<T = any> extends ZodSchema<T> {
//   type: "object";
//   shape: Record<string, ZodSchema>;
//   description?: string;
// }

// interface ZodArraySchema<T = any> extends ZodSchema<T[]> {
//   type: "array";
//   items: ZodSchema<T>;
//   description?: string;
// }

// // ----------- AI HELPERS -------------
// export const ai = {
//   definePrompt: <I = any, O = any>({ name, input, output, prompt }: PromptDefinition<I, O>) => {
//     return async (inputData: I): Promise<{ output: O }> => {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//       // Replace template variables in prompt
//       let processedPrompt = prompt;
//       Object.keys(inputData as any).forEach(key => {
//         processedPrompt = processedPrompt.replace(
//           new RegExp(`{{${key}}}`, "g"),
//           (inputData as any)[key]
//         );
//       });

//       try {
//         const result = await model.generateContent(processedPrompt);
//         const response = await result.response;
//         const text = response.text();

//         // Parse JSON response
//         const cleanedText = text
//           .replace(/```json\n?/g, "")
//           .replace(/```\n?/g, "")
//           .trim();
//         const parsed: O = JSON.parse(cleanedText);

//         return { output: parsed };
//       } catch (error) {
//         console.error(`Error in ${name}:`, error);
//         throw error;
//       }
//     };
//   },

//   defineFlow: <I = any, O = any>(
//     { name, inputSchema, outputSchema }: FlowDefinition<I, O>,
//     flowFunction: (input: I) => Promise<O>
//   ) => {
//     return flowFunction;
//   }
// };

// // ----------- Zod-like MOCK -------------
// export const z = {
//   object: <T extends Record<string, ZodSchema>>(shape: T): ZodObjectSchema<{
//     [K in keyof T]: T[K] extends ZodSchema<infer U> ? U : never;
//   }> => {
//     const schema: ZodObjectSchema = {
//       type: "object",
//       shape,
//       parse: (data: any) => {
//         const result: any = {};
//         for (const [key, fieldSchema] of Object.entries(shape)) {
//           if (data[key] !== undefined) {
//             result[key] = fieldSchema.parse ? fieldSchema.parse(data[key]) : data[key];
//           }
//         }
//         return result;
//       },
//       describe: function(desc: string) {
//         this.description = desc;
//         return this;
//       }
//     };
//     return schema;
//   },

//   string: (): ZodStringSchema => ({
//     type: "string",
//     parse: (data: any) => String(data),
//     describe: function(desc: string) {
//       this.description = desc;
//       return this;
//     }
//   }),

//   array: <T>(itemSchema: ZodSchema<T>): ZodArraySchema<T> => ({
//     type: "array",
//     items: itemSchema,
//     parse: (data: any) => {
//       if (!Array.isArray(data)) return [];
//       return data.map(item => itemSchema.parse ? itemSchema.parse(item) : item);
//     },
//     describe: function(desc: string) {
//       this.description = desc;
//       return this;
//     }
//   }),

//   infer: <T>(schema: ZodSchema<T>): T => {
//     return {} as T;
//   }
// };

// // Type inference helper
// export type ZodInfer<T extends ZodSchema> = T extends ZodSchema<infer U> ? U : never;