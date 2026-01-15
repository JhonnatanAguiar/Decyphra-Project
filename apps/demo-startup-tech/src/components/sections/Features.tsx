import { Card } from '@/components/ui/Card'

const FEATURES = [
  {
    title: 'Painéis em tempo real',
    description: 'Visualize métricas críticas do seu negócio em um só lugar.',
  },
  {
    title: 'Fluxos automatizados',
    description: 'Reduza tarefas repetitivas com automações configuráveis.',
  },
  {
    title: 'Integrações seguras',
    description: 'Conecte sua stack atual sem comprometer segurança.',
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10 text-center">
        <div className="space-y-3">
          <span className="ds-pill">Produto</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Tudo que você espera de um SaaS moderno
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            Benefícios fictícios para compor a narrativa visual do demo e mostrar
            como organizar informação em seções claras.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((item) => (
            <Card key={item.title} className="p-6 text-left">
              <h3 className="mb-2 text-sm font-semibold text-brand.light">
                {item.title}
              </h3>
              <p className="text-xs text-brand.muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

