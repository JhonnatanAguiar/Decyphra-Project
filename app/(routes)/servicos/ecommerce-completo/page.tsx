'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, LetterGlitch } from '@/views/components/animations'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { ShoppingCart, Settings, PackageCheck, CheckCircle, CreditCard, Truck, Monitor, Users, PencilRuler, Bot, Check, Code, Zap, Rocket, TrendingUp, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Página de Serviço: E-commerce Completo
 * 
 * Página detalhada do serviço de E-commerce Completo
 */

export default function EcommerceCompletoPage() {
  const features = [
    { name: 'WooCommerce', icon: ShoppingCart },
    { name: 'Pagamentos & Frete', icon: CreditCard },
    { name: 'SEO para E-commerce', icon: CheckCircle },
  ]

  const platforms = [
    {
      name: 'Shopify',
      text: 'Ideal para quem deseja uma loja estável, segura e fácil de gerenciar. Personalizamos temas, otimizamos a navegação e integramos apps para aumentar conversões.',
      icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
      isImage: true,
    },
    {
      name: 'WooCommerce (WordPress)',
      text: 'Flexibilidade total para quem busca liberdade de personalização, integração com blogs e melhor controle sobre SEO. Ótima opção para unir conteúdo e vendas.',
      icon: 'https://cdn.worldvectorlogo.com/logos/woocommerce.svg',
      isImage: true,
    },
    {
      name: 'Hostinger e Loja Integrada',
      text: 'Para quem busca agilidade, simplicidade e baixo custo inicial. Criamos lojas que vendem, mesmo com recursos mais enxutos, mantendo design profissional.',
      icon: 'https://cdn.worldvectorlogo.com/logos/hostinger-1.svg',
      isImage: true,
    },
    {
      name: 'Código Próprio',
      text: 'Desenvolvemos e-commerces totalmente customizados com HTML, CSS, JavaScript e integrações com APIs, gateways de pagamento e sistemas de gestão.',
      icon: Code,
      isImage: false,
    },
  ]

  const includedServices = [
    { name: 'Configuração Completa', icon: Settings },
    { name: 'Cadastro de Produtos', icon: PackageCheck },
    { name: 'Otimização para SEO', icon: CheckCircle },
    { name: 'Meios de Pagamento', icon: CreditCard },
    { name: 'Integração de Frete', icon: Truck },
    { name: 'Design Responsivo', icon: Monitor },
    { name: 'Treinamento', icon: Users },
    { name: 'Suporte Pós-Lançamento', icon: PencilRuler },
  ]

  const idealFor = [
    'Marcas iniciantes',
    'Lojas físicas',
    'Pequenos negócios',
    'Criadores independentes',
    'Dropshipping',
    'E-commerces em reestruturação',
  ]

  const iaPoints = [
    'Criação de descrições de produtos otimizadas',
    'Geração de títulos e textos persuasivos',
    'Sugestões de layout e UX',
    'Análise de concorrência e diferenciais',
    'Organização de categorias e estrutura',
    'Automação de tarefas e testes A/B',
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
                  <ShoppingCart className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight">
                  E-commerce <span className="text-primary-500">Completo</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl">
                  Loja online profissional e pronta para vender, com todas as funcionalidades necessárias para seu negócio crescer.
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
              {/* Seção: E-commerce Completo */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <ShoppingCart className="w-8 h-8 mr-3 text-primary-500" />
                    E-commerce Completo e Pronto para Vender
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed">
                    Desenvolvemos e-commerces em plataformas consolidadas como Shopify, WordPress (WooCommerce), 
                    Hostinger Store Builder, Loja Integrada, ou através de código personalizado — tudo adaptado 
                    ao seu nicho, público e objetivo.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Plataformas e Tecnologias */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6">
                    🧰 Plataformas e Tecnologias que Utilizamos
                  </h3>
                  <div className="space-y-6">
                    {platforms.map((platform, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-dark-900/60 p-6 rounded-lg flex flex-col sm:flex-row items-start gap-6 border border-transparent hover:border-primary-500/50 transition-colors"
                      >
                        <div className="flex-shrink-0 flex items-center gap-4">
                          {platform.isImage ? (
                            <div className="w-10 h-10 relative">
                              <Image
                                src={platform.icon as string}
                                alt={`${platform.name} logo`}
                                width={40}
                                height={40}
                                className="object-contain"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            typeof platform.icon !== 'string' && (
                              <platform.icon className="w-10 h-10 text-primary-500" />
                            )
                          )}
                          <h4 className="text-xl font-semibold text-light-50 sm:hidden">{platform.name}</h4>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-light-50 mb-2 hidden sm:block">{platform.name}</h4>
                          <p className="text-light-300 leading-relaxed">{platform.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: Como usamos IA para E-commerce */}
              <ScrollReveal direction="up" delay={200}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-4 flex items-center">
                    <Bot className="w-7 h-7 mr-3 text-primary-500" />
                    Como usamos IA para E-commerce
                  </h3>
                  <p className="text-lg text-light-200 leading-relaxed mb-4">
                    Com IA, conseguimos acelerar o processo de criação da loja e deixá-la mais inteligente desde o lançamento.
                  </p>
                  <ul className="space-y-2 text-light-300 grid md:grid-cols-2 gap-x-6 gap-y-2">
                    {iaPoints.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <Check className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Seção: O que está incluso */}
              <ScrollReveal direction="up" delay={300}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6">
                    ✅ O que está incluso no nosso serviço de E-commerce
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {includedServices.map((item, i) => {
                      const IconComponent = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
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
                Pronto para vender com uma loja profissional?
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
