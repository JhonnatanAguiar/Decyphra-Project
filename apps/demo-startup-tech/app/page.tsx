'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_55%,_#000_100%)] flex items-center justify-center px-6 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 text-center">
        <span className="ds-pill">
          Demo de Portfólio · Startup Tech · SaaS
        </span>

        <Card className="max-w-3xl">
          <div className="space-y-4">
            <h1 className="ds-heading-display text-4xl md:text-5xl lg:text-6xl font-semibold text-brand.light">
              Base visual pronta para uma{' '}
              <span className="bg-gradient-to-r from-brand.primary via-brand.secondary to-brand.accent bg-clip-text text-transparent">
                experiência SaaS impressionante
              </span>
              .
            </h1>
            <p className="text-sm md:text-base text-brand.muted max-w-xl mx-auto">
              Esta é a fundação da identidade visual do projeto. Nas próximas
              fases vamos evoluir para seções completas, animações e a narrativa
              completa da startup.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="md" variant="primary">
              Ver plano das próximas fases
            </Button>
            <Button size="md" variant="ghost">
              Explorar design system
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}

