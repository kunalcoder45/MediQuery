// // // // "use client";

// // // // import { useState, useRef } from "react";
// // // // import type { Message } from "@/lib/types";
// // // // import { ChatInput } from "./ChatInput";
// // // // import { ChatMessageList } from "./ChatMessageList";
// // // // import { handleSymptomAnalysis } from "@/actions/chatActions";
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import { PharmacySection } from "./PharmacySection";
// // // // import { AgeSelector } from "./AgeSelector";
// // // // import { GenderSelector } from "./GenderSelector";
// // // // import { TreatmentPreferenceSelector } from "./TreatmentPreferenceSelector";

// // // // const initialBotMessage: Message = {
// // // //   id: "initial-bot",
// // // //   sender: "bot",
// // // //   text: "Hello! I'm your MediQuery AI assistant.\n\n How are you feeling today?",
// // // //   timestamp: new Date(),
// // // // };

// // // // type ConversationState = "awaitingSymptoms" | "awaitingAge" | "awaitingGender" | "awaitingTreatmentPreference" | "awaitingDetails" | "readyForAnalysis";

// // // // export function ChatInterface() {
// // // //   const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [showPharmacySection, setShowPharmacySection] = useState(false);
// // // //   const [selectedMedicineForPharmacy, setSelectedMedicineForPharmacy] = useState<string | null>(null);
// // // //   const [conversationState, setConversationState] = useState<ConversationState>("awaitingSymptoms");

// // // //   // State to hold collected user data
// // // //   const [collectedData, setCollectedData] = useState({
// // // //     symptoms: "",
// // // //     age: "",
// // // //     gender: "",
// // // //     treatmentPreference: "",
// // // //     otherDetails: "",
// // // //   });

// // // //   const { toast } = useToast();
// // // //   const messageIdCounterRef = useRef(0);
// // // //   const containerRef = useRef<HTMLDivElement | null>(null);

// // // //   const generateUniqueId = () => {
// // // //     messageIdCounterRef.current += 1;
// // // //     return `msg-${messageIdCounterRef.current}`;
// // // //   };

// // // //   const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
// // // //     setMessages((prev) => [
// // // //       ...prev,
// // // //       { ...message, id: generateUniqueId(), timestamp: new Date() },
// // // //     ]);
// // // //   };

// // // //   const handleSendMessage = async (text: string) => {
// // // //     if (!text.trim()) return;

// // // //     addMessage({ sender: "user", text });
// // // //     setIsLoading(true);

// // // //     switch (conversationState) {
// // // //       case "awaitingSymptoms":
// // // //         setCollectedData(prev => ({ ...prev, symptoms: text }));
// // // //         setIsLoading(false);
// // // //         setConversationState("awaitingAge");
// // // //         addMessage({ sender: "bot", text: "Thank you. Please tell me your age." });
// // // //         break;

// // // //       case "awaitingDetails":
// // // //         const finalPrompt = `
// // // //          **Symptoms:** ${collectedData.symptoms}
// // // //          **Age:** ${collectedData.age}
// // // //          **Gender:** ${collectedData.gender}
// // // //          **Treatment Preference:** ${collectedData.treatmentPreference}
// // // //          **Other Details:** ${text}
// // // //         `;

// // // //         const thinkingMessageId = generateUniqueId();
// // // //         setMessages((prev) => [
// // // //           ...prev,
// // // //           { id: thinkingMessageId, sender: "bot", isLoading: true, timestamp: new Date() },
// // // //         ]);

// // // //         // Call the AI with the complete prompt
// // // //         try {
// // // //           const result = await handleSymptomAnalysis(finalPrompt);
// // // //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
// // // //           setIsLoading(false);

// // // //           if ("error" in result) {
// // // //             addMessage({ sender: "system", text: `AI Error: ${result.error}` });
// // // //             toast({
// // // //               title: "Gemini AI Error",
// // // //               description: result.error,
// // // //               variant: "destructive",
// // // //             });
// // // //           } else if (result.medicineSuggestions?.length || result.homeRemedies?.length) {
// // // //             let responseText = "**Gemini AI Analysis Complete!**\n\n";

// // // //             if (result.generalAdvice) {
// // // //               responseText += `**General Advice:** ${result.generalAdvice}\n\n`;
// // // //             }

// // // //             if (result.redFlags) {
// // // //               responseText += `**Warning Signs:** ${result.redFlags}\n\n`;
// // // //             }

// // // //             // Show medicine suggestions if preference is medicine or both
// // // //             if ((collectedData.treatmentPreference === "medicine" || collectedData.treatmentPreference === "both") && result.medicineSuggestions?.length) {
// // // //               responseText += "**AI Recommended Medicines:**";
// // // //               addMessage({
// // // //                 sender: "bot",
// // // //                 text: responseText,
// // // //                 suggestions: result.medicineSuggestions
// // // //               });
// // // //               responseText = ""; // Clear for next message
// // // //             }

// // // //             // Show home remedies if preference is home_remedies or both
// // // //             if ((collectedData.treatmentPreference === "home_remedies" || collectedData.treatmentPreference === "both") && result.homeRemedies?.length) {
// // // //               const homeRemedyText = collectedData.treatmentPreference === "home_remedies" ? responseText + "**Natural Home Remedies:**" : "**Natural Home Remedies:**";
// // // //               setTimeout(() => {
// // // //                 addMessage({
// // // //                   sender: "bot",
// // // //                   text: homeRemedyText,
// // // //                   homeRemedies: result.homeRemedies
// // // //                 });
// // // //               }, collectedData.treatmentPreference === "both" ? 1500 : 0);
// // // //             }

// // // //             if (result.disclaimer) {
// // // //               setTimeout(() => {
// // // //                 addMessage({
// // // //                   sender: "system",
// // // //                   text: `${result.disclaimer}`
// // // //                 });
// // // //               }, 2000);
// // // //             }
// // // //           } else {
// // // //             addMessage({
// // // //               sender: "bot",
// // // //               text: "Gemini AI couldn't find specific suggestions for your symptoms. Try rephrasing or provide more specific details.\n\nRemember: I'm just an AI assistant, not a real doctor.",
// // // //             });
// // // //           }
// // // //         } catch (error) {
// // // //           setIsLoading(false);
// // // //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));

// // // //           addMessage({
// // // //             sender: "system",
// // // //             text: "Something went wrong with Gemini AI. Please try again or try later.",
// // // //           });

// // // //           toast({
// // // //             title: "Connection Error",
// // // //             description: "Gemini AI service temporarily unavailable",
// // // //             variant: "destructive",
// // // //           });
// // // //         }

// // // //         // Reset the conversation state for the next session
// // // //         setConversationState("awaitingSymptoms");
// // // //         setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
// // // //         break;
// // // //     }
// // // //   };

// // // //   const handleAgeSelect = (age: string) => {
// // // //     setCollectedData(prev => ({ ...prev, age }));
// // // //     addMessage({ sender: "user", text: `Age: ${age}` });
// // // //     setConversationState("awaitingGender");
// // // //     addMessage({ sender: "bot", text: "Thank you. Now, please tell me your gender." });
// // // //   };

// // // //   const handleGenderSelect = (gender: string) => {
// // // //     setCollectedData(prev => ({ ...prev, gender }));
// // // //     addMessage({ sender: "user", text: `Gender: ${gender}` });
// // // //     setConversationState("awaitingTreatmentPreference");
// // // //     addMessage({ sender: "bot", text: "What type of treatment would you prefer?" });
// // // //   };

// // // //   const handleTreatmentPreferenceSelect = (preference: string) => {
// // // //     const preferenceLabels = {
// // // //       "medicine": "Medicine Recommendations",
// // // //       "home_remedies": "Home Remedies",
// // // //       "both": "Both Medicine & Home Remedies"
// // // //     };

// // // //     setCollectedData(prev => ({ ...prev, treatmentPreference: preference }));
// // // //     addMessage({ sender: "user", text: `Treatment Preference: ${preferenceLabels[preference as keyof typeof preferenceLabels]}` });
// // // //     setConversationState("awaitingDetails");
// // // //     addMessage({ sender: "bot", text: "Perfect! Are you experiencing anything else unusual or any additional details you'd like to share?" });
// // // //   };

// // // //   const handleCheckNearbyStores = (medicineName: string) => {
// // // //     setSelectedMedicineForPharmacy(medicineName);
// // // //     setShowPharmacySection(true);
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col h-[80vh] w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
// // // //       {/* Message Area */}
// // // //       <div className="flex-1 overflow-y-auto p-0" ref={containerRef}>
// // // //         <ChatMessageList
// // // //           messages={messages}
// // // //           onCheckNearbyStores={handleCheckNearbyStores}
// // // //         />
// // // //       </div>

// // // //       {/* Pharmacy Section Modal */}
// // // //       {showPharmacySection && (
// // // //         <PharmacySection
// // // //           medicineName={selectedMedicineForPharmacy}
// // // //           onClose={() => setShowPharmacySection(false)}
// // // //         />
// // // //       )}

// // // //       <div className="w-full flex flex-col items-center p-4">
// // // //         {conversationState === "awaitingAge" && (
// // // //           <AgeSelector onSelectAge={handleAgeSelect} />
// // // //         )}
// // // //         {conversationState === "awaitingGender" && (
// // // //           <GenderSelector onSelectGender={handleGenderSelect} />
// // // //         )}
// // // //         {conversationState === "awaitingTreatmentPreference" && (
// // // //           <TreatmentPreferenceSelector onSelectPreference={handleTreatmentPreferenceSelect} />
// // // //         )}
// // // //         {["awaitingSymptoms", "awaitingDetails"].includes(conversationState) && (
// // // //           <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState, useRef, useEffect } from "react";
// // // import { useAuthContext } from "@/contexts/AuthContext"; // Assuming you have auth context
// // // import type { Message } from "@/lib/types";
// // // import { ChatInput } from "./ChatInput";
// // // import { ChatMessageList } from "./ChatMessageList";
// // // import { handleSymptomAnalysis } from "@/actions/chatActions";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { PharmacySection } from "./PharmacySection";
// // // import { AgeSelector } from "./AgeSelector";
// // // import { GenderSelector } from "./GenderSelector";
// // // import { TreatmentPreferenceSelector } from "./TreatmentPreferenceSelector";
// // // import { Button } from "@/components/ui/button";
// // // import { Plus, History, Trash2, Loader2 } from "lucide-react";
// // // import { 
// // //   Sheet,
// // //   SheetContent,
// // //   SheetDescription,
// // //   SheetHeader,
// // //   SheetTitle,
// // //   SheetTrigger,
// // // } from "@/components/ui/sheet";

// // // const API_BASE_URL = '/api';

// // // interface Conversation {
// // //   id: string;
// // //   title: string;
// // //   createdAt: string;
// // //   updatedAt: string;
// // //   messages?: Message[];
// // // }

// // // interface ChatMessage {
// // //   id: string;
// // //   content: string;
// // //   role: 'USER' | 'ASSISTANT' | 'SYSTEM';
// // //   createdAt: string;
// // //   metadata?: string;
// // // }

// // // const initialBotMessage: Message = {
// // //   id: "initial-bot",
// // //   sender: "bot",
// // //   text: "Hello! I'm your MediQuery AI assistant.\n\n How are you feeling today?",
// // //   timestamp: new Date(),
// // // };

// // // type ConversationState = "awaitingSymptoms" | "awaitingAge" | "awaitingGender" | "awaitingTreatmentPreference" | "awaitingDetails" | "readyForAnalysis";

// // // export function ChatInterface() {
// // //   const { user } = useAuthContext();
// // //   const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showPharmacySection, setShowPharmacySection] = useState(false);
// // //   const [selectedMedicineForPharmacy, setSelectedMedicineForPharmacy] = useState<string | null>(null);
// // //   const [conversationState, setConversationState] = useState<ConversationState>("awaitingSymptoms");

// // //   // Backend integration states
// // //   const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
// // //   const [conversations, setConversations] = useState<Conversation[]>([]);
// // //   const [isLoadingConversations, setIsLoadingConversations] = useState(false);
// // //   const [isSavingMessage, setIsSavingMessage] = useState(false);

// // //   // State to hold collected user data
// // //   const [collectedData, setCollectedData] = useState({
// // //     symptoms: "",
// // //     age: "",
// // //     gender: "",
// // //     treatmentPreference: "",
// // //     otherDetails: "",
// // //   });

// // //   const { toast } = useToast();
// // //   const messageIdCounterRef = useRef(0);
// // //   const containerRef = useRef<HTMLDivElement | null>(null);

