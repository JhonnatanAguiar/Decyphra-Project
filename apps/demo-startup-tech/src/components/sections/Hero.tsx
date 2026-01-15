'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[70vh] items-center justify-center px-6 py-16"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <span className="ds-pill">Startup Tech · Plataforma SaaS B2B</span>

        <Card className="max-w-3xl">
          <div className="space-y-4">
            <h1 className="ds-heading-display text-4xl md:text-5xl lg:text-6xl font-semibold text-brand.light">
              Centralize sua operação{' '}
              <span className="bg-gradient-to-r from-brand.primary via-brand.secondary to-brand.accent bg-clip-text text-transparent">
                em uma única plataforma
              </span>
              .
            </h1>
            <p className="text-sm md:text-base text-brand.muted max-w-xl mx-auto">
              Demonstração de uma experiência SaaS moderna, com foco em clareza,
              conversão e uma UI impecável — pensada para impressionar decisores.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="primary">
              Explorar demo interativa
            </Button>
            <Button size="lg" variant="ghost">
              Ver arquitetura visual
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

