"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

interface ChatMessage {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  createdAt: string;
  metadata?: string;
}

interface SharedChatPageWrapperProps {
  chatId: string;
}

export function SharedChatPageWrapper({ chatId }: SharedChatPageWrapperProps) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [sharedMessages, setSharedMessages] = useState<ChatMessage[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chatTitle, setChatTitle] = useState<string>("");

  // Get API base URL with better fallback handling
  const getApiBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_CHAT_API_BASE_URL || 'https://your-backend-api.com';
    }
    return process.env.NEXT_PUBLIC_CHAT_API_BASE_URL || 'http://localhost:8000';
  };

  const CHAT_API_BASE_URL = getApiBaseUrl();

  useEffect(() => {
    const fetchSharedChat = async () => {
      if (!chatId) {
        setError("Invalid chat ID");
        setIsLoaded(true);
        return;
      }

      if (!CHAT_API_BASE_URL || CHAT_API_BASE_URL.includes('your-backend-api.com')) {
        setError("API configuration error. Please contact support.");
        setIsLoaded(true);
        return;
      }

      console.log("Fetching shared chat:", {
        chatId,
        apiUrl: CHAT_API_BASE_URL,
        fullUrl: `${CHAT_API_BASE_URL}/api/public/conversations/${chatId}`
      });

      try {
        const response = await fetch(
          `${CHAT_API_BASE_URL}/api/public/conversations/${chatId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            // Add cache busting for development
            cache: process.env.NODE_ENV === 'development' ? 'no-cache' : 'default'
          }
        );

        console.log("API Response:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          url: response.url
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Chat not found or no longer available");
          }
          if (response.status === 403) {
            throw new Error("Chat is private or access denied");
          }
          if (response.status >= 500) {
            throw new Error("Server error. Please try again later.");
          }
          throw new Error(`Failed to load chat (${response.status}: ${response.statusText})`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        
        if (!data.conversation) {
          throw new Error("Invalid chat data received");
        }
        
        setSharedMessages(data.conversation?.messages || []);
        setChatTitle(data.conversation?.title || "Untitled Chat");
      } catch (err) {
        console.error("Error fetching shared chat:", err);
        setError(err instanceof Error ? err.message : "Failed to load chat");
      } finally {
        setIsLoaded(true);
      }
    };

    // Add delay to ensure proper mounting
    const timer = setTimeout(() => {
      fetchSharedChat();
    }, 100);

    return () => clearTimeout(timer);
  }, [chatId, CHAT_API_BASE_URL]);

  // Show loading while auth is loading or data is loading
  if (loading || !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600">Loading shared chat...</p>
        {process.env.NODE_ENV === 'development' && (
          <p className="mt-2 text-xs text-gray-500">Chat ID: {chatId}</p>
        )}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 space-y-2 flex flex-col items-center">
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="default"
          >
            Go to Home
          </Button>
        </div>
        
        {/* Debug Info in Development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600 max-w-md">
            <p><strong>Debug Info:</strong></p>
            <p>Chat ID: {chatId}</p>
            <p>API URL: {CHAT_API_BASE_URL}</p>
            <p>Environment: {process.env.NODE_ENV}</p>
            <p>Auth Loading: {loading.toString()}</p>
            <p>User: {user ? 'Logged in' : 'Not logged in'}</p>
          </div>
        )}
      </div>
    );
  }

  // Success state
  return (
    <div className="flex flex-col min-h-screen">
      {chatTitle && (
        <div className="bg-blue-50 border-b border-b-blue-200 p-2 text-center md:p-4">
          <h1 className="text-base font-semibold text-blue-900 md:text-lg">
            Shared Chat: {chatTitle}
          </h1>
          <p className="text-xs text-blue-600 md:text-sm">
            This conversation has been shared with you
          </p>
        </div>
      )}
      <div className="flex-1 flex justify-center p-0 w-full">
        <ChatInterface sharedMessages={sharedMessages} />
      </div>
    </div>
  );
}