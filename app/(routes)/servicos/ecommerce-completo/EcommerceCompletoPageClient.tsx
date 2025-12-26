'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, ServiceBackground } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { ShoppingCart, Settings, CheckCircle, CreditCard, Bot, Check, Code } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Página de Serviço: E-commerce Completo Client Component
 * 
 * Componente client-side da página de E-commerce Completo
 */

export default function EcommerceCompletoPageClient() {
  const platforms = [
    {
      name: 'Shopify (custom + otimização)',
      text: 'Estabilidade + gestão simples.',
      icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
      isImage: true,
    },
    {
      name: 'E-commerce em código (sob medida)',
      text: 'Experiência única, performance máxima, integrações específicas.',
      icon: Code,
      isImage: false,
    },
    {
      name: 'Integrações',
      text: 'Pagamento, frete, ERP, automações e CRM.',
      icon: Settings,
      isImage: false,
    },
  ]

  const iaPoints = [
    'Aceleração de catalogação e padronização de conteúdo (com revisão)',
    'Otimização de páginas para SEO (categorias, coleções, produtos)',
    'Apoio a testes e melhorias contínuas de conversão (CRO)',
    'Automação de fluxos (atendimento, recuperação, segmentação)',
  ]

  const includedServices = [
    'Setup da loja + catálogo',
    'Checkout e integrações',
    'SEO e performance',
    'CRO básico (melhorias de conversão)',
    'Suporte pós-lançamento (opcional)',
  ]

  const featureGrid = [
    { title: 'Checkout confiável', description: 'Fluxo de compra claro e sem atrito.' },
    { title: 'Integrações', description: 'Pagamentos, frete, ERP e automações.' },
    { title: 'SEO de catálogo', description: 'Estrutura e otimização para produtos e categorias.' },
    { title: 'Performance', description: 'Loja rápida para converter mais e ranquear melhor.' },
    { title: 'CRO', description: 'Ajustes contínuos para aumentar taxa de conversão.' },
    { title: 'Escalabilidade', description: 'Base pronta para crescer em produtos e tráfego.' },
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
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 py-16 lg:py-24">
              {/* Ícone Grande */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary-500 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  E-commerce <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Completo</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl">
                  Loja rápida, escalável e personalizada — com integrações e foco em conversão.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Main Content Section */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Seção: E-commerce do jeito certo */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <ShoppingCart className="w-8 h-8 mr-3 text-primary-500" />
                    E-commerce do jeito certo
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed mb-4">
                    Criamos lojas com uma base moderna, priorizando velocidade, UX, SEO de catálogo e conversão.
                  </p>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Quando faz sentido, usamos plataformas consolidadas; quando o projeto pede liberdade total, construímos em código.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Abordagens */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6">
                    Abordagens que trabalhamos
                  </h3>
                  <div className="space-y-6">
                    {platforms.map((platform, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-dark-900/60 p-6 rounded-lg flex flex-col sm:flex-row items-start gap-6 border border-transparent hover:border-primary-500/50 transition-colors"
                      >
                        <div className="flex-shrink-0 flex items-center gap-4">
                          {platform.isImage ? (
                            <div className="w-10 h-10 relative flex items-center justify-center bg-dark-800/50 rounded-lg border border-dark-700">
                              <Image
                                src={platform.icon as string}
                                alt={`${platform.name} logo`}
                                width={40}
                                height={40}
                                className="object-contain w-full h-full p-1.5"
                                loading="lazy"
                                unoptimized={true}
                              />
                            </div>
                          ) : (
                            typeof platform.icon !== 'string' && (
                              <platform.icon className="w-10 h-10 text-primary-500 flex-shrink-0" />
                            )
                          )}
                          <h4 className="text-xl font-semibold text-light-50 sm:hidden">{platform.name}</h4>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-light-50 mb-2 hidden sm:block">{platform.name}</h4>
                          <p className="text-light-300 leading-relaxed">{platform.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: IA aplicada ao e-commerce */}
              <ScrollReveal direction="up" delay={200}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-4 flex items-center">
                    <Bot className="w-7 h-7 mr-3 text-primary-500" />
                    IA aplicada ao e-commerce
                  </h3>
                  <ul className="space-y-3 text-light-300">
                    {iaPoints.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start bg-dark-900/50 p-4 rounded-lg border border-primary-500/20"
                      >
                        <Check className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Seção: O que está incluído */}
              <ScrollReveal direction="up" delay={300}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6">
                    O que está incluído
                  </h3>
                  <ul className="space-y-3">
                    {includedServices.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start text-light-200"
                      >
                        <CheckCircle className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="up" delay={100}>
                <div className="bg-dark-900 rounded-lg border border-dark-800 p-6 sticky top-24">
                  <h3 className="text-xl font-semibold mb-6 text-light-50">
                    Principais recursos
                  </h3>
                  <div className="space-y-4 mb-6">
                    {featureGrid.map((feature, index) => (
                      <div key={index} className="bg-dark-800/50 p-4 rounded-lg border border-primary-500/20">
                        <h4 className="font-semibold text-light-50 mb-1">{feature.title}</h4>
                        <p className="text-light-300 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={ROUTES.contact} className="w-full">
                    <Button variant="primary" size="md" enable3D={true} className="w-full">
                      Quero vender mais
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section Principal */}
      <Section variant="accent" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto py-12">
              <h3 className="text-3xl font-bold mb-4 text-light-50">
                Vamos montar um e-commerce pronto para escalar
              </h3>
              <p className="text-lg text-light-200 mb-8">
                A gente desenha a melhor arquitetura e constrói a loja com foco em performance e conversão.
              </p>
              <Link href={ROUTES.contact}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Solicitar proposta
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* CTA Section - Other Services */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto py-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-light-50">
                Interessado em outro serviço?
              </h2>
              <p className="text-xl text-light-200 mb-8">
                Explore nossa gama completa de soluções digitais para encontrar a combinação perfeita para o seu sucesso.
              </p>
              <Link href={ROUTES.services}>
                <Button variant="ghost" size="lg" enable3D={true}>
                  Ver todos os serviços
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
