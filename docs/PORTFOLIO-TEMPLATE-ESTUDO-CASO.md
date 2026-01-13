# Template de Estudo de Caso - Site Decyphra

## Estrutura da Página de Estudo de Caso

Cada projeto no portfólio da Decyphra deve ter uma página de estudo de caso que apresenta o projeto de forma profissional, explicando o contexto, estratégia e resultados.

## Campos do Banco de Dados

O modelo `Project` no Prisma já possui os campos necessários:

```prisma
model Project {
  id              String   @id @default(uuid())
  slug            String   @unique
  title           String
  description     String   @db.Text
  longDescription String?  @db.Text        # Estudo de caso completo
  category        String
  technologies    String[]
  images          String[]
  featuredImage   String
  client          String?
  year            Int
  challenges      String?  @db.Text        # O desafio
  solutions       String?  @db.Text        # A solução
  results         String?  @db.Text        # Resultados
  featured        Boolean  @default(false)
  status          ProjectStatus @default(draft)
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Campos Adicionais Recomendados (Futura Migração)

Para suportar melhor a estratégia Opção A, considere adicionar:

```prisma
model Project {
  // ... campos existentes ...
  
  demoUrl          String?  // URL da demo (subdomínio)
  caseStudyUrl     String?  // URL do estudo de caso (slug)
  colorScheme      String?  // Cores principais do projeto (JSON)
  screenshots      String[] // Screenshots do projeto
  videoUrl         String?  // Vídeo demo (opcional)
  featuredFeatures String[] // Features principais destacadas
}
```

## Estrutura da Página

### 1. Hero Section
- Título do projeto
- Categoria
- Ano
- Imagem destacada
- Link para demo (botão principal)
- Tags/tecnologias

### 2. Visão Geral
- Descrição curta (description)
- Estatísticas/métricas (se aplicável)
- Informações básicas (cliente, ano, categoria)

### 3. O Desafio
- Conteúdo do campo `challenges`
- Contexto do projeto
- Problemas a resolver
- Objetivos

### 4. A Solução
- Conteúdo do campo `solutions`
- Estratégia adotada
- Decisões técnicas
- Tecnologias utilizadas
- Arquitetura

### 5. Destaques e Features
- Features principais
- Inovações implementadas
- Elementos únicos do projeto
- Screenshots/imagens

### 6. Resultados
- Conteúdo do campo `results`
- Métricas alcançadas
- Benefícios
- Impacto

### 7. Galeria de Imagens
- Screenshots do projeto
- Destaques visuais
- Responsividade
- Detalhes de interface

### 8. Call-to-Action
- Botão principal: "Ver Demo" (link externo)
- Botão secundário: "Falar com Especialista"
- Link para voltar ao portfólio

## Template de Conteúdo

### Exemplo: Startup Tecnológica

**Título:** Startup Tecnológica - Plataforma SaaS

**Categoria:** Landing Page / SaaS

**Ano:** 2024

**Tecnologias:** Next.js, React, TypeScript, Tailwind CSS, Vercel

**Demo URL:** https://startup-tech.decyphra.com.br

---

### O Desafio

Criar uma landing page moderna e otimizada para conversão para uma plataforma SaaS inovadora. O objetivo era demonstrar a capacidade técnica da Decyphra em criar experiências digitais de alta performance, com foco em UX/UI excepcional e elementos interativos que impressionam potenciais clientes.

**Objetivos:**
- Alta taxa de conversão (meta: 10%+)
- Performance excepcional (Lighthouse 90+)
- Design moderno e impactante
- Experiência mobile-first perfeita

### A Solução

Desenvolvemos uma landing page completa usando Next.js 14 com App Router, implementando:

- **Design System Próprio**: Paleta de cores única (azuis modernos) e tipografia customizada
- **Animações Avançadas**: Scroll reveals, hover effects, parallax suave
- **Seções Estratégicas**: Hero impactante, features interativas, pricing comparativo, testimonials
- **Performance**: Otimização de imagens, code splitting, lazy loading
- **SEO**: Meta tags otimizadas, estrutura semântica, schema markup

**Stack Técnica:**
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS (tema customizado)
- Framer Motion (animações)
- Vercel (deploy)

### Resultados

A landing page alcançou resultados impressionantes:

- ✅ **500+ leads qualificados** gerados através de campanhas Google Ads
- ✅ **12% de taxa de conversão** (acima da média do setor)
- ✅ **ROI de 400%** nas campanhas
- ✅ **Performance**: Lighthouse Score 95+
- ✅ **Experiência**: NPS de feedbacks 9.2/10

### Destaques

- Hero section com animações fluidas e estatísticas em destaque
- Cards 3D interativos na seção de features
- Pricing section com destaque no plano popular
- Testimonials com avaliações visuais
- Design completamente responsivo e otimizado

## Estrutura de Arquivos

```
app/(routes)/portfolio/
├── page.tsx                    # Lista de projetos
├── PortfolioPageClient.tsx
└── [slug]/
    ├── page.tsx                # Estudo de caso (Server Component)
    └── CaseStudyClient.tsx     # Componente do estudo de caso
