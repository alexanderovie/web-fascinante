'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const TestChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de prueba más simple */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-red-600 border-2 border-white"
        style={{ 
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          zIndex: 9999
        }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Modal de prueba */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="fixed right-6 bottom-24 h-[400px] w-[350px] rounded-lg border bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="text-lg font-semibold">Test Chatbot</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 p-4">
                <p>¡Hola! Este es un chatbot de prueba.</p>
                <p>¿En qué puedo ayudarte?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestChatbotButton;
