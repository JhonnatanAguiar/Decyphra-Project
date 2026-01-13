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
 * Se não houver variável de ambiente, o valor será undefined
 * Isso indica que a rede social ainda não está disponível
 */
export const SOCIAL_LINKS = {
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || undefined,
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || undefined,
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || undefined,
  twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || undefined,
  youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || undefined,
  tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || undefined,
} as const

/**
 * Lista de redes sociais ativas (filtra undefined) - apenas para Schema.org
 */
export const ACTIVE_SOCIAL_LINKS = Object.entries(SOCIAL_LINKS)
  .filter(([_, url]) => url !== undefined && url !== '')
  .map(([platform, url]) => ({
    platform,
    url: url as string,
  }))

/**
 * URLs de redes sociais para Schema.org (sameAs)
 */
export const SOCIAL_LINKS_FOR_SCHEMA = ACTIVE_SOCIAL_LINKS.map(({ url }) => url)

/**
 * Mensagem para redes sociais não disponíveis
 */
export const SOCIAL_UNAVAILABLE_MESSAGE = 'Decyphra ainda não está nessa rede, disponível em breve'