```

## Exemplo de Componente

```tsx
// app/(routes)/portfolio/[slug]/CaseStudyClient.tsx
'use client'

import { Section, Container } from '@/views/components/layout'
import { Button } from '@/views/components/ui/Button'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import Image from 'next/image'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

interface CaseStudyProps {
  project: {
    title: string
    description: string
    longDescription?: string
    category: string
    technologies: string[]
    featuredImage: string
    images: string[]
    client?: string
    year: number
    challenges?: string
    solutions?: string
    results?: string
    demoUrl?: string // URL da demo externa
  }
}

export default function CaseStudyClient({ project }: CaseStudyProps) {
  return (
    <>
      {/* Hero */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <Link 
            href={ROUTES.portfolio}
            className="inline-flex items-center gap-2 text-light-400 hover:text-primary-500 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Portfólio
          </Link>
          
          <FadeIn direction="up">
            <div className="mb-8">
              <span className="text-primary-500 text-sm font-medium">{project.category}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-light-50">
                {project.title}
              </h1>
              <p className="text-xl text-light-200 max-w-3xl">
                {project.description}
              </p>
            </div>
            
            {/* Info */}
            <div className="flex flex-wrap gap-6 mb-8">
              {project.year && (
                <div>
                  <span className="text-sm text-light-400">Ano</span>
                  <div className="text-lg font-semibold text-light-50">{project.year}</div>
                </div>
              )}
              {project.client && (
                <div>
                  <span className="text-sm text-light-400">Cliente</span>
                  <div className="text-lg font-semibold text-light-50">{project.client}</div>
                </div>
              )}
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-dark-800 border border-dark-700 rounded-full text-sm text-light-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* CTA */}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" enable3D={true}>
                  Ver Demo
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
            )}
          </FadeIn>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section variant="default" spacing="none">
        <Container size="xl">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </Section>

      {/* O Desafio */}
      {project.challenges && (
        <Section variant="default" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light-50">
                  O Desafio
                </h2>
                <div 
                  className="prose prose-invert prose-lg text-light-200"
                  dangerouslySetInnerHTML={{ __html: project.challenges }}
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* A Solução */}
      {project.solutions && (
        <Section variant="dark" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light-50">
                  A Solução
                </h2>
                <div 
                  className="prose prose-invert prose-lg text-light-200"
                  dangerouslySetInnerHTML={{ __html: project.solutions }}
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* Galeria */}
      {project.images && project.images.length > 0 && (
        <Section variant="default" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-light-50">
                Galeria
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* Resultados */}
      {project.results && (
        <Section variant="dark" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light-50">
                  Resultados
                </h2>
                <div 
                  className="prose prose-invert prose-lg text-light-200"
                  dangerouslySetInnerHTML={{ __html: project.results }}
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* CTA Final */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <FadeIn direction="up">
            <div className="text-center py-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-50">
                Quer um Projeto Similar?
              </h2>
              <p className="text-lg text-light-200 mb-8 max-w-2xl mx-auto">
                Entre em contato e vamos conversar sobre como podemos criar algo incrível para você.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="lg" enable3D={true}>
                      Ver Demo Completa
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                )}
                <Link href={ROUTES.contact}>
                  <Button variant="secondary" size="lg">
                    Falar com Especialista
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
```

## Checklist de Conteúdo

Para cada estudo de caso, garantir:

- [ ] Título claro e descritivo
- [ ] Categoria correta
- [ ] Descrição curta e impactante
- [ ] Campo "challenges" preenchido (O Desafio)
- [ ] Campo "solutions" preenchido (A Solução)
- [ ] Campo "results" preenchido (Resultados)
- [ ] Tecnologias listadas
- [ ] Imagem destacada de qualidade
- [ ] Galeria de screenshots (mínimo 3-5 imagens)
- [ ] URL da demo (subdomínio)
- [ ] Ano e cliente (se aplicável)
- [ ] Status = "published"

## Notas Importantes

1. **Link para Demo**: Sempre usar link externo (`target="_blank"`) para a demo
2. **Conteúdo HTML**: Os campos `challenges`, `solutions`, `results` podem conter HTML
3. **Imagens**: Todas as imagens devem ser otimizadas e hospedadas
4. **SEO**: Cada estudo de caso deve ter metadata única
5. **Performance**: Lazy load de imagens da galeria
6. **Acessibilidade**: Alt texts, estrutura semântica, contraste adequado