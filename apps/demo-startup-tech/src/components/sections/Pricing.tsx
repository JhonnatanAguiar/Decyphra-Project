import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const PLANS = [
  {
    name: 'Starter',
    price: 'R$ 89/mês',
    highlight: false,
    features: ['Até 3 times', 'Dashboards básicos', 'Suporte por email'],
  },
  {
    name: 'Growth',
    price: 'R$ 189/mês',
    highlight: true,
    features: ['Times ilimitados', 'Automação avançada', 'Integrações premium'],
  },
  {
    name: 'Enterprise',
    price: 'Fale com vendas',
    highlight: false,
    features: ['Segurança avançada', 'SLA dedicado', 'Onboarding assistido'],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10 text-center">
        <div className="space-y-3">
          <span className="ds-pill">Planos</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Estrutura de preços focada em escala
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            Tabela fictícia apenas para demonstrar composição de seções de pricing em
            uma landing page SaaS.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlight ? 'border-brand.primary/70' : ''}
            >
              <div className="space-y-4 text-left">
                <h3 className="text-sm font-semibold text-brand.light">
                  {plan.name}
                </h3>
                <p className="text-lg font-semibold text-brand.light">
                  {plan.price}
                </p>
                <ul className="space-y-1 text-xs text-brand.muted">
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
          ))}
        </div>
      </div>
    </section>
  )
}

