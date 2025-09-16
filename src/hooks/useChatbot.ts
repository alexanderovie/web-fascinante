'use client';

import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: File[];
}

export interface UseChatbotReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  sendMessage: (content: string, files?: File[]) => Promise<void>;
  clearChat: () => void;
}

export function useChatbot(): UseChatbotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (content: string, files?: File[]) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      files
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);

    // Crear mensaje de asistente vacío
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      // Preparar historial para enviar a la API
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Llamar a la API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: history
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Simular streaming para mejor UX
        const responseText = data.message;
        let currentText = '';
        
        for (let i = 0; i < responseText.length; i++) {
          currentText += responseText[i];
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessage.id 
                ? { ...msg, content: currentText }
                : msg
            )
          );
          // Pequeña pausa para simular streaming
          await new Promise(resolve => setTimeout(resolve, 20));
        }
      } else {
        throw new Error(data.error || 'Error en la respuesta');
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: 'Lo siento, hubo un error. Por favor, intenta de nuevo.' }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isStreaming,
    sendMessage,
    clearChat
  };
}
