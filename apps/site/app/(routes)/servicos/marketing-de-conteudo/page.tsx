import type { Metadata } from 'next'
import { baseMetadata, marketingConteudoMetadata } from '@/lib/constants/metadata'
import MarketingConteudoPageClient from './MarketingConteudoPageClient'

/**
 * Página de Serviço: Marketing de Conteúdo (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...marketingConteudoMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...marketingConteudoMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...marketingConteudoMetadata.twitter,
  },
}

export default function MarketingDeConteudoPage() {
  return <MarketingConteudoPageClient />
}
