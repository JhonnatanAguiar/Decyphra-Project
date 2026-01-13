import type { Metadata } from 'next'
import ConfiguracoesPageClient from './ConfiguracoesPageClient'

/**
 * Página de Configurações (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */

export const metadata: Metadata = {
  title: 'Configurações | Admin - Decyphra',
  description: 'Configurações do painel administrativo',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ConfiguracoesPage() {
  return <ConfiguracoesPageClient />
}
