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
    <ScrollArea className="flex-grow overflow-y-auto h-full pb-6" ref={scrollAreaRef}>
      <div ref={viewportRef} className="p-2 space-y-2 container">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {/* Chat Message */}
            <ChatMessage message={msg} onCheckNearbyStores={onCheckNearbyStores} />
          </div>
        ))}
                
        {/* Bottom spacing for input area */}
        <div className="h-32"></div>
      </div>
    </ScrollArea>
  );
}