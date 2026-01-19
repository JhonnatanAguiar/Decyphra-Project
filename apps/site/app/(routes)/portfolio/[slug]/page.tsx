import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/controllers/services/project.service'
import type { Metadata } from 'next'
import CaseStudyClient, { type CaseStudyProject } from './CaseStudyClient'
import { baseMetadata } from '@/lib/constants/metadata'

const DEMO_STARTUP_TECH_URL =
  process.env.NEXT_PUBLIC_DEMO_STARTUP_TECH_URL || 'https://startup-tech.decyphra.com.br'

/**
 * Dados estáticos do estudo de caso "Startup Tecnológica" (demo em apps/demo-startup-tech).
 * Usado quando o projeto não está no banco ou para garantir conteúdo alinhado à demo.
 */
const STARTUP_TECNOLOGICA: CaseStudyProject = {
  title: 'Startup Tech — Plataforma SaaS B2B',
  description:
    'Landing page de alta conversão para uma plataforma SaaS que centraliza formulários, fluxos e ferramentas em um só lugar. Foco em UI/UX impactante e desempenho.',
  category: 'Landing Page / SaaS',
  technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zod', 'Vercel'],
  featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  ],
  client: 'Projeto vitrine Decyphra',
  year: 2024,
  demoUrl: DEMO_STARTUP_TECH_URL,
  challenges: `
    <p>Criar uma landing page moderna e otimizada para conversão para uma plataforma SaaS B2B. Objetivos: demonstrar a capacidade da Decyphra em experiências digitais de alta performance, com foco em UI/UX e elementos interativos que impressionem potenciais clientes.</p>
    <ul>
      <li>Alta percepção de valor e conversão (formulário de solicitação de acesso)</li>
      <li>Performance (Lighthouse) e SEO</li>
      <li>Design com identidade própria (azul/violeta, gradientes, microinterações)</li>
      <li>Experiência mobile-first e acessível</li>
    </ul>
  `,
  solutions: `
    <p>Desenvolvemos uma landing em Next.js 14 (App Router) com design system próprio e seções estratégicas:</p>
    <ul>
      <li><strong>Design system:</strong> paleta azul/violeta, tipografia (Space Grotesk, Inter), componentes Button e Card com efeitos de hover (feixe na borda, glow no botão)</li>
      <li><strong>Seções:</strong> Hero, Proposta de valor, Features, Como funciona, Segurança, Prova social, Pricing, CTA com formulário &quot;Solicitar acesso&quot;</li>
      <li><strong>Animações:</strong> Framer Motion (entrada por scroll), parallax, botão &quot;Voltar ao topo&quot; por scroll</li>
      <li><strong>Backend mínimo:</strong> POST /api/request-access com validação Zod (nome, e-mail) e feedback visual</li>
      <li><strong>SEO e a11y:</strong> metadata, Open Graph, viewport, skip link, focus-visible, labels no formulário</li>
    </ul>
  `,
  results: `
    <p>Entregas do projeto:</p>
    <ul>
      <li>Landing completa e responsiva com identidade própria</li>
      <li>Formulário de solicitação de acesso com validação e feedback (sucesso/erro)</li>
      <li>SEO básico (metadata, OG, Twitter, robots) e viewport/themeColor</li>
      <li>Acessibilidade: skip link, foco visível, navegação por teclado, BackToTop acessível</li>
      <li>Pronto para deploy na Vercel e subdomínio (ex.: startup-tech.decyphra.com.br)</li>
    </ul>
  `,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug

  if (slug === 'startup-tecnologica') {
    return {
      ...baseMetadata,
      title: STARTUP_TECNOLOGICA.title,
      description: STARTUP_TECNOLOGICA.description,
    }
  }

  const project = await getProjectBySlug({ slug })
  if (!project) return { ...baseMetadata }

  return {
    ...baseMetadata,
    title: project.title,
    description: project.description,
  }
}

export default async function PortfolioSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug

  if (slug === 'startup-tecnologica') {
    return <CaseStudyClient project={STARTUP_TECNOLOGICA} />
  }

  const project = await getProjectBySlug({ slug })
  if (!project) notFound()

  const caseStudy: CaseStudyProject = {
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
    category: project.category,
    technologies: project.technologies,
    featuredImage: project.featuredImage,
    images: project.images,
    client: project.client,
    year: project.year,
    challenges: project.challenges,
    solutions: project.solutions,
    results: project.results,
    demoUrl: undefined, // Schema não possui demoUrl; adicionar no Prisma se necessário
  }

  return <CaseStudyClient project={caseStudy} />
}
