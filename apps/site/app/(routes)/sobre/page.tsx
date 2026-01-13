import type { Metadata } from 'next'
import { baseMetadata, aboutMetadata } from '@/lib/constants/metadata'
import AboutPageClient from './AboutPageClient'

/**
 * Página Sobre (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...aboutMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...aboutMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...aboutMetadata.twitter,
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
