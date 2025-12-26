'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/utils/analytics'

/**
 * Google Analytics Component
 * 
 * Componente otimizado para carregar Google Analytics 4 (GA4)
 * - Lazy loaded para não bloquear renderização inicial
 * - Track automático de mudanças de página
 * - Só carrega se NEXT_PUBLIC_GA_MEASUREMENT_ID estiver configurado
 */

// Lazy load do componente do Next.js para melhor performance
const GoogleAnalyticsScript = dynamic(
  () => import('@next/third-parties/google').then((mod) => ({ default: mod.GoogleAnalytics })),
  {
    ssr: false, // Não renderizar no servidor
  }
)

/**
 * Hook para track automático de mudanças de página
 */
function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // ID do GA (variável de ambiente ou padrão)
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-T5BVFVHYYY'
    
    // Construir URL completa
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    // Pequeno delay para garantir que o GA está carregado
    const timer = setTimeout(() => {
      trackPageView(url, document.title)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])
}

export default function GoogleAnalytics() {
  // Usa variável de ambiente ou ID padrão
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-T5BVFVHYYY'

  return (
    <>
      <GoogleAnalyticsScript gaId={gaId} />
      <PageTracker />
    </>
  )
}

/**
 * Componente interno para track de páginas
 */
function PageTracker() {
  usePageTracking()
  return null
}
