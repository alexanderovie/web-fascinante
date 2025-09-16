import { GoogleGenerativeAI, GenerativeModel, ChatSession } from '@google/generative-ai';

// Configuración de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Modelo principal: Gemini 2.5 Pro
const model: GenerativeModel = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  },
  systemInstruction: `Eres el asistente de IA de Fascinante Digital, una agencia de marketing digital especializada en:

- SEO (Search Engine Optimization)
- SEM (Search Engine Marketing) 
- Google Ads y Facebook Ads
- Marketing de Contenidos
- Email Marketing
- Automatización de Marketing
- Analytics y Conversión
- Desarrollo Web

Tu personalidad:
- Profesional pero amigable
- Conocedor de marketing digital
- Siempre dispuesto a ayudar
- Respondes en español (a menos que se pida en inglés)
- Das consejos prácticos y accionables
- Siempre ofreces valor real

Cuando no sepas algo específico, admítelo y ofrece conectar al usuario con un especialista humano.`
});

// Función para crear una nueva sesión de chat
export function createChatSession(): ChatSession {
  return model.startChat({
    history: [],
  });
}

// Función para enviar mensaje y obtener respuesta con streaming
export async function* sendMessageStream(
  session: ChatSession, 
  message: string
): AsyncGenerator<string, void, unknown> {
  try {
    const result = await session.sendMessageStream(message);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        yield chunkText;
      }
    }
  } catch (error) {
    console.error('Error en Gemini:', error);
    yield 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.';
  }
}

// Función para enviar mensaje simple (sin streaming)
export async function sendMessage(
  session: ChatSession, 
  message: string
): Promise<string> {
  try {
    const result = await session.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error en Gemini:', error);
    return 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.';
  }
}

// Función para procesar archivos (imágenes, PDFs, etc.)
export async function processFileWithGemini(
  file: File,
  prompt: string
): Promise<string> {
  try {
    // Convertir archivo a base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    // Determinar tipo MIME
    const mimeType = file.type;
    
    // Crear modelo con soporte para archivos
    const visionModel = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });
    
    const result = await visionModel.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: mimeType
        }
      }
    ]);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error procesando archivo:', error);
    return 'No pude procesar este archivo. Por favor, intenta con otro formato.';
  }
}

// Tipos para TypeScript
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: File[];
}

export interface ChatSessionData {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
