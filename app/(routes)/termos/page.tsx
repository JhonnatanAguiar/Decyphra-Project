import type { Metadata } from 'next'
import { baseMetadata, termsMetadata } from '@/lib/constants/metadata'
import TermosPageClient from './TermosPageClient'

/**
 * Página de Termos de Uso (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...termsMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...termsMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...termsMetadata.twitter,
  },
}

export default function TermosPage() {
  return <TermosPageClient />
}
