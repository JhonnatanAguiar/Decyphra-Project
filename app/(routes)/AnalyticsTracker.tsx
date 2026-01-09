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
    if (pathname) {
      // Aguardar um pouco para garantir que a página carregou
      const timer = setTimeout(() => {
        trackPageView(pathname, document.title)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}
