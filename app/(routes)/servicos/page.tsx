'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/views/components/ui'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

/**
 * Página de Serviços
 * 
 * Exibe todos os serviços oferecidos pela Decyphra
 */

export default function ServicesPage() {

  // Lista de serviços - será integrado com API na Fase 5
  const services = [
    {
      id: 1,
      title: 'Desenvolvimento Web',
      slug: 'desenvolvimento-web',
      description: 'Site profissional em WordPress, Shopify e soluções personalizadas que convertem visitantes em clientes.',
      longDescription: 'Desenvolvemos sites e aplicações web utilizando as tecnologias mais modernas do mercado. Nossas soluções são responsivas, rápidas e otimizadas para SEO.',
      features: ['WordPress', 'Shopify', 'Site Personalizado', 'E-commerce'],
      icon: '🌐',
    },
    {
      id: 2,
      title: 'SEO & Otimização',
      slug: 'seo-otimizacao',
      description: 'Posicionamento estratégico no Google para aumentar sua visibilidade e atrair mais clientes qualificados.',
      longDescription: 'Trabalhamos com técnicas avançadas de SEO técnico, pesquisa de palavras-chave estratégicas, construção de links de qualidade e análise constante de dados.',
      features: ['SEO Técnico', 'Palavra-chave', 'Link Building', 'Analytics'],
      icon: '🔍',
    },
    {
      id: 3,
      title: 'Google Ad',
      slug: 'google-ad',
      description: 'Campanhas publicitárias otimizadas que geram resultados imediatos e maximizam seu retorno sobre investimento.',
      longDescription: 'Criamos e gerenciamos campanhas publicitárias no Google que geram resultados imediatos e maximizam seu retorno sobre investimento.',
      features: ['Campanhas de Pesquisa', 'Rede de Display', 'Google Shopping', 'Remarketing'],
      icon: '📢',
    },
    {
      id: 4,
      title: 'Marketing de Conteúdo',
      slug: 'marketing-de-conteudo',
      description: 'Estratégias de conteúdo que engajam sua audiência e fortalecem a autoridade da sua marca no mercado.',
      longDescription: 'Desenvolvemos estratégias de conteúdo que engajam sua audiência e fortalecem a autoridade da sua marca no mercado.',
      features: ['Blog Post', 'Social Media', 'E-mail Marketing', 'Copywriting'],
      icon: '✍️',
    },
    {
      id: 5,
      title: 'Inteligência Artificial',
      slug: 'inteligencia-artificial',
      description: 'Implementação de IA para automação, chatbots e otimização de processos que aumentam a eficiência.',
      longDescription: 'Implementamos soluções de inteligência artificial para automação, chatbots e otimização de processos que aumentam a eficiência do seu negócio.',
      features: ['Chatbot', 'Automação', 'Análise Preditiva', 'Personalização'],
      icon: '🤖',
    },
    {
      id: 6,
      title: 'E-commerce Completo',
      slug: 'ecommerce-completo',
      description: 'Lojas virtuais completas com Shopify, WooCommerce e código próprio, com foco em conversão e gestão autônoma.',
      longDescription: 'Criamos e-commerces completos com Shopify, WooCommerce e código próprio, com foco em conversão e gestão autônoma.',
      features: ['Shopify', 'WooCommerce', 'Pagamentos & Frete', 'SEO para E-commerce'],
      icon: '🛒',
    },
    {
      id: 7,
      title: 'Consultoria Digital',
      slug: 'consultoria-digital',
      description: 'Direcionamento estratégico para micro e pequenos negócios que buscam clareza, estruturação e crescimento digital.',
      longDescription: 'Oferecemos consultoria digital estratégica para micro e pequenos negócios que buscam clareza, estruturação e crescimento digital.',
      features: ['Diagnóstico Digital', 'Plano de Ação', 'Validação de Projeto', 'Apoio Técnico'],
      icon: '💡',
    },
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
                Nossos <span className="text-primary-500">Serviços</span>
              </h1>
              <p className="text-xl md:text-2xl text-light-200 leading-relaxed">
                Soluções completas em desenvolvimento web, sistemas e APIs para transformar seu negócio digital
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Lista de Serviços */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ScrollReveal key={service.id} direction="up" delay={index * 100}>
                  <Link href={`${ROUTES.services}/${service.slug}`}>
                    <Card
                      variant="interactive"
                      className="h-full transition-all duration-300 hover:border-primary-500"
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{service.icon}</div>
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
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Seção de Processo */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-50">
                Nosso <span className="text-primary-500">Processo</span>
              </h2>
              <p className="text-lg text-light-200 max-w-2xl mx-auto">
                Trabalhamos de forma organizada e transparente para entregar os melhores resultados
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Descoberta',
                  description: 'Entendemos suas necessidades e objetivos',
                },
                {
                  step: '02',
                  title: 'Planejamento',
                  description: 'Criamos um plano detalhado e personalizado',
                },
                {
                  step: '03',
                  title: 'Desenvolvimento',
                  description: 'Desenvolvemos a solução com qualidade e agilidade',
                },
                {
                  step: '04',
                  title: 'Entrega',
                  description: 'Entregamos e damos suporte contínuo',
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
                    <p className="text-light-300 text-sm">
                      {process.description}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-light-50">
                Pronto para começar seu projeto?
              </h2>
              <p className="text-xl text-light-200 mb-8">
                Entre em contato e vamos conversar sobre como podemos ajudar você
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
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}

