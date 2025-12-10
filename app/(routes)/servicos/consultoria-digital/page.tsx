'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, LetterGlitch } from '@/views/components/animations'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Lightbulb, Search, BarChart, CheckSquare, Bot, Check, CheckCircle, Compass, Zap, Rocket, Target, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Página de Serviço: Consultoria Digital
 * 
 * Página detalhada do serviço de Consultoria Digital
 */

export default function ConsultoriaDigitalPage() {
  const features = [
    { name: 'Diagnóstico Digital', icon: Search },
    { name: 'Plano de Ação', icon: CheckSquare },
    { name: 'Validação de Projeto', icon: CheckCircle },
    { name: 'Apoio Técnico', icon: Lightbulb },
  ]

  const consultancyTasks = [
    {
      title: 'Diagnóstico de Presença Digital',
      icon: Search,
      points: [
        'Avaliação de site e estrutura digital',
        'Análise de SEO, desempenho e usabilidade',
        'Posicionamento de marca e redes sociais',
        'Análise de concorrência e benchmarking',
      ],
    },
    {
      title: 'Estratégia de Crescimento',
      icon: BarChart,
      points: [
        'Definição de objetivos e metas digitais',
        'Priorização de canais e recursos',
        'Cronograma de execução realista',
        'Indicação de ferramentas e plataformas',
      ],
    },
    {
      title: 'Reestruturação e Validação de Projetos',
      icon: CheckSquare,
      points: [
        'Revisão e validação de ideias',
        'Sugestão de melhorias técnicas e visuais',
        'Orientação com base em boas práticas',
      ],
    },
    {
      title: 'Apoio à Implementação e Testes',
      icon: Lightbulb,
      points: [
        'Checklists de validação',
        'Suporte na escolha de fornecedores',
        'Avaliação de campanhas e conteúdos',
        'Revisão de automações e integrações',
      ],
    },
  ]

  const whyUs = [
    'Atendimento direto com os fundadores',
    'Visão técnica, estratégica e comercial',
    'Diagnóstico e plano de ação prontos para executar',
    'Comunicação clara, sem jargões técnicos',
    'Sessões pontuais ou acompanhamento contínuo',
    'Ideal para quem quer autonomia com direção',
  ]

  const idealFor = [
    'Negócios organizando presença digital',
    'Empreendedores sem saber por onde começar',
    'Profissionais validando ou reestruturando projetos',
    'Negócios que não tiveram resultado',
    'Lojas estruturando seu marketing',
  ]

  const iaPoints = [
    'Criação de sitemaps, funis e planos de ação',
    'Geração de ideias, benchmarks e simulações',
    'Diagnóstico de SEO, performance e concorrência',
    'Recomendações automatizadas com validação humana',
    'Otimização de conteúdo e fluxos',
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
                  <Lightbulb className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  Consultoria <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Digital</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  Direcionamento estratégico profissional para transformar sua presença digital e alcançar seus objetivos.
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
              {/* Seção: Consultoria Digital Estratégica */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <Compass className="w-8 h-8 mr-3 text-primary-500" />
                    Consultoria Digital Estratégica
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Aqui, você recebe direcionamento profissional direto dos fundadores da agência, com aplicação prática, 
                    linguagem acessível e ferramentas modernas, incluindo o uso de IA para análises, planejamento e simulações.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: O que fazemos na Consultoria Digital */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6">
                    🔍 O que fazemos na Consultoria Digital
                  </h3>
                  <div className="space-y-8">
                    {consultancyTasks.map((task, i) => {
                      const IconComponent = task.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
                        >
                          <h4 className="flex items-center text-xl font-semibold text-primary-500 mb-4">
                            <IconComponent className="w-6 h-6 mr-3" />
                            {task.title}
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-light-300">
                            {task.points.map((point, pi) => (
                              <motion.li
                                key={pi}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: pi * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-center"
                              >
                                <Check className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                                <span>{point}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: Como usamos IA na Consultoria */}
              <ScrollReveal direction="up" delay={200}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-4 flex items-center">
                    <Bot className="w-7 h-7 mr-3 text-primary-500" />
                    Como usamos IA na Consultoria
                  </h3>
                  <p className="text-lg text-light-200 leading-relaxed mb-4">
                    Combinamos nossa experiência com o poder da IA para entregar clareza, velocidade e personalização real ao seu negócio.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-light-300">
                    {iaPoints.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <Check className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Seção: Por que contratar a Consultoria */}
              <ScrollReveal direction="up" delay={300}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6">
                    ✅ Por que contratar a Consultoria da Decyphra?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {whyUs.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start text-light-200"
                      >
                        <CheckCircle className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: Ideal para */}
              <ScrollReveal direction="up" delay={400}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6 text-center">
                    📌 Ideal para:
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {idealFor.map((item, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-primary-500/10 text-primary-500 py-2 px-4 rounded-full text-sm font-semibold"
                      >
                        {item}
                      </motion.span>
                    ))}
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
                Quer direcionamento claro e apoio estratégico?
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