// // //   const generateUniqueId = () => {
// // //     messageIdCounterRef.current += 1;
// // //     return `msg-${messageIdCounterRef.current}`;
// // //   };

// // //   // Get auth token
// // //   const getAuthToken = async () => {
// // //     if (!user) return null;
// // //     try {
// // //       return await user.getIdToken();
// // //     } catch (error) {
// // //       console.error('Error getting auth token:', error);
// // //       return null;
// // //     }
// // //   };

// // //   // API call helper
// // //   const apiCall = async (endpoint: string, options: RequestInit = {}) => {
// // //     const token = await getAuthToken();
// // //     if (!token) {
// // //       throw new Error('Authentication required');
// // //     }

// // //     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
// // //       ...options,
// // //       headers: {
// // //         'Authorization': `Bearer ${token}`,
// // //         'Content-Type': 'application/json',
// // //         ...options.headers,
// // //       },
// // //     });

// // //     if (!response.ok) {
// // //       const error = await response.json().catch(() => ({ error: 'Network error' }));
// // //       throw new Error(error.error || 'API request failed');
// // //     }

// // //     return response.json();
// // //   };

// // //   // Load user conversations
// // //   const loadConversations = async () => {
// // //     if (!user) return;

// // //     setIsLoadingConversations(true);
// // //     try {
// // //       const data = await apiCall('/chat/conversations');
// // //       setConversations(data.conversations || []);
// // //     } catch (error) {
// // //       console.error('Error loading conversations:', error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load conversation history",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setIsLoadingConversations(false);
// // //     }
// // //   };

// // //   // Create new conversation
// // //   const createNewConversation = async () => {
// // //     if (!user) return;

// // //     try {
// // //       const data = await apiCall('/chat/conversations', {
// // //         method: 'POST',
// // //         body: JSON.stringify({
// // //           title: 'Medical Consultation'
// // //         }),
// // //       });

// // //       setCurrentConversationId(data.conversation.id);
// // //       setMessages([initialBotMessage]);
// // //       setConversationState("awaitingSymptoms");
// // //       setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });

// // //       // Reload conversations to show the new one
// // //       loadConversations();

// // //       toast({
// // //         title: "New Chat",
// // //         description: "Started a new medical consultation",
// // //       });
// // //     } catch (error) {
// // //       console.error('Error creating conversation:', error);
// // //       toast({
// // //         title: "Error", 
// // //         description: "Failed to create new conversation",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   // Load specific conversation
// // //   const loadConversation = async (conversationId: string) => {
// // //     if (!user) return;

// // //     try {
// // //       const data = await apiCall(`/chat/conversations/${conversationId}`);
// // //       const conversation = data.conversation;

// // //       // Convert backend messages to frontend format
// // //       const loadedMessages: Message[] = conversation.messages.map((msg: ChatMessage) => ({
// // //         id: msg.id,
// // //         sender: msg.role.toLowerCase() === 'user' ? 'user' : 
// // //                msg.role.toLowerCase() === 'assistant' ? 'bot' : 'system',
// // //         text: msg.content,
// // //         timestamp: new Date(msg.createdAt),
// // //         // Parse metadata if exists
// // //         ...(msg.metadata ? JSON.parse(msg.metadata) : {})
// // //       }));

// // //       setCurrentConversationId(conversationId);
// // //       setMessages(loadedMessages.length > 0 ? loadedMessages : [initialBotMessage]);

// // //       // Reset conversation state for loaded chats
// // //       setConversationState("awaitingSymptoms");
// // //       setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });

// // //     } catch (error) {
// // //       console.error('Error loading conversation:', error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load conversation",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   // Save message to backend
// // //   const saveMessage = async (message: Omit<Message, "id" | "timestamp">, conversationId?: string) => {
// // //     if (!user) return null;

// // //     const targetConversationId = conversationId || currentConversationId;
// // //     if (!targetConversationId) return null;

// // //     try {
// // //       const role = message.sender === 'user' ? 'USER' : 
// // //                   message.sender === 'bot' ? 'ASSISTANT' : 'SYSTEM';

// // //       const metadata = {
// // //         ...(message.suggestions && { suggestions: message.suggestions }),
// // //         ...(message.homeRemedies && { homeRemedies: message.homeRemedies }),
// // //       };

// // //       const data = await apiCall(`/chat/conversations/${targetConversationId}/messages`, {
// // //         method: 'POST',
// // //         body: JSON.stringify({
// // //           content: message.text || '',
// // //           role,
// // //           metadata: Object.keys(metadata).length > 0 ? metadata : null,
// // //         }),
// // //       });

// // //       return data.message;
// // //     } catch (error) {
// // //       console.error('Error saving message:', error);
// // //       return null;
// // //     }
// // //   };

// // //   // Delete conversation
// // //   const deleteConversation = async (conversationId: string) => {
// // //     if (!user) return;

// // //     try {
// // //       await apiCall(`/chat/conversations/${conversationId}`, {
// // //         method: 'DELETE',
// // //       });

// // //       setConversations(prev => prev.filter(c => c.id !== conversationId));

// // //       if (currentConversationId === conversationId) {
// // //         setCurrentConversationId(null);
// // //         setMessages([initialBotMessage]);
// // //       }

// // //       toast({
// // //         title: "Deleted",
// // //         description: "Conversation deleted successfully",
// // //       });
// // //     } catch (error) {
// // //       console.error('Error deleting conversation:', error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to delete conversation", 
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   // Initialize conversations on auth
// // //   useEffect(() => {
// // //     if (user) {
// // //       loadConversations();
// // //     }
// // //   }, [user]);

// // //   const addMessage = async (message: Omit<Message, "id" | "timestamp">) => {
// // //     const newMessage = { 
// // //       ...message, 
// // //       id: generateUniqueId(), 
// // //       timestamp: new Date() 
// // //     };

// // //     setMessages((prev) => [...prev, newMessage]);

// // //     // Save to backend if user is authenticated
// // //     if (user && currentConversationId) {
// // //       setIsSavingMessage(true);
// // //       await saveMessage(message);
// // //       setIsSavingMessage(false);
// // //     }

// // //     return newMessage;
// // //   };

// // //   const handleSendMessage = async (text: string) => {
// // //     if (!text.trim()) return;

// // //     // Create conversation if none exists
// // //     if (!currentConversationId && user) {
// // //       await createNewConversation();
// // //       // Wait a bit for conversation to be created
// // //       await new Promise(resolve => setTimeout(resolve, 500));
// // //     }

// // //     await addMessage({ sender: "user", text });
// // //     setIsLoading(true);

// // //     switch (conversationState) {
// // //       case "awaitingSymptoms":
// // //         setCollectedData(prev => ({ ...prev, symptoms: text }));
// // //         setIsLoading(false);
// // //         setConversationState("awaitingAge");
// // //         await addMessage({ sender: "bot", text: "Thank you. Please tell me your age." });
// // //         break;

// // //       case "awaitingDetails":
// // //         const finalPrompt = `
// // //          **Symptoms:** ${collectedData.symptoms}
// // //          **Age:** ${collectedData.age}
// // //          **Gender:** ${collectedData.gender}
// // //          **Treatment Preference:** ${collectedData.treatmentPreference}
// // //          **Other Details:** ${text}
// // //         `;

// // //         const thinkingMessageId = generateUniqueId();
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { id: thinkingMessageId, sender: "bot", isLoading: true, timestamp: new Date() },
// // //         ]);

// // //         // Call the AI with the complete prompt
// // //         try {
// // //           const result = await handleSymptomAnalysis(finalPrompt);
// // //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
// // //           setIsLoading(false);

// // //           if ("error" in result) {
// // //             await addMessage({ sender: "system", text: `AI Error: ${result.error}` });
// // //             toast({
// // //               title: "Gemini AI Error",
// // //               description: result.error,
// // //               variant: "destructive",
// // //             });
// // //           } else if (result.medicineSuggestions?.length || result.homeRemedies?.length) {
// // //             let responseText = "**Gemini AI Analysis Complete!**\n\n";

// // //             if (result.generalAdvice) {
// // //               responseText += `**General Advice:** ${result.generalAdvice}\n\n`;
// // //             }

// // //             if (result.redFlags) {
// // //               responseText += `**Warning Signs:** ${result.redFlags}\n\n`;
// // //             }

// // //             // Show medicine suggestions if preference is medicine or both
// // //             if ((collectedData.treatmentPreference === "medicine" || collectedData.treatmentPreference === "both") && result.medicineSuggestions?.length) {
// // //               responseText += "**AI Recommended Medicines:**";
// // //               await addMessage({
// // //                 sender: "bot",
// // //                 text: responseText,
// // //                 suggestions: result.medicineSuggestions
// // //               });
// // //               responseText = ""; // Clear for next message
// // //             }

// // //             // Show home remedies if preference is home_remedies or both
// // //             if ((collectedData.treatmentPreference === "home_remedies" || collectedData.treatmentPreference === "both") && result.homeRemedies?.length) {
// // //               const homeRemedyText = collectedData.treatmentPreference === "home_remedies" ? responseText + "**Natural Home Remedies:**" : "**Natural Home Remedies:**";
// // //               setTimeout(async () => {
// // //                 await addMessage({
// // //                   sender: "bot",
// // //                   text: homeRemedyText,
// // //                   homeRemedies: result.homeRemedies
// // //                 });
// // //               }, collectedData.treatmentPreference === "both" ? 1500 : 0);
// // //             }

// // //             if (result.disclaimer) {
// // //               setTimeout(async () => {
// // //                 await addMessage({
// // //                   sender: "system",
// // //                   text: `${result.disclaimer}`
// // //                 });
// // //               }, 2000);
// // //             }
// // //           } else {
// // //             await addMessage({
// // //               sender: "bot",
// // //               text: "Gemini AI couldn't find specific suggestions for your symptoms. Try rephrasing or provide more specific details.\n\nRemember: I'm just an AI assistant, not a real doctor.",
// // //             });
// // //           }
// // //         } catch (error) {
// // //           setIsLoading(false);
// // //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));

// // //           await addMessage({
// // //             sender: "system",
// // //             text: "Something went wrong with Gemini AI. Please try again or try later.",
// // //           });

// // //           toast({
// // //             title: "Connection Error",
// // //             description: "Gemini AI service temporarily unavailable",
// // //             variant: "destructive",
// // //           });
// // //         }

// // //         // Reset the conversation state for the next session
// // //         setConversationState("awaitingSymptoms");
// // //         setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
// // //         break;
// // //     }
// // //   };

// // //   const handleAgeSelect = async (age: string) => {
// // //     setCollectedData(prev => ({ ...prev, age }));
// // //     await addMessage({ sender: "user", text: `Age: ${age}` });
// // //     setConversationState("awaitingGender");
// // //     await addMessage({ sender: "bot", text: "Thank you. Now, please tell me your gender." });
// // //   };

// // //   const handleGenderSelect = async (gender: string) => {
// // //     setCollectedData(prev => ({ ...prev, gender }));
// // //     await addMessage({ sender: "user", text: `Gender: ${gender}` });
// // //     setConversationState("awaitingTreatmentPreference");
// // //     await addMessage({ sender: "bot", text: "What type of treatment would you prefer?" });
// // //   };

// // //   const handleTreatmentPreferenceSelect = async (preference: string) => {
// // //     const preferenceLabels = {
// // //       "medicine": "Medicine Recommendations",
// // //       "home_remedies": "Home Remedies",
// // //       "both": "Both Medicine & Home Remedies"
// // //     };

// // //     setCollectedData(prev => ({ ...prev, treatmentPreference: preference }));
// // //     await addMessage({ sender: "user", text: `Treatment Preference: ${preferenceLabels[preference as keyof typeof preferenceLabels]}` });
// // //     setConversationState("awaitingDetails");
// // //     await addMessage({ sender: "bot", text: "Perfect! Are you experiencing anything else unusual or any additional details you'd like to share?" });
// // //   };

// // //   const handleCheckNearbyStores = (medicineName: string) => {
// // //     setSelectedMedicineForPharmacy(medicineName);
// // //     setShowPharmacySection(true);
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-[80vh] w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
// // //       {/* Header with chat controls */}
// // //       <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
// // //         <h2 className="text-lg font-semibold text-gray-800">MediQuery AI</h2>

// // //         <div className="flex items-center gap-2">
// // //           {user && (
// // //             <>
// // //               <Button
// // //                 onClick={createNewConversation}
// // //                 size="sm"
// // //                 variant="outline"
// // //                 className="flex items-center gap-2"
// // //               >
// // //                 <Plus className="h-4 w-4" />
// // //                 New Chat
// // //               </Button>

