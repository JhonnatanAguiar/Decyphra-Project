'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/utils/analytics-tracker'

/**
 * Analytics Tracker Component
 * 
 * Componente que rastreia automaticamente page views quando a rota muda
 */
export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Verificar se está no cliente antes de acessar document
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    
    if (pathname) {
      // Aguardar um pouco para garantir que a página carregou
      const timer = setTimeout(() => {
        // Verificar novamente dentro do timeout para garantir que ainda está no cliente
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          trackPageView(pathname, document.title)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}
