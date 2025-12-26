import type { Metadata } from 'next'
import { baseMetadata, homeMetadata } from '@/lib/constants/metadata'
import HomePageClient from './HomePageClient'

/**
 * Home Page (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...homeMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...homeMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...homeMetadata.twitter,
  },
}

export default function HomePage() {
  return <HomePageClient />
}
