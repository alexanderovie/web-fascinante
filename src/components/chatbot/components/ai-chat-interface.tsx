"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowUpIcon,
  MicIcon,
  Paperclip,
  SquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  X
} from "lucide-react";
import { CodeIcon, CopyIcon } from "@radix-ui/react-icons";
import Lottie from "lottie-react";

import {
  Input,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea
} from "@/components/ui/custom/prompt/input";
import { Button } from "@/components/ui/button";
import { ChatContainer } from "@/components/ui/custom/prompt/chat-container";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent
} from "@/components/ui/custom/prompt/message";
import { Markdown } from "@/components/ui/custom/prompt/markdown";
import { PromptLoader } from "@/components/ui/custom/prompt/loader";
import { PromptScrollButton } from "@/components/ui/custom/prompt/scroll-button";
import { AIUpgradePricingModal } from "./ai-upgrade-modal";
import aiSphereAnimation from "../ai-sphere-animation.json";
import { useChatbot } from "@/hooks/useChatbot";

export default function AIChatInterface() {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Usar el hook de chatbot con Gemini
  const { messages, isStreaming, sendMessage, clearChat } = useChatbot();

  const isFirstResponse = messages.length > 0;

  const handleSendMessage = async () => {
    if (prompt.trim() || files.length > 0) {
      await sendMessage(prompt, files);
      setPrompt("");
      setFiles([]);
      if (uploadInputRef?.current) {
        uploadInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = "";
    }
  };

  const FileListItem = ({
    file,
    dismiss = true,
    index
  }: {
    file: File;
    dismiss?: boolean;
    index: number;
  }) => (
    <div className="bg-gray-100 flex items-center gap-2 rounded-lg px-3 py-2 text-sm border">
      <Paperclip className="w-4 h-4 text-gray-500" />
      <span className="max-w-[120px] truncate text-gray-700">{file.name}</span>
      {dismiss && (
        <button
          onClick={() => handleRemoveFile(index)}
          className="hover:bg-gray-200 rounded-full p-1 transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl">
          {/* Welcome message */}
          {!isFirstResponse && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">FD</span>
                </div>
              </div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                ¡Hola! Soy tu Asistente de IA
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                de <span className="font-semibold text-purple-600">Fascinante Digital</span>
              </p>
              <p className="text-gray-500 text-center max-w-md">
                Pregúntame sobre marketing digital, SEO, SEM, o cualquier tema relacionado con tu negocio.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => {
            const isAssistant = message.role === "assistant";
            const isLastMessage = index === messages.length - 1;

            return (
              <div key={message.id} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-6`}>
                <div className={`flex max-w-[80%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'} items-start gap-3`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isAssistant 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600' 
                      : 'bg-gray-200'
                  }`}>
                    {isAssistant ? (
                      <span className="text-white text-sm font-bold">FD</span>
                    ) : (
                      <span className="text-gray-600 text-sm">U</span>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 ${isAssistant ? 'text-left' : 'text-right'}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl ${
                      isAssistant 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-purple-600 text-white'
                    }`}>
                      {isAssistant ? (
                        <div className="prose prose-sm max-w-none">
                          <Markdown className="text-gray-900">{message.content}</Markdown>
                        </div>
                      ) : (
                        <div className="text-white whitespace-pre-wrap">{message.content}</div>
                      )}
                    </div>
                    
                    {/* Message Actions for Assistant */}
                    {isAssistant && (
                      <div className={`flex items-center gap-1 mt-2 ${isLastMessage ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                          <ThumbsUpIcon className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                          <ThumbsDownIcon className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                          <CopyIcon className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isStreaming && (
            <div className="flex justify-start mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">FD</span>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto max-w-3xl">
          {/* Pro Plan Banner */}
          <div className="mb-4 bg-gray-50 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Use our faster AI on Pro Plan</span>
              <span>•</span>
              <AIUpgradePricingModal>
                <Link href="#" className="text-purple-600 hover:underline font-medium">
                  Upgrade
                </Link>
              </AIUpgradePricingModal>
            </div>
          </div>

          {/* Input Field */}
          <div className="relative">
            <div className="flex items-end gap-2 p-3 border border-gray-300 rounded-2xl bg-white shadow-sm focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              {/* File attachment */}
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    ref={uploadInputRef}
                  />
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </label>
              </button>

              {/* Text input */}
              <div className="flex-1">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Pregunta lo que quieras..."
                  className="w-full resize-none border-0 outline-none text-gray-900 placeholder-gray-500 bg-transparent"
                  rows={1}
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
              </div>

              {/* Send button */}
              <button
                onClick={handleSendMessage}
                disabled={!prompt.trim() || isStreaming}
                className={`p-2 rounded-full transition-colors ${
                  prompt.trim() && !isStreaming
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isStreaming ? (
                  <SquareIcon className="w-5 h-5" />
                ) : (
                  <ArrowUpIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Files preview */}
            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <FileListItem key={index} index={index} file={file} />
                ))}
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            Fascinante Digital Assistant puede cometer errores. Comprueba la información importante.
          </p>
        </div>
      </div>
    </div>
  );
}