'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, LetterGlitch } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Search, Settings, Key, Link2, BarChart, TrendingUp, Target, Zap, Rocket, CheckCircle, FileSearch, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Página de Serviço: SEO & Otimização
 * 
 * Página detalhada do serviço de SEO & Otimização
 */

export default function SeoOtimizacaoPage() {
  const features = [
    { name: 'SEO Técnico', icon: Settings },
    { name: 'Palavra-chave', icon: Key },
    { name: 'Link Building', icon: Link2 },
    { name: 'Analytics', icon: BarChart },
  ]

  const seoServices = [
    {
      title: 'SEO Técnico',
      icon: Settings,
      description: 'Otimizamos a estrutura técnica do seu site: velocidade de carregamento, mobile-first, schema markup, sitemap XML e robots.txt. Garantimos que o Google entenda e indexe seu site corretamente.',
    },
    {
      title: 'Pesquisa de Palavras-chave',
      icon: Key,
      description: 'Identificamos as palavras-chave mais relevantes para seu negócio, analisando volume de busca, concorrência e intenção do usuário. Criamos estratégias de conteúdo baseadas em dados reais.',
    },
    {
      title: 'Link Building',
      icon: Link2,
      description: 'Construímos uma rede de links de qualidade que aumenta a autoridade do seu site. Trabalhamos com parcerias estratégicas, guest posts e criação de conteúdo linkável que atrai links naturalmente.',
    },
    {
      title: 'Análise e Otimização',
      icon: BarChart,
      description: 'Monitoramos constantemente o desempenho do seu site com Google Analytics e Search Console. Analisamos métricas, identificamos oportunidades e otimizamos continuamente para melhores resultados.',
    },
  ]

  const benefits = [
    'Aumento de tráfego orgânico qualificado para seu site',
    'Maior visibilidade nas buscas do Google',
    'Atração de clientes que já estão procurando pelo que você oferece',
    'Resultados de longo prazo e sustentáveis',
    'Melhor custo-benefício comparado a anúncios pagos',
    'Construção de autoridade e confiança no seu nicho',
  ]

  const idealFor = [
    { name: 'Sites que querem crescer organicamente', icon: TrendingUp },
    { name: 'Negócios que buscam visibilidade no Google', icon: Target },
    { name: 'Empresas que querem reduzir custos com ads', icon: Zap },
    { name: 'Marcas que constroem autoridade', icon: Rocket },
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
                  <Search className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  SEO & <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Otimização</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  Posicionamento estratégico no Google para aumentar sua visibilidade e atrair mais clientes qualificados.
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
              {/* Seção: SEO Aplicado */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <Search className="w-8 h-8 mr-3 text-primary-500" />
                    Aumente sua visibilidade no Google
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed mb-4">
                    O SEO (Search Engine Optimization) é fundamental para que seu site apareça nas primeiras 
                    posições do Google quando seus clientes buscam pelos produtos ou serviços que você oferece. 
                    Nossa estratégia de otimização é completa e focada em resultados reais.
                  </p>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Trabalhamos com técnicas avançadas de SEO técnico, pesquisa de palavras-chave estratégicas, 
                    construção de links de qualidade e análise constante de dados para garantir que sua presença 
                    digital cresça de forma sustentável e orgânica.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Serviços de SEO */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-8 text-center">
                    Como trabalhamos com SEO
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {seoServices.map((service, i) => {
                      const IconComponent = service.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true, amount: 0.5 }}
                          className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary-500" />
                            </div>
                            <h4 className="text-xl font-semibold text-light-50">{service.title}</h4>
                          </div>
                          <p className="text-light-300 leading-relaxed">{service.description}</p>
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
                      ✅ Por que investir em SEO?
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
                    <h4 className="text-xl font-bold text-primary-500 mb-4">🎯 Nossa Estratégia</h4>
                    <p className="text-light-200 leading-relaxed mb-4">
                      Não fazemos SEO genérico. Analisamos seu mercado, concorrência e público-alvo para criar 
                      uma estratégia personalizada. Trabalhamos com técnicas white hat, sempre focados em 
                      resultados de longo prazo que constroem autoridade real para sua marca.
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-light-300 text-sm">
                      <FileSearch className="w-5 h-5 text-primary-500" />
                      <span>Análise completa do seu nicho</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-light-300 text-sm">
                      <Globe className="w-5 h-5 text-primary-500" />
                      <span>Otimização para busca local e global</span>
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
                  Pronto para crescer no Google?
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
