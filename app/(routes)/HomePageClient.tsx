'use client'

import dynamic from 'next/dynamic'
import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import { Card3D } from '@/views/components/ui/Card3D'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { getServiceIcon } from '@/lib/constants/icons'
import Image from 'next/image'
import { Zap } from 'lucide-react'

// Lazy load GridScan (Three.js/postprocessing é pesado)
const GridScan = dynamic(() => import('@/views/components/animations').then(mod => ({ default: mod.GridScan })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-dark-950" />
})

/**
 * Home Page Client Component
 * 
 * Componente client-side da página inicial
 */

export default function HomePageClient() {
  // Dados dos serviços (primeiros 6 para preview)
  const services = [
    {
      id: 1,
      title: 'Desenvolvimento Web',
      slug: 'desenvolvimento-web',
      description: 'Sites e landing pages em código, com animações, performance e SEO desde a base. Total liberdade visual e evolutiva.',
    },
    {
      id: 2,
      title: 'SEO & Otimização',
      slug: 'seo-otimizacao',
      description: 'SEO técnico + conteúdo orientado a intenção de busca. Visibilidade consistente e crescimento orgânico mensurável.',
    },
    {
      id: 3,
      title: 'Google Ad',
      slug: 'google-ad',
      description: 'Campanhas enxutas e otimizadas para ROI. Tracking bem feito, testes rápidos e escala com controle.',
    },
    {
      id: 4,
      title: 'Marketing de Conteúdo',
      slug: 'marketing-de-conteudo',
      description: 'Conteúdo que educa, posiciona e converte — com estratégia, consistência e copy orientada a ação.',
    },
    {
      id: 5,
      title: 'Inteligência Artificial',
      slug: 'inteligencia-artificial',
      description: 'Agentes e automações com IA para acelerar processos, melhorar atendimento e aumentar eficiência operacional.',
    },
    {
      id: 6,
      title: 'E-commerce Completo',
      slug: 'ecommerce-completo',
      description: 'Lojas rápidas, escaláveis e personalizadas — do checkout ao catálogo, com integrações e foco em conversão.',
    },
  ]

  // Dados dos projetos em destaque (primeiros 3)
  const featuredProjects = [
    {
      id: 1,
      slug: 'ecommerce-fashion',
      title: 'E-commerce Fashion',
      description: 'Desenvolvimento completo de loja virtual para marca de moda com aumento de 300% nas vendas online.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      slug: 'clinica-medica-digital',
      title: 'Clínica Médica Digital',
      description: 'Site responsivo com sistema de agendamento online e estratégia SEO que triplicou os agendamentos.',
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5f4d69?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      slug: 'startup-tecnologica',
      title: 'Startup Tecnológica',
      description: 'Landing page otimizada para conversão com campanhas Google Ads que geraram 500+ leads qualificados.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
  ]

  // Dados dos depoimentos (primeiros 2)
  const featuredTestimonials = [
    {
      id: 1,
      name: 'Anônimo',
      role: 'CEO',
      company: 'Startup de Tecnologia',
      content: 'A Decyphra entregou um site incrível que superou nossas expectativas. O processo foi transparente e o resultado foi um aumento de 40% nos leads.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Anônimo',
      role: 'Gerente de Marketing',
      company: 'E-commerce de Moda',
      content: 'Nossas vendas online cresceram 200% após o novo site e as campanhas de marketing. A equipe é extremamente competente e ágil.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="xl" className="relative overflow-hidden">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#0a1a0f"
          gridScale={0.1}
          scanColor="#00FF88"
          scanOpacity={0.4}
          enablePost={true}
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          scanDirection="pingpong"
          scanDuration={2.0}
          scanDelay={2.0}
          className="z-0"
          style={{}}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-30 z-[1]" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center max-w-4xl mx-auto py-20 lg:py-32">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500 bg-gradient-to-r from-primary-500/30 to-dark-950/30 backdrop-blur-sm mb-4">
                <Zap className="w-4 h-4 text-primary-500" />
                <span className="text-sm text-primary-500 font-normal tracking-wider capitalize">
                  Soluções Digitais Inovadoras
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                Transforme {' '}
                <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Seu Negócio </span> Digital
              </h1>
              <p className="text-xl md:text-2xl text-light-200 mb-8 leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Criamos experiências rápidas, animadas e sob medida — com performance, SEO e escalabilidade desde a base. IA acelera o processo; nossa revisão garante qualidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href={ROUTES.contact}>
                  <Button variant="primary" size="lg" enable3D={true}>
                    Fale com a gente
                  </Button>
                </Link>
                <Link href={ROUTES.services}>
                  <Button variant="ghost" size="lg" enable3D={true}>
                    Ver serviços
                  </Button>
                </Link>
              </div>
              <ul className="flex flex-col sm:flex-row gap-4 justify-center text-light-300 text-sm">
                <li className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Visual sob medida (sem cara de template)
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  TypeScript + Tailwind + Motion
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Entrega rápida com agentes de IA e revisão humana
                </li>
              </ul>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Seção de Serviços Preview */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Nossos <span className="text-primary-500">Serviços</span>
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Do site institucional ao e-commerce: soluções completas com foco em conversão, performance e evolução contínua.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const ServiceIcon = getServiceIcon(service.slug)
                return (
                  <ScrollReveal key={service.id} direction="up" delay={index * 50}>
                    <Link href={`${ROUTES.services}/${service.slug}`} prefetch={false}>
                      <Card3D
                        enableTilt={true}
                        enableParticles={false}
                        enableRipple={true}
                        enableBorderGlow={true}
                        className="h-full p-6"
                      >
                        <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4">
                          <ServiceIcon className="w-6 h-6 text-dark-900" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-light-50">
                          {service.title}
                        </h3>
                        <p className="text-light-300 text-sm">
                          {service.description}
                        </p>
                      </Card3D>
                    </Link>
                  </ScrollReveal>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Link href={ROUTES.services} prefetch={false}>
                <Button variant="ghost" size="lg" enable3D={true}>
                  Ver Todos os Serviços
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção: O que muda quando você faz em código */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                O que muda quando você faz em código
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Mais performance, mais consistência visual, menos limitação. Um produto digital que você consegue evoluir sem remendos.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Controle total do design',
                  description: 'Componentes sob medida, identidade consistente e liberdade criativa real — sem ficar preso a temas.',
                },
                {
                  title: 'Performance de verdade',
                  description: 'Arquitetura moderna, carregamento rápido e foco em Core Web Vitals desde o início.',
                },
                {
                  title: 'Evolução simples',
                  description: 'Adicionar páginas, integrações e melhorias não vira dor de cabeça: o projeto nasce escalável.',
                },
                {
                  title: 'IA como acelerador, não atalho',
                  description: 'Agentes para ganhar tempo no repetitivo; revisão humana para manter padrão, qualidade e intenção.',
                },
              ].map((item, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100 + 200}>
                  <div className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20">
                    <h3 className="text-xl font-semibold mb-3 text-light-50">
                      {item.title}
                    </h3>
                    <p className="text-light-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção: Nosso Processo */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Nosso <span className="text-primary-500">Processo</span>
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Um fluxo claro, rápido e transparente — para você acompanhar tudo sem ruído.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {[
                {
                  step: '01',
                  title: 'Diagnóstico',
                  description: 'Entendemos objetivos, público, referências e metas (conversão, aquisição, autoridade).',
                },
                {
                  step: '02',
                  title: 'Arquitetura & Design',
                  description: 'Estrutura do site, conteúdo, UI e base de SEO/track para medir o que importa.',
                },
                {
                  step: '03',
                  title: 'Build em Código',
                  description: 'Implementação em TypeScript + Tailwind + Motion. IA acelera; revisão humana garante qualidade.',
                },
                {
                  step: '04',
                  title: 'Lançamento & Evolução',
                  description: 'Deploy, métricas, ajustes finos e roadmap de melhorias contínuas para crescer com constância.',
                },
              ].map((process, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100 + 200}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary-500">{process.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-light-50">
                      {process.title}
                    </h3>
                    <p className="text-light-300 text-sm leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center">
              <Link href={ROUTES.contact} prefetch={false}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Quero um site assim
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção: Qualidade que dá para sentir */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Qualidade que dá para sentir
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Design, performance e clareza — tudo pensado para inspirar confiança e gerar ação.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Foco em performance', value: 'Core Web Vitals' },
                { label: 'Entrega objetiva', value: 'Escopo claro' },
                { label: 'Código escalável', value: 'Manutenção fácil' },
              ].map((metric, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100 + 200}>
                  <div className="text-center bg-dark-900/50 p-6 rounded-xl border border-primary-500/20">
                    <div className="text-3xl font-bold text-primary-500 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-light-300 text-sm">
                      {metric.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção de Projetos em Destaque */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Projetos em <span className="text-primary-500">Destaque</span>
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Conheça alguns dos projetos que desenvolvemos
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ScrollReveal key={project.id} direction="up" delay={index * 50}>
                  <Link href={`${ROUTES.portfolio}/${project.slug}`}>
                    <Card3D
                      enableTilt={true}
                      enableParticles={false}
                      enableRipple={true}
                      enableBorderGlow={true}
                      className="overflow-hidden"
                    >
                      <div className="relative aspect-video bg-dark-900 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            // Fallback para cor de fundo se imagem não carregar
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-light-50">
                          {project.title}
                        </h3>
                        <p className="text-light-300 text-sm mb-4">
                          {project.description}
                        </p>
                        <span className="text-primary-500 text-sm font-medium hover:underline inline-flex items-center gap-2">
                          Ver projeto →
                        </span>
                      </div>
                    </Card3D>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={ROUTES.portfolio} prefetch={false}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Ver Portfólio Completo
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção de Depoimentos Preview */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                O que nossos <span className="text-primary-500">clientes</span> dizem
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {featuredTestimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.id} direction="up" delay={index * 50}>
                  <Card3D
                    enableTilt={true}
                    enableParticles={false}
                    enableRipple={true}
                    enableBorderGlow={true}
                    className="p-6"
                  >
                    <p className="text-light-200 mb-4 italic leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-500/30">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-light-50">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-light-300">{testimonial.role}</div>
                        <div className="text-xs text-light-400">{testimonial.company}</div>
                      </div>
                    </div>
                  </Card3D>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={ROUTES.testimonials} prefetch={false}>
                <Button variant="ghost" size="lg" enable3D={true}>
                  Ver Todos os Depoimentos
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="accent" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto py-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-light-50">
                Vamos construir algo que pareça grande — e funcione melhor ainda.
              </h2>
              <p className="text-xl text-light-200 mb-8">
                Se você quer um site rápido, animado e feito sob medida, a gente te guia do diagnóstico ao lançamento (e além).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.contact} prefetch={false}>
                  <Button variant="primary" size="lg" enable3D={true}>
                    Solicitar orçamento
                  </Button>
                </Link>
                <Link href={ROUTES.services} prefetch={false}>
                  <Button variant="ghost" size="lg" enable3D={true}>
                    Conhecer serviços
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
