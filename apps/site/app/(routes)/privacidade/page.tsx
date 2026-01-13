import type { Metadata } from 'next'
import { baseMetadata, privacyMetadata } from '@/lib/constants/metadata'
import PrivacidadePageClient from './PrivacidadePageClient'

/**
 * Página de Política de Privacidade (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...privacyMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...privacyMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...privacyMetadata.twitter,
  },
}

export default function PrivacidadePage() {
  return <PrivacidadePageClient />
}
