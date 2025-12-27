/**
 * Next.js Instrumentation
 * 
 * Este arquivo é executado quando o servidor Next.js inicia
 * Usado para inicializar ferramentas de monitoramento como Sentry
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Inicializar Sentry apenas no servidor Node.js
    await import('./sentry.server.config')
  }
  
  if (process.env.NEXT_RUNTIME === 'edge') {
    // Se precisar de suporte para Edge Runtime no futuro
    // await import('./sentry.edge.config')
  }
}
