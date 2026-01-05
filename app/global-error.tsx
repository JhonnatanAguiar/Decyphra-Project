'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

/**
 * Global Error Boundary
 * 
 * Captura erros que não foram tratados pelos error boundaries anteriores
 * Este componente deve retornar HTML completo (html + body)
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Reportar erro ao Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-dark-950 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-light-50 mb-4">
              Algo deu errado!
            </h2>
            {error?.message && (
              <p className="text-light-200 mb-4 text-sm">{error.message}</p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-500 text-dark-950 rounded hover:bg-primary-400"
            >
              Recarregar página
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
