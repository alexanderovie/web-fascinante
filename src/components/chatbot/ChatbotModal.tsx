'use client';

import { useChatbot } from './ChatbotContext';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotModalProps {
  className?: string;
  children: React.ReactNode;
}

const ChatbotModal = ({ className, children }: ChatbotModalProps) => {
  const { isOpen, closeChatbot } = useChatbot();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md">
      <div className={cn(
        "fixed right-4 top-20 bottom-4 left-4 md:left-auto md:w-[500px] lg:w-[600px] xl:w-[700px] rounded-lg border bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-in-out",
        className
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-semibold">Fascinante Digital Assistant</h3>
            <button
              onClick={closeChatbot}
              className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
