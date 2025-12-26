import type { Metadata } from 'next'
import { baseMetadata, desenvolvimentoWebMetadata } from '@/lib/constants/metadata'
import DesenvolvimentoWebPageClient from './DesenvolvimentoWebPageClient'

/**
 * Página de Serviço: Desenvolvimento Web (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...desenvolvimentoWebMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...desenvolvimentoWebMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...desenvolvimentoWebMetadata.twitter,
  },
}

export default function DesenvolvimentoWebPage() {
  return <DesenvolvimentoWebPageClient />
}