// // //               <Sheet>
// // //                 <SheetTrigger asChild>
// // //                   <Button
// // //                     size="sm"
// // //                     variant="outline"
// // //                     className="flex items-center gap-2"
// // //                     onClick={loadConversations}
// // //                   >
// // //                     <History className="h-4 w-4" />
// // //                     History
// // //                   </Button>
// // //                 </SheetTrigger>
// // //                 <SheetContent>
// // //                   <SheetHeader>
// // //                     <SheetTitle>Chat History</SheetTitle>
// // //                     <SheetDescription>
// // //                       Your previous medical consultations
// // //                     </SheetDescription>
// // //                   </SheetHeader>

// // //                   <div className="mt-6 space-y-2">
// // //                     {isLoadingConversations ? (
// // //                       <div className="flex items-center justify-center p-4">
// // //                         <Loader2 className="h-6 w-6 animate-spin" />
// // //                       </div>
// // //                     ) : conversations.length === 0 ? (
// // //                       <p className="text-gray-500 text-center p-4">No conversations yet</p>
// // //                     ) : (
// // //                       conversations.map((conversation) => (
// // //                         <div 
// // //                           key={conversation.id}
// // //                           className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
// // //                           onClick={() => loadConversation(conversation.id)}
// // //                         >
// // //                           <div className="flex-1 min-w-0">
// // //                             <p className="font-medium text-sm truncate">
// // //                               {conversation.title}
// // //                             </p>
// // //                             <p className="text-xs text-gray-500">
// // //                               {new Date(conversation.updatedAt).toLocaleDateString()}
// // //                             </p>
// // //                           </div>
// // //                           <Button
// // //                             size="sm"
// // //                             variant="ghost"
// // //                             onClick={(e) => {
// // //                               e.stopPropagation();
// // //                               deleteConversation(conversation.id);
// // //                             }}
// // //                             className="text-red-500 hover:text-red-700"
// // //                           >
// // //                             <Trash2 className="h-4 w-4" />
// // //                           </Button>
// // //                         </div>
// // //                       ))
// // //                     )}
// // //                   </div>
// // //                 </SheetContent>
// // //               </Sheet>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Message Area */}
// // //       <div className="flex-1 overflow-y-auto p-0" ref={containerRef}>
// // //         <ChatMessageList
// // //           messages={messages}
// // //           onCheckNearbyStores={handleCheckNearbyStores}
// // //         />
// // //       </div>

// // //       {/* Pharmacy Section Modal */}
// // //       {showPharmacySection && (
// // //         <PharmacySection
// // //           medicineName={selectedMedicineForPharmacy}
// // //           onClose={() => setShowPharmacySection(false)}
// // //         />
// // //       )}

// // //       <div className="w-full flex flex-col items-center p-4">
// // //         {/* Saving indicator */}
// // //         {isSavingMessage && user && (
// // //           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // //             <Loader2 className="h-3 w-3 animate-spin" />
// // //             Saving...
// // //           </div>
// // //         )}

// // //         {conversationState === "awaitingAge" && (
// // //           <AgeSelector onSelectAge={handleAgeSelect} />
// // //         )}
// // //         {conversationState === "awaitingGender" && (
// // //           <GenderSelector onSelectGender={handleGenderSelect} />
// // //         )}
// // //         {conversationState === "awaitingTreatmentPreference" && (
// // //           <TreatmentPreferenceSelector onSelectPreference={handleTreatmentPreferenceSelect} />
// // //         )}
// // //         {["awaitingSymptoms", "awaitingDetails"].includes(conversationState) && (
// // //           <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
// // //         )}

// // //         {/* Auth prompt for guests */}
// // //         {!user && (
// // //           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
// // //             <p className="text-sm text-blue-800">
// // //               Sign in to save your conversations and access chat history
// // //             </p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }









// // // // src/components/chat/ChatInterface.tsx

// // // "use client";

// // // import { useState, useRef, useEffect } from "react";
// // // import { useAuthContext } from "@/contexts/AuthContext";
// // // import type { Message } from "@/lib/types";
// // // import { ChatInput } from "./ChatInput";
// // // import { ChatMessageList } from "./ChatMessageList";
// // // import { handleSymptomAnalysis } from "@/actions/chatActions";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { PharmacySection } from "./PharmacySection";
// // // import { AgeSelector } from "./AgeSelector";
// // // import { GenderSelector } from "./GenderSelector";
// // // import { TreatmentPreferenceSelector } from "./TreatmentPreferenceSelector";
// // // import { Button } from "@/components/ui/button";
// // // import { Plus, History, Loader2, Link as LinkIcon } from "lucide-react";
// // // import {
// // //   Sheet,
// // //   SheetContent,
// // //   SheetDescription,
// // //   SheetHeader,
// // //   SheetTitle,
// // //   SheetTrigger,
// // // } from "@/components/ui/sheet";
// // // import { ChatHistoryItem } from "./ChatHistoryItem";

// // // const API_BASE_URL = '/api';

// // // interface Conversation {
// // //   id: string;
// // //   title: string;
// // //   createdAt: string;
// // //   updatedAt: string;
// // //   messages?: {
// // //     id: string;
// // //   }[];
// // // }

// // // interface ChatMessage {
// // //   id: string;
// // //   content: string;
// // //   role: 'USER' | 'ASSISTANT' | 'SYSTEM';
// // //   createdAt: string;
// // //   metadata?: string;
// // // }

// // // const initialBotMessage: Message = {
// // //   id: "initial-bot",
// // //   sender: "bot",
// // //   text: "Hello! I'm your MediQuery AI assistant.\n\n What are you feeling today?",
// // //   timestamp: new Date(),
// // // };

// // // interface ChatInterfaceProps {
// // //   sharedMessages?: ChatMessage[] | null;
// // // }

// // // type ConversationState = "awaitingSymptoms" | "awaitingAge" | "awaitingGender" | "awaitingTreatmentPreference" | "awaitingDetails" | "readyForAnalysis";

// // // export function ChatInterface({ sharedMessages }: ChatInterfaceProps) {
// // //   const { user } = useAuthContext();
// // //   const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showPharmacySection, setShowPharmacySection] = useState(false);
// // //   const [selectedMedicineForPharmacy, setSelectedMedicineForPharmacy] = useState<string | null>(null);
// // //   const [conversationState, setConversationState] = useState<ConversationState>("awaitingSymptoms");

// // //   const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
// // //   const [conversations, setConversations] = useState<Conversation[]>([]);
// // //   const [isLoadingConversations, setIsLoadingConversations] = useState(false);
// // //   const [isSavingMessage, setIsSavingMessage] = useState(false);

// // //   const [collectedData, setCollectedData] = useState({
// // //     symptoms: "",
// // //     age: "",
// // //     gender: "",
// // //     treatmentPreference: "",
// // //     otherDetails: "",
// // //   });

// // //   // src/components/chat/ChatInterface.tsx

// // //   // ... (previous code)

// // //   useEffect(() => {
// // //     if (sharedMessages) {
// // //       // If sharedMessages are provided, use them to populate the chat
// // //       const loadedMessages = sharedMessages.map((msg) => {
// // //         let senderType: 'user' | 'bot' | 'system';
// // //         switch (msg.role) {
// // //           case 'USER':
// // //             senderType = 'user';
// // //             break;
// // //           case 'ASSISTANT':
// // //             senderType = 'bot';
// // //             break;
// // //           case 'SYSTEM':
// // //             senderType = 'system';
// // //             break;
// // //           default:
// // //             // Fallback for any other unexpected role
// // //             senderType = 'bot';
// // //         }

// // //         return {
// // //           id: msg.id,
// // //           sender: senderType,
// // //           text: msg.content,
// // //           timestamp: new Date(msg.createdAt),
// // //         };
// // //       });
// // //       setMessages(loadedMessages);
// // //     } else {
// // //       // Otherwise, use the default initial message
// // //       setMessages([initialBotMessage]);
// // //     }
// // //   }, [sharedMessages]);

// // //   // ... (rest of your component code)

// // //   const { toast } = useToast();
// // //   const messageIdCounterRef = useRef(0);
// // //   const containerRef = useRef<HTMLDivElement | null>(null);

// // //   const generateUniqueId = () => {
// // //     messageIdCounterRef.current += 1;
// // //     return `msg-${messageIdCounterRef.current}`;
// // //   };

// // //   const getAuthToken = async () => {
// // //     if (!user) return null;
// // //     try {
// // //       return await user.getIdToken();
// // //     } catch (error) {
// // //       console.error('Error getting auth token:', error);
// // //       return null;
// // //     }
// // //   };

// // //   const apiCall = async (endpoint: string, options: RequestInit = {}) => {
// // //     const token = await getAuthToken();
// // //     if (!token) {
// // //       throw new Error('Authentication required');
// // //     }

// // //     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
// // //       ...options,
// // //       headers: {
// // //         'Authorization': `Bearer ${token}`,
// // //         'Content-Type': 'application/json',
// // //         ...options.headers,
// // //       },
// // //     });

// // //     if (!response.ok) {
// // //       const error = await response.json().catch(() => ({ error: 'Network error' }));
// // //       throw new Error(error.error || 'API request failed');
// // //     }

// // //     return response.json();
// // //   };

// // //   const loadConversations = async () => {
// // //     if (!user) return;

// // //     setIsLoadingConversations(true);
// // //     try {
// // //       const data = await apiCall('/chat/conversations');
// // //       setConversations(data.conversations || []);
// // //     } catch (error) {
// // //       console.error('Error loading conversations:', error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load conversation history",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setIsLoadingConversations(false);
// // //     }
// // //   };

// // //   const createNewConversation = async (initialTitle?: string) => {
// // //     if (!user) return;
// // //       // if (!conversationId && user) {
// // //       try {
// // //         const data = await apiCall('/chat/conversations', {
// // //           method: 'POST',
// // //           body: JSON.stringify({
// // //             // title: initialTitle || 'New Chat'
// // //             title: text.trim().substring(0, 50) + "..."
// // //           }),
// // //         });
// // //         setCurrentConversationId(data.conversation.id);
// // //         setMessages([initialBotMessage]);
// // //         setConversationState("awaitingSymptoms");
// // //         setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });

// // //         loadConversations();

// // //         toast({
// // //           title: "New Chat",
// // //           description: "Started a new medical consultation",
// // //         });
// // //       } catch (error) {
// // //         console.error('Error creating conversation:', error);
// // //         toast({
// // //           title: "Error",
// // //           description: "Failed to create new conversation",
// // //           variant: "destructive",
// // //         });
// // //       }
// // //     };
// // //   };

// // //   const loadConversation = async (conversationId: string) => {
// // //     if (!user) return;
// // //     try {
// // //       const data = await apiCall(`/chat/conversations/${conversationId}`);
// // //       const conversation = data.conversation;

// // //       const loadedMessages: Message[] = conversation.messages.map((msg: ChatMessage) => ({
// // //         id: msg.id,
// // //         sender: msg.role.toLowerCase() === 'user' ? 'user' :
// // //           msg.role.toLowerCase() === 'assistant' ? 'bot' : 'system',
// // //         text: msg.content,
// // //         timestamp: new Date(msg.createdAt),
// // //         ...(msg.metadata ? JSON.parse(msg.metadata) : {})
// // //       }));

// // //       setCurrentConversationId(conversationId);
// // //       setMessages(loadedMessages.length > 0 ? loadedMessages : [initialBotMessage]);
// // //       setConversationState("awaitingSymptoms");
// // //       setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });

// // //     } catch (error) {
// // //       console.error('Error loading conversation:', error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load conversation",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   const saveMessage = async (message: Omit<Message, "id" | "timestamp">, conversationId?: string) => {
// // //     if (!user) return null;

// // //     const targetConversationId = conversationId || currentConversationId;
// // //     if (!targetConversationId) return null;

// // //     try {
// // //       const role = message.sender === 'user' ? 'USER' :
// // //         message.sender === 'bot' ? 'ASSISTANT' : 'SYSTEM';

// // //       const metadata = {
// // //         ...(message.suggestions && { suggestions: message.suggestions }),
// // //         ...(message.homeRemedies && { homeRemedies: message.homeRemedies }),
// // //       };

// // //       const data = await apiCall(`/chat/conversations/${targetConversationId}/messages`, {
// // //         method: 'POST',
// // //         body: JSON.stringify({
// // //           content: message.text || '',
// // //           role,
// // //           metadata: Object.keys(metadata).length > 0 ? metadata : null,
// // //         }),
// // //       });

// // //       return data.message;
// // //     } catch (error) {
// // //       console.error('Error saving message:', error);
// // //       return null;
// // //     }
// // //   };

