'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Reportar erro ao Sentry
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error)
    }
    
    // Log no console em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-light-50 mb-4">
          Algo deu errado!
        </h2>
        {error?.message && (
          <p className="text-light-200 mb-4 text-sm">{error.message}</p>
        )}
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary-500 text-dark-950 rounded hover:bg-primary-400"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
