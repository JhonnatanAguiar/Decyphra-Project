'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, LetterGlitch } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { PenTool, FileText, Share2, Mail, CheckCircle, Users, BookOpen, MessageSquare, Target, Rocket, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Página de Serviço: Marketing de Conteúdo
 * 
 * Página detalhada do serviço de Marketing de Conteúdo
 */

export default function MarketingDeConteudoPage() {
  const features = [
    { name: 'Blog Post', icon: FileText },
    { name: 'Social Media', icon: Share2 },
    { name: 'E-mail Marketing', icon: Mail },
    { name: 'Copywriting', icon: PenTool },
  ]

  const contentTypes = [
    {
      title: 'Blog Posts e Artigos',
      icon: FileText,
      description: 'Criamos conteúdo relevante e otimizado para SEO que educa seu público, responde suas dúvidas e posiciona sua marca como autoridade no mercado. Cada artigo é pensado para gerar tráfego e conversões.',
    },
    {
      title: 'Social Media',
      icon: Share2,
      description: 'Gerenciamos suas redes sociais com conteúdo estratégico que engaja sua audiência. Criamos posts, stories, reels e campanhas que constroem relacionamento e aumentam o alcance da sua marca.',
    },
    {
      title: 'E-mail Marketing',
      icon: Mail,
      description: 'Desenvolvemos campanhas de e-mail que nutrem leads, reativam clientes e aumentam vendas. Criamos sequências automáticas, newsletters e campanhas segmentadas que convertem.',
    },
    {
      title: 'Copywriting',
      icon: PenTool,
      description: 'Escrevemos textos persuasivos que vendem. Criamos landing pages, anúncios, descrições de produtos e CTAs que convertem visitantes em clientes. Cada palavra é pensada para gerar ação.',
    },
  ]

  const benefits = [
    'Construção de autoridade e confiança com sua audiência',
    'Aumento de tráfego orgânico para seu site',
    'Geração de leads qualificados de forma sustentável',
    'Melhoria do relacionamento com clientes e prospects',
    'Resultados de longo prazo que continuam gerando valor',
    'Redução do custo de aquisição de clientes',
  ]

  const idealFor = [
    { name: 'Marcas que constroem autoridade', icon: BookOpen },
    { name: 'Negócios que querem engajar audiência', icon: Users },
    { name: 'Empresas que buscam leads qualificados', icon: Target },
    { name: 'Profissionais que querem se destacar', icon: Rocket },
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
                  <PenTool className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  Marketing de <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Conteúdo</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  Estratégias de conteúdo que engajam sua audiência e fortalecem a autoridade da sua marca no mercado.
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
              {/* Seção: Marketing de Conteúdo */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <PenTool className="w-8 h-8 mr-3 text-primary-500" />
                    Conteúdo que converte e engaja
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed mb-4">
                    O marketing de conteúdo é uma das estratégias mais eficazes para construir relacionamento com 
                    sua audiência, estabelecer autoridade no mercado e gerar leads qualificados. Criamos conteúdos 
                    estratégicos que não apenas informam, mas também convertem visitantes em clientes.
                  </p>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Trabalhamos com diferentes formatos de conteúdo: artigos de blog, posts para redes sociais, 
                    campanhas de e-mail marketing e copywriting persuasivo, sempre alinhados com os objetivos 
                    do seu negócio e as necessidades do seu público.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Tipos de Conteúdo */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-8 text-center">
                    Formatos de Conteúdo que Criamos
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {contentTypes.map((content, i) => {
                      const IconComponent = content.icon
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
                            <h4 className="text-xl font-semibold text-light-50">{content.title}</h4>
                          </div>
                          <p className="text-light-300 leading-relaxed">{content.description}</p>
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
                      ✅ Por que investir em marketing de conteúdo?
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
                    <h4 className="text-xl font-bold text-primary-500 mb-4">✍️ Nossa Estratégia</h4>
                    <p className="text-light-200 leading-relaxed mb-4">
                      Não criamos conteúdo genérico. Desenvolvemos uma estratégia de conteúdo personalizada 
                      baseada no seu público, objetivos e mercado. Cada peça de conteúdo é pensada para educar, 
                      engajar e converter, sempre alinhada com sua marca e valores.
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-light-300 text-sm">
                      <MessageSquare className="w-5 h-5 text-primary-500" />
                      <span>Conteúdo que conversa com seu público</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-light-300 text-sm">
                      <TrendingUp className="w-5 h-5 text-primary-500" />
                      <span>Estratégia baseada em dados e resultados</span>
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
                  Pronto para se destacar com conteúdo de verdade?
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