// // //   const updateConversationTitle = async (conversationId: string, newTitle: string) => {
// // //     if (!user) return;
// // //     try {
// // //       await apiCall(`/chat/conversations/${conversationId}`, {
// // //         method: 'PUT',
// // //         body: JSON.stringify({ title: newTitle }),
// // //       });
// // //       loadConversations();
// // //       toast({ title: "Success", description: "Chat title updated." });
// // //     } catch (error) {
// // //       toast({ title: "Error", description: "Failed to rename chat.", variant: "destructive" });
// // //     }
// // //   };

// // //   const deleteConversation = async (conversationId: string) => {
// // //     if (!user) return;
// // //     try {
// // //       await apiCall(`/chat/conversations/${conversationId}`, {
// // //         method: 'DELETE',
// // //       });
// // //       setConversations(prev => prev.filter(c => c.id !== conversationId));

// // //       if (currentConversationId === conversationId) {
// // //         setCurrentConversationId(null);
// // //         setMessages([initialBotMessage]);
// // //       }

// // //       toast({
// // //         title: "Deleted",
// // //         description: "Conversation deleted successfully",
// // //       });
// // //     } catch (error) {
// // //       console.error('Error deleting conversation:', error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to delete conversation",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (user) {
// // //       loadConversations();
// // //     }
// // //   }, [user]);

// // //   const addMessage = async (message: Omit<Message, "id" | "timestamp">) => {
// // //     const newMessage = {
// // //       ...message,
// // //       id: generateUniqueId(),
// // //       timestamp: new Date()
// // //     };

// // //     setMessages((prev) => [...prev, newMessage]);

// // //     if (user && currentConversationId) {
// // //       setIsSavingMessage(true);
// // //       await saveMessage(message);
// // //       setIsSavingMessage(false);
// // //     }

// // //     return newMessage;
// // //   };

// // //   const handleSendMessage = async (text: string) => {
// // //     if (!text.trim()) return;

// // //     let conversationId = currentConversationId;

// // //     if (!conversationId && user) {
// // //       try {
// // //         const data = await apiCall('/chat/conversations', {
// // //           method: 'POST',
// // //           body: JSON.stringify({
// // //             title: text.trim().substring(0, 50) + "..." // Set first message as title
// // //           }),
// // //         });
// // //         conversationId = data.conversation.id;
// // //         setCurrentConversationId(conversationId);
// // //         toast({
// // //           title: "New Chat",
// // //           description: "Started a new medical consultation",
// // //         });
// // //         loadConversations(); // Reload history to show new chat
// // //       } catch (error) {
// // //         toast({
// // //           title: "Error",
// // //           description: "Failed to create new conversation",
// // //           variant: "destructive",
// // //         });
// // //         return;
// // //       }
// // //     }

// // //     await addMessage({ sender: "user", text });
// // //     setIsLoading(true);

// // //     switch (conversationState) {
// // //       case "awaitingSymptoms":
// // //         setCollectedData(prev => ({ ...prev, symptoms: text }));
// // //         setIsLoading(false);
// // //         setConversationState("awaitingAge");
// // //         await addMessage({ sender: "bot", text: "Thank you. Please tell me your age." });
// // //         break;

// // //       case "awaitingDetails":
// // //         const finalPrompt = `
// // //           **Symptoms:** ${collectedData.symptoms}
// // //           **Age:** ${collectedData.age}
// // //           **Gender:** ${collectedData.gender}
// // //           **Treatment Preference:** ${collectedData.treatmentPreference}
// // //           **Other Details:** ${text}
// // //         `;

// // //         const thinkingMessageId = generateUniqueId();
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { id: thinkingMessageId, sender: "bot", isLoading: true, timestamp: new Date() },
// // //         ]);

// // //         try {
// // //           const result = await handleSymptomAnalysis(finalPrompt);
// // //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
// // //           setIsLoading(false);

// // //           if ("error" in result) {
// // //             await addMessage({ sender: "system", text: `AI Error: ${result.error}` });
// // //             toast({
// // //               title: "Gemini AI Error",
// // //               description: result.error,
// // //               variant: "destructive",
// // //             });
// // //           } else if (result.medicineSuggestions?.length || result.homeRemedies?.length) {
// // //             let responseText = "**Gemini AI Analysis Complete!**\n\n";

// // //             if (result.generalAdvice) {
// // //               responseText += `**General Advice:** ${result.generalAdvice}\n\n`;
// // //             }

// // //             if (result.redFlags) {
// // //               responseText += `**Warning Signs:** ${result.redFlags}\n\n`;
// // //             }

// // //             if ((collectedData.treatmentPreference === "medicine" || collectedData.treatmentPreference === "both") && result.medicineSuggestions?.length) {
// // //               responseText += "**AI Recommended Medicines:**";
// // //               await addMessage({
// // //                 sender: "bot",
// // //                 text: responseText,
// // //                 suggestions: result.medicineSuggestions
// // //               });
// // //               responseText = "";
// // //             }

// // //             if ((collectedData.treatmentPreference === "home_remedies" || collectedData.treatmentPreference === "both") && result.homeRemedies?.length) {
// // //               const homeRemedyText = collectedData.treatmentPreference === "home_remedies" ? responseText + "**Natural Home Remedies:**" : "**Natural Home Remedies:**";
// // //               setTimeout(async () => {
// // //                 await addMessage({
// // //                   sender: "bot",
// // //                   text: homeRemedyText,
// // //                   homeRemedies: result.homeRemedies
// // //                 });
// // //               }, collectedData.treatmentPreference === "both" ? 1500 : 0);
// // //             }

// // //             if (result.disclaimer) {
// // //               setTimeout(async () => {
// // //                 await addMessage({
// // //                   sender: "system",
// // //                   text: `${result.disclaimer}`
// // //                 });
// // //               }, 2000);
// // //             }
// // //           } else {
// // //             await addMessage({
// // //               sender: "bot",
// // //               text: "Gemini AI couldn't find specific suggestions for your symptoms. Try rephrasing or provide more specific details.\n\nRemember: I'm just an AI assistant, not a real doctor.",
// // //             });
// // //           }
// // //         } catch (error) {
// // //           setIsLoading(false);
// // //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));

// // //           await addMessage({
// // //             sender: "system",
// // //             text: "Something went wrong with Gemini AI. Please try again or try later.",
// // //           });

// // //           toast({
// // //             title: "Connection Error",
// // //             description: "Gemini AI service temporarily unavailable",
// // //             variant: "destructive",
// // //           });
// // //         }
// // //         setConversationState("awaitingSymptoms");
// // //         setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
// // //         break;
// // //     }
// // //   };

// // //   const handleAgeSelect = async (age: string) => {
// // //     setCollectedData(prev => ({ ...prev, age }));
// // //     await addMessage({ sender: "user", text: `Age: ${age}` });
// // //     setConversationState("awaitingGender");
// // //     await addMessage({ sender: "bot", text: "Thank you. Now, please tell me your gender." });
// // //   };

// // //   const handleGenderSelect = async (gender: string) => {
// // //     setCollectedData(prev => ({ ...prev, gender }));
// // //     await addMessage({ sender: "user", text: `Gender: ${gender}` });
// // //     setConversationState("awaitingTreatmentPreference");
// // //     await addMessage({ sender: "bot", text: "What type of treatment would you prefer?" });
// // //   };

// // //   const handleTreatmentPreferenceSelect = async (preference: string) => {
// // //     const preferenceLabels = {
// // //       "medicine": "Medicine Recommendations",
// // //       "home_remedies": "Home Remedies",
// // //       "both": "Both Medicine & Home Remedies"
// // //     };

// // //     setCollectedData(prev => ({ ...prev, treatmentPreference: preference }));
// // //     await addMessage({ sender: "user", text: `Treatment Preference: ${preferenceLabels[preference as keyof typeof preferenceLabels]}` });
// // //     setConversationState("awaitingDetails");
// // //     await addMessage({ sender: "bot", text: "Perfect! Are you experiencing anything else unusual or any additional details you'd like to share?" });
// // //   };

// // //   const handleCheckNearbyStores = (medicineName: string) => {
// // //     setSelectedMedicineForPharmacy(medicineName);
// // //     setShowPharmacySection(true);
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-[80vh] w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
// // //       <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
// // //         <h2 className="text-lg font-semibold text-gray-800">MediQuery AI</h2>

// // //         <div className="flex items-center gap-2">
// // //           {user && (
// // //             <>
// // //               <Button
// // //                 onClick={() => createNewConversation()}
// // //                 size="sm"
// // //                 variant="outline"
// // //                 className="flex items-center gap-2"
// // //               >
// // //                 <Plus className="h-4 w-4" />
// // //                 New Chat
// // //               </Button>

// // //               <Sheet>
// // //                 <SheetTrigger asChild>
// // //                   <Button
// // //                     size="sm"
// // //                     variant="outline"
// // //                     className="flex items-center gap-2"
// // //                     onClick={loadConversations}
// // //                   >
// // //                     <History className="h-4 w-4" />
// // //                     History
// // //                   </Button>
// // //                 </SheetTrigger>
// // //                 <SheetContent>
// // //                   <SheetHeader>
// // //                     <SheetTitle>Chat History</SheetTitle>
// // //                     <SheetDescription>
// // //                       Your previous medical consultations
// // //                     </SheetDescription>
// // //                   </SheetHeader>

// // //                   <div className="mt-6 space-y-2">
// // //                     {isLoadingConversations ? (
// // //                       <div className="flex items-center justify-center p-4">
// // //                         <Loader2 className="h-6 w-6 animate-spin" />
// // //                       </div>
// // //                     ) : conversations.length === 0 ? (
// // //                       <p className="text-gray-500 text-center p-4">No conversations yet</p>
// // //                     ) : (
// // //                       conversations.map((conversation) => (
// // //                         <ChatHistoryItem
// // //                           key={conversation.id}
// // //                           conversation={conversation}
// // //                           onLoadConversation={() => loadConversation(conversation.id)}
// // //                           onDeleteConversation={deleteConversation}
// // //                           onRenameConversation={updateConversationTitle}
// // //                         />
// // //                       ))
// // //                     )}
// // //                   </div>
// // //                 </SheetContent>
// // //               </Sheet>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <div className="flex-1 overflow-y-auto p-0" ref={containerRef}>
// // //         <ChatMessageList
// // //           messages={messages}
// // //           onCheckNearbyStores={handleCheckNearbyStores}
// // //         />
// // //       </div>

// // //       {showPharmacySection && (
// // //         <PharmacySection
// // //           medicineName={selectedMedicineForPharmacy}
// // //           onClose={() => setShowPharmacySection(false)}
// // //         />
// // //       )}

// // //       <div className="w-full flex flex-col items-center p-4">
// // //         {isSavingMessage && user && (
// // //           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // //             <Loader2 className="h-3 w-3 animate-spin" />
// // //             Saving...
// // //           </div>
// // //         )}

// // //         {conversationState === "awaitingAge" && (
// // //           <AgeSelector onSelectAge={handleAgeSelect} />
// // //         )}
// // //         {conversationState === "awaitingGender" && (
// // //           <GenderSelector onSelectGender={handleGenderSelect} />
// // //         )}
// // //         {conversationState === "awaitingTreatmentPreference" && (
// // //           <TreatmentPreferenceSelector onSelectPreference={handleTreatmentPreferenceSelect} />
// // //         )}
// // //         {["awaitingSymptoms", "awaitingDetails"].includes(conversationState) && (
// // //           <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
// // //         )}

// // //         {!user && (
// // //           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
// // //             <p className="text-sm text-blue-800">
// // //               Sign in to save your conversations and access chat history
// // //             </p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // src/components/chat/ChatInterface.tsx

// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import { useAuthContext } from "@/contexts/AuthContext";
// // import type { Message } from "@/lib/types";
// // import { ChatInput } from "./ChatInput";
// // import { ChatMessageList } from "./ChatMessageList";
// // import { handleSymptomAnalysis } from "@/actions/chatActions";
// // import { useToast } from "@/hooks/use-toast";
// // import { PharmacySection } from "./PharmacySection";
// // import { AgeSelector } from "./AgeSelector";
// // import { GenderSelector } from "./GenderSelector";
// // import { TreatmentPreferenceSelector } from "./TreatmentPreferenceSelector";
// // import { Button } from "@/components/ui/button";
// // import { Plus, History, Loader2, Link as LinkIcon } from "lucide-react";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetDescription,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import { ChatHistoryItem } from "./ChatHistoryItem";

// // const API_BASE_URL = '/api';

// // interface Conversation {
// //   id: string;
// //   title: string;
// //   createdAt: string;
// //   updatedAt: string;
// //   messages?: {
// //     id: string;
// //   }[];
// // }

// // interface ChatMessage {
// //   id: string;
// //   content: string;
// //   role: 'USER' | 'ASSISTANT' | 'SYSTEM';
// //   createdAt: string;
// //   metadata?: string;
// // }

// // const initialBotMessage: Message = {
// //   id: "initial-bot",
// //   sender: "bot",
// //   text: "Hello! I'm your MediQuery AI assistant.\n\n What are you feeling today?",
// //   timestamp: new Date(),
// // };

// // interface ChatInterfaceProps {
// //   sharedMessages?: ChatMessage[] | null;
// // }

// // type ConversationState = "awaitingSymptoms" | "awaitingAge" | "awaitingGender" | "awaitingTreatmentPreference" | "awaitingDetails" | "readyForAnalysis";

// // export function ChatInterface({ sharedMessages }: ChatInterfaceProps) {
// //   const { user } = useAuthContext();
// //   const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPharmacySection, setShowPharmacySection] = useState(false);
// //   const [selectedMedicineForPharmacy, setSelectedMedicineForPharmacy] = useState<string | null>(null);
// //   const [conversationState, setConversationState] = useState<ConversationState>("awaitingSymptoms");

// //   const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
// //   const [conversations, setConversations] = useState<Conversation[]>([]);
// //   const [isLoadingConversations, setIsLoadingConversations] = useState(false);
// //   const [isSavingMessage, setIsSavingMessage] = useState(false);

// //   const [collectedData, setCollectedData] = useState({
// //     symptoms: "",
// //     age: "",
// //     gender: "",
// //     treatmentPreference: "",
// //     otherDetails: "",
// //   });

// //   const { toast } = useToast();
// //   const messageIdCounterRef = useRef(0);
// //   const containerRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     if (sharedMessages) {
// //       const loadedMessages = sharedMessages.map((msg) => {
// //         let senderType: 'user' | 'bot' | 'system';
// //         switch (msg.role) {
// //           case 'USER':
// //             senderType = 'user';
// //             break;
// //           case 'ASSISTANT':
// //             senderType = 'bot';
// //             break;
// //           case 'SYSTEM':
// //             senderType = 'system';
// //             break;
// //           default:
// //             senderType = 'bot';
// //         }
// //         return {
// //           id: msg.id,
// //           sender: senderType,
// //           text: msg.content,
// //           timestamp: new Date(msg.createdAt),
// //         };
// //       });
// //       setMessages(loadedMessages);
// //     } else {
// //       setMessages([initialBotMessage]);
// //     }
// //   }, [sharedMessages]);

// //   const generateUniqueId = () => {
// //     messageIdCounterRef.current += 1;
// //     return `msg-${messageIdCounterRef.current}`;
// //   };

// //   const getAuthToken = async () => {
// //     if (!user) return null;
// //     try {
// //       return await user.getIdToken();
// //     } catch (error) {
// //       console.error('Error getting auth token:', error);
// //       return null;
// //     }
// //   };

// //   const apiCall = async (endpoint: string, options: RequestInit = {}) => {
// //     const token = await getAuthToken();
// //     if (!token) {
// //       throw new Error('Authentication required');
// //     }

// //     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
// //       ...options,
// //       headers: {
// //         'Authorization': `Bearer ${token}`,
// //         'Content-Type': 'application/json',
// //         ...options.headers,
// //       },
// //     });

// //     if (!response.ok) {
// //       const error = await response.json().catch(() => ({ error: 'Network error' }));
// //       throw new Error(error.error || 'API request failed');
// //     }

// //     return response.json();
// //   };

// //   const loadConversations = async () => {
// //     if (!user) return;

// //     setIsLoadingConversations(true);
// //     try {
// //       const data = await apiCall('/chat/conversations');
// //       setConversations(data.conversations || []);
// //     } catch (error) {
// //       console.error('Error loading conversations:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to load conversation history",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoadingConversations(false);
// //     }
// //   };

// //   // This function replaces the old createNewConversation
// //   const startNewChat = () => {
// //     setCurrentConversationId(null);
// //     setMessages([initialBotMessage]);
// //     setConversationState("awaitingSymptoms");
// //     setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
// //     toast({
// //       title: "New Chat",
// //       description: "Ready to start a new medical consultation.",
// //     });
// //   };

// //   const loadConversation = async (conversationId: string) => {
// //     if (!user) return;
// //     try {
// //       const data = await apiCall(`/chat/conversations/${conversationId}`);
// //       const conversation = data.conversation;

// //       const loadedMessages: Message[] = conversation.messages.map((msg: ChatMessage) => ({
// //         id: msg.id,
// //         sender: msg.role.toLowerCase() === 'user' ? 'user' :
// //           msg.role.toLowerCase() === 'assistant' ? 'bot' : 'system',
// //         text: msg.content,
// //         timestamp: new Date(msg.createdAt),
// //         ...(msg.metadata ? JSON.parse(msg.metadata) : {})
// //       }));

// //       setCurrentConversationId(conversationId);
// //       setMessages(loadedMessages.length > 0 ? loadedMessages : [initialBotMessage]);
// //       setConversationState("awaitingSymptoms");
// //       setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
// //     } catch (error) {
// //       console.error('Error loading conversation:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to load conversation",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const saveMessage = async (message: Omit<Message, "id" | "timestamp">, conversationId?: string) => {
// //     if (!user) return null;

// //     const targetConversationId = conversationId || currentConversationId;
// //     if (!targetConversationId) return null;

// //     try {
// //       const role = message.sender === 'user' ? 'USER' :
// //         message.sender === 'bot' ? 'ASSISTANT' : 'SYSTEM';

// //       const metadata = {
// //         ...(message.suggestions && { suggestions: message.suggestions }),
// //         ...(message.homeRemedies && { homeRemedies: message.homeRemedies }),
// //       };

// //       const data = await apiCall(`/chat/conversations/${targetConversationId}/messages`, {
// //         method: 'POST',
// //         body: JSON.stringify({
// //           content: message.text || '',
// //           role,
// //           metadata: Object.keys(metadata).length > 0 ? metadata : null,
// //         }),
// //       });
// //       return data.message;
// //     } catch (error) {
// //       console.error('Error saving message:', error);
// //       return null;
// //     }
// //   };

// //   const updateConversationTitle = async (conversationId: string, newTitle: string) => {
// //     if (!user) return;
// //     try {
// //       await apiCall(`/chat/conversations/${conversationId}`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ title: newTitle }),
// //       });
// //       loadConversations();
// //       toast({ title: "Success", description: "Chat title updated." });
// //     } catch (error) {
// //       toast({ title: "Error", description: "Failed to rename chat.", variant: "destructive" });
// //     }
// //   };

// //   const deleteConversation = async (conversationId: string) => {
// //     if (!user) return;
// //     try {
// //       await apiCall(`/chat/conversations/${conversationId}`, {
// //         method: 'DELETE',
// //       });
// //       setConversations(prev => prev.filter(c => c.id !== conversationId));

// //       if (currentConversationId === conversationId) {
// //         setCurrentConversationId(null);
// //         setMessages([initialBotMessage]);
// //       }

// //       toast({
// //         title: "Deleted",
// //         description: "Conversation deleted successfully",
// //       });
// //     } catch (error) {
// //       console.error('Error deleting conversation:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to delete conversation",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     if (user) {
// //       loadConversations();
// //     }
// //   }, [user]);

// //   const addMessage = async (message: Omit<Message, "id" | "timestamp">) => {
// //     const newMessage = {
// //       ...message,
// //       id: generateUniqueId(),
// //       timestamp: new Date()
// //     };
// //     setMessages((prev) => [...prev, newMessage]);

// //     if (user && currentConversationId) {
// //       setIsSavingMessage(true);
// //       await saveMessage(message);
// //       setIsSavingMessage(false);
// //     }
// //     return newMessage;
// //   };

// //   const handleSendMessage = async (text: string) => {
// //     if (!text.trim()) return;

// //     let conversationId = currentConversationId;

// //     if (!conversationId && user) {
// //       try {
// //         const data = await apiCall('/chat/conversations', {
// //           method: 'POST',
// //           body: JSON.stringify({
// //             // The title is now set here, using the user's first message
// //             title: text.trim().substring(0, 50) + (text.trim().length > 50 ? "..." : "")
// //           }),
// //         });
// //         conversationId = data.conversation.id;
// //         setCurrentConversationId(conversationId);
// //         loadConversations();
// //       } catch (error) {
// //         toast({
// //           title: "Error",
// //           description: "Failed to create new conversation",
// //           variant: "destructive",
// //         });
// //         return;
// //       }
// //     }

// //     await addMessage({ sender: "user", text });
// //     setIsLoading(true);

// //     switch (conversationState) {
// //       case "awaitingSymptoms":
// //         setCollectedData(prev => ({ ...prev, symptoms: text }));
// //         setIsLoading(false);
// //         setConversationState("awaitingAge");
// //         await addMessage({ sender: "bot", text: "Thank you. Please tell me your age." });
// //         break;

// //       case "awaitingDetails":
// //         const finalPrompt = `
// //           **Symptoms:** ${collectedData.symptoms}
// //           **Age:** ${collectedData.age}
// //           **Gender:** ${collectedData.gender}
// //           **Treatment Preference:** ${collectedData.treatmentPreference}
// //           **Other Details:** ${text}
// //         `;
// //         const thinkingMessageId = generateUniqueId();
// //         setMessages((prev) => [
// //           ...prev,
// //           { id: thinkingMessageId, sender: "bot", isLoading: true, timestamp: new Date() },
// //         ]);
// //         try {
// //           const result = await handleSymptomAnalysis(finalPrompt);
// //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
// //           setIsLoading(false);

// //           if ("error" in result) {
// //             await addMessage({ sender: "system", text: `AI Error: ${result.error}` });
// //             toast({
// //               title: "Gemini AI Error",
// //               description: result.error,
// //               variant: "destructive",
// //             });
// //           } else if (result.medicineSuggestions?.length || result.homeRemedies?.length) {
// //             let responseText = "**Gemini AI Analysis Complete!**\n\n";

// //             if (result.generalAdvice) {
// //               responseText += `**General Advice:** ${result.generalAdvice}\n\n`;
// //             }
// //             if (result.redFlags) {
// //               responseText += `**Warning Signs:** ${result.redFlags}\n\n`;
// //             }
// //             if ((collectedData.treatmentPreference === "medicine" || collectedData.treatmentPreference === "both") && result.medicineSuggestions?.length) {
// //               responseText += "**AI Recommended Medicines:**";
// //               await addMessage({
// //                 sender: "bot",
// //                 text: responseText,
// //                 suggestions: result.medicineSuggestions
// //               });
// //               responseText = "";
// //             }
// //             if ((collectedData.treatmentPreference === "home_remedies" || collectedData.treatmentPreference === "both") && result.homeRemedies?.length) {
// //               const homeRemedyText = collectedData.treatmentPreference === "home_remedies" ? responseText + "**Natural Home Remedies:**" : "**Natural Home Remedies:**";
// //               setTimeout(async () => {
// //                 await addMessage({
// //                   sender: "bot",
// //                   text: homeRemedyText,
// //                   homeRemedies: result.homeRemedies
// //                 });
// //               }, collectedData.treatmentPreference === "both" ? 1500 : 0);
// //             }
// //             if (result.disclaimer) {
// //               setTimeout(async () => {
// //                 await addMessage({
// //                   sender: "system",
// //                   text: `${result.disclaimer}`
// //                 });
// //               }, 2000);
// //             }
// //           } else {
// //             await addMessage({
// //               sender: "bot",
// //               text: "Gemini AI couldn't find specific suggestions for your symptoms. Try rephrasing or provide more specific details.\n\nRemember: I'm just an AI assistant, not a real doctor.",
// //             });
// //           }
// //         } catch (error) {
// //           setIsLoading(false);
// //           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
// //           await addMessage({
// //             sender: "system",
// //             text: "Something went wrong with Gemini AI. Please try again or try later.",
// //           });
// //           toast({
// //             title: "Connection Error",
// //             description: "Gemini AI service temporarily unavailable",
// //             variant: "destructive",
// //           });
// //         }
// //         setConversationState("awaitingSymptoms");
// //         setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
// //         break;
// //     }
// //   };

// //   const handleAgeSelect = async (age: string) => {
// //     setCollectedData(prev => ({ ...prev, age }));
// //     await addMessage({ sender: "user", text: `Age: ${age}` });
// //     setConversationState("awaitingGender");
// //     await addMessage({ sender: "bot", text: "Thank you. Now, please tell me your gender." });
// //   };

