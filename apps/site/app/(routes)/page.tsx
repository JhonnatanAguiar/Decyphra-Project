import type { Metadata } from 'next'
import { baseMetadata, homeMetadata } from '@/lib/constants/metadata'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/utils/schema'
import { JsonLd } from '@/views/components/seo/JsonLd'
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
  const organizationSchema = generateOrganizationSchema()
  const webSiteSchema = generateWebSiteSchema()

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <HomePageClient />
    </>
  )
}
