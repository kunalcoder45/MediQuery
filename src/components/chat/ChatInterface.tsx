"use client";

import { useState, useRef, useEffect } from "react";
import type { Message } from "@/lib/types";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { handleSymptomAnalysis } from "@/actions/chatActions";
import { useToast } from "@/hooks/use-toast";
import { PharmacySection } from "./PharmacySection";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const initialBotMessage: Message = {
  id: "initial-bot",
  sender: "bot",
  text: "Hello! I'm MediQuery. How are you feeling today? Please describe your symptoms.",
  timestamp: new Date(),
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPharmacySection, setShowPharmacySection] = useState(false);
  const [selectedMedicineForPharmacy, setSelectedMedicineForPharmacy] = useState<string | null>(null);
  const { toast } = useToast();
  const messageIdCounterRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pharmacySectionRef = useRef<HTMLDivElement | null>(null);

  const generateUniqueId = () => {
    messageIdCounterRef.current += 1;
    return `msg-${messageIdCounterRef.current}`;
  };

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    setMessages((prev) => [
      ...prev,
      { ...message, id: generateUniqueId(), timestamp: new Date() },
    ]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    addMessage({ sender: "user", text });
    setIsLoading(true);
    setShowPharmacySection(false);
    setSelectedMedicineForPharmacy(null);

    const thinkingMessageId = generateUniqueId();
    setMessages((prev) => [
      ...prev,
      { id: thinkingMessageId, sender: "bot", isLoading: true, timestamp: new Date() },
    ]);

    try {
      const result = await handleSymptomAnalysis(text);
      setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
      setIsLoading(false);

      if ("error" in result) {
        addMessage({ sender: "system", text: `Error: ${result.error}` });
        toast({
          title: "Analysis Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.medicineSuggestions?.length) {
        addMessage({ sender: "bot", suggestions: result.medicineSuggestions });
      } else {
        addMessage({
          sender: "bot",
          text: "I couldn't find specific medicine suggestions for your symptoms. Try rephrasing or being more specific. Remember, I am not a doctor.",
        });
      }
    } catch {
      setIsLoading(false);
      addMessage({
        sender: "system",
        text: "Something went wrong while processing your request. Please try again.",
      });
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleCheckNearbyStores = (medicineName: string) => {
    setSelectedMedicineForPharmacy(medicineName);
    setShowPharmacySection(true);

    // Scroll to pharmacy section
    setTimeout(() => {
      if (pharmacySectionRef.current && containerRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const sectionTop = pharmacySectionRef.current.getBoundingClientRect().top;
        const scrollOffset = sectionTop - containerTop + containerRef.current.scrollTop;

        containerRef.current.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-screen bg-background rounded-lg shadow-xl"
    >
      {/* Message Area Scrollable */}
      <div className="flex-grow overflow-y-auto">
        <ChatMessageList
          messages={messages}
          onCheckNearbyStores={handleCheckNearbyStores}
        />
      </div>

      {/* Optional Pharmacy Section */}
      {showPharmacySection && (
        <div
          id="pharmacy-section"
          ref={pharmacySectionRef}
          className="p-2 border-t bg-background min-h-[40vh] overflow-y-auto"
          aria-live="polite"
        >
          <div className="flex justify-end mb-2">
            <Button
              variant="outline"
              onClick={() => setShowPharmacySection(false)}
              aria-label="Back to chat"
            >
              <X className="h-4 w-4 rotate-180" />
            </Button>
          </div>

          <PharmacySection />
        </div>
      )}

      {/* Input Box at Bottom */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
