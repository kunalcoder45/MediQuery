// "use client";

// // TypeScript: Add missing types for SpeechRecognition API
// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
//   interface SpeechRecognition extends EventTarget {
//     lang: string;
//     interimResults: boolean;
//     continuous: boolean;
//     start(): void;
//     stop(): void;
//     onresult: ((event: any) => void) | null;
//     onend: (() => void) | null;
//     onerror: (() => void) | null;
//   }
//   interface SpeechRecognitionEvent extends Event {
//     results: ArrayLike<ArrayLike<{ transcript: string }>>;
//   }
// }

// import { useState, useRef, useEffect, type FormEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { SendHorizonalIcon, MicIcon, MicOffIcon, Loader2 } from "lucide-react";

// interface ChatInputProps {
//   onSendMessage: (message: string) => void;
//   isLoading: boolean;
// }

// export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
//   const [inputText, setInputText] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   const recognitionRef = useRef<SpeechRecognition | null>(null);

//   useEffect(() => {
//     // Initialize SpeechRecognition
//     const SpeechRecognition =
//       typeof window !== "undefined" &&
//       ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.lang = "en-US";
//       recognition.interimResults = false;
//       recognition.continuous = false;

//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         const transcript = event.results[0][0].transcript;
//         setInputText((prev) => prev + (prev ? " " : "") + transcript);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognition.onerror = () => {
//         setIsListening(false);
//       };

//       recognitionRef.current = recognition;
//     }
//   }, []);

//   const handleMicClick = () => {
//     if (!recognitionRef.current || isLoading) return;

