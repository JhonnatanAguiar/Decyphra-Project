'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView, configureGAConsent } from '@/lib/utils/analytics'
import { useCookieConsent } from '@/lib/hooks/useCookieConsent'

/**
 * Google Analytics Component
 * 
 * Componente otimizado para carregar Google Analytics 4 (GA4)
 * - Lazy loaded para não bloquear renderização inicial
 * - Track automático de mudanças de página
 * - Respeita consentimento de cookies do usuário
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
  const { isAllowed, isLoading } = useCookieConsent()

  useEffect(() => {
    // Só track se GA estiver configurado e consentimento dado
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return
    if (isLoading) return
    if (!isAllowed('analytics')) return
    
    // Construir URL completa
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    // Pequeno delay para garantir que o GA está carregado
    const timer = setTimeout(() => {
      trackPageView(url, document.title)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname, searchParams, isLoading, isAllowed])
}

export default function GoogleAnalytics() {
  // Só renderizar se o measurement ID estiver configurado
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const { hasConsent, isAllowed, isLoading } = useCookieConsent()


  // Configurar consentimento quando carregar ou quando mudar preferências
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // Pequeno delay para garantir que gtag está disponível
      const timer = setTimeout(() => {
        configureGAConsent()
      }, 500)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasConsent, isLoading])

  // Ouvir eventos de atualização de consentimento
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleConsentUpdate = () => {
      configureGAConsent()
    }

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate)

    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate)
    }
  }, [])

  if (!gaId) {
    return null
  }

  // Sempre carregar o script do GA
  // O consentimento será configurado via gtag('consent', 'update')
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
