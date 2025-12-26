import type { Metadata } from 'next'
import { SITE_CONFIG } from './site'

/**
 * Configurações de Metadata para as páginas do site
 */

const siteUrl = SITE_CONFIG.url
const siteName = SITE_CONFIG.name

/**
 * Metadata base para todas as páginas
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Agência de Marketing Digital e Desenvolvimento Web`,
    template: `%s | ${siteName}`,
  },
  description: 'Sites em código. Experiências vivas. Resultado mensurável. Criamos experiências rápidas, animadas e sob medida — com performance, SEO e escalabilidade desde a base.',
  keywords: [
    'desenvolvimento web',
    'agência digital',
    'marketing digital',
    'criação de sites',
    'desenvolvimento em código',
    'Next.js',
    'TypeScript',
    'SEO',
    'e-commerce',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName,
    title: `${siteName} - Agência de Marketing Digital e Desenvolvimento Web`,
    description: 'Sites em código. Experiências vivas. Resultado mensurável.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Agência de Marketing Digital e Desenvolvimento Web`,
    description: 'Sites em código. Experiências vivas. Resultado mensurável.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

/**
 * Metadata para a Home Page
 */
export const homeMetadata: Metadata = {
  title: 'Início',
  description: 'Sites feitos em código, com controle total do resultado. Criamos experiências rápidas, animadas e sob medida — com performance, SEO e escalabilidade desde a base.',
  openGraph: {
    title: `${siteName} - Sites em código. Experiências vivas. Resultado mensurável.`,
    description: 'Sites feitos em código, com controle total do resultado. Criamos experiências rápidas, animadas e sob medida.',
    url: siteUrl,
  },
  twitter: {
    title: `${siteName} - Sites em código. Experiências vivas. Resultado mensurável.`,
    description: 'Sites feitos em código, com controle total do resultado.',
  },
}

/**
 * Metadata para a Página de Serviços
 */
export const servicesMetadata: Metadata = {
  title: 'Serviços',
  description: 'Soluções digitais completas — com desenvolvimento em código como padrão e uma metodologia acelerada por IA.',
  openGraph: {
    title: `Serviços | ${siteName}`,
    description: 'Soluções digitais completas — com desenvolvimento em código como padrão e uma metodologia acelerada por IA.',
    url: `${siteUrl}/servicos`,
  },
  twitter: {
    title: `Serviços | ${siteName}`,
    description: 'Soluções digitais completas — com desenvolvimento em código como padrão.',
  },
}

/**
 * Metadata para a Página Sobre
 */
export const aboutMetadata: Metadata = {
  title: 'Sobre',
  description: 'Somos uma agência digital que constrói produtos web em código — com foco em performance, design e crescimento.',
  openGraph: {
    title: `Sobre | ${siteName}`,
    description: 'Somos uma agência digital que constrói produtos web em código — com foco em performance, design e crescimento.',
    url: `${siteUrl}/sobre`,
  },
  twitter: {
    title: `Sobre | ${siteName}`,
    description: 'Somos uma agência digital que constrói produtos web em código.',
  },
}
