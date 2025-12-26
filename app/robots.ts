import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'

/**
 * Gera robots.txt dinamicamente
 * 
 * Next.js 14 App Router automaticamente expõe este arquivo em /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
