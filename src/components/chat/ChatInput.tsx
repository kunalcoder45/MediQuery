"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonalIcon, MicIcon, MicOffIcon, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize SpeechRecognition
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => prev + (prev ? " " : "") + transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current || isLoading) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition start error:", err);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 left-0 right-0 p-4 border-t"
    >
      <div className="container mx-auto max-w-3xl flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`text-primary hover:text-black rounded-full p-2 ${isListening ? "bg-muted" : ""}`}
          onClick={handleMicClick}
          disabled={isLoading}
        >
          {isListening ? <MicOffIcon className="h-5 w-5" /> : <MicIcon className="h-5 w-5" />}
          <span className="sr-only">Use Microphone</span>
        </Button>

        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe your symptoms... (e.g., I have a headache and a sore throat)"
          className="flex-grow resize-none rounded-full py-3 px-4 border-2 border-primary/50 focus:border-primary transition-colors duration-300"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="default"
          size="icon"
          className="rounded-full bg-primary hover:text-black"
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizonalIcon className="h-5 w-5" />
          )}
          <span className="sr-only">Send Message</span>
        </Button>
      </div>
    </form>
  );
}
