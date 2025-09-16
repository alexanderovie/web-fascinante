'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotButtonProps {
  className?: string;
}

const ChatbotButton = ({ className }: ChatbotButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className={cn(
          "fixed right-4 bottom-20 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary-600",
          className
        )}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chatbot Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm">
          <div className="fixed right-4 bottom-24 h-[600px] w-[400px] rounded-lg border bg-background shadow-2xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="text-lg font-semibold">Fascinante Digital Assistant</h3>
                <button
                  onClick={toggleChatbot}
                  className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* Chat Content - Aquí irá el componente del chatbot */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full w-full">
                  {/* Placeholder para el chatbot - se reemplazará con el componente real */}
                  <div className="flex h-full items-center justify-center text-gray-500">
                    Chatbot Interface Coming Soon...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
