'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

/**
 * Página de Serviço: Desenvolvimento Web
 * 
 * Página detalhada do serviço de Desenvolvimento Web
 */

export default function DesenvolvimentoWebPage() {
  const features = [
    { name: 'WordPress', icon: '📝' },
    { name: 'Shopify', icon: '🛍️' },
    { name: 'Site Personalizado', icon: '⚙️' },
    { name: 'E-commerce', icon: '🛒' },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto py-16 lg:py-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-light-50">
                Desenvolvimento <span className="text-primary-500">Web</span>
              </h1>
              <p className="text-xl md:text-2xl text-light-200 leading-relaxed mb-8">
                Site profissional em WordPress, Shopify e soluções personalizadas que convertem visitantes em clientes.
              </p>
              <Link
                href={ROUTES.contact}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500 px-8 py-4 text-lg"
              >
                Pronto para ter um site que representa seu negócio?
              </Link>
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
                    Transforme sua presença digital
                  </h2>
                  <p className="text-lg text-light-200 mb-6 leading-relaxed">
                    Criamos sites profissionais que não apenas impressionam visualmente, mas também convertem visitantes em clientes. 
                    Utilizamos as melhores plataformas do mercado, como WordPress e Shopify, além de desenvolver soluções 
                    completamente personalizadas quando necessário.
                  </p>
                  <p className="text-lg text-light-200 mb-6 leading-relaxed">
                    Nossos sites são desenvolvidos com foco em performance, responsividade e experiência do usuário, 
                    garantindo que sua marca tenha a melhor representação digital possível.
                  </p>
                  <h3 className="text-2xl font-semibold mb-4 text-light-50 mt-8">
                    Por que escolher nosso desenvolvimento web?
                  </h3>
                  <ul className="space-y-4 text-light-200 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Sites responsivos que funcionam perfeitamente em todos os dispositivos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Otimização para mecanismos de busca (SEO) integrada</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Design moderno e profissional que representa sua marca</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Performance otimizada para carregamento rápido</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Suporte contínuo e manutenção após o lançamento</span>
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
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <span className="text-light-200">{feature.name}</span>
                      </li>
                    ))}
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

      {/* CTA Section - Other Services */}
      <Section variant="accent" spacing="lg">
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
