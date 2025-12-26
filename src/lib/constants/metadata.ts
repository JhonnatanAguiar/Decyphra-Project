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

/**
 * Metadata para a Página de Contato
 */
export const contactMetadata: Metadata = {
  title: 'Contato',
  description: 'Conte sobre seu projeto. A gente responde com direção — não com enrolação.',
  openGraph: {
    title: `Contato | ${siteName}`,
    description: 'Conte sobre seu projeto. A gente responde com direção — não com enrolação.',
    url: `${siteUrl}/contato`,
  },
  twitter: {
    title: `Contato | ${siteName}`,
    description: 'Conte sobre seu projeto. A gente responde com direção.',
  },
}

/**
 * Metadata para a Página de Portfólio
 */
export const portfolioMetadata: Metadata = {
  title: 'Portfólio',
  description: 'Conheça alguns dos nossos projetos capazes de transformar negócios e gerar resultados extraordinários para nossos clientes.',
  openGraph: {
    title: `Portfólio | ${siteName}`,
    description: 'Conheça alguns dos nossos projetos capazes de transformar negócios e gerar resultados extraordinários para nossos clientes.',
    url: `${siteUrl}/portfolio`,
  },
  twitter: {
    title: `Portfólio | ${siteName}`,
    description: 'Conheça alguns dos nossos projetos capazes de transformar negócios.',
  },
}

/**
 * Metadata para a Página de Depoimentos
 */
export const testimonialsMetadata: Metadata = {
  title: 'Depoimentos',
  description: 'Histórias reais de transformação digital e crescimento empresarial.',
  openGraph: {
    title: `Depoimentos | ${siteName}`,
    description: 'Histórias reais de transformação digital e crescimento empresarial.',
    url: `${siteUrl}/depoimentos`,
  },
  twitter: {
    title: `Depoimentos | ${siteName}`,
    description: 'Histórias reais de transformação digital e crescimento empresarial.',
  },
}

/**
 * Metadata para as Páginas de Serviços Individuais
 */

export const desenvolvimentoWebMetadata: Metadata = {
  title: 'Desenvolvimento Web',
  description: 'Sites rápidos, animados e escaláveis — com total controle do design, performance e evolução. Sites e landing pages em código, com animações, performance e SEO desde a base.',
  openGraph: {
    title: `Desenvolvimento Web | ${siteName}`,
    description: 'Sites rápidos, animados e escaláveis — com total controle do design, performance e evolução.',
    url: `${siteUrl}/servicos/desenvolvimento-web`,
  },
  twitter: {
    title: `Desenvolvimento Web | ${siteName}`,
    description: 'Sites rápidos, animados e escaláveis — com total controle do design, performance e evolução.',
  },
}

export const seoOtimizacaoMetadata: Metadata = {
  title: 'SEO & Otimização',
  description: 'SEO técnico + conteúdo orientado a intenção de busca. Visibilidade consistente e crescimento orgânico mensurável.',
  openGraph: {
    title: `SEO & Otimização | ${siteName}`,
    description: 'SEO técnico + conteúdo orientado a intenção de busca. Visibilidade consistente e crescimento orgânico mensurável.',
    url: `${siteUrl}/servicos/seo-otimizacao`,
  },
  twitter: {
    title: `SEO & Otimização | ${siteName}`,
    description: 'SEO técnico + conteúdo orientado a intenção de busca. Visibilidade consistente e crescimento orgânico.',
  },
}

export const googleAdMetadata: Metadata = {
  title: 'Google Ad',
  description: 'Campanhas enxutas e otimizadas para ROI. Tracking bem feito, testes rápidos e escala com controle.',
  openGraph: {
    title: `Google Ad | ${siteName}`,
    description: 'Campanhas enxutas e otimizadas para ROI. Tracking bem feito, testes rápidos e escala com controle.',
    url: `${siteUrl}/servicos/google-ad`,
  },
  twitter: {
    title: `Google Ad | ${siteName}`,
    description: 'Campanhas enxutas e otimizadas para ROI. Tracking bem feito, testes rápidos e escala com controle.',
  },
}

export const marketingConteudoMetadata: Metadata = {
  title: 'Marketing de Conteúdo',
  description: 'Conteúdo que educa, posiciona e converte — com estratégia, consistência e copy orientada a ação.',
  openGraph: {
    title: `Marketing de Conteúdo | ${siteName}`,
    description: 'Conteúdo que educa, posiciona e converte — com estratégia, consistência e copy orientada a ação.',
    url: `${siteUrl}/servicos/marketing-de-conteudo`,
  },
  twitter: {
    title: `Marketing de Conteúdo | ${siteName}`,
    description: 'Conteúdo que educa, posiciona e converte — com estratégia, consistência e copy orientada a ação.',
  },
}

export const inteligenciaArtificialMetadata: Metadata = {
  title: 'Inteligência Artificial',
  description: 'Agentes e automações com IA para acelerar processos, melhorar atendimento e aumentar eficiência operacional.',
  openGraph: {
    title: `Inteligência Artificial | ${siteName}`,
    description: 'Agentes e automações com IA para acelerar processos, melhorar atendimento e aumentar eficiência operacional.',
    url: `${siteUrl}/servicos/inteligencia-artificial`,
  },
  twitter: {
    title: `Inteligência Artificial | ${siteName}`,
    description: 'Agentes e automações com IA para acelerar processos, melhorar atendimento e aumentar eficiência.',
  },
}

export const ecommerceCompletoMetadata: Metadata = {
  title: 'E-commerce Completo',
  description: 'Lojas rápidas, escaláveis e personalizadas — do checkout ao catálogo, com integrações e foco em conversão.',
  openGraph: {
    title: `E-commerce Completo | ${siteName}`,
    description: 'Lojas rápidas, escaláveis e personalizadas — do checkout ao catálogo, com integrações e foco em conversão.',
    url: `${siteUrl}/servicos/ecommerce-completo`,
  },
  twitter: {
    title: `E-commerce Completo | ${siteName}`,
    description: 'Lojas rápidas, escaláveis e personalizadas — do checkout ao catálogo, com integrações e foco em conversão.',
  },
}

export const consultoriaDigitalMetadata: Metadata = {
  title: 'Consultoria Digital',
  description: 'Direção técnica e estratégica para destravar decisões e organizar um plano de crescimento executável.',
  openGraph: {
    title: `Consultoria Digital | ${siteName}`,
    description: 'Direção técnica e estratégica para destravar decisões e organizar um plano de crescimento executável.',
    url: `${siteUrl}/servicos/consultoria-digital`,
  },
  twitter: {
    title: `Consultoria Digital | ${siteName}`,
    description: 'Direção técnica e estratégica para destravar decisões e organizar um plano de crescimento executável.',
  },
}
