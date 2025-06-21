"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Send, Heart, ThumbsUp, Smile, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LiveChatProps {
  isLive: boolean;
  channelID?: string;
}

interface ChatMessage {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  isHost?: boolean;
}

export default function LiveChat({ isLive, channelID }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      author: "Pastor John",
      message: "Welcome everyone to our live service! God bless you all.",
      timestamp: new Date(Date.now() - 300000),
      isHost: true,
    },
    {
      id: "2",
      author: "Sarah_M",
      message: "Praise the Lord! So excited to be here 🙏",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      author: "David_K",
      message:
        "Romans 12:3 (NKJV) - For I say, through the grace given to me, to everyone who is among you, not to think of himself more highly than he ought to think",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: "4",
      author: "Grace_A",
      message:
        "We need to collaborate with others who have similar gifting to fulfill a mission or a goal",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "5",
      author: "Emmanuel_O",
      message:
        "If you said the salvation prayer, please visit our website for more information. God bless you!",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate new messages coming in during live stream
    if (isLive) {
      const interval = setInterval(() => {
        const sampleMessages = [
          "Amen! 🙏",
          "Praise God!",
          "Thank you Pastor for this word",
          "God is good all the time!",
          "Praying for everyone watching",
          "What a powerful message!",
          "Glory to God! 🔥",
        ];

        const randomMessage =
          sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          author: `User_${Math.floor(Math.random() * 1000)}`,
          message: randomMessage,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMsg]);
      }, 15000); // New message every 15 seconds

      return () => clearInterval(interval);
    }
  }, [isLive]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        author: "You",
        message: newMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isLive) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Chat Not Available
        </h3>
        <p className="text-gray-500">
          Live chat is only available during live streams.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Live Chat</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                {message.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`font-semibold text-sm ${
                      message.isHost ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {message.author}
                    {message.isHost && (
                      <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                        HOST
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 break-words">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">Love</span>
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-xs">Amen</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Smile className="h-4 w-4 mr-1" />
            <span className="text-xs">Praise</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