//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//       } catch (err) {
//         console.error("Speech recognition start error:", err);
//       }
//     }
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (inputText.trim() && !isLoading) {
//       onSendMessage(inputText.trim());
//       setInputText("");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white "
//     >
//       <div className="container mx-auto max-w-3xl flex items-center gap-2">
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           className={`text-primary bg-green-200 text-gray-700 hover:text-black rounded-full p-2 ${isListening ? "bg-muted" : ""}`}
//           onClick={handleMicClick}
//           disabled={isLoading}
//         >
//           {isListening ? <MicOffIcon className="h-5 w-5" /> : <MicIcon className="h-5 w-5" />}
//           <span className="sr-only">Use Microphone</span>
//         </Button>

//         <Textarea
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Describe your symptoms..."
//           className="flex-grow resize-none rounded-full py-3 px-4 border-2 border-primary/50 focus:border-primary transition-colors duration-300"
//           rows={1}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && !e.shiftKey) {
//               e.preventDefault();
//               handleSubmit(e);
//             }
//           }}
//           disabled={isLoading}
//         />

//         <Button
//           type="submit"
//           variant="default"
//           size="icon"
//           className="rounded-full bg-primary hover:text-black"
//           disabled={isLoading || !inputText.trim()}
//         >
//           {isLoading ? (
//             <Loader2 className="h-5 w-5 animate-spin" />
//           ) : (
//             <SendHorizonalIcon className="h-5 w-5" />
//           )}
//           <span className="sr-only">Send Message</span>
//         </Button>
//       </div>
//     </form>
//   );
// }




// "use client";

// import { useState, useRef, useEffect, type FormEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Send, Mic, MicOff, Loader2 } from "lucide-react";

// // TypeScript declarations for Speech Recognition
// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
//   interface SpeechRecognition extends EventTarget {
//     lang: string;
//     interimResults: boolean;
//     continuous: boolean;
//     start(): void;
//     stop(): void;
//     onresult: ((event: any) => void) | null;
//     onend: (() => void) | null;
//     onerror: (() => void) | null;
//   }
//   interface SpeechRecognitionEvent extends Event {
//     results: ArrayLike<ArrayLike<{ transcript: string }>>;
//   }
// }

// interface ChatInputProps {
//   onSendMessage: (message: string) => void;
//   isLoading: boolean;
// }

// export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
//   const [inputText, setInputText] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       typeof window !== "undefined" &&
//       (window.SpeechRecognition || window.webkitSpeechRecognition);

//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       // Set the language to 'en-IN' for better support of both Hindi and English
//       recognition.lang = "en-US"; 
//       recognition.interimResults = false;
//       recognition.continuous = false;

//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         const transcript = event.results[0][0].transcript;
//         setInputText((prev) => prev + (prev ? " " : "") + transcript);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognition.onerror = () => {
//         setIsListening(false);
//       };

//       recognitionRef.current = recognition;
//     }
//   }, []);

//   const handleMicClick = () => {
//     if (!recognitionRef.current || isLoading) return;

//     if (isListening) {
//       recognitionRef.current.stop();
//       // Wait for a brief moment before sending the message
//       setTimeout(() => {
//         if (inputText.trim()) {
//           onSendMessage(inputText.trim());
//           setInputText("");
//         }
//       }, 100);
//     } else {
//       try {
//         // Clear the input field before starting a new transcription
//         setInputText("");
//         recognitionRef.current.start();
//         setIsListening(true);
//       } catch (err) {
//         console.error("Speech recognition start error:", err);
//       }
//     }
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (inputText.trim() && !isLoading) {
//       onSendMessage(inputText.trim());
//       setInputText("");
//     }
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur-md z-50">
//       <div className="container mx-auto max-w-4xl">
//         <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white rounded-full shadow-lg border border-gray-200 p-2">
//           <Button
//             type="button"
//             variant="ghost"
//             size="icon"
//             className={`rounded-full transition-all ${
//               isListening 
//                 ? "bg-red-100 text-red-600 animate-pulse" 
//                 : "bg-blue-50 text-blue-600 hover:bg-blue-100"
//             }`}
//             onClick={handleMicClick}
//             disabled={isLoading}
//           >
//             {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//             <span className="sr-only">Voice Input</span>
//           </Button>

//           <Textarea
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder="Describe your symptoms..."
//             className="flex-grow resize-none rounded-full py-3 px-4 border-0 focus:ring-0 focus:outline-none bg-transparent"
//             rows={1}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSubmit(e);
//               }
//             }}
//             disabled={isLoading || isListening}
//           />

//           <Button
//             type="submit"
//             variant="default"
//             size="icon"
//             className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
//             disabled={isLoading || !inputText.trim()}
//           >
//             {isLoading ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               <Send className="h-5 w-5" />
//             )}
//             <span className="sr-only">Send Message</span>
//           </Button>
//         </form>
        
//         {isListening && (
//           <div className="text-center mt-2">
//             <span className="text-sm text-blue-600 animate-pulse">
//               <span className="flex items-center justify-center">
//                 <Mic className="h-4 w-4 mr-2" />
//                 Listening...
//               </span>
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";

// Fixed TypeScript declarations for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    start(): void;
    stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    onerror: ((event: any) => void) | null;
  }
  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
    readonly resultIndex: number;
  }
  interface SpeechRecognitionResultList extends ArrayLike<SpeechRecognitionResult> {
    item(index: number): SpeechRecognitionResult;
  }
  interface SpeechRecognitionResult extends ArrayLike<SpeechRecognitionAlternative> {
    readonly isFinal: boolean;
  }
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
  }
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [liveTranscript, setLiveTranscript] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        // Clear previous timeout
        if (speakingTimeoutRef.current) {
          clearTimeout(speakingTimeoutRef.current);
        }
        
        // Set speaking to true immediately when speech is detected
        setIsSpeaking(true);
        
        // Reset timeout - stop animation if no speech for 500ms
        speakingTimeoutRef.current = setTimeout(() => {
          setIsSpeaking(false);
        }, 500);

        let finalTranscript = "";
        let interimTranscript = "";

        // Process all results from the current session
        for (let i = 0; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Update live transcript with interim results
        setLiveTranscript(interimTranscript || (finalTranscript ? "Processing..." : "Listening..."));
        
        // Add final transcript to input text
        if (finalTranscript) {
          setInputText((prev) => prev + finalTranscript);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsSpeaking(false);
        if (speakingTimeoutRef.current) {
          clearTimeout(speakingTimeoutRef.current);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setIsSpeaking(false);
        setLiveTranscript("Could not start. Please check microphone permissions.");
      };

      recognitionRef.current = recognition;
    }

    // Cleanup function
    return () => {
      if (speakingTimeoutRef.current) {
        clearTimeout(speakingTimeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        stopListening();
      }
    };

    if (showVoiceModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVoiceModal]);

  const startListening = () => {
    if (!recognitionRef.current || isLoading) return;

    try {
      setLiveTranscript("Listening...");
      setIsSpeaking(false);
      recognitionRef.current.start();
      setIsListening(true);
      setShowVoiceModal(true);
    } catch (err) {
      console.error("Speech recognition start error:", err);
      setLiveTranscript("Error starting microphone.");
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current || !isListening) return;

    recognitionRef.current.stop();
    setIsListening(false);
    setIsSpeaking(false);
    setShowVoiceModal(false);

    // Clear any pending timeouts
    if (speakingTimeoutRef.current) {
      clearTimeout(speakingTimeoutRef.current);
    }

    // Send the combined final text after a brief moment
    setTimeout(() => {
      if (inputText.trim()) {
        onSendMessage(inputText.trim());
        setInputText("");
        setLiveTranscript("");
      }
    }, 100);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur-md z-49">
        <div className="container mx-auto max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 bg-white rounded-full shadow-lg border border-gray-200 p-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`rounded-full transition-all ${
                isLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
              onClick={startListening}
              disabled={isLoading}
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">Voice Input</span>
            </Button>

            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your symptoms..."
              className="flex-grow resize-none rounded-full py-3 px-4 border-0 focus:ring-0 focus:outline-none bg-transparent"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isLoading || isListening}
            />

            <Button
              type="submit"
              variant="default"
              size="icon"
              className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send Message</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Voice Input Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div ref={modalRef} className="relative bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 w-96 max-w-full">
            <div className="relative flex items-center justify-center">
              {/* Multiple pulsing circles for better visual effect */}
              {isListening && isSpeaking && (
                <>
                  <div className="absolute w-32 h-32 rounded-full bg-blue-400 opacity-20 animate-ping-slow" />
                  <div className="absolute w-24 h-24 rounded-full bg-blue-500 opacity-30 animate-ping-medium" />
                  <div className="absolute w-16 h-16 rounded-full bg-blue-600 opacity-40 animate-ping-fast" />
                </>
              )}
              
              {/* Static circle when listening but not speaking */}
              {isListening && !isSpeaking && (
                <div className="absolute w-20 h-20 rounded-full bg-blue-100 opacity-50" />
              )}
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`relative z-10 w-20 h-20 rounded-full transition-all duration-300 ${
                  isListening
                    ? "bg-red-500 text-white hover:bg-red-600 shadow-lg"
                    : "bg-blue-50 text-blue-600"
                }`}
                onClick={stopListening}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
                <span className="sr-only">
                  {isListening ? "Stop Voice Input" : "Start Voice Input"}
                </span>
              </Button>
            </div>

            <div className="text-center w-full">
              <p className={`text-lg font-semibold transition-colors ${
                isSpeaking ? "text-blue-600" : "text-gray-800"
              }`}>
                {isListening 
                  ? (isSpeaking ? "Speaking detected..." : "Listening...") 
                  : "Stopped"
                }
              </p>
              
              <div className="mt-3 h-16 overflow-y-auto hide-scrollbar border border-1 rounded-xl p-3 text-gray-700 text-sm leading-relaxed">
                <p className="min-h-[1em]">
                  {liveTranscript || (isListening ? "Speak now..." : "")}
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Click outside to stop or press the microphone button
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}