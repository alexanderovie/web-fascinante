'use client';

import { useChatbot } from './ChatbotContext';
import ChatbotMaximized from './ChatbotMaximized';
import AIChatInterface from './components/ai-chat-interface';

const ChatbotWrapper = () => {
  const { isOpen } = useChatbot();

  if (!isOpen) return null;

  return (
    <ChatbotMaximized>
      <div className="h-full w-full">
        {/* Componente original del chatbot manteniendo exactamente el mismo UI */}
        <AIChatInterface />
      </div>
    </ChatbotMaximized>
  );
};

export default ChatbotWrapper;
