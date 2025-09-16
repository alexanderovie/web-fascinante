'use client';

import { useChatbot } from './ChatbotContext';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotFloatingButtonProps {
  className?: string;
}

const ChatbotFloatingButton = ({ className }: ChatbotFloatingButtonProps) => {
  const { isOpen, toggleChatbot } = useChatbot();

  return (
    <div className="fixed right-6 bottom-6 z-[9999] group">
      {/* Tooltip */}
      <div className="absolute right-20 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          {isOpen ? "Cerrar Chat" : "Abrir Chat"}
          <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>

      {/* Botón */}
      <button
        onClick={toggleChatbot}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-white",
          className
        )}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default ChatbotFloatingButton;
