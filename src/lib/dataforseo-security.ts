/**
 * 🔐 ELITE DataForSEO Security Configuration
 * 
 * Configuración de seguridad de nivel enterprise para DataForSEO
 * Siguiendo las mejores prácticas de OWASP y NIST
 */

import { DATAFORSEO_CONFIG } from './dataforseo-config';

// 🔒 Configuración de seguridad elite
export const DATAFORSEO_SECURITY = {
  // Rate limiting avanzado
  rateLimiting: {
    // Límites por tipo de endpoint
    endpoints: {
      keywords: { requestsPerMinute: 30, burstLimit: 5 },
      serp: { requestsPerMinute: 20, burstLimit: 3 },
      labs: { requestsPerMinute: 15, burstLimit: 2 },
      onpage: { requestsPerMinute: 10, burstLimit: 1 }
    },
    
    // Límites globales
    global: {
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      maxConcurrentRequests: 5
    }
  },

  // Configuración de retry con backoff exponencial
  retryPolicy: {
    maxRetries: 3,
    baseDelay: 1000, // 1 segundo
    maxDelay: 30000, // 30 segundos
    backoffMultiplier: 2,
    jitter: true // Añadir aleatoriedad para evitar thundering herd
  },

  // Configuración de cache inteligente
  cache: {
    // TTL por tipo de datos
    ttl: {
      keywords: 5 * 60 * 1000, // 5 minutos
      serp: 10 * 60 * 1000, // 10 minutos
      domain: 30 * 60 * 1000, // 30 minutos
      trends: 60 * 60 * 1000 // 1 hora
    },
    
    // Configuración de cache
    maxSize: 1000,
    evictionPolicy: 'LRU', // Least Recently Used
    compression: true
  },

  // Configuración de timeouts
  timeouts: {
    connection: 10000, // 10 segundos
    request: 60000, // 60 segundos
    idle: 30000 // 30 segundos
  },

  // Configuración de logging
  logging: {
    level: 'info', // error, warn, info, debug
    logRequests: true,
    logResponses: false, // Por seguridad, no logear respuestas completas
    logErrors: true,
    sanitizeLogs: true // Remover datos sensibles de los logs
  },

  // Configuración de monitoreo
  monitoring: {
    enableMetrics: true,
    enableHealthChecks: true,
    healthCheckInterval: 30000, // 30 segundos
    alertThresholds: {
      errorRate: 0.1, // 10%
      responseTime: 5000, // 5 segundos
      successRate: 0.9 // 90%
    }
  }
};

// 🛡️ Validación de credenciales
export function validateDataForSEOCredentials(): boolean {
  const required = [
    process.env.DATAFORSEO_LOGIN,
    process.env.DATAFORSEO_PASSWORD,
    process.env.DATAFORSEO_BASE_URL
  ];

  if (!required.every(Boolean)) {
    console.error('❌ DataForSEO credentials missing');
    return false;
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(process.env.DATAFORSEO_LOGIN!)) {
    console.error('❌ Invalid DataForSEO login format');
    return false;
  }

  // Validar longitud de password
  if (process.env.DATAFORSEO_PASSWORD!.length < 16) {
    console.error('❌ DataForSEO password too short');
    return false;
  }

  console.log('✅ DataForSEO credentials validated');
  return true;
}

// 🔐 Generar headers de autenticación seguros
export function generateAuthHeaders(): HeadersInit {
  const credentials = `${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  return {
    'Authorization': `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Fascinante-Digital-Chatbot/1.0.0',
    'X-Request-ID': generateRequestId(),
    'X-Client-Version': '1.0.0'
  };
}

// 🆔 Generar ID único para requests
function generateRequestId(): string {
  return `fascinante-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 📊 Métricas de performance
export class DataForSEOMetrics {
  private static instance: DataForSEOMetrics;
  private metrics: Map<string, any> = new Map();

  static getInstance(): DataForSEOMetrics {
    if (!DataForSEOMetrics.instance) {
      DataForSEOMetrics.instance = new DataForSEOMetrics();
    }
    return DataForSEOMetrics.instance;
  }

  recordRequest(endpoint: string, duration: number, success: boolean) {
    const key = `request.${endpoint}`;
    const current = this.metrics.get(key) || { count: 0, totalDuration: 0, errors: 0 };
    
    current.count++;
    current.totalDuration += duration;
    if (!success) current.errors++;
    
    this.metrics.set(key, current);
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  getHealthStatus() {
    const totalRequests = Array.from(this.metrics.values())
      .reduce((sum, metric) => sum + metric.count, 0);
    
    const totalErrors = Array.from(this.metrics.values())
      .reduce((sum, metric) => sum + metric.errors, 0);
    
    const errorRate = totalRequests > 0 ? totalErrors / totalRequests : 0;
    
    return {
      status: errorRate < 0.1 ? 'healthy' : 'degraded',
      errorRate,
      totalRequests,
      totalErrors
    };
  }
}

// 🚨 Sistema de alertas
export class DataForSEOAlerts {
  private static instance: DataForSEOAlerts;
  private alerts: string[] = [];

  static getInstance(): DataForSEOAlerts {
    if (!DataForSEOAlerts.instance) {
      DataForSEOAlerts.instance = new DataForSEOAlerts();
    }
    return DataForSEOAlerts.instance;
  }

  checkHealth(metrics: DataForSEOMetrics) {
    const health = metrics.getHealthStatus();
    
    if (health.errorRate > 0.2) {
      this.addAlert('HIGH_ERROR_RATE', `Error rate is ${(health.errorRate * 100).toFixed(1)}%`);
    }
    
    if (health.totalRequests > 1000) {
      this.addAlert('HIGH_VOLUME', `High request volume: ${health.totalRequests} requests`);
    }
  }

  private addAlert(type: string, message: string) {
    const alert = `[${new Date().toISOString()}] ${type}: ${message}`;
    this.alerts.push(alert);
    console.warn(`🚨 DataForSEO Alert: ${alert}`);
  }

  getAlerts(): string[] {
    return [...this.alerts];
  }

  clearAlerts() {
    this.alerts = [];
  }
}

// 🔧 Configuración de circuit breaker
export class DataForSEOCircuitBreaker {
  private static instance: DataForSEOCircuitBreaker;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly failureThreshold = 5;
  private readonly timeout = 60000; // 1 minuto

  static getInstance(): DataForSEOCircuitBreaker {
    if (!DataForSEOCircuitBreaker.instance) {
      DataForSEOCircuitBreaker.instance = new DataForSEOCircuitBreaker();
    }
    return DataForSEOCircuitBreaker.instance;
  }

  canExecute(): boolean {
    if (this.state === 'CLOSED') return true;
    
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
        return true;
      }
      return false;
    }
    
    return true; // HALF_OPEN
  }

  recordSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }

  getState() {
    return this.state;
  }
}
