'use client'

import { Header } from '@/views/components/layout/Header'
import { Footer } from '@/views/components/layout/Footer'
import { ScrollToTop } from '@/views/components/layout/ScrollToTop'
import { PageTransition } from '@/views/components/animations/PageTransition'
import { AnalyticsTracker } from './AnalyticsTracker'
import { WebVitalsInit } from './WebVitalsInit'

/**
 * Layout para rotas públicas
 * 
 * Inclui Header e Footer em todas as páginas públicas
 * Aplica transições suaves entre páginas
 * Garante scroll para o topo no refresh
 */

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnalyticsTracker />
      <WebVitalsInit />
      <ScrollToTop />
      <Header variant="default" sticky={true} />
      <main id="main-content">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer variant="default" />
    </>
  )
}
