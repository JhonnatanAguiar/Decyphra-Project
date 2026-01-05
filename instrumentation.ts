/**
 * Next.js Instrumentation
 * 
 * Este arquivo é executado quando o servidor Next.js inicia
 * Usado para inicializar ferramentas de monitoramento como Sentry
 */

import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

export const onRequestError = Sentry.captureRequestError