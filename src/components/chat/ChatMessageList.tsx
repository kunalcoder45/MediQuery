"use client";

import type { Message } from "@/lib/types";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

interface ChatMessageListProps {
  messages: Message[];
  onCheckNearbyStores: (medicineName: string) => void;
}

export function ChatMessageList({ messages, onCheckNearbyStores }: ChatMessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-grow overflow-y-auto" ref={scrollAreaRef}> {/* Adjust height as needed */}
      <div ref={viewportRef} className="p-2 md:p-2 space-y-4 container mx-auto max-w-8xl">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onCheckNearbyStores={onCheckNearbyStores} />
        ))}
      </div>
    </ScrollArea>
  );
}
