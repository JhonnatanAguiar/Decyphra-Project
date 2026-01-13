/**
 * Constantes de rotas do site
 */

export const ROUTES = {
  home: '/',
  services: '/servicos',
  portfolio: '/portfolio',
  about: '/sobre',
  testimonials: '/depoimentos',
  contact: '/contato',
  status: '/status',
} as const

export const API_ROUTES = {
  v1: {
    status: '/api/v1/status',
    contact: '/api/v1/contact',
    newsletter: '/api/v1/newsletter',
    projects: '/api/v1/projects',
    testimonials: '/api/v1/testimonials',
    services: '/api/v1/services',
  },
} as const
