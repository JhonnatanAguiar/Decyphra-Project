'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

/**
 * Página de Serviço: SEO & Otimização
 * 
 * Página detalhada do serviço de SEO & Otimização
 */

export default function SeoOtimizacaoPage() {
  const features = [
    { name: 'SEO Técnico', icon: '⚙️' },
    { name: 'Palavra-chave', icon: '🔑' },
    { name: 'Link Building', icon: '🔗' },
    { name: 'Analytics', icon: '📊' },
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
                SEO & <span className="text-primary-500">Otimização</span>
              </h1>
              <p className="text-xl md:text-2xl text-light-200 leading-relaxed mb-8">
                Posicionamento estratégico no Google para aumentar sua visibilidade e atrair mais clientes qualificados.
              </p>
              <Link
                href={ROUTES.contact}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500 px-8 py-4 text-lg"
              >
                Pronto para crescer no Google?
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
                    Aumente sua visibilidade no Google
                  </h2>
                  <p className="text-lg text-light-200 mb-6 leading-relaxed">
                    O SEO (Search Engine Optimization) é fundamental para que seu site apareça nas primeiras 
                    posições do Google quando seus clientes buscam pelos produtos ou serviços que você oferece. 
                    Nossa estratégia de otimização é completa e focada em resultados reais.
                  </p>
                  <p className="text-lg text-light-200 mb-6 leading-relaxed">
                    Trabalhamos com técnicas avançadas de SEO técnico, pesquisa de palavras-chave estratégicas, 
                    construção de links de qualidade e análise constante de dados para garantir que sua presença 
                    digital cresça de forma sustentável e orgânica.
                  </p>
                  <h3 className="text-2xl font-semibold mb-4 text-light-50 mt-8">
                    Por que investir em SEO?
                  </h3>
                  <ul className="space-y-4 text-light-200 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Aumento de tráfego orgânico qualificado para seu site</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Maior visibilidade nas buscas do Google</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Atração de clientes que já estão procurando pelo que você oferece</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Resultados de longo prazo e sustentáveis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Melhor custo-benefício comparado a anúncios pagos</span>
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
