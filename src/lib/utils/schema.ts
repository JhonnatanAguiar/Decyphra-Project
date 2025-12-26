/**
 * Utilitários para gerar dados estruturados Schema.org (JSON-LD)
 */

import { SITE_CONFIG, CONTACT_INFO } from '@/lib/constants/site'

/**
 * Gera schema Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logos/logo-horizontal.svg`,
    sameAs: [
      // Adicionar URLs das redes sociais quando disponíveis
      // 'https://www.facebook.com/decyphra',
      // 'https://www.instagram.com/decyphra',
      // 'https://www.linkedin.com/company/decyphra',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_INFO.email,
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
    },
  }
}

/**
 * Gera schema WebSite
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/portfolio?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Gera schema Service
 */
export function generateServiceSchema(service: {
  name: string
  description: string
  url: string
  serviceType?: string
  provider?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    serviceType: service.serviceType || 'Digital Marketing Service',
    provider: {
      '@type': 'Organization',
      name: service.provider || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brazil',
    },
  }
}

/**
 * Gera schema BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Gera schema LocalBusiness (caso tenha endereço físico)
 */
export function generateLocalBusinessSchema(address?: {
  streetAddress?: string
  addressLocality?: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    email: CONTACT_INFO.email,
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
  }
}

/**
 * Converte objeto schema para script JSON-LD
 */
export function schemaToJsonLd(schema: object): string {
  return JSON.stringify(schema, null, 2)
}
