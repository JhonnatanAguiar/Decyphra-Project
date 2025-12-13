'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, GridScan } from '@/views/components/animations'
import { Card3D } from '@/views/components/ui/Card3D'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { getServiceIcon } from '@/lib/constants/icons'
import Image from 'next/image'

/**
 * Home Page
 * 
 * Página inicial do site da Decyphra
 */

export default function HomePage() {
  // Dados dos serviços (primeiros 6 para preview)
  const services = [
    {
      id: 1,
      title: 'Desenvolvimento Web',
      slug: 'desenvolvimento-web',
      description: 'Site profissional em WordPress, Shopify e soluções personalizadas que convertem visitantes em clientes.',
    },
    {
      id: 2,
      title: 'SEO & Otimização',
      slug: 'seo-otimizacao',
      description: 'Posicionamento estratégico no Google para aumentar sua visibilidade e atrair mais clientes qualificados.',
    },
    {
      id: 3,
      title: 'Google Ad',
      slug: 'google-ad',
      description: 'Campanhas publicitárias otimizadas que geram resultados imediatos e maximizam seu retorno sobre investimento.',
    },
    {
      id: 4,
      title: 'Marketing de Conteúdo',
      slug: 'marketing-de-conteudo',
      description: 'Estratégias de conteúdo que engajam sua audiência e fortalecem a autoridade da sua marca no mercado.',
    },
    {
      id: 5,
      title: 'Inteligência Artificial',
      slug: 'inteligencia-artificial',
      description: 'Implementação de IA para automação, chatbots e otimização de processos que aumentam a eficiência.',
    },
    {
      id: 6,
      title: 'E-commerce Completo',
      slug: 'ecommerce-completo',
      description: 'Lojas virtuais completas com Shopify, WooCommerce e código próprio, com foco em conversão e gestão autônoma.',
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
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-30 z-[1]" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center max-w-4xl mx-auto py-20 lg:py-32">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                Transforme seu{' '}
                <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">negócio digital</span>
              </h1>
              <p className="text-xl md:text-2xl text-light-200 mb-8 leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Desenvolvimento web, sistemas e APIs para pequenas e médias empresas.
                Soluções que impulsionam resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.contact}>
                  <Button variant="primary" size="lg" enable3D={true}>
                    Fale Conosco
                  </Button>
                </Link>
                <Link href={ROUTES.portfolio}>
                  <Button variant="ghost" size="lg" enable3D={true}>
                    Ver Portfólio
                  </Button>
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
              {services.map((service, index) => {
                const ServiceIcon = getServiceIcon(service.slug)
                return (
                  <ScrollReveal key={service.id} direction="up" delay={index * 50}>
                    <Link href={`${ROUTES.services}/${service.slug}`}>
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
              <Link href={ROUTES.services}>
                <Button variant="ghost" size="lg" enable3D={true}>
                  Ver Todos os Serviços
                </Button>
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
                      <div className="relative aspect-video">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              <Link href={ROUTES.portfolio}>
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
              <Link href={ROUTES.testimonials}>
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
                Pronto para transformar seu negócio?
              </h2>
              <p className="text-xl text-light-200 mb-8">
                Entre em contato e descubra como podemos ajudar você a alcançar seus objetivos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.contact}>
                  <Button variant="primary" size="lg" enable3D={true}>
                    Fale Conosco Agora
                  </Button>
                </Link>
                <Link href={ROUTES.services}>
                  <Button variant="ghost" size="lg" enable3D={true}>
                    Conheça Nossos Serviços
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
