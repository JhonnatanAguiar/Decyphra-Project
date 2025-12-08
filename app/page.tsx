'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Header } from '@/views/components/layout/Header'
import { Footer } from '@/views/components/layout/Footer'

/**
 * Home Page
 * 
 * Página inicial do site da Decyphra
 */

export default function HomePage() {
  return (
    <>
      <Header variant="default" sticky={true} />
      
      {/* Hero Section */}
      <Section variant="dark" spacing="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center max-w-4xl mx-auto py-20 lg:py-32">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50">
                Transforme seu{' '}
                <span className="text-primary-500">negócio digital</span>
              </h1>
              <p className="text-xl md:text-2xl text-light-200 mb-8 leading-relaxed">
                Desenvolvimento web, sistemas e APIs para pequenas e médias empresas.
                Soluções que impulsionam resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={ROUTES.contact}
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500 px-8 py-4 text-lg"
                >
                  Fale Conosco
                </Link>
                <Link
                  href={ROUTES.portfolio}
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] focus:ring-primary-500 px-8 py-4 text-lg"
                >
                  Ver Portfólio
                </Link>
              </div>
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
                Oferecemos soluções completas para transformar sua presença digital
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  slug: 'desenvolvimento-web',
                  title: 'Desenvolvimento Web',
                  description: 'Site profissional em WordPress, Shopify e soluções personalizadas que convertem visitantes em clientes.',
                  features: ['WordPress', 'Shopify', 'Site Personalizado', 'E-commerce'],
                  icon: '🌐',
                },
                {
                  slug: 'seo-otimizacao',
                  title: 'SEO & Otimização',
                  description: 'Posicionamento estratégico no Google para aumentar sua visibilidade e atrair mais clientes qualificados.',
                  features: ['SEO Técnico', 'Palavra-chave', 'Link Building', 'Analytics'],
                  icon: '🔍',
                },
                {
                  slug: 'google-ad',
                  title: 'Google Ad',
                  description: 'Campanhas publicitárias otimizadas que geram resultados imediatos e maximizam seu retorno sobre investimento.',
                  features: ['Campanhas de Pesquisa', 'Rede de Display', 'Google Shopping', 'Remarketing'],
                  icon: '📢',
                },
                {
                  slug: 'marketing-de-conteudo',
                  title: 'Marketing de Conteúdo',
                  description: 'Estratégias de conteúdo que engajam sua audiência e fortalecem a autoridade da sua marca no mercado.',
                  features: ['Blog Post', 'Social Media', 'E-mail Marketing', 'Copywriting'],
                  icon: '✍️',
                },
                {
                  slug: 'inteligencia-artificial',
                  title: 'Inteligência Artificial',
                  description: 'Implementação de IA para automação, chatbots e otimização de processos que aumentam a eficiência.',
                  features: ['Chatbot', 'Automação', 'Análise Preditiva', 'Personalização'],
                  icon: '🤖',
                },
                {
                  slug: 'ecommerce-completo',
                  title: 'E-commerce Completo',
                  description: 'Lojas virtuais completas com Shopify, WooCommerce e código próprio, com foco em conversão e gestão autônoma.',
                  features: ['Shopify', 'WooCommerce', 'Pagamentos & Frete', 'SEO para E-commerce'],
                  icon: '🛒',
                },
                {
                  slug: 'consultoria-digital',
                  title: 'Consultoria Digital',
                  description: 'Direcionamento estratégico para micro e pequenos negócios que buscam clareza, estruturação e crescimento digital.',
                  features: ['Diagnóstico Digital', 'Plano de Ação', 'Validação de Projeto', 'Apoio Técnico'],
                  icon: '💡',
                },
              ].map((service, index) => (
                <ScrollReveal key={service.slug} direction="up" delay={index * 100 + 200}>
                  <Link
                    href={`${ROUTES.services}/${service.slug}`}
                    className="block bg-dark-900 rounded-lg border border-dark-800 p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                  >
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-light-50">
                      {service.title}
                    </h3>
                    <p className="text-light-300 text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs text-primary-500 bg-primary-500/10 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <span className="text-primary-500 text-sm font-medium hover:underline">
                      Saiba mais →
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href={ROUTES.services}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] focus:ring-primary-500 px-8 py-4 text-lg"
              >
                Ver Todos os Serviços
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção de Estatísticas */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '100+', label: 'Projetos Entregues' },
                { number: '50+', label: 'Clientes Satisfeitos' },
                { number: '5+', label: 'Anos de Experiência' },
                { number: '24/7', label: 'Suporte Disponível' },
              ].map((stat, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-light-300 text-sm md:text-base">
                      {stat.label}
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
              {/* Placeholder para projetos - será integrado com API */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-dark-900 rounded-lg border border-dark-800 overflow-hidden hover:border-primary-500 transition-colors"
                >
                  <div className="aspect-video bg-dark-800" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-light-50">
                      Projeto {item}
                    </h3>
                    <p className="text-light-300 text-sm mb-4">
                      Descrição do projeto será carregada da API
                    </p>
                    <Link
                      href={`${ROUTES.portfolio}/projeto-${item}`}
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] focus:ring-primary-500 px-4 py-2 text-sm"
                    >
                      Ver Detalhes →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href={ROUTES.portfolio}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500 px-8 py-4 text-lg"
              >
                Ver Portfólio Completo
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
              {/* Placeholder para depoimentos - será integrado com API */}
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="bg-dark-900 rounded-lg border border-dark-800 p-6"
                >
                  <p className="text-light-200 mb-4 italic">
                    "Depoimento será carregado da API"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-dark-800 rounded-full" />
                    <div>
                      <div className="font-semibold text-light-50">
                        Cliente {item}
                      </div>
                      <div className="text-sm text-light-300">Empresa</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href={ROUTES.testimonials}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] focus:ring-primary-500 px-8 py-4 text-lg"
              >
                Ver Todos os Depoimentos
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
                Pronto para transformar seu negócio?
              </h2>
              <p className="text-xl text-light-200 mb-8">
                Entre em contato e descubra como podemos ajudar você a alcançar seus objetivos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={ROUTES.contact}
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500 px-8 py-4 text-lg"
                >
                  Fale Conosco Agora
                </Link>
                <Link
                  href={ROUTES.services}
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] focus:ring-primary-500 px-8 py-4 text-lg"
                >
                  Conheça Nossos Serviços
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <Footer variant="default" />
    </>
  )
}
