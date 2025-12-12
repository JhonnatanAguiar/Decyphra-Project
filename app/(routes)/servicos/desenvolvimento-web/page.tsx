'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, LetterGlitch } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Globe, Code, ShoppingCart, Settings, CheckCircle, ShoppingBag, Zap, Rocket, Monitor, Smartphone, Gauge, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Página de Serviço: Desenvolvimento Web
 * 
 * Página detalhada do serviço de Desenvolvimento Web
 */

export default function DesenvolvimentoWebPage() {
  const features = [
    { name: 'WordPress', icon: Code },
    { name: 'Shopify', icon: ShoppingCart },
    { name: 'Site Personalizado', icon: Settings },
    { name: 'E-commerce', icon: ShoppingCart },
  ]

  const platforms = [
    {
      title: 'WordPress',
      icon: Code,
      description: 'Trabalhamos com o CMS mais popular do mundo para criar sites profissionais, blogs, portfólios e landing pages otimizadas. Utilizamos temas leves, personalizados e plugins confiáveis, sempre focando em SEO, performance e segurança.',
    },
    {
      title: 'Shopify',
      icon: ShoppingCart,
      description: 'Criamos e-commerces completos na plataforma Shopify, com design personalizado, integrações de pagamento, gestão de estoque e otimização para conversão. Ideal para lojas que querem escalar rapidamente.',
    },
    {
      title: 'Site Personalizado',
      icon: Settings,
      description: 'Desenvolvemos sites do zero usando as tecnologias mais modernas (Next.js, React, TypeScript) quando você precisa de algo único, com funcionalidades específicas e total controle sobre cada detalhe.',
    },
    {
      title: 'E-commerce',
      icon: ShoppingBag,
      description: 'Soluções completas de e-commerce com foco em conversão, experiência do usuário e gestão simplificada. Integramos métodos de pagamento, frete e sistemas de gestão para você vender online com eficiência.',
    },
  ]

  const benefits = [
    'Sites responsivos que funcionam perfeitamente em todos os dispositivos',
    'Otimização para mecanismos de busca (SEO) integrada desde o início',
    'Design moderno e profissional que representa sua marca',
    'Performance otimizada para carregamento rápido',
    'Suporte contínuo e manutenção após o lançamento',
    'Segurança implementada em todas as camadas',
  ]

  const idealFor = [
    { name: 'Empresas que precisam de presença online profissional', icon: Monitor },
    { name: 'Negócios que querem vender online', icon: ShoppingCart },
    { name: 'Profissionais que buscam portfólio digital', icon: Rocket },
    { name: 'Startups que precisam de MVP rápido', icon: Zap },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <LetterGlitch
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
                  <Globe className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  Desenvolvimento <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Web</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  Site profissional em WordPress, Shopify e soluções personalizadas que convertem visitantes em clientes.
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
              {/* Seção: Desenvolvimento Web Personalizado */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <Globe className="w-8 h-8 mr-3 text-primary-500" />
                    Desenvolvimento Web Personalizado
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Na Decyphra, acreditamos que um site bem construído é mais do que uma vitrine — é o ponto de partida 
                    para o sucesso digital do seu negócio. Por isso, desenvolvemos soluções web sob medida, combinando 
                    tecnologia, design, performance e inteligência artificial para entregar sites que realmente funcionam.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Plataformas e Tecnologias */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-8 flex items-center">
                    <ShoppingBag className="w-6 h-6 mr-3 text-primary-500" />
                    Plataformas e Tecnologias que Utilizamos
                  </h3>
                  <div className="space-y-6">
                    {platforms.map((platform, i) => {
                      const IconComponent = platform.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4 mb-3">
                            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary-500" />
                            </div>
                            <h4 className="text-xl font-semibold text-light-50">{platform.title}</h4>
                          </div>
                          <p className="text-light-300 leading-relaxed">{platform.description}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: Benefícios */}
              <ScrollReveal direction="up" delay={200}>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-light-50 mb-6">
                      ✅ Por que escolher nosso desenvolvimento web?
                    </h3>
                    <ul className="space-y-4">
                      {benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start text-light-200"
                        >
                          <CheckCircle className="w-6 h-6 mr-3 text-primary-500 flex-shrink-0 mt-1" />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="p-8 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl border border-primary-500/20"
                  >
                    <h4 className="text-xl font-bold text-primary-500 mb-4">🚀 Nossa Abordagem</h4>
                    <p className="text-light-200 leading-relaxed mb-4">
                      Cada projeto é único. Analisamos seu negócio, público-alvo e objetivos para criar a solução 
                      perfeita. Combinamos as melhores práticas de desenvolvimento com design moderno e estratégias 
                      de conversão para entregar sites que geram resultados reais.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <Gauge className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">Performance</p>
                      </div>
                      <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">Segurança</p>
                      </div>
                      <div className="text-center">
                        <Smartphone className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">Responsivo</p>
                      </div>
                      <div className="text-center">
                        <Zap className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">Otimizado</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>

              {/* Seção: Ideal para */}
              <ScrollReveal direction="up" delay={300}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6 text-center">
                    📌 Ideal para:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {idealFor.map((item, i) => {
                      const IconComponent = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-dark-900/60 p-4 rounded-lg text-center border border-transparent hover:border-primary-500/50 transition-colors"
                        >
                          <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                          <span className="text-light-300 text-sm">{item.name}</span>
                        </motion.div>
                      )
                    })}
                  </div>
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
                  <Link href={ROUTES.contact} className="w-full">
                    <Button variant="primary" size="md" enable3D={true} className="w-full">
                      Solicitar Orçamento
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
              <Link href={ROUTES.contact}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Pronto para ter um site que representa seu negócio?
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
