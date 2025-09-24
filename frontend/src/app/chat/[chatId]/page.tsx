// src/app/chat/[chatId]/page.tsx
import { Suspense } from 'react';
import { SharedChatPageWrapper } from '@/components/chat/SharedChatPageWrapper';
import { Loader2 } from 'lucide-react';

// Force dynamic rendering - important for params
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

interface PageProps {
  params: {
    chatId: string;
  };
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      <p className="mt-4 text-gray-600">Loading shared chat...</p>
    </div>
  );
}

// Main page component with proper params handling
export default function ChatPage({ params }: PageProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SharedChatPageWrapper chatId={params.chatId} />
    </Suspense>
  );
}