// //   const handleGenderSelect = async (gender: string) => {
// //     setCollectedData(prev => ({ ...prev, gender }));
// //     await addMessage({ sender: "user", text: `Gender: ${gender}` });
// //     setConversationState("awaitingTreatmentPreference");
// //     await addMessage({ sender: "bot", text: "What type of treatment would you prefer?" });
// //   };

// //   const handleTreatmentPreferenceSelect = async (preference: string) => {
// //     const preferenceLabels = {
// //       "medicine": "Medicine Recommendations",
// //       "home_remedies": "Home Remedies",
// //       "both": "Both Medicine & Home Remedies"
// //     };

// //     setCollectedData(prev => ({ ...prev, treatmentPreference: preference }));
// //     await addMessage({ sender: "user", text: `Treatment Preference: ${preferenceLabels[preference as keyof typeof preferenceLabels]}` });
// //     setConversationState("awaitingDetails");
// //     await addMessage({ sender: "bot", text: "Perfect! Are you experiencing anything else unusual or any additional details you'd like to share?" });
// //   };

// //   const handleCheckNearbyStores = (medicineName: string) => {
// //     setSelectedMedicineForPharmacy(medicineName);
// //     setShowPharmacySection(true);
// //   };

// //   return (
// //     <div className="flex flex-col h-[80vh] w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
// //       <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
// //         <h2 className="text-lg font-semibold text-gray-800">MediQuery AI</h2>
// //         <div className="flex items-center gap-2">
// //           {user && (
// //             <>
// //               <Button
// //                 onClick={startNewChat}
// //                 size="sm"
// //                 variant="outline"
// //                 className="flex items-center gap-2"
// //               >
// //                 <Plus className="h-4 w-4" />
// //                 New Chat
// //               </Button>
// //               <Sheet>
// //                 <SheetTrigger asChild>
// //                   <Button
// //                     size="sm"
// //                     variant="outline"
// //                     className="flex items-center gap-2"
// //                     onClick={loadConversations}
// //                   >
// //                     <History className="h-4 w-4" />
// //                     History
// //                   </Button>
// //                 </SheetTrigger>
// //                 <SheetContent>
// //                   <SheetHeader>
// //                     <SheetTitle>Chat History</SheetTitle>
// //                     <SheetDescription>
// //                       Your previous medical consultations
// //                     </SheetDescription>
// //                   </SheetHeader>
// //                   <div className="mt-6 space-y-2">
// //                     {isLoadingConversations ? (
// //                       <div className="flex items-center justify-center p-4">
// //                         <Loader2 className="h-6 w-6 animate-spin" />
// //                       </div>
// //                     ) : conversations.length === 0 ? (
// //                       <p className="text-gray-500 text-center p-4">No conversations yet</p>
// //                     ) : (
// //                       conversations.map((conversation) => (
// //                         <ChatHistoryItem
// //                           key={conversation.id}
// //                           conversation={conversation}
// //                           onLoadConversation={() => loadConversation(conversation.id)}
// //                           onDeleteConversation={deleteConversation}
// //                           onRenameConversation={updateConversationTitle}
// //                         />
// //                       ))
// //                     )}
// //                   </div>
// //                 </SheetContent>
// //               </Sheet>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //       <div className="flex-1 overflow-y-auto p-0" ref={containerRef}>
// //         <ChatMessageList
// //           messages={messages}
// //           onCheckNearbyStores={handleCheckNearbyStores}
// //         />
// //       </div>
// //       {showPharmacySection && (
// //         <PharmacySection
// //           medicineName={selectedMedicineForPharmacy}
// //           onClose={() => setShowPharmacySection(false)}
// //         />
// //       )}
// //       <div className="w-full flex flex-col items-center p-4">
// //         {isSavingMessage && user && (
// //           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// //             <Loader2 className="h-3 w-3 animate-spin" />
// //             Saving...
// //           </div>
// //         )}
// //         {conversationState === "awaitingAge" && (
// //           <AgeSelector onSelectAge={handleAgeSelect} />
// //         )}
// //         {conversationState === "awaitingGender" && (
// //           <GenderSelector onSelectGender={handleGenderSelect} />
// //         )}
// //         {conversationState === "awaitingTreatmentPreference" && (
// //           <TreatmentPreferenceSelector onSelectPreference={handleTreatmentPreferenceSelect} />
// //         )}
// //         {["awaitingSymptoms", "awaitingDetails"].includes(conversationState) && (
// //           <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
// //         )}
// //         {!user && (
// //           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
// //             <p className="text-sm text-blue-800">
// //               Sign in to save your conversations and access chat history
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }









// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useAuthContext } from "@/contexts/AuthContext";
// import type { Message } from "@/lib/types";
// import { ChatInput } from "./ChatInput";
// import { ChatMessageList } from "./ChatMessageList";
// import { handleSymptomAnalysis } from "@/actions/chatActions";
// import { useToast } from "@/hooks/use-toast";
// import { PharmacySection } from "./PharmacySection";
// import { AgeSelector } from "./AgeSelector";
// import { GenderSelector } from "./GenderSelector";
// import { TreatmentPreferenceSelector } from "./TreatmentPreferenceSelector";
// import { Button } from "@/components/ui/button";
// import { Plus, History, Loader2, Link as LinkIcon } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ChatHistoryItem } from "./ChatHistoryItem";

// const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL || "http://localhost:8000/api";


// interface Conversation {
//   id: string;
//   title: string;
//   createdAt: string;
//   updatedAt: string;
//   messages?: {
//     id: string;
//   }[];
// }

// interface ChatMessage {
//   id: string;
//   content: string;
//   role: 'USER' | 'ASSISTANT' | 'SYSTEM';
//   createdAt: string;
//   metadata?: string;
// }

// const initialBotMessage: Message = {
//   id: "initial-bot",
//   sender: "bot",
//   text: "Hello! I'm your MediQuery AI assistant.\n\n What are you feeling today?",
//   timestamp: new Date(),
// };

// interface ChatInterfaceProps {
//   sharedMessages?: ChatMessage[] | null;
// }

// type ConversationState = "awaitingSymptoms" | "awaitingAge" | "awaitingGender" | "awaitingTreatmentPreference" | "awaitingDetails" | "readyForAnalysis";

// export function ChatInterface({ sharedMessages }: ChatInterfaceProps) {
//   const { user } = useAuthContext();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPharmacySection, setShowPharmacySection] = useState(false);
//   const [selectedMedicineForPharmacy, setSelectedMedicineForPharmacy] = useState<string | null>(null);
//   const [conversationState, setConversationState] = useState<ConversationState>("awaitingSymptoms");
//   const [isSharedChat, setIsSharedChat] = useState(false);

//   const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [isLoadingConversations, setIsLoadingConversations] = useState(false);
//   const [isSavingMessage, setIsSavingMessage] = useState(false);

//   const [collectedData, setCollectedData] = useState({
//     symptoms: "",
//     age: "",
//     gender: "",
//     treatmentPreference: "",
//     otherDetails: "",
//   });

//   const { toast } = useToast();
//   const messageIdCounterRef = useRef(0);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   // Convert ChatMessage to Message format
//   const convertChatMessageToMessage = (chatMsg: ChatMessage): Message => {
//     let senderType: 'user' | 'bot' | 'system';
//     switch (chatMsg.role) {
//       case 'USER':
//         senderType = 'user';
//         break;
//       case 'ASSISTANT':
//         senderType = 'bot';
//         break;
//       case 'SYSTEM':
//         senderType = 'system';
//         break;
//       default:
//         senderType = 'bot';
//     }

//     const message: Message = {
//       id: chatMsg.id,
//       sender: senderType,
//       text: chatMsg.content,
//       timestamp: new Date(chatMsg.createdAt),
//     };

//     // Parse metadata if it exists
//     if (chatMsg.metadata) {
//       try {
//         const metadata = JSON.parse(chatMsg.metadata);
//         if (metadata.suggestions) {
//           message.suggestions = metadata.suggestions;
//         }
//         if (metadata.homeRemedies) {
//           message.homeRemedies = metadata.homeRemedies;
//         }
//       } catch (error) {
//         console.warn('Failed to parse message metadata:', error);
//       }
//     }

//     return message;
//   };

//   // Initialize messages based on sharedMessages prop
//   useEffect(() => {
//     if (sharedMessages && sharedMessages.length > 0) {
//       const loadedMessages = sharedMessages.map(convertChatMessageToMessage);
//       setMessages(loadedMessages);
//       setIsSharedChat(true);
//       setConversationState("awaitingSymptoms"); // Set to read-only mode for shared chats
//     } else {
//       setMessages([initialBotMessage]);
//       setIsSharedChat(false);
//     }
//   }, [sharedMessages]);

//   const generateUniqueId = () => {
//     messageIdCounterRef.current += 1;
//     return `msg-${messageIdCounterRef.current}`;
//   };

//   const getAuthToken = async () => {
//     if (!user) return null;
//     try {
//       return await user.getIdToken();
//     } catch (error) {
//       console.error('Error getting auth token:', error);
//       return null;
//     }
//   };

//   const apiCall = async (endpoint: string, options: RequestInit = {}) => {
//     const token = await getAuthToken();
//     if (!token) {
//       throw new Error('Authentication required');
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       ...options,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({ error: 'Network error' }));
//       throw new Error(error.error || 'API request failed');
//     }

//     return response.json();
//   };

//   const loadConversations = async () => {
//     if (!user) return;

//     setIsLoadingConversations(true);
//     try {
//       const data = await apiCall(`/api/chat/conversations`);
//       setConversations(data.conversations || []);
//     } catch (error) {
//       console.error('Error loading conversations:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load conversation history",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoadingConversations(false);
//     }
//   };

//   const startNewChat = () => {
//     setCurrentConversationId(null);
//     setMessages([initialBotMessage]);
//     setConversationState("awaitingSymptoms");
//     setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
//     setIsSharedChat(false);
//     toast({
//       title: "New Chat",
//       description: "Ready to start a new medical consultation.",
//     });
//   };

//   const loadConversation = async (conversationId: string) => {
//     if (!user) return;
//     try {
//       const data = await apiCall(`/chat/conversations/${conversationId}`);
//       const conversation = data.conversation;

//       const loadedMessages: Message[] = conversation.messages.map((msg: ChatMessage) =>
//         convertChatMessageToMessage(msg)
//       );

//       setCurrentConversationId(conversationId);
//       setMessages(loadedMessages.length > 0 ? loadedMessages : [initialBotMessage]);
//       setConversationState("awaitingSymptoms");
//       setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
//       setIsSharedChat(false);
//     } catch (error) {
//       console.error('Error loading conversation:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load conversation",
//         variant: "destructive",
//       });
//     }
//   };

//   const saveMessage = async (message: Omit<Message, "id" | "timestamp">, conversationId?: string) => {
//     if (!user) return null;

//     const targetConversationId = conversationId || currentConversationId;
//     if (!targetConversationId) return null;

//     try {
//       const role = message.sender === 'user' ? 'USER' :
//         message.sender === 'bot' ? 'ASSISTANT' : 'SYSTEM';

//       const metadata = {
//         ...(message.suggestions && { suggestions: message.suggestions }),
//         ...(message.homeRemedies && { homeRemedies: message.homeRemedies }),
//       };

//       const data = await apiCall(`/chat/conversations/${targetConversationId}/messages`, {
//         method: 'POST',
//         body: JSON.stringify({
//           content: message.text || '',
//           role,
//           metadata: Object.keys(metadata).length > 0 ? metadata : null,
//         }),
//       });
//       return data.message;
//     } catch (error) {
//       console.error('Error saving message:', error);
//       return null;
//     }
//   };

//   const updateConversationTitle = async (conversationId: string, newTitle: string) => {
//     if (!user) return;
//     try {
//       await apiCall(`/chat/conversations/${conversationId}`, {
//         method: 'PUT',
//         body: JSON.stringify({ title: newTitle }),
//       });
//       loadConversations();
//       toast({ title: "Success", description: "Chat title updated." });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to rename chat.", variant: "destructive" });
//     }
//   };

//   const deleteConversation = async (conversationId: string) => {
//     if (!user) return;
//     try {
//       await apiCall(`/chat/conversations/${conversationId}`, {
//         method: 'DELETE',
//       });
//       setConversations(prev => prev.filter(c => c.id !== conversationId));

//       if (currentConversationId === conversationId) {
//         setCurrentConversationId(null);
//         setMessages([initialBotMessage]);
//       }

