'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, ServiceBackground } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Bot, Brain, Compass, Palette, BarChart, Code, FileText, Zap, Rocket, CheckCircle, Settings, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Página de Serviço: Inteligência Artificial Client Component
 * 
 * Componente client-side da página de Inteligência Artificial
 */

export default function InteligenciaArtificialPageClient() {
  const features = [
    { name: 'Chatbot', icon: Bot },
    { name: 'Automação', icon: Settings },
    { name: 'Análise Preditiva', icon: BarChart },
    { name: 'Personalização', icon: Sparkles },
  ]

  const applications = [
    { 
      title: 'Brainstorm e Ideação', 
      icon: Brain, 
      description: 'Geramos ideias criativas, nomes, títulos e temas com base em dados reais de comportamento e tendências de busca.' 
    },
    { 
      title: 'Planejamento e Estruturação', 
      icon: Compass, 
      description: 'A IA nos ajuda a organizar sitemaps, fluxos de navegação, wireframes e sequências de campanhas com agilidade.' 
    },
    { 
      title: 'Web Design e UX/UI', 
      icon: Palette, 
      description: 'Combinamos referências visuais com IA generativa para testar paletas, tipografias e avaliar a experiência do usuário.' 
    },
    { 
      title: 'Marketing Digital e Estratégias', 
      icon: BarChart, 
      description: 'Otimizamos cada etapa do marketing com análise de concorrência, sugestão de posicionamentos e criação de campanhas.' 
    },
    { 
      title: 'Desenvolvimento e Debugging', 
      icon: Code, 
      description: 'Ao programar, usamos IA para sugerir soluções, otimizar código, corrigir erros e acelerar processos com snippets inteligentes.' 
    },
    { 
      title: 'Criação e Otimização de Conteúdo', 
      icon: FileText, 
      description: 'Aplicamos IA na escrita de rascunhos otimizados para SEO, sugestão de palavras-chave e adaptação de tom de voz.' 
    },
  ]

  const benefits = [
    'Velocidade nas entregas, sem abrir mão da qualidade',
    'Mais ideias, mais soluções e mais alternativas para testar',
    'Redução de custos com automação e eficiência',
    'Decisões baseadas em dados, não apenas em intuição',
    'Personalização em escala, com base no perfil de cada cliente',
  ]

  const idealFor = [
    { name: 'Negócios que querem ir além do básico', icon: Zap },
    { name: 'Empresas que buscam inovação', icon: Rocket },
    { name: 'Projetos que precisam de agilidade', icon: Zap },
    { name: 'Profissionais que querem escalar', icon: Rocket },
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
                  <Bot className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  Inteligência <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Artificial</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  Implementação de IA para automação, chatbots e otimização de processos que aumentam a eficiência.
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
              {/* Seção: Inteligência Artificial Aplicada */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <Bot className="w-8 h-8 mr-3 text-primary-500" />
                    Inteligência Artificial Aplicada
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Na Decyphra, a inteligência artificial não é uma promessa futurista — é parte essencial da nossa rotina. 
                    Aqui, a IA não substitui nosso trabalho, ela potencializa nossas ideias, decisões e entregas.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Como aplicamos IA */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-8 text-center">
                    Como aplicamos IA em nossos serviços
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((app, i) => {
                      const IconComponent = app.icon
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
                            <h4 className="text-xl font-semibold text-light-50">{app.title}</h4>
                          </div>
                          <p className="text-light-300">{app.description}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: Benefícios e Filosofia */}
              <ScrollReveal direction="up" delay={200}>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-light-50 mb-6">
                      ✅ Benefícios Reais para Nossos Clientes
                    </h3>
                    <ul className="space-y-4">
                      {benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.15 }}
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
                    <h4 className="text-xl font-bold text-primary-500 mb-4">🧠 Nossa filosofia com IA</h4>
                    <p className="text-light-200 leading-relaxed">
                      A Decyphra não usa IA para produzir conteúdo genérico. Nós usamos IA como ferramenta estratégica, 
                      sempre supervisionada, validada e ajustada manualmente. Nosso diferencial está em saber como, 
                      onde e quando aplicar a inteligência artificial para gerar valor real, e não apenas velocidade.
                    </p>
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
                  Quer a IA trabalhando a favor do seu negócio?
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
