import type { Metadata } from 'next'
import { baseMetadata, inteligenciaArtificialMetadata } from '@/lib/constants/metadata'
import InteligenciaArtificialPageClient from './InteligenciaArtificialPageClient'

/**
 * Página de Serviço: Inteligência Artificial (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...inteligenciaArtificialMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...inteligenciaArtificialMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...inteligenciaArtificialMetadata.twitter,
  },
}

export default function InteligenciaArtificialPage() {
  return <InteligenciaArtificialPageClient />
}
