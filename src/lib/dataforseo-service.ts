import { DATAFORSEO_CONFIG, DATAFORSEO_ENDPOINTS } from './dataforseo-config';
import { 
  DATAFORSEO_SECURITY, 
  validateDataForSEOCredentials, 
  generateAuthHeaders,
  DataForSEOMetrics,
  DataForSEOAlerts,
  DataForSEOCircuitBreaker
} from './dataforseo-security';

// Validar credenciales al inicializar
if (!validateDataForSEOCredentials()) {
  throw new Error('DataForSEO credentials not properly configured');
}

// Instancias de monitoreo y seguridad
const metrics = DataForSEOMetrics.getInstance();
const alerts = DataForSEOAlerts.getInstance();
const circuitBreaker = DataForSEOCircuitBreaker.getInstance();

// Helper para hacer requests a DataForSEO
async function makeDataForSEORequest(endpoint: string, payload: any) {
  const url = `${DATAFORSEO_CONFIG.baseUrl}${endpoint}`;
  const headers = generateAuthHeaders();
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error(`DataForSEO API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Servicio de DataForSEO para el chatbot
export class DataForSEOService {
  
  // 🔍 Análisis de keywords
  static async analyzeKeywords(keywords: string[], location: string = 'United States') {
    if (!circuitBreaker.canExecute()) {
      return { success: false, error: 'Service temporarily unavailable' };
    }

    const startTime = Date.now();
    
    try {
      const response = await makeDataForSEORequest(
        DATAFORSEO_ENDPOINTS.KEYWORDS.GOOGLE_ADS_SEARCH_VOLUME,
        [{
          keywords,
          location_name: location,
          language_code: 'en'
        }]
      );

      const duration = Date.now() - startTime;
      metrics.recordRequest('keywords', duration, true);
      circuitBreaker.recordSuccess();

      return {
        success: true,
        data: response.tasks?.[0]?.result?.map(item => ({
          keyword: item.keyword,
          searchVolume: item.search_volume,
          competition: item.competition,
          cpc: item.cpc,
          competitionIndex: item.competition_index
        })) || []
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      metrics.recordRequest('keywords', duration, false);
      circuitBreaker.recordFailure();
      console.error('Error analyzing keywords:', error);
      return { success: false, error: 'Error analizando keywords' };
    }
  }

  // 🏆 Análisis de SERP
  static async analyzeSERP(keyword: string, location: string = 'United States') {
    if (!circuitBreaker.canExecute()) {
      return { success: false, error: 'Service temporarily unavailable' };
    }

    const startTime = Date.now();
    
    try {
      const response = await serpApi.googleOrganicLiveAdvanced({
        keyword,
        location_name: location,
        language_code: 'en',
        depth: 10
      });

      const duration = Date.now() - startTime;
      metrics.recordRequest('serp', duration, true);
      circuitBreaker.recordSuccess();

      return {
        success: true,
        data: {
          keyword,
          results: response.tasks?.[0]?.result?.[0]?.items?.map((item: any) => ({
            title: item.title,
            url: item.url,
            description: item.description,
            rank: item.rank_group,
            domain: item.domain
          })) || []
        }
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      metrics.recordRequest('serp', duration, false);
      circuitBreaker.recordFailure();
      console.error('Error analyzing SERP:', error);
      return { success: false, error: 'Error analizando SERP' };
    }
  }

  // 🌐 Análisis de dominio
  static async analyzeDomain(domain: string) {
    if (!circuitBreaker.canExecute()) {
      return { success: false, error: 'Service temporarily unavailable' };
    }

    const startTime = Date.now();
    
    try {
      const response = await dataforseoLabsApi.googleRankedKeywordsLive({
        target: domain,
        limit: 100
      });

      const duration = Date.now() - startTime;
      metrics.recordRequest('labs', duration, true);
      circuitBreaker.recordSuccess();

      return {
        success: true,
        data: {
          domain,
          rankedKeywords: response.tasks?.[0]?.result?.[0]?.items?.map((item: any) => ({
            keyword: item.keyword,
            rank: item.rank_group,
            searchVolume: item.search_volume,
            cpc: item.cpc
          })) || []
        }
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      metrics.recordRequest('labs', duration, false);
      circuitBreaker.recordFailure();
      console.error('Error analyzing domain:', error);
      return { success: false, error: 'Error analizando dominio' };
    }
  }

  // 📊 Análisis de competencia
  static async analyzeCompetitors(domain: string) {
    if (!circuitBreaker.canExecute()) {
      return { success: false, error: 'Service temporarily unavailable' };
    }

    const startTime = Date.now();
    
    try {
      const response = await dataforseoLabsApi.googleCompetitorsDomainLive({
        target: domain,
        limit: 20
      });

      const duration = Date.now() - startTime;
      metrics.recordRequest('labs', duration, true);
      circuitBreaker.recordSuccess();

      return {
        success: true,
        data: {
          domain,
          competitors: response.tasks?.[0]?.result?.[0]?.items?.map((item: any) => ({
            domain: item.domain,
            commonKeywords: item.common_keywords,
            domainRank: item.domain_rank,
            trafficValue: item.traffic_value
          })) || []
        }
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      metrics.recordRequest('labs', duration, false);
      circuitBreaker.recordFailure();
      console.error('Error analyzing competitors:', error);
      return { success: false, error: 'Error analizando competencia' };
    }
  }

  // 🎯 Sugerencias de keywords
  static async getKeywordSuggestions(seed: string, location: string = 'United States') {
    if (!circuitBreaker.canExecute()) {
      return { success: false, error: 'Service temporarily unavailable' };
    }

    const startTime = Date.now();
    
    try {
      const response = await keywordsDataApi.googleKeywordSuggestions({
        keyword: seed,
        location_name: location,
        language_code: 'en',
        limit: 50
      });

      const duration = Date.now() - startTime;
      metrics.recordRequest('keywords', duration, true);
      circuitBreaker.recordSuccess();

      return {
        success: true,
        data: response.tasks?.[0]?.result?.map((item: any) => ({
          keyword: item.keyword,
          searchVolume: item.search_volume,
          competition: item.competition,
          cpc: item.cpc
        })) || []
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      metrics.recordRequest('keywords', duration, false);
      circuitBreaker.recordFailure();
      console.error('Error getting keyword suggestions:', error);
      return { success: false, error: 'Error obteniendo sugerencias' };
    }
  }

  // 📈 Análisis de tendencias
  static async analyzeTrends(keyword: string, location: string = 'United States') {
    if (!circuitBreaker.canExecute()) {
      return { success: false, error: 'Service temporarily unavailable' };
    }

    const startTime = Date.now();
    
    try {
      const response = await keywordsDataApi.dataforseoTrendsExploreLive({
        keywords: [keyword],
        location_name: location,
        language_code: 'en'
      });

      const duration = Date.now() - startTime;
      metrics.recordRequest('keywords', duration, true);
      circuitBreaker.recordSuccess();

      return {
        success: true,
        data: response.tasks?.[0]?.result?.[0]?.items?.map((item: any) => ({
          keyword: item.keyword,
          searchVolume: item.search_volume,
          competition: item.competition,
          cpc: item.cpc,
          trends: item.trends
        })) || []
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      metrics.recordRequest('keywords', duration, false);
      circuitBreaker.recordFailure();
      console.error('Error analyzing trends:', error);
      return { success: false, error: 'Error analizando tendencias' };
    }
  }
}

// Helper para detectar el tipo de consulta
export function detectQueryType(query: string): 'keyword' | 'domain' | 'serp' | 'competitor' | 'trend' | 'general' {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('keyword') || lowerQuery.includes('palabra clave')) {
    return 'keyword';
  }
  
  if (lowerQuery.includes('dominio') || lowerQuery.includes('website') || lowerQuery.includes('sitio')) {
    return 'domain';
  }
  
  if (lowerQuery.includes('serp') || lowerQuery.includes('resultados') || lowerQuery.includes('posicionamiento')) {
    return 'serp';
  }
  
  if (lowerQuery.includes('competencia') || lowerQuery.includes('competidor')) {
    return 'competitor';
  }
  
  if (lowerQuery.includes('tendencia') || lowerQuery.includes('trend')) {
    return 'trend';
  }
  
  return 'general';
}

// Helper para extraer entidades de la consulta
export function extractEntities(query: string): { keywords: string[], domains: string[], locations: string[] } {
  const keywords: string[] = [];
  const domains: string[] = [];
  const locations: string[] = [];
  
  // Extraer keywords (palabras entre comillas o después de "keyword:")
  const keywordMatches = query.match(/"([^"]+)"/g) || query.match(/keyword:\s*([^\s]+)/gi) || [];
  keywords.push(...keywordMatches.map(match => match.replace(/"/g, '').replace(/keyword:\s*/i, '')));
  
  // Extraer dominios
  const domainMatches = query.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g) || [];
  domains.push(...domainMatches.map(domain => domain.replace(/https?:\/\//, '').replace(/www\./, '')));
  
  // Extraer ubicaciones
  const locationMatches = query.match(/(?:en|in|para)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi) || [];
  locations.push(...locationMatches.map(loc => loc.replace(/(?:en|in|para)\s+/i, '')));
  
  return { keywords, domains, locations };
}
