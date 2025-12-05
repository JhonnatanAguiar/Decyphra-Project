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
  email: 'jhonnatanaguiar@decyphra.com.br',
  phones: [
    '+55 (19) 9 9432-3750',
    '+55 (19) 9 8990-1716',
  ],
} as const