//       toast({
//         title: "Deleted",
//         description: "Conversation deleted successfully",
//       });
//     } catch (error) {
//       console.error('Error deleting conversation:', error);
//       toast({
//         title: "Error",
//         description: "Failed to delete conversation",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       loadConversations();
//     }
//   }, [user]);

//   const addMessage = async (message: Omit<Message, "id" | "timestamp">) => {
//     const newMessage = {
//       ...message,
//       id: generateUniqueId(),
//       timestamp: new Date()
//     };
//     setMessages((prev) => [...prev, newMessage]);

//     if (user && currentConversationId && !isSharedChat) {
//       setIsSavingMessage(true);
//       await saveMessage(message);
//       setIsSavingMessage(false);
//     }
//     return newMessage;
//   };

//   const handleSendMessage = async (text: string) => {
//     if (!text.trim() || isSharedChat) return; // Prevent sending messages in shared chat mode

//     let conversationId = currentConversationId;

//     if (!conversationId && user) {
//       try {
//         const data = await apiCall('/chat/conversations', {
//           method: 'POST',
//           body: JSON.stringify({
//             title: text.trim().substring(0, 50) + (text.trim().length > 50 ? "..." : "")
//           }),
//         });
//         conversationId = data.conversation.id;
//         setCurrentConversationId(conversationId);
//         loadConversations();
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to create new conversation",
//           variant: "destructive",
//         });
//         return;
//       }
//     }

//     await addMessage({ sender: "user", text });
//     setIsLoading(true);

//     switch (conversationState) {
//       case "awaitingSymptoms":
//         setCollectedData(prev => ({ ...prev, symptoms: text }));
//         setIsLoading(false);
//         setConversationState("awaitingAge");
//         await addMessage({ sender: "bot", text: "Thank you. Please tell me your age." });
//         break;

//       case "awaitingDetails":
//         const finalPrompt = `
//           **Symptoms:** ${collectedData.symptoms}
//           **Age:** ${collectedData.age}
//           **Gender:** ${collectedData.gender}
//           **Treatment Preference:** ${collectedData.treatmentPreference}
//           **Other Details:** ${text}
//         `;
//         const thinkingMessageId = generateUniqueId();
//         setMessages((prev) => [
//           ...prev,
//           { id: thinkingMessageId, sender: "bot", isLoading: true, timestamp: new Date() },
//         ]);
//         try {
//           const result = await handleSymptomAnalysis(finalPrompt);
//           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
//           setIsLoading(false);

//           if ("error" in result) {
//             await addMessage({ sender: "system", text: `AI Error: ${result.error}` });
//             toast({
//               title: "Gemini AI Error",
//               description: result.error,
//               variant: "destructive",
//             });
//           } else if (result.medicineSuggestions?.length || result.homeRemedies?.length) {
//             let responseText = "**Gemini AI Analysis Complete!**\n\n";

//             if (result.generalAdvice) {
//               responseText += `**General Advice:** ${result.generalAdvice}\n\n`;
//             }
//             if (result.redFlags) {
//               responseText += `**Warning Signs:** ${result.redFlags}\n\n`;
//             }
//             if ((collectedData.treatmentPreference === "medicine" || collectedData.treatmentPreference === "both") && result.medicineSuggestions?.length) {
//               responseText += "**AI Recommended Medicines:**";
//               await addMessage({
//                 sender: "bot",
//                 text: responseText,
//                 suggestions: result.medicineSuggestions
//               });
//               responseText = "";
//             }
//             if ((collectedData.treatmentPreference === "home_remedies" || collectedData.treatmentPreference === "both") && result.homeRemedies?.length) {
//               const homeRemedyText = collectedData.treatmentPreference === "home_remedies" ? responseText + "**Natural Home Remedies:**" : "**Natural Home Remedies:**";
//               setTimeout(async () => {
//                 await addMessage({
//                   sender: "bot",
//                   text: homeRemedyText,
//                   homeRemedies: result.homeRemedies
//                 });
//               }, collectedData.treatmentPreference === "both" ? 1500 : 0);
//             }
//             if (result.disclaimer) {
//               setTimeout(async () => {
//                 await addMessage({
//                   sender: "system",
//                   text: `${result.disclaimer}`
//                 });
//               }, 2000);
//             }
//           } else {
//             await addMessage({
//               sender: "bot",
//               text: "Gemini AI couldn't find specific suggestions for your symptoms. Try rephrasing or provide more specific details.\n\nRemember: I'm just an AI assistant, not a real doctor.",
//             });
//           }
//         } catch (error) {
//           setIsLoading(false);
//           setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
//           await addMessage({
//             sender: "system",
//             text: "Something went wrong with Gemini AI. Please try again or try later.",
//           });
//           toast({
//             title: "Connection Error",
//             description: "Gemini AI service temporarily unavailable",
//             variant: "destructive",
//           });
//         }
//         setConversationState("awaitingSymptoms");
//         setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
//         break;
//     }
//   };

//   const handleAgeSelect = async (age: string) => {
//     if (isSharedChat) return;
//     setCollectedData(prev => ({ ...prev, age }));
//     await addMessage({ sender: "user", text: `Age: ${age}` });
//     setConversationState("awaitingGender");
//     await addMessage({ sender: "bot", text: "Thank you. Now, please tell me your gender." });
//   };

//   const handleGenderSelect = async (gender: string) => {
//     if (isSharedChat) return;
//     setCollectedData(prev => ({ ...prev, gender }));
//     await addMessage({ sender: "user", text: `Gender: ${gender}` });
//     setConversationState("awaitingTreatmentPreference");
//     await addMessage({ sender: "bot", text: "What type of treatment would you prefer?" });
//   };

//   const handleTreatmentPreferenceSelect = async (preference: string) => {
//     if (isSharedChat) return;
//     const preferenceLabels = {
//       "medicine": "Medicine Recommendations",
//       "home_remedies": "Home Remedies",
//       "both": "Both Medicine & Home Remedies"
//     };

//     setCollectedData(prev => ({ ...prev, treatmentPreference: preference }));
//     await addMessage({ sender: "user", text: `Treatment Preference: ${preferenceLabels[preference as keyof typeof preferenceLabels]}` });
//     setConversationState("awaitingDetails");
//     await addMessage({ sender: "bot", text: "Perfect! Are you experiencing anything else unusual or any additional details you'd like to share?" });
//   };

//   const handleCheckNearbyStores = (medicineName: string) => {
//     setSelectedMedicineForPharmacy(medicineName);
//     setShowPharmacySection(true);
//   };

//   return (
//     <div className="flex flex-col h-[80vh] w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
//       <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
//         <h2 className="text-sm font-semibold text-gray-800 md:text-lg">
//           {isSharedChat ? "MediQuery AI - Shared Chat" : "MediQuery AI"}
//         </h2>
//         <div className="flex items-center gap-2">
//           {user && !isSharedChat && (
//             <>
//               <Button
//                 onClick={startNewChat}
//                 size="sm"
//                 variant="outline"
//                 className="flex items-center gap-2"
//               >
//                 <Plus className="h-4 w-4" />
//                 New Chat
//               </Button>
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="flex items-center gap-2"
//                     onClick={loadConversations}
//                   >
//                     <History className="h-4 w-4" />
//                     History
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent>
//                   <SheetHeader>
//                     <SheetTitle>Chat History</SheetTitle>
//                     <SheetDescription>
//                       Your previous medical consultations
//                     </SheetDescription>
//                   </SheetHeader>
//                   <div className="mt-6 space-y-2">
//                     {isLoadingConversations ? (
//                       <div className="flex items-center justify-center p-4">
//                         <Loader2 className="h-6 w-6 animate-spin" />
//                       </div>
//                     ) : conversations.length === 0 ? (
//                       <p className="text-gray-500 text-center p-4">No conversations yet</p>
//                     ) : (
//                       conversations.map((conversation) => (
//                         <ChatHistoryItem
//                           key={conversation.id}
//                           conversation={conversation}
//                           onLoadConversation={() => loadConversation(conversation.id)}
//                           onDeleteConversation={deleteConversation}
//                           onRenameConversation={updateConversationTitle}
//                         />
//                       ))
//                     )}
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </>
//           )}
//           {isSharedChat && (
//             <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full md:text-sm">
//               Read-only shared chat
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-0" ref={containerRef}>
//         <ChatMessageList
//           messages={messages}
//           onCheckNearbyStores={handleCheckNearbyStores}
//         />
//       </div>
//       {showPharmacySection && (
//         <PharmacySection
//           medicineName={selectedMedicineForPharmacy}
//           onClose={() => setShowPharmacySection(false)}
//         />
//       )}

//       {/* Only show input controls if it's not a shared chat */}
//       {!isSharedChat && (
//         <div className="w-full flex flex-col items-center p-4">
//           {isSavingMessage && user && (
//             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//               <Loader2 className="h-3 w-3 animate-spin" />
//               Saving...
//             </div>
//           )}
//           {conversationState === "awaitingAge" && (
//             <AgeSelector onSelectAge={handleAgeSelect} />
//           )}
//           {conversationState === "awaitingGender" && (
//             <GenderSelector onSelectGender={handleGenderSelect} />
//           )}
//           {conversationState === "awaitingTreatmentPreference" && (
//             <TreatmentPreferenceSelector onSelectPreference={handleTreatmentPreferenceSelect} />
//           )}
//           {["awaitingSymptoms", "awaitingDetails"].includes(conversationState) && (
//             <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
//           )}
//           {!user && (
//             <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
//               <p className="text-sm text-blue-800">
//                 Sign in to save your conversations and access chat history
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* For shared chats, show a message about viewing only */}
//       {isSharedChat && (
//         <div className="w-full p-4 bg-gray-50 border-t">
//           <div className="text-center text-sm text-gray-600">
//             This is a shared conversation. You can view the messages but cannot send new ones.
//             {!user && (
//               <div className="mt-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => window.location.href = '/auth/login'}
//                 >
//                   Start Your Own Chat
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import type { Message } from "@/lib/types";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { handleSymptomAnalysis } from "@/actions/chatActions";
import { useToast } from "@/hooks/use-toast";
import { PharmacySection } from "./PharmacySection";
import { AgeSelector } from "./AgeSelector";
import { GenderSelector } from "./GenderSelector";
import { TreatmentPreferenceSelector } from "./TreatmentPreferenceSelector";
import { Button } from "@/components/ui/button";
import { Plus, History, Loader2, Link as LinkIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatHistoryItem } from "./ChatHistoryItem";

// Fixed API base URL - removed /api suffix
const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL || "http://localhost:8000";

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages?: {
    id: string;
  }[];
}

interface ChatMessage {
  id: string;
  content: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  createdAt: string;
  metadata?: string;
}

const initialBotMessage: Message = {
  id: "initial-bot",
  sender: "bot",
  text: "Hello! I'm your MediQuery AI assistant.\n\n What are you feeling today?",
  timestamp: new Date(),
};

interface ChatInterfaceProps {
  sharedMessages?: ChatMessage[] | null;
}

type ConversationState = "awaitingSymptoms" | "awaitingAge" | "awaitingGender" | "awaitingTreatmentPreference" | "awaitingDetails" | "readyForAnalysis";

