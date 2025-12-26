'use client'

import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, RippleGrid } from '@/views/components/animations'
import { Card3D } from '@/views/components/ui/Card3D'
import { Button } from '@/views/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Folder, Heart, TrendingUp, Users, Building, Wrench, ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

/**
 * Página de Portfólio Client Component
 * 
 * Componente client-side da página de portfólio
 */

// Dados dos projetos (fictícios)
const projects = [
  {
    id: 1,
    slug: 'ecommerce-fashion',
    title: 'E-commerce Fashion',
    description: 'Desenvolvimento completo de loja virtual para marca de moda com aumento de 300% nas vendas online.',
    category: 'Loja Virtual',
    categoryColor: 'bg-primary-500',
    icon: Folder,
    achievements: [
      '+300% em vendas',
      '+150% mais tráfego',
      'Checkout otimizado',
    ],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    slug: 'clinica-medica-digital',
    title: 'Clínica Médica Digital',
    description: 'Site responsivo com sistema de agendamento online e estratégia SEO que triplicou os agendamentos.',
    category: 'Site Institucional',
    categoryColor: 'bg-primary-500',
    icon: Heart,
    achievements: [
      '+200% agendamentos',
      'Posição #1 no Google',
      'Design confiável',
    ],
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5f4d69?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    slug: 'startup-tecnologica',
    title: 'Startup Tecnológica',
    description: 'Landing page otimizada para conversão com campanhas Google Ads que geraram 500+ leads qualificados.',
    category: 'Landing Page',
    categoryColor: 'bg-primary-500',
    icon: TrendingUp,
    achievements: [
      '500+ leads gerados',
      '12% taxa de conversão',
      'ROI de 400%',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    slug: 'restaurante-gourmet',
    title: 'Restaurante Gourmet',
    description: 'Site com cardápio digital e estratégia de marketing de conteúdo que aumentou o faturamento em 250%.',
    category: 'Site Institucional',
    categoryColor: 'bg-primary-500',
    icon: Users,
    achievements: [
      '+250% faturamento',
      'Cardápio interativo',
      'Reservas online',
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    slug: 'consultoria-empresarial',
    title: 'Consultoria Empresarial',
    description: 'Rebranding completo com novo site e estratégia digital que posicionou a empresa como referência no setor.',
    category: 'Rebranding',
    categoryColor: 'bg-primary-500',
    icon: Building,
    achievements: [
      'Identidade renovada',
      '+180% autoridade',
      'Estratégia completa',
    ],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    slug: 'academia-fitness',
    title: 'Academia Fitness',
    description: 'Plataforma digital completa com app mobile e site que revolucionou a experiência do aluno.',
    category: 'Plataforma Digital',
    categoryColor: 'bg-primary-500',
    icon: Wrench,
    achievements: [
      'App mobile integrado',
      '+320% retenção',
      'Experiência premium',
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
  },
]

export default function PortfolioPageClient() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50 z-[1] pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center py-16 lg:py-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-light-50 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">
                Nosso <span className="text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">Portfólio</span>
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Conheça alguns dos nossos projetos capazes de transformar negócios e gerar resultados extraordinários para nossos clientes.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Grid de Projetos */}
      <Section variant="default" spacing="lg" className="py-12 lg:py-16">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon
              return (
                <ScrollReveal key={project.id} direction="up" delay={index * 50}>
                  <Card3D
                    enableTilt={true}
                    enableParticles={false}
                    enableRipple={true}
                    enableBorderGlow={true}
                    className="overflow-hidden group"
                  >
                    {/* Imagem do Projeto */}
                    <div className="relative h-48 overflow-hidden bg-dark-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // Fallback para cor de fundo se imagem não carregar
                          const target = e.target as HTMLImageElement
                          if (target.parentElement) {
                            target.style.display = 'none'
                          }
                        }}
                      />
                      {/* Tag de Categoria */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className={`${project.categoryColor} text-dark-950 px-3 py-1 rounded-full text-xs font-semibold`}>
                          {project.category}
                        </span>
                      </div>
                      {/* Ícone Decorativo */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="w-10 h-10 bg-dark-900/80 rounded-lg flex items-center justify-center border border-primary-500/20">
                          <IconComponent className="w-5 h-5 text-primary-500" />
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-light-50 group-hover:text-primary-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-light-300 mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>

                      {/* Lista de Conquistas */}
                      <ul className="space-y-2 mb-6">
                        {project.achievements.map((achievement, ai) => (
                          <li key={ai} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                            <span className="text-light-200">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Link Ver Detalhes */}
                      <Link
                        href={`${ROUTES.portfolio}/${project.slug}`}
                        className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors text-sm font-medium group/link"
                      >
                        Ver Detalhes
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Card3D>
                </ScrollReveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50" />
        <Container size="lg" className="relative z-10">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center py-16 lg:py-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-light-50">
                Seu Projeto Pode Ser o Próximo <span className="text-primary-500">Sucesso!</span>
              </h2>
              <p className="text-lg md:text-xl text-light-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Cada projeto é único e desenvolvido com estratégia personalizada para maximizar resultados.
              </p>
              <Link href={ROUTES.contact}>
                <Button variant="primary" size="lg" enable3D={true}>
                  Iniciar Meu Projeto
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
