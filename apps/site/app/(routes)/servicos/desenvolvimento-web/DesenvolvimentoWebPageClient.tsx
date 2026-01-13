'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, ServiceBackground } from '@/views/components/animations'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Globe, Code, Settings, CheckCircle, Zap, Shield, Layers, GitBranch, Database, Cpu, Sparkles, FileCode, Rocket, Smartphone, Gauge, Palette, Workflow, GitCommit, Package, Search, Terminal, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Página de Serviço: Desenvolvimento Web Client Component
 * 
 * Componente client-side da página de Desenvolvimento Web
 */

export default function DesenvolvimentoWebPageClient() {
  const includedServices = [
    'Site/Landing em código',
    'SEO técnico base',
    'Performance + responsivo',
    'Integrações essenciais (formulário, WhatsApp, analytics, etc.)',
    'Deploy e checklist de lançamento',
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
                  <Globe className="w-12 h-12 lg:w-16 lg:h-16 text-dark-900" strokeWidth={1.5} />
                </div>
              </div>
              {/* Título e Mensagem */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-50 leading-tight drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                  Desenvolvimento <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Web</span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-light-200 leading-relaxed max-w-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  Sites rápidos, animados e escaláveis — com total controle do design, performance e evolução.
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
              {/* Seção: Desenvolvimento Web personalizado */}
              <ScrollReveal direction="up" delay={0}>
                <div>
                  <h2 className="text-3xl font-bold text-light-50 mb-4 flex items-center">
                    <Globe className="w-8 h-8 mr-3 text-primary-500" />
                    Desenvolvimento Web personalizado
                  </h2>
                  <p className="text-lg text-light-200 leading-relaxed mb-4">
                    Na Decyphra, seu site não nasce preso a tema ou plugin. Nós desenvolvemos em código, com uma base moderna e organizada, pronta para evoluir junto com o seu negócio.
                  </p>
                  <p className="text-lg text-light-200 leading-relaxed">
                    O resultado: performance real, SEO técnico sólido, visual consistente, e um site que dá para melhorar sem remendos.
                  </p>
                </div>
              </ScrollReveal>

              {/* Seção: Stack e padrões */}
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6 flex items-center">
                    <Layers className="w-6 h-6 mr-3 text-primary-500" />
                    Stack e padrões que usamos
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: FileCode, title: 'TypeScript', desc: 'Previsibilidade e manutenção no código' },
                      { icon: Palette, title: 'Tailwind CSS', desc: 'Componentes reutilizáveis e consistência' },
                      { icon: Sparkles, title: 'Framer Motion', desc: 'Animações fluidas e microinterações' },
                      { icon: GitBranch, title: 'Next.js App Router', desc: 'Arquitetura moderna e performance' },
                      { icon: Database, title: 'Prisma + PostgreSQL', desc: 'Backend sólido e escalável' },
                      { icon: Zap, title: 'Otimização de Performance', desc: 'Core Web Vitals em primeiro lugar' },
                    ].map((item, i) => {
                      const IconComponent = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-dark-900/50 p-4 rounded-xl border border-primary-500/20 hover:border-primary-500/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-5 h-5 text-primary-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-light-50 mb-1">{item.title}</h4>
                              <p className="text-light-300 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: Como trabalhamos */}
              <ScrollReveal direction="up" delay={200}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6 flex items-center">
                    <Workflow className="w-6 h-6 mr-3 text-primary-500" />
                    Como trabalhamos
                  </h3>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-primary-500/10 to-transparent p-6 rounded-xl border border-primary-500/20"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GitCommit className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-light-50 mb-2">Metodologia e Estratégia</h4>
                          <ul className="space-y-2 text-light-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Arquitetura baseada em componentes reutilizáveis (MVC adaptado)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Separação clara entre Models, Views e Controllers</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Validação de dados com Zod em todas as camadas</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Versionamento Git com commits organizados e documentados</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Cpu className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-light-50 mb-2">IA e Automação</h4>
                          <ul className="space-y-2 text-light-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Agentes de IA para scaffolding e refatoração assistida</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Revisão humana garantindo qualidade e padrões</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Automação de testes e validação de código</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Gauge className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-light-50 mb-2">Performance e Qualidade</h4>
                          <ul className="space-y-2 text-light-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Otimização de imagens e assets desde o início</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Code splitting automático e lazy loading</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Foco em Core Web Vitals (LCP, FID, CLS)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>TypeScript strict mode para prevenir erros</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="bg-dark-900/50 p-6 rounded-xl border border-primary-500/20"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-light-50 mb-2">Deploy e DevOps</h4>
                          <ul className="space-y-2 text-light-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Deploy automatizado com Vercel/Netlify</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Ambientes de staging e produção separados</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>Scripts customizados para build e deploy</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: Por que isso é melhor */}
              <ScrollReveal direction="up" delay={400}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6 flex items-center">
                    <Rocket className="w-6 h-6 mr-3 text-primary-500" />
                    Por que isso é melhor do que um &quot;site padrão&quot;
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: Palette, title: 'Visual sob medida', desc: 'Sem cara de template, identidade única' },
                      { icon: Gauge, title: 'Performance real', desc: 'Core Web Vitals como prioridade' },
                      { icon: GitBranch, title: 'Evolução fácil', desc: 'Novas páginas, integrações e features' },
                      { icon: Shield, title: 'Código limpo', desc: 'Sem &quot;gambiarras&quot; e retrabalho futuro' },
                    ].map((item, i) => {
                      const IconComponent = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-dark-900/50 p-5 rounded-xl border border-primary-500/20 hover:border-primary-500/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-5 h-5 text-primary-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-light-50 mb-1">{item.title}</h4>
                              <p className="text-light-300 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Seção: O que está incluído */}
              <ScrollReveal direction="up" delay={500}>
                <div>
                  <h3 className="text-2xl font-bold text-light-50 mb-6 flex items-center">
                    <CheckCircle2 className="w-6 h-6 mr-3 text-primary-500" />
                    O que está incluído
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {includedServices.map((item, i) => {
                      const icons = [FileCode, Search, Smartphone, Terminal, Rocket]
                      const IconComponent = icons[i] || CheckCircle
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-dark-900/50 p-4 rounded-lg border border-primary-500/20 flex items-center gap-3"
                        >
                          <IconComponent className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-light-200">{item}</span>
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
                    Principais recursos
                  </h3>
                  <ul className="space-y-4 mb-6">
                    {[
                      { name: 'Código sob medida', desc: 'Liberdade total para o visual e a estrutura.', icon: Code },
                      { name: 'TypeScript', desc: 'Manutenção fácil e menos bugs no longo prazo.', icon: Settings },
                      { name: 'Tailwind + UI', desc: 'Componentes reutilizáveis e consistência visual.', icon: Globe },
                      { name: 'Motion & Interações', desc: 'Animações e microinterações que elevam a experiência.', icon: Zap },
                    ].map((item, index) => {
                      const IconComponent = item.icon
                      return (
                        <li key={index} className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-primary-500 flex-shrink-0" strokeWidth={2} />
                            <span className="text-light-200 font-semibold">{item.name}</span>
                          </div>
                          <p className="text-light-300 text-sm ml-8">
                            {item.desc}
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                  <Link href={ROUTES.contact} className="w-full">
                    <Button variant="primary" size="md" enable3D={true} className="w-full">
                      Quero um orçamento
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
              <h3 className="text-3xl font-bold mb-4 text-light-50">
                Pronto para um site que parece caro (e funciona melhor ainda)?
              </h3>
              <p className="text-lg text-light-200 mb-8">
                Conte o que você quer construir e a gente propõe o caminho mais eficiente.
              </p>
              <Link href={ROUTES.contact}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Falar com a Decyphra
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
