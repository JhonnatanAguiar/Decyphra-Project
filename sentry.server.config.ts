/**
 * Sentry Server Configuration
 * 
 * Configuração do Sentry para o lado do servidor (Node.js)
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% em produção
  
  // Ambiente
  environment: process.env.NODE_ENV || 'development',
  
  // Debug (só em desenvolvimento)
  debug: process.env.NODE_ENV === 'development',
  
  // Antes de enviar erro
  beforeSend(event, hint) {
    // Em desenvolvimento, logar erros no console
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Server Event:', event)
      console.error('Sentry Server Hint:', hint)
    }
    
    return event
  },
  
  // Integrações (adicionar conforme necessário)
  integrations: [],
  
  // Apenas capturar erros em produção por padrão
  enabled: process.env.NODE_ENV === 'production' && !!process.env.SENTRY_DSN,
})
