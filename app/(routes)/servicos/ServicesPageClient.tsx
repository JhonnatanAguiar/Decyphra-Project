'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, ServiceBackground } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import { Card3D } from '@/views/components/ui/Card3D'
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/views/components/ui'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { getServiceIcon } from '@/lib/constants/icons'

/**
 * Página de Serviços Client Component
 * 
 * Componente client-side da página de serviços
 */

export default function ServicesPageClient() {

  // Lista de serviços - será integrado com API na Fase 5
  const services = [
    {
      id: 1,
      title: 'Desenvolvimento Web',
      slug: 'desenvolvimento-web',
      description: 'Sites e landing pages em código, com animações, performance e SEO desde a base. Total liberdade visual e evolutiva.',
      longDescription: 'Sites e landing pages em código, com animações, performance e SEO desde a base. Total liberdade visual e evolutiva.',
      features: ['TypeScript', 'Tailwind', 'Motion', 'SEO técnico'],
    },
    {
      id: 2,
      title: 'SEO & Otimização',
      slug: 'seo-otimizacao',
      description: 'SEO técnico + conteúdo orientado a intenção de busca. Visibilidade consistente e crescimento orgânico mensurável.',
      longDescription: 'SEO técnico + conteúdo orientado a intenção de busca. Visibilidade consistente e crescimento orgânico mensurável.',
      features: ['SEO Técnico', 'Conteúdo', 'Análise', 'Otimização'],
    },
    {
      id: 3,
      title: 'Google Ad',
      slug: 'google-ad',
      description: 'Campanhas enxutas e otimizadas para ROI. Tracking bem feito, testes rápidos e escala com controle.',
      longDescription: 'Campanhas enxutas e otimizadas para ROI. Tracking bem feito, testes rápidos e escala com controle.',
      features: ['Campanhas', 'Tracking', 'Testes', 'ROI'],
    },
    {
      id: 4,
      title: 'Marketing de Conteúdo',
      slug: 'marketing-de-conteudo',
      description: 'Conteúdo que educa, posiciona e converte — com estratégia, consistência e copy orientada a ação.',
      longDescription: 'Conteúdo que educa, posiciona e converte — com estratégia, consistência e copy orientada a ação.',
      features: ['Estratégia', 'Conteúdo', 'Copy', 'Consistência'],
    },
    {
      id: 5,
      title: 'Inteligência Artificial',
      slug: 'inteligencia-artificial',
      description: 'Agentes e automações com IA para acelerar processos, melhorar atendimento e aumentar eficiência operacional.',
      longDescription: 'Agentes e automações com IA para acelerar processos, melhorar atendimento e aumentar eficiência operacional.',
      features: ['Automação', 'Chatbots', 'Agentes', 'Otimização'],
    },
    {
      id: 6,
      title: 'E-commerce Completo',
      slug: 'ecommerce-completo',
      description: 'Lojas rápidas, escaláveis e personalizadas — do checkout ao catálogo, com integrações e foco em conversão.',
      longDescription: 'Lojas rápidas, escaláveis e personalizadas — do checkout ao catálogo, com integrações e foco em conversão.',
      features: ['Shopify', 'Código próprio', 'Checkout', 'Integrações'],
    },
    {
      id: 7,
      title: 'Consultoria Digital',
      slug: 'consultoria-digital',
      description: 'Direção técnica e estratégica para destravar decisões e organizar um plano de crescimento executável.',
      longDescription: 'Direção técnica e estratégica para destravar decisões e organizar um plano de crescimento executável.',
      features: ['Diagnóstico', 'Plano', 'Estratégia', 'Apoio'],
    },
  ]


  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <ServiceBackground
          glitchColors={['#0a1a0f', '#00FF88', '#00CC6A']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50 z-[1]" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto py-16 lg:py-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-light-50 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Serviços</span>
              </h1>
              <p className="text-xl md:text-2xl text-light-200 leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Soluções digitais completas — com desenvolvimento em código como padrão e uma metodologia acelerada por IA.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Lista de Serviços */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-50">
                O que entregamos
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Escolha o serviço ou combine como um pacote completo.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ScrollReveal key={service.id} direction="up" delay={index * 100}>
                  <Link href={`${ROUTES.services}/${service.slug}`}>
                    <Card3D
                      enableTilt={true}
                      enableParticles={false}
                      enableRipple={true}
                      enableBorderGlow={true}
                      className="h-full"
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const ServiceIcon = getServiceIcon(service.slug)
                            return (
                              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <ServiceIcon className="w-6 h-6 text-dark-900" strokeWidth={1.5} />
                              </div>
                            )
                          })()}
                          <div className="flex-1">
                            <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                            <CardDescription className="text-base">{service.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-primary-500 mb-2">
                            Principais Recursos:
                          </h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-light-300 text-sm">
                                <span className="text-primary-500">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t border-dark-800">
                          <span className="text-primary-500 text-sm font-medium hover:underline inline-flex items-center gap-2">
                            Ver detalhes completos →
                          </span>
                        </div>
                      </CardContent>
                    </Card3D>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção: Desenvolvimento em código */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Desenvolvimento em código, sem limitações
              </h2>
              <p className="text-lg text-light-200 leading-relaxed">
                O seu site não precisa nascer preso a plugin, tema ou gambiarra. A gente constrói uma base moderna, pronta para evoluir.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {[
                'TypeScript para previsibilidade',
                'Tailwind + componentes reutilizáveis',
                'Motion/animações para sites vivos',
                'SEO técnico e performance desde a base',
              ].map((bullet, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100 + 200}>
                  <div className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20 text-center">
                    <p className="text-light-300 leading-relaxed">{bullet}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção: Como trabalhamos */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Como trabalhamos
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Você entende o que está sendo feito, por que está sendo feito, e como isso move o seu negócio.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção: FAQ */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Perguntas frequentes
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: 'Vocês ainda fazem WordPress?',
                  a: 'Nosso padrão hoje é desenvolvimento em código. Em casos específicos (ex.: migração, legado ou necessidade do cliente), podemos avaliar alternativas — mas a proposta principal é entregar liberdade, performance e escalabilidade via código.',
                },
                {
                  q: 'Vocês entregam acesso para editar conteúdo?',
                  a: 'Sim. Podemos integrar um CMS moderno (headless) ou um painel simples sob medida para você editar textos, páginas e imagens sem depender de dev no dia a dia.',
                },
                {
                  q: 'Quanto tempo leva?',
                  a: 'Depende do escopo. Landing pages e sites institucionais enxutos podem ser bem rápidos. Projetos maiores (múltiplas páginas, integrações, e-commerce) exigem mais etapas de validação e QA.',
                },
                {
                  q: 'O site fica pronto para SEO?',
                  a: 'Sim. A base inclui SEO técnico (estrutura, meta, semântica, performance). Se você quiser crescer organicamente, recomendamos um plano contínuo de conteúdo + otimização.',
                },
              ].map((faq, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100 + 200}>
                  <div className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20">
                    <h3 className="text-xl font-semibold mb-3 text-light-50">
                      {faq.q}
                    </h3>
                    <p className="text-light-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="accent" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto py-12">
              <Link href={ROUTES.contact}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Falar com a Decyphra
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
