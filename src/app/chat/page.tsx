// import { ChatInterface } from "@/components/chat/ChatInterface";

// export default function ChatPage() {
//   return (
//     <div className="flex flex-col h-[calc(100vh-var(--header-height,10rem)-var(--footer-height,10rem))] max-h-[80vh] md:max-h-[calc(100vh-12rem)]">
//        {/* The above height calculation is a bit of a guess to prevent overflow with sticky header/footer */}
//       <ChatInterface />
//     </div>
//   );
// }
import { ChatInterface } from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-auto max-h-[610px]">
      <ChatInterface />
    </div>
  );
}
