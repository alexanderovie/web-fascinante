'use client';

import { useChatbot } from './ChatbotContext';
import { X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ChatbotMaximizedProps {
  className?: string;
  children: React.ReactNode;
}

const ChatbotMaximized = ({ className, children }: ChatbotMaximizedProps) => {
  const { isOpen, closeChatbot } = useChatbot();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm">
      <div className={cn(
        "fixed inset-0 bg-white shadow-2xl transition-all duration-300 ease-in-out",
        isMinimized && "top-auto bottom-4 h-16 w-80 left-auto right-4 rounded-lg",
        className
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">FD</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fascinante Digital Assistant</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={isMinimized ? "Maximizar" : "Minimizar"}
              >
                <Minimize2 className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={closeChatbot}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Cerrar"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex-1 overflow-hidden bg-white">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotMaximized;
