"use client";

import type { Message } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, AlertTriangle, Loader2, Leaf } from "lucide-react";
import { MedicineCard } from "./MedicineCard";
import { HomeRemedyCard } from "./HomeRemedyCard";
import { marked } from "marked";

interface ChatMessageProps {
  message: Message;
  onCheckNearbyStores: (medicineName: string) => void;
}

export function ChatMessage({ message, onCheckNearbyStores }: ChatMessageProps) {
  const isUser = message.sender === "user";
  const isBot = message.sender === "bot";
  const isSystem = message.sender === "system";
  const hasGeminiSuggestions = message.suggestions && message.suggestions.length > 0;
  const hasHomeRemedies = message.homeRemedies && message.homeRemedies.length > 0;

  if (isSystem) {
    return (
      <div className="flex justify-center my-4 px-4">
        <div className="px-6 py-3 rounded-xl text-sm max-w-full sm:max-w-[85%] bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-300 flex items-center gap-2 shadow-md">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: marked.parse(message.text || '') }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`my-6 px-4 ${isUser ? "flex justify-end" : "flex justify-start"}`}>
      <div className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"} sm:flex-row sm:items-start sm:gap-4 ${isUser ? "sm:flex-row-reverse" : ""}`}>
        <div className="flex items-center justify-center">
          {isUser ? (
            <Avatar className="mt-1 ring-2 ring-green-100">
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="mt-1 ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className={`rounded-2xl shadow-lg ${isUser
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm max-w-[100%]"
          : `bg-white text-gray-800 rounded-bl-sm border border-gray-200 ${
            hasGeminiSuggestions ? "md:max-w-[45%] max-w-[100%]" : "max-w-[100%]"
          } ${
            hasHomeRemedies ? "md:max-w-[53%] max-w-[100%]" : "max-w-[100%]"
          }`
          }`}>
          <div className="px-5 py-4">
            {message.isLoading && isBot ? (
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <span className="text-gray-600">Gemini AI analyzing symptoms...</span>
              </div>
            ) : (
              <>
                {message.text && (
                  <div
                    className="prose prose-sm sm:prose-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: marked.parse(message.text) }}
                  />
                )}
              </>
            )}
          </div>

          {/* Medicine Suggestions */}
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="px-5 pb-5 space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold text-green-700 text-lg mb-4 flex items-center gap-2">
                  Gemini AI Recommended Medicines:
                </h4>
                <div className="space-y-4">
                  {message.suggestions.map((suggestion, index) => (
                    <MedicineCard
                      key={index}
                      suggestion={suggestion}
                      onCheckNearbyStores={onCheckNearbyStores}
                    />
                  ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>
                      <strong>AI Disclaimer:</strong> These are Gemini AI generated recommendations.
                      For real medical advice, please consult with a qualified doctor.
                      This cannot replace professional medical advice in any way.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Home Remedies */}
          {message.homeRemedies && message.homeRemedies.length > 0 && (
            <div className="px-5 pb-5 space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold text-green-700 text-lg mb-4 flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Natural Home Remedies:
                </h4>
                <div className="space-y-4">
                  {message.homeRemedies.map((remedy, index) => (
                    <HomeRemedyCard
                      key={index}
                      remedy={remedy}
                    />
                  ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-800 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>
                      <strong>Natural Remedies Disclaimer:</strong> These are traditional home remedies suggested by AI.
                      Results may vary. If symptoms persist or worsen, please consult a healthcare professional.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}