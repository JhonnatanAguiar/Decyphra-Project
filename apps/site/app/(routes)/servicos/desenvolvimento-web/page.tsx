import type { Metadata } from 'next'
import { baseMetadata, desenvolvimentoWebMetadata } from '@/lib/constants/metadata'
import { generateServiceSchema, generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/utils/schema'
import { SITE_CONFIG } from '@/lib/constants/site'
import { ROUTES } from '@/lib/constants/routes'
import { JsonLd } from '@/views/components/seo/JsonLd'
import DesenvolvimentoWebPageClient from './DesenvolvimentoWebPageClient'

/**
 * Página de Serviço: Desenvolvimento Web (Server Component)
 * 
 * Exporta metadata e renderiza o componente client-side
 */
export const metadata: Metadata = {
  ...baseMetadata,
  ...desenvolvimentoWebMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    ...desenvolvimentoWebMetadata.openGraph,
  },
  twitter: {
    ...baseMetadata.twitter,
    ...desenvolvimentoWebMetadata.twitter,
  },
}

export default function DesenvolvimentoWebPage() {
  const organizationSchema = generateOrganizationSchema()
  const serviceSchema = generateServiceSchema({
    name: 'Desenvolvimento Web',
    description: 'Sites rápidos, animados e escaláveis — com total controle do design, performance e evolução. Sites e landing pages em código, com animações, performance e SEO desde a base.',
    url: `${SITE_CONFIG.url}${ROUTES.services}/desenvolvimento-web`,
    serviceType: 'Web Development Service',
  })
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Início', url: SITE_CONFIG.url },
    { name: 'Serviços', url: `${SITE_CONFIG.url}${ROUTES.services}` },
    { name: 'Desenvolvimento Web', url: `${SITE_CONFIG.url}${ROUTES.services}/desenvolvimento-web` },
  ])

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DesenvolvimentoWebPageClient />
    </>
  )
}
