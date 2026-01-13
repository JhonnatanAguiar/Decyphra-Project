import type { Metadata } from 'next'
import { baseMetadata, servicesMetadata } from '@/lib/constants/metadata'
import ServicesPageClient from './ServicesPageClient'

/**
 * Página de Serviços (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...servicesMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...servicesMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...servicesMetadata.twitter,
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
