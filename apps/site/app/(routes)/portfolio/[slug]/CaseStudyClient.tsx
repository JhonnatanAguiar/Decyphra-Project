'use client'

import { Container, Section } from '@/views/components/layout'
import { Button } from '@/views/components/ui/Button'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import Image from 'next/image'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export interface CaseStudyProject {
  title: string
  description: string
  longDescription?: string | null
  category: string
  technologies: string[]
  featuredImage: string
  images: string[]
  client?: string | null
  year: number
  challenges?: string | null
  solutions?: string | null
  results?: string | null
  demoUrl?: string
}

interface CaseStudyClientProps {
  project: CaseStudyProject
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  return (
    <>
      {/* Hero */}
      <Section variant="dark" spacing="lg">
        <Container size="lg">
          <Link
            href={ROUTES.portfolio}
            className="inline-flex items-center gap-2 text-light-400 hover:text-primary-500 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Portfólio
          </Link>

          <FadeIn direction="up">
            <div className="mb-8">
              <span className="text-primary-500 text-sm font-medium">{project.category}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-light-50">
                {project.title}
              </h1>
              <p className="text-xl text-light-200 max-w-3xl">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <span className="text-sm text-light-400">Ano</span>
                <div className="text-lg font-semibold text-light-50">{project.year}</div>
              </div>
              {project.client && (
                <div>
                  <span className="text-sm text-light-400">Cliente</span>
                  <div className="text-lg font-semibold text-light-50">{project.client}</div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-dark-800 border border-dark-700 rounded-full text-sm text-light-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" enable3D={true}>
                  Ver Demo
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
            )}
          </FadeIn>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section variant="default" spacing="none">
        <Container size="xl">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </Container>
      </Section>

      {/* O Desafio */}
      {project.challenges && (
        <Section variant="default" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light-50">
                  O Desafio
                </h2>
                <div
                  className="prose prose-invert prose-lg text-light-200 max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.challenges }}
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* A Solução */}
      {project.solutions && (
        <Section variant="dark" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light-50">
                  A Solução
                </h2>
                <div
                  className="prose prose-invert prose-lg text-light-200 max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.solutions }}
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* Galeria */}
      {project.images && project.images.length > 0 && (
        <Section variant="default" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-light-50">
                Galeria
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* Resultados */}
      {project.results && (
        <Section variant="dark" spacing="lg">
          <Container size="lg">
            <ScrollReveal direction="up">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light-50">
                  Resultados
                </h2>
                <div
                  className="prose prose-invert prose-lg text-light-200 max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.results }}
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* CTA Final */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <FadeIn direction="up">
            <div className="text-center py-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-50">
                Quer um Projeto Similar?
              </h2>
              <p className="text-lg text-light-200 mb-8 max-w-2xl mx-auto">
                Entre em contato e vamos conversar sobre como podemos criar algo incrível para você.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="lg" enable3D={true}>
                      Ver Demo Completa
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                )}
                <Link href={ROUTES.contact}>
                  <Button variant="secondary" size="lg">
                    Falar com Especialista
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
