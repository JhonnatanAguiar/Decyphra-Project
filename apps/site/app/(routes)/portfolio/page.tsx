import type { Metadata } from 'next'
import { baseMetadata, portfolioMetadata } from '@/lib/constants/metadata'
import PortfolioPageClient from './PortfolioPageClient'

/**
 * Página de Portfólio (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...portfolioMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...portfolioMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...portfolioMetadata.twitter,
  },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
