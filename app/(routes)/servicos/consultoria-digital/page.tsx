import type { Metadata } from 'next'
import { baseMetadata, consultoriaDigitalMetadata } from '@/lib/constants/metadata'
import ConsultoriaDigitalPageClient from './ConsultoriaDigitalPageClient'

/**
 * Página de Serviço: Consultoria Digital (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...consultoriaDigitalMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...consultoriaDigitalMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...consultoriaDigitalMetadata.twitter,
  },
}

export default function ConsultoriaDigitalPage() {
  return <ConsultoriaDigitalPageClient />
}
