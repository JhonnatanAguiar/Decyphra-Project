import type { Metadata } from 'next'
import { baseMetadata, statusMetadata } from '@/lib/constants/metadata'
import StatusPageClient from './StatusPageClient'

/**
 * Página de Status (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...statusMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...statusMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...statusMetadata.twitter,
  },
}

export default function StatusPage() {
  return <StatusPageClient />
}
