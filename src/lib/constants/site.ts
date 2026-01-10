/**
 * Constantes do site
 */

export const SITE_CONFIG = {
  name: 'Decyphra',
  description: 'Agência de Marketing Digital e Desenvolvimento Web',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://decyphra.com.br',
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
} as const

export const CONTACT_INFO = {
  email: 'contato@decyphra.com.br',
  phones: [
    '+55 (19) 9 9432-3750',
    '+55 (19) 9 8990-1716',
  ],
} as const

/**
 * Links das redes sociais da Decyphra
 * 
 * Atualizar estas URLs quando os perfis oficiais estiverem disponíveis
 */
export const SOCIAL_LINKS = {
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || 'https://facebook.com/decyphra',
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || 'https://instagram.com/decyphra',
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || 'https://linkedin.com/company/decyphra',
  twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || 'https://twitter.com/decyphra',
  youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || undefined,
  tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || undefined,
} as const

/**
 * Lista de redes sociais ativas (filtra undefined)
 */
export const ACTIVE_SOCIAL_LINKS = Object.entries(SOCIAL_LINKS)
  .filter(([_, url]) => url !== undefined)
  .map(([platform, url]) => ({
    platform,
    url: url as string,
  }))

/**
 * URLs de redes sociais para Schema.org (sameAs)
 */
export const SOCIAL_LINKS_FOR_SCHEMA = ACTIVE_SOCIAL_LINKS.map(({ url }) => url)
