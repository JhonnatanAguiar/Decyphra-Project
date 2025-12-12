'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, LetterGlitch } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Megaphone, Search, Monitor, ShoppingBag, Repeat, TrendingUp, Target, Zap, Rocket, CheckCircle, DollarSign, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Página de Serviço: Google Ad
 * 
 * Página detalhada do serviço de Google Ad
 */

export default function GoogleAdPage() {
  const features = [
    { name: 'Campanhas de Pesquisa', icon: Search },
    { name: 'Rede de Display', icon: Monitor },
    { name: 'Google Shopping', icon: ShoppingBag },
    { name: 'Remarketing', icon: Repeat },
  ]

  const campaignTypes = [
    {
      title: 'Campanhas de Pesquisa',
      icon: Search,
      description: 'Anúncios que aparecem quando seus clientes buscam por palavras-chave relacionadas ao seu negócio. Criamos anúncios otimizados que atraem cliques qualificados e geram conversões.',
    },
    {
      title: 'Rede de Display',
      icon: Monitor,
      description: 'Anúncios visuais em milhões de sites e apps da rede do Google. Ideal para aumentar a visibilidade da sua marca, gerar awareness e alcançar seu público em diferentes momentos da jornada de compra.',
    },
    {
      title: 'Google Shopping',
      icon: ShoppingBag,
      description: 'Anúncios de produtos com imagem, preço e loja diretamente nos resultados de busca. Perfeito para e-commerces que querem aumentar vendas e destacar seus produtos no Google.',
    },
    {
      title: 'Remarketing',
      icon: Repeat,
      description: 'Reconquiste visitantes que não converteram na primeira visita. Mostramos anúncios personalizados para pessoas que já visitaram seu site, aumentando significativamente as chances de conversão.',
    },
  ]

  const benefits = [
    'Resultados imediatos e mensuráveis',
    'Apareça no topo das buscas do Google',
    'Controle total sobre orçamento e investimento',
    'Segmentação precisa do público-alvo',
    'Otimização contínua para melhor performance',
    'ROI transparente e acompanhamento em tempo real',
  ]

  const idealFor = [
    { name: 'Negócios que querem resultados rápidos', icon: Zap },
    { name: 'E-commerces que querem aumentar vendas', icon: ShoppingBag },
    { name: 'Empresas que buscam leads qualificados', icon: Target },
    { name: 'Marcas que querem aumentar visibilidade', icon: Rocket },
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
                  <Megaphone className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  Google <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Ad</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  Campanhas publicitárias otimizadas que geram resultados imediatos e maximizam seu retorno sobre investimento.
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
              {/* Seção: Google Ads */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <Megaphone className="w-8 h-8 mr-3 text-primary-500" />
                    Resultados imediatos com Google Ads
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed mb-4">
                    O Google Ads é a plataforma de publicidade online mais poderosa do mundo, permitindo que 
                    sua empresa apareça exatamente quando seus clientes estão procurando pelos seus produtos 
                    ou serviços. Nossas campanhas são estrategicamente planejadas e constantemente otimizadas 
                    para maximizar seu ROI.
                  </p>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Trabalhamos com diferentes tipos de campanhas: Pesquisa, Display, Shopping e Remarketing, 
                    sempre focando em atrair o público certo, no momento certo, com a mensagem certa.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Tipos de Campanha */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-8 text-center">
                    Tipos de Campanha que Gerenciamos
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {campaignTypes.map((campaign, i) => {
                      const IconComponent = campaign.icon
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
                            <h4 className="text-xl font-semibold text-light-50">{campaign.title}</h4>
                          </div>
                          <p className="text-light-300 leading-relaxed">{campaign.description}</p>
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
                      ✅ Por que investir em Google Ads?
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
                    <h4 className="text-xl font-bold text-primary-500 mb-4">💰 Nossa Abordagem</h4>
                    <p className="text-light-200 leading-relaxed mb-4">
                      Não desperdiçamos seu orçamento. Criamos campanhas otimizadas desde o primeiro dia, 
                      com palavras-chave estratégicas, segmentação precisa e anúncios que convertem. 
                      Monitoramos constantemente e ajustamos para maximizar seu ROI.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">ROI Otimizado</p>
                      </div>
                      <div className="text-center">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">Acompanhamento</p>
                      </div>
                      <div className="text-center">
                        <Target className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">Segmentação</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                        <p className="text-sm text-light-300">Crescimento</p>
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
                  Quer atrair mais clientes com anúncios no Google?
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
