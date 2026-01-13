/**
 * Sentry Client Configuration
 * 
 * Configuração do Sentry para o lado do cliente (browser)
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% em produção, 100% em dev
  
  // Ambiente
  environment: process.env.NODE_ENV || 'development',
  
  // Debug (só em desenvolvimento)
  debug: process.env.NODE_ENV === 'development',
  
  // Antes de enviar erro, podemos filtrar/processar
  beforeSend(event, hint) {
    // Em desenvolvimento, logar erros no console
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Event:', event)
      console.error('Sentry Hint:', hint)
    }
    
    // Filtrar erros conhecidos que não precisam ser reportados
    if (event.exception) {
      const error = hint.originalException
      
      // Ignorar erros de rede offline
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        return null
      }
      
      // Ignorar erros de ChunkLoadError (recarregar página resolve)
      if (event.exception.values?.[0]?.type === 'ChunkLoadError') {
        return null
      }
    }
    
    return event
  },
  
  // Integração com React
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      // Session Replay (só capturar erros)
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  // Ignorar erros de extensões do navegador
  ignoreErrors: [
    // Extensões do Chrome
    'top.GLOBALS',
    // Extensões do Firefox
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    // Erros comuns que não são do nosso código
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],
  
  // Apenas capturar erros em produção por padrão
  enabled: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_SENTRY_DSN,
})