export function ChatInterface({ sharedMessages }: ChatInterfaceProps) {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPharmacySection, setShowPharmacySection] = useState(false);
  const [selectedMedicineForPharmacy, setSelectedMedicineForPharmacy] = useState<string | null>(null);
  const [conversationState, setConversationState] = useState<ConversationState>("awaitingSymptoms");
  const [isSharedChat, setIsSharedChat] = useState(false);

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isSavingMessage, setIsSavingMessage] = useState(false);

  const [collectedData, setCollectedData] = useState({
    symptoms: "",
    age: "",
    gender: "",
    treatmentPreference: "",
    otherDetails: "",
  });

  const { toast } = useToast();
  const messageIdCounterRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Convert ChatMessage to Message format
  const convertChatMessageToMessage = (chatMsg: ChatMessage): Message => {
    let senderType: 'user' | 'bot' | 'system';
    switch (chatMsg.role) {
      case 'USER':
        senderType = 'user';
        break;
      case 'ASSISTANT':
        senderType = 'bot';
        break;
      case 'SYSTEM':
        senderType = 'system';
        break;
      default:
        senderType = 'bot';
    }

    const message: Message = {
      id: chatMsg.id,
      sender: senderType,
      text: chatMsg.content,
      timestamp: new Date(chatMsg.createdAt),
    };

    // Parse metadata if it exists
    if (chatMsg.metadata) {
      try {
        const metadata = JSON.parse(chatMsg.metadata);
        if (metadata.suggestions) {
          message.suggestions = metadata.suggestions;
        }
        if (metadata.homeRemedies) {
          message.homeRemedies = metadata.homeRemedies;
        }
      } catch (error) {
        console.warn('Failed to parse message metadata:', error);
      }
    }

    return message;
  };

  // Initialize messages based on sharedMessages prop
  useEffect(() => {
    if (sharedMessages && sharedMessages.length > 0) {
      const loadedMessages = sharedMessages.map(convertChatMessageToMessage);
      setMessages(loadedMessages);
      setIsSharedChat(true);
      setConversationState("awaitingSymptoms");
    } else {
      setMessages([initialBotMessage]);
      setIsSharedChat(false);
    }
  }, [sharedMessages]);

  const generateUniqueId = () => {
    messageIdCounterRef.current += 1;
    return `msg-${messageIdCounterRef.current}`;
  };

  const getAuthToken = async () => {
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    // Fixed API URL - ensure /api prefix is added correctly
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('Making API call to:', url);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API call failed:', response.status, errorText);
      let errorMessage = 'API request failed';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  };

  const loadConversations = async () => {
    if (!user) return;

    setIsLoadingConversations(true);
    try {
      const data = await apiCall('/api/chat/conversations');
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation history",
        variant: "destructive",
      });
    } finally {
      setIsLoadingConversations(false);
    }
  };

  const startNewChat = () => {
    setCurrentConversationId(null);
    setMessages([initialBotMessage]);
    setConversationState("awaitingSymptoms");
    setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
    setIsSharedChat(false);
    toast({
      title: "New Chat",
      description: "Ready to start a new medical consultation.",
    });
  };

  const loadConversation = async (conversationId: string) => {
    if (!user) return;
    try {
      const data = await apiCall(`/api/chat/conversations/${conversationId}`);
      const conversation = data.conversation;

      const loadedMessages: Message[] = conversation.messages.map((msg: ChatMessage) =>
        convertChatMessageToMessage(msg)
      );

      setCurrentConversationId(conversationId);
      setMessages(loadedMessages.length > 0 ? loadedMessages : [initialBotMessage]);
      setConversationState("awaitingSymptoms");
      setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
      setIsSharedChat(false);
      
      toast({
        title: "Chat Loaded",
        description: "Previous conversation loaded successfully.",
      });
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation",
        variant: "destructive",
      });
    }
  };

  const saveMessage = async (message: Omit<Message, "id" | "timestamp">, conversationId?: string) => {
    if (!user) return null;

    const targetConversationId = conversationId || currentConversationId;
    if (!targetConversationId) return null;

    try {
      const role = message.sender === 'user' ? 'USER' :
        message.sender === 'bot' ? 'ASSISTANT' : 'SYSTEM';

      const metadata = {
        ...(message.suggestions && { suggestions: message.suggestions }),
        ...(message.homeRemedies && { homeRemedies: message.homeRemedies }),
      };

      const data = await apiCall(`/api/chat/conversations/${targetConversationId}/messages`, {
        method: 'POST',
        body: JSON.stringify({
          content: message.text || '',
          role,
          metadata: Object.keys(metadata).length > 0 ? metadata : null,
        }),
      });
      return data.message;
    } catch (error) {
      console.error('Error saving message:', error);
      toast({
        title: "Warning",
        description: "Message not saved to history",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateConversationTitle = async (conversationId: string, newTitle: string) => {
    if (!user) return;
    try {
      await apiCall(`/api/chat/conversations/${conversationId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: newTitle }),
      });
      loadConversations();
      toast({ 
        title: "Success", 
        description: "Chat title updated." 
      });
    } catch (error) {
      console.error('Error updating conversation title:', error);
      toast({ 
        title: "Error", 
        description: "Failed to rename chat.", 
        variant: "destructive" 
      });
    }
  };

  const deleteConversation = async (conversationId: string) => {
    if (!user) return;
    try {
      await apiCall(`/api/chat/conversations/${conversationId}`, {
        method: 'DELETE',
      });
      setConversations(prev => prev.filter(c => c.id !== conversationId));

      if (currentConversationId === conversationId) {
        startNewChat();
      }

      toast({
        title: "Deleted",
        description: "Conversation deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const addMessage = async (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage = {
      ...message,
      id: generateUniqueId(),
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, newMessage]);

    if (user && currentConversationId && !isSharedChat) {
      setIsSavingMessage(true);
      await saveMessage(message);
      setIsSavingMessage(false);
    }
    return newMessage;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isSharedChat) return;

    let conversationId = currentConversationId;

    // Create new conversation if needed
    if (!conversationId && user) {
      try {
        const data = await apiCall('/api/chat/conversations', {
          method: 'POST',
          body: JSON.stringify({
            title: text.trim().substring(0, 50) + (text.trim().length > 50 ? "..." : "")
          }),
        });
        conversationId = data.conversation.id;
        setCurrentConversationId(conversationId);
        loadConversations();
        
        toast({
          title: "New Chat Created",
          description: "Your conversation has been saved.",
        });
      } catch (error) {
        console.error('Error creating conversation:', error);
        toast({
          title: "Error",
          description: "Failed to create new conversation. Messages won't be saved.",
          variant: "destructive",
        });
      }
    }

    await addMessage({ sender: "user", text });
    setIsLoading(true);

    switch (conversationState) {
      case "awaitingSymptoms":
        setCollectedData(prev => ({ ...prev, symptoms: text }));
        setIsLoading(false);
        setConversationState("awaitingAge");
        await addMessage({ sender: "bot", text: "Thank you. Please tell me your age." });
        break;

      case "awaitingDetails":
        const finalPrompt = `
          **Symptoms:** ${collectedData.symptoms}
          **Age:** ${collectedData.age}
          **Gender:** ${collectedData.gender}
          **Treatment Preference:** ${collectedData.treatmentPreference}
          **Other Details:** ${text}
        `;
        
        const thinkingMessageId = generateUniqueId();
        setMessages((prev) => [
          ...prev,
          { id: thinkingMessageId, sender: "bot", isLoading: true, timestamp: new Date() },
        ]);
        
        try {
          const result = await handleSymptomAnalysis(finalPrompt);
          setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
          setIsLoading(false);

          if ("error" in result) {
            await addMessage({ sender: "system", text: `AI Error: ${result.error}` });
            toast({
              title: "Gemini AI Error",
              description: result.error,
              variant: "destructive",
            });
          } else if (result.medicineSuggestions?.length || result.homeRemedies?.length) {
            let responseText = "**Gemini AI Analysis Complete!**\n\n";

            if (result.generalAdvice) {
              responseText += `**General Advice:** ${result.generalAdvice}\n\n`;
            }
            if (result.redFlags) {
              responseText += `**Warning Signs:** ${result.redFlags}\n\n`;
            }
            if ((collectedData.treatmentPreference === "medicine" || collectedData.treatmentPreference === "both") && result.medicineSuggestions?.length) {
              responseText += "**AI Recommended Medicines:**";
              await addMessage({
                sender: "bot",
                text: responseText,
                suggestions: result.medicineSuggestions
              });
              responseText = "";
            }
            if ((collectedData.treatmentPreference === "home_remedies" || collectedData.treatmentPreference === "both") && result.homeRemedies?.length) {
              const homeRemedyText = collectedData.treatmentPreference === "home_remedies" ? responseText + "**Natural Home Remedies:**" : "**Natural Home Remedies:**";
              setTimeout(async () => {
                await addMessage({
                  sender: "bot",
                  text: homeRemedyText,
                  homeRemedies: result.homeRemedies
                });
              }, collectedData.treatmentPreference === "both" ? 1500 : 0);
            }
            if (result.disclaimer) {
              setTimeout(async () => {
                await addMessage({
                  sender: "system",
                  text: `${result.disclaimer}`
                });
              }, 2000);
            }
          } else {
            await addMessage({
              sender: "bot",
              text: "Gemini AI couldn't find specific suggestions for your symptoms. Try rephrasing or provide more specific details.\n\nRemember: I'm just an AI assistant, not a real doctor.",
            });
          }
        } catch (error) {
          console.error('Error with symptom analysis:', error);
          setIsLoading(false);
          setMessages((prev) => prev.filter((m) => m.id !== thinkingMessageId));
          await addMessage({
            sender: "system",
            text: "Something went wrong with Gemini AI. Please try again or try later.",
          });
          toast({
            title: "Connection Error",
            description: "Gemini AI service temporarily unavailable",
            variant: "destructive",
          });
        }
        setConversationState("awaitingSymptoms");
        setCollectedData({ symptoms: "", age: "", gender: "", treatmentPreference: "", otherDetails: "" });
        break;
    }
  };

  const handleAgeSelect = async (age: string) => {
    if (isSharedChat) return;
    setCollectedData(prev => ({ ...prev, age }));
    await addMessage({ sender: "user", text: `Age: ${age}` });
    setConversationState("awaitingGender");
    await addMessage({ sender: "bot", text: "Thank you. Now, please tell me your gender." });
  };

  const handleGenderSelect = async (gender: string) => {
    if (isSharedChat) return;
    setCollectedData(prev => ({ ...prev, gender }));
    await addMessage({ sender: "user", text: `Gender: ${gender}` });
    setConversationState("awaitingTreatmentPreference");
    await addMessage({ sender: "bot", text: "What type of treatment would you prefer?" });
  };

  const handleTreatmentPreferenceSelect = async (preference: string) => {
    if (isSharedChat) return;
    const preferenceLabels = {
      "medicine": "Medicine Recommendations",
      "home_remedies": "Home Remedies",
      "both": "Both Medicine & Home Remedies"
    };

    setCollectedData(prev => ({ ...prev, treatmentPreference: preference }));
    await addMessage({ sender: "user", text: `Treatment Preference: ${preferenceLabels[preference as keyof typeof preferenceLabels]}` });
    setConversationState("awaitingDetails");
    await addMessage({ sender: "bot", text: "Perfect! Are you experiencing anything else unusual or any additional details you'd like to share?" });
  };

  const handleCheckNearbyStores = (medicineName: string) => {
    setSelectedMedicineForPharmacy(medicineName);
    setShowPharmacySection(true);
  };

  return (
    <div className="flex flex-col h-[80vh] w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-gray-800 md:text-lg">
          {isSharedChat ? "MediQuery AI - Shared Chat" : "MediQuery AI"}
        </h2>
        <div className="flex items-center gap-2">
          {user && !isSharedChat && (
            <>
              <Button
                onClick={startNewChat}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={loadConversations}
                  >
                    <History className="h-4 w-4" />
                    History
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Chat History</SheetTitle>
                    <SheetDescription>
                      Your previous medical consultations
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {isLoadingConversations ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    ) : conversations.length === 0 ? (
                      <p className="text-gray-500 text-center p-4">No conversations yet</p>
                    ) : (
                      conversations.map((conversation) => (
                        <ChatHistoryItem
                          key={conversation.id}
                          conversation={conversation}
                          onLoadConversation={() => loadConversation(conversation.id)}
                          onDeleteConversation={deleteConversation}
                          onRenameConversation={updateConversationTitle}
                        />
                      ))
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
          {isSharedChat && (
            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full md:text-sm">
              Read-only shared chat
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-0" ref={containerRef}>
        <ChatMessageList
          messages={messages}
          onCheckNearbyStores={handleCheckNearbyStores}
        />
      </div>
      {showPharmacySection && (
        <PharmacySection
          medicineName={selectedMedicineForPharmacy}
          onClose={() => setShowPharmacySection(false)}
        />
      )}

      {/* Only show input controls if it's not a shared chat */}
      {!isSharedChat && (
        <div className="w-full flex flex-col items-center p-4">
          {isSavingMessage && user && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </div>
          )}
          {conversationState === "awaitingAge" && (
            <AgeSelector onSelectAge={handleAgeSelect} />
          )}
          {conversationState === "awaitingGender" && (
            <GenderSelector onSelectGender={handleGenderSelect} />
          )}
          {conversationState === "awaitingTreatmentPreference" && (
            <TreatmentPreferenceSelector onSelectPreference={handleTreatmentPreferenceSelect} />
          )}
          {["awaitingSymptoms", "awaitingDetails"].includes(conversationState) && (
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          )}
          {!user && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-sm text-blue-800">
                Sign in to save your conversations and access chat history
              </p>
            </div>
          )}
        </div>
      )}

      {/* For shared chats, show a message about viewing only */}
      {isSharedChat && (
        <div className="w-full p-4 bg-gray-50 border-t">
          <div className="text-center text-sm text-gray-600">
            This is a shared conversation. You can view the messages but cannot send new ones.
            {!user && (
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/auth/login'}
                >
                  Start Your Own Chat
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}