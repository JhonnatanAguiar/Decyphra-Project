'use client'

import { Card } from '@/components/ui/Card'

const STEPS = [
  {
    title: 'Centralização',
    description:
      'Conecte dados, times e processos em um único ambiente, reduzindo ruídos entre áreas.',
  },
  {
    title: 'Automação',
    description:
      'Configure fluxos e regras que eliminam tarefas manuais repetitivas do dia a dia.',
  },
  {
    title: 'Visibilidade',
    description:
      'Acompanhe tudo em tempo real com dashboards claros e focados em decisão.',
  },
  {
    title: 'Escala',
    description:
      'Expanda o uso da plataforma à medida que a empresa cresce, sem fricção técnica.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-8 text-center">
        <div className="space-y-3">
          <span className="ds-pill">Como funciona</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Do caos operacional à clareza em quatro passos
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            A Startup Tech foi desenhada para acompanhar a jornada completa de
            organização da operação — da primeira conexão de dados ao
            acompanhamento em escala.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <Card key={step.title} className="p-5 text-left">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-muted">
                Etapa {index + 1}
              </p>
              <h3 className="mb-2 text-sm md:text-base font-semibold text-brand.light">
                {step.title}
              </h3>
              <p className="text-sm text-brand.muted">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

