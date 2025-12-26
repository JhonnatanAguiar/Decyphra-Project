import type { Metadata } from 'next'
import { baseMetadata, googleAdMetadata } from '@/lib/constants/metadata'
import GoogleAdPageClient from './GoogleAdPageClient'

/**
 * Página de Serviço: Google Ad (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...googleAdMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...googleAdMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...googleAdMetadata.twitter,
  },
}

export default function GoogleAdPage() {
  return <GoogleAdPageClient />
}
