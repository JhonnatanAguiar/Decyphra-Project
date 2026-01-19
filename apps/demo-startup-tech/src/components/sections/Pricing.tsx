'use client'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const PLANS = [
  {
    name: 'Starter',
    price: 'R$ 89/mês',
    highlight: false,
    subtitle:
      'Indicado para pequenas equipes iniciando a organização de processos.',
    features: [
      'Até 3 times',
      'Dashboards básicos',
      'Automações simples',
      'Suporte por email',
    ],
  },
  {
    name: 'Growth',
    price: 'R$ 189/mês',
    highlight: true,
    subtitle:
      'Ideal para empresas em crescimento que precisam de mais controle e automação.',
    features: [
      'Times ilimitados',
      'Dashboards avançados',
      'Automações completas',
      'Integrações premium',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    highlight: false,
    subtitle: 'Para operações complexas e demandas específicas.',
    features: [
      'Segurança avançada',
      'SLA dedicado',
      'Onboarding assistido',
      'Suporte prioritário',
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10 text-center">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="ds-pill">Planos</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Estrutura de preços focada em escala
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            Uma estrutura de planos pensada para acompanhar desde as primeiras equipes
            até operações complexas, sem perder controle nem previsibilidade.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 * index }}
            >
              <Card
                articleClassName={plan.highlight ? 'border-brand.primary/70' : undefined}
              >
                <div className="space-y-4 text-left">
                  <h3 className="text-sm font-semibold text-brand.light">
                    {plan.name}
                  </h3>
                  <p className="text-lg font-semibold text-brand.light">
                    {plan.price}
                  </p>
                  {plan.subtitle ? (
                    <p className="text-xs md:text-sm text-brand.muted">
                      {plan.subtitle}
                    </p>
                  ) : null}
                  <ul className="space-y-1 text-sm text-brand.muted">
                    {plan.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    className="mt-4 w-full"
                  >
                    Falar com time comercial
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

