'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, LetterGlitch, RippleGrid } from '@/views/components/animations'
import { Card3D } from '@/views/components/ui/Card3D'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { ArrowRight, Quote, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Página de Depoimentos
 * 
 * Exibe depoimentos fictícios de clientes baseados no site de referência
 */

// Dados dos depoimentos (fictícios)
const testimonials = [
  {
    id: 1,
    name: 'Anônimo',
    role: 'CEO',
    company: 'Startup de Tecnologia',
    content: 'A Decyphra entregou um site incrível que superou nossas expectativas. O processo foi transparente e o resultado foi um aumento de 40% nos leads.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Anônimo',
    role: 'Gerente de Marketing',
    company: 'E-commerce de Moda',
    content: 'Nossas vendas online cresceram 200% após o novo site e as campanhas de marketing. A equipe é extremamente competente e ágil.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Anônimo',
    role: 'Proprietário',
    company: 'Academia FitLife',
    content: 'O app e site desenvolvidos revolucionaram a experiência dos nossos alunos. Aumentamos as matrículas em 50% e a retenção melhorou drasticamente.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Anônimo',
    role: 'Diretor Comercial',
    company: 'Clínica Médica Premium',
    content: 'A estratégia de SEO implementada pela Decyphra nos colocou na primeira página do Google. Agendamentos triplicaram em apenas 3 meses.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Anônimo',
    role: 'Fundadora',
    company: 'Restaurante Gourmet',
    content: 'O cardápio digital e a estratégia de conteúdo transformaram nosso negócio. Faturamento aumentou 250% e temos fila de espera para reservas.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Anônimo',
    role: 'CEO',
    company: 'Consultoria Empresarial',
    content: 'O rebranding completo e o novo site posicionaram nossa empresa como referência no setor. Autoridade aumentou 180% e novos clientes não param de chegar.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
  },
]

export default function TestimonialsPage() {
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
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50 z-[1] pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center py-16 lg:py-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-light-50 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                O Que Nossos <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Clientes Dizem</span>
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Histórias reais de transformação digital e crescimento empresarial.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Grid de Depoimentos */}
      <Section variant="default" spacing="lg" className="py-12 lg:py-16">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} direction="up" delay={index * 50}>
                <Card3D
                  enableTilt={true}
                  enableParticles={false}
                  enableRipple={true}
                  enableBorderGlow={true}
                  className="p-6 relative"
                >
                  {/* Aspas Decorativas */}
                  <div className="absolute top-6 right-6 z-10">
                    <Quote className="w-12 h-12 text-primary-500/20" strokeWidth={1.5} />
                  </div>

                  {/* Avatar e Informações do Cliente */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-500/30">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 80px, 100px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-light-50 text-sm">{testimonial.role}</p>
                      <p className="text-light-300 text-sm">{testimonial.name}</p>
                      <p className="text-light-400 text-xs mt-1">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Avaliação com Estrelas */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                        strokeWidth={0}
                      />
                    ))}
                  </div>

                  {/* Texto do Depoimento */}
                  <p className="text-light-200 leading-relaxed text-sm relative z-10">
                    {testimonial.content}
                  </p>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50" />
        <Container size="lg" className="relative z-10">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center py-16 lg:py-20">
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-500 text-yellow-500"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-light-50">
                98% de <span className="text-primary-500">Satisfação dos Clientes</span>
              </h2>
              <p className="text-lg md:text-xl text-light-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Junte-se a nós e transforme seu negócio digital.
              </p>
              <Link href={ROUTES.contact}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Quero Ser o Próximo Sucesso
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
