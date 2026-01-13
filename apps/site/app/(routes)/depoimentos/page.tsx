import type { Metadata } from 'next'
import { baseMetadata, testimonialsMetadata } from '@/lib/constants/metadata'
import TestimonialsPageClient from './TestimonialsPageClient'

/**
 * Página de Depoimentos (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...testimonialsMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...testimonialsMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...testimonialsMetadata.twitter,
  },
}

export default function TestimonialsPage() {
  return <TestimonialsPageClient />
}
