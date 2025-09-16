import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { DataForSEOService, detectQueryType, extractEntities } from '@/lib/dataforseo-service';

// Configuración de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    // Detectar tipo de consulta y extraer entidades
    const queryType = detectQueryType(message);
    const entities = extractEntities(message);
    
    let dataForSEOResponse = null;
    let enhancedMessage = message;

    // Si es una consulta de SEO, obtener datos de DataForSEO
    if (queryType !== 'general' && (entities.keywords.length > 0 || entities.domains.length > 0)) {
      try {
        switch (queryType) {
          case 'keyword':
            if (entities.keywords.length > 0) {
              dataForSEOResponse = await DataForSEOService.analyzeKeywords(
                entities.keywords, 
                entities.locations[0] || 'United States'
              );
            }
            break;
            
          case 'domain':
            if (entities.domains.length > 0) {
              dataForSEOResponse = await DataForSEOService.analyzeDomain(entities.domains[0]);
            }
            break;
            
          case 'serp':
            if (entities.keywords.length > 0) {
              dataForSEOResponse = await DataForSEOService.analyzeSERP(
                entities.keywords[0], 
                entities.locations[0] || 'United States'
              );
            }
            break;
            
          case 'competitor':
            if (entities.domains.length > 0) {
              dataForSEOResponse = await DataForSEOService.analyzeCompetitors(entities.domains[0]);
            }
            break;
            
          case 'trend':
            if (entities.keywords.length > 0) {
              dataForSEOResponse = await DataForSEOService.analyzeTrends(
                entities.keywords[0], 
                entities.locations[0] || 'United States'
              );
            }
            break;
        }

        // Si tenemos datos de DataForSEO, enriquecer el mensaje
        if (dataForSEOResponse?.success) {
          enhancedMessage = `${message}\n\n[DATOS DE SEO EN TIEMPO REAL]\n${JSON.stringify(dataForSEOResponse.data, null, 2)}`;
        }
      } catch (dataForSEOError) {
        console.error('Error en DataForSEO:', dataForSEOError);
        // Continuar sin datos de DataForSEO
      }
    }

    // Crear sesión de chat con historial
    const chat = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    });

    // Enviar mensaje enriquecido y obtener respuesta
    const result = await chat.sendMessage(enhancedMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      message: text,
      success: true,
      dataForSEO: dataForSEOResponse?.success ? dataForSEOResponse.data : null
    });

  } catch (error) {
    console.error('Error en API de chat:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      success: false 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'API de chat funcionando',
    success: true 
  });
}
