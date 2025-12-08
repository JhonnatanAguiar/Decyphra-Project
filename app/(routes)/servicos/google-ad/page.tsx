'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Megaphone, Search, Monitor, ShoppingBag, Repeat } from 'lucide-react'

/**
 * Página de Serviço: Google Ad
 * 
 * Página detalhada do serviço de Google Ad
 */

export default function GoogleAdPage() {
  const features = [
    { name: 'Campanhas de Pesquisa', icon: Search },
    { name: 'Rede de Display', icon: Monitor },
    { name: 'Google Shopping', icon: ShoppingBag },
    { name: 'Remarketing', icon: Repeat },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 py-16 lg:py-24">
              {/* Ícone Grande */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary-500 rounded-2xl flex items-center justify-center">
                  <Megaphone className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight">
                  Google <span className="text-primary-500">Ad</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl">
                  Campanhas publicitárias otimizadas que geram resultados imediatos e maximizam seu retorno sobre investimento.
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
            <div className="lg:col-span-2">
              <ScrollReveal direction="up" delay={0}>
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold mb-6 text-light-50">
                    Resultados imediatos com Google Ads
                  </h2>
                  <p className="text-lg text-light-200 mb-6 leading-relaxed">
                    O Google Ads é a plataforma de publicidade online mais poderosa do mundo, permitindo que 
                    sua empresa apareça exatamente quando seus clientes estão procurando pelos seus produtos 
                    ou serviços. Nossas campanhas são estrategicamente planejadas e constantemente otimizadas 
                    para maximizar seu ROI.
                  </p>
                  <p className="text-lg text-light-200 mb-6 leading-relaxed">
                    Trabalhamos com diferentes tipos de campanhas: Pesquisa, Display, Shopping e Remarketing, 
                    sempre focando em atrair o público certo, no momento certo, com a mensagem certa.
                  </p>
                  <h3 className="text-2xl font-semibold mb-4 text-light-50 mt-8">
                    Por que investir em Google Ads?
                  </h3>
                  <ul className="space-y-4 text-light-200 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Resultados imediatos e mensuráveis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Apareça no topo das buscas do Google</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Controle total sobre orçamento e investimento</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Segmentação precisa do público-alvo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Otimização contínua para melhor performance</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="up" delay={100}>
                <div className="bg-dark-900 rounded-lg border border-dark-800 p-6 sticky top-24">
                  <h3 className="text-xl font-semibold mb-6 text-light-50">
                    O que está incluído?
                  </h3>
                  <ul className="space-y-4 mb-6">
                    {features.map((feature, index) => {
                      const IconComponent = feature.icon
                      return (
                        <li key={index} className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-primary-500 flex-shrink-0" strokeWidth={2} />
                          <span className="text-light-200">{feature.name}</span>
                        </li>
                      )
                    })}
                  </ul>
                  <Link
                    href={ROUTES.contact}
                    className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500 px-6 py-3 text-base"
                  >
                    Solicitar Orçamento
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
              <Link
                href={ROUTES.contact}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500 px-8 py-4 text-lg"
              >
                Quer atrair mais clientes com anúncios no Google?
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
              <Link
                href={ROUTES.services}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] focus:ring-primary-500 px-8 py-4 text-lg"
              >
                Ver todos os serviços
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
