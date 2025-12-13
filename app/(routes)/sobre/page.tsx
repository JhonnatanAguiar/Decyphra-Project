'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, RippleGrid } from '@/views/components/animations'
import { Card3D } from '@/views/components/ui/Card3D'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Users, Cpu, Code, Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Página Sobre Nós
 * 
 * Apresenta a história, missão e abordagem da Decyphra
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <RippleGrid
            gridColor="#00FF88"
            rippleIntensity={0.08}
            gridSize={7.0}
            gridThickness={18.0}
            fadeDistance={3.0}
            vignetteStrength={5.0}
            glowIntensity={0.8}
            opacity={0.6}
            gridRotation={0}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
            className="z-0"
            style={{}}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-dark-950 z-[1] pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-pulse z-[1]" />
        <Container size="lg" className="relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center py-16 lg:py-24"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-500 px-4 py-2 rounded-full mb-4 border border-primary-500/20"
            >
              <Users className="w-5 h-5" />
              <span>Nossa História</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold mb-4 text-light-50 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]"
            >
              <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Decifrando</span> o Digital
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-light-200 max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            >
              Somos uma dupla de desenvolvedores que transforma ideias em presença digital. 
              Combinamos código, design e IA para criar sites que impulsionam negócios reais.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          {/* Nossa Missão Section */}
          <ScrollReveal direction="up" delay={0}>
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <Image
                  alt="Os dois desenvolvedores da Decyphra"
                  src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl shadow-primary-500/10 object-cover w-full"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-6"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl font-bold text-light-50"
                >
                  Nossa Missão
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-light-200 leading-relaxed"
                >
                  A Decyphra é uma agência de marketing digital e desenvolvimento web especializada 
                  em criar soluções acessíveis, eficientes e personalizadas para microempreendedores, 
                  negócios locais, digitais e pequenas e médias empresas que buscam crescer com 
                  presença forte e profissional na internet.
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-light-200 leading-relaxed"
                >
                  Somos uma agência recente, fundada e gerenciada por dois desenvolvedores, apaixonados 
                  por tecnologia, automação e inteligência artificial. Atuamos com foco total em qualidade, 
                  agilidade e comprometimento, mesmo com equipes reduzidas, entregando resultados que 
                  combinam estratégia, design e performance.
                </motion.p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Nossa Abordagem Flexível Section */}
          <ScrollReveal direction="up" delay={100}>
            <div className="py-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-light-50 mb-4">
                  Nossa Abordagem Flexível
                </h2>
                <p className="text-lg text-light-200 max-w-3xl mx-auto">
                  Essa flexibilidade nos permite atender a uma ampla variedade de projetos — de uma 
                  simples landing page a sistemas web personalizados — sempre com eficiência técnica 
                  e foco em resultado.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <ScrollReveal direction="up" delay={100}>
                  <Card3D
                    enableTilt={true}
                    enableParticles={false}
                    enableRipple={true}
                    enableBorderGlow={true}
                    className="p-8"
                  >
                    <Zap className="w-10 h-10 mx-auto mb-4 text-primary-500" />
                    <h3 className="text-xl font-bold text-light-50 mb-2">
                      Ferramentas Populares
                    </h3>
                    <p className="text-light-300">
                      Utilizamos desde ferramentas populares como o WordPress, até construtores com 
                      inteligência artificial como o Horizon da Hostinger.
                    </p>
                  </Card3D>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={200}>
                  <Card3D
                    enableTilt={true}
                    enableParticles={false}
                    enableRipple={true}
                    enableBorderGlow={true}
                    className="p-8"
                  >
                    <Code className="w-10 h-10 mx-auto mb-4 text-primary-500" />
                    <h3 className="text-xl font-bold text-light-50 mb-2">
                      Código Sob Medida
                    </h3>
                    <p className="text-light-300">
                      Desenvolvemos sites e soluções totalmente do zero com código próprio, quando 
                      necessário, para projetos únicos e personalizados.
                    </p>
                  </Card3D>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={300}>
                  <Card3D
                    enableTilt={true}
                    enableParticles={false}
                    enableRipple={true}
                    enableBorderGlow={true}
                    className="p-8"
                  >
                    <Cpu className="w-10 h-10 mx-auto mb-4 text-primary-500" />
                    <h3 className="text-xl font-bold text-light-50 mb-2">
                      Potencializado por IA
                    </h3>
                    <p className="text-light-300">
                      Nossa principal vantagem? Dominamos o uso de IA em todas as etapas, desde a 
                      criação de conteúdo, automação de tarefas repetitivas, SEO, design assistido, 
                      até programação. Isso nos permite oferecer soluções modernas, escaláveis e 
                      acessíveis, sem abrir mão da personalização e do toque humano.
                    </p>
                  </Card3D>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal direction="up" delay={200}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-primary-500/10 border border-primary-500/20 rounded-2xl p-10 text-center max-w-4xl mx-auto mt-16"
            >
              <h3 className="text-2xl font-bold text-light-50 mb-4">
                Pronto para transformar seu negócio?
              </h3>
              <p className="text-lg text-light-200 mb-6">
                Na Decyphra, cada projeto é tratado como único. Trabalhamos de forma transparente, 
                com comunicação direta e foco total no seu sucesso. Se você precisa lançar ou 
                fortalecer sua presença digital, com quem entende de tecnologia e entrega com 
                agilidade, conte com a Decyphra.
              </p>
              <Link href={ROUTES.contact}>
                <Button variant="primary" size="lg" enable3D={true} className="font-bold">
                  Solicite um Orçamento
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
