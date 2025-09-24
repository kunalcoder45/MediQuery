// src/components/chat/ChatHistoryItem.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Share2, Info, Loader2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages?: { id: string }[];
}

interface ChatHistoryItemProps {
  conversation: Conversation;
  onLoadConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
  onRenameConversation: (conversationId: string, newTitle: string) => void;
}

export function ChatHistoryItem({
  conversation,
  onLoadConversation,
  onDeleteConversation,
  onRenameConversation,
}: ChatHistoryItemProps) {
  const { toast } = useToast();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(conversation.title);
  const [isPropertiesDialogOpen, setIsPropertiesDialogOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== conversation.title) {
      onRenameConversation(conversation.id, newTitle.trim());
    }
    setIsRenaming(false);
  };

  const handleShare = () => {
    setIsSharing(true);
    const shareableLink = `${window.location.origin}/chat/${conversation.id}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Link Copied!",
        description: "A shareable link to this chat has been copied to your clipboard.",
      });
      setIsSharing(false);
    }).catch(() => {
      toast({
        title: "Failed to Copy",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
      setIsSharing(false);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
        <div 
          className="flex-1 min-w-0" 
          onClick={() => {
            if (!isRenaming) {
              onLoadConversation(conversation.id);
            }
          }}
        >
          {isRenaming ? (
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') setIsRenaming(false);
              }}
              onBlur={handleRename}
              autoFocus
              className="p-1 text-sm h-auto"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className="font-medium text-sm truncate">{conversation.title}</p>
          )}
          <p className="text-xs text-gray-500">
            {new Date(conversation.updatedAt).toLocaleDateString()}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setIsRenaming(true)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              {isSharing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Share2 className="mr-2 h-4 w-4" />
              )}
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsPropertiesDialogOpen(true)}>
              <Info className="mr-2 h-4 w-4" />
              <span>Properties</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDeleteConversation(conversation.id);
              }}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isPropertiesDialogOpen} onOpenChange={setIsPropertiesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Properties</DialogTitle>
            <DialogDescription>
              Information about this conversation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p><strong>Title:</strong> {conversation.title}</p>
            <p><strong>Created:</strong> {new Date(conversation.createdAt).toLocaleString()}</p>
            <p><strong>Last Updated:</strong> {new Date(conversation.updatedAt).toLocaleString()}</p>
            <p><strong>Total Messages:</strong> {conversation.messages?.length || 'N/A'}</p>
            <p><strong>Unique ID:</strong> {conversation.id}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}