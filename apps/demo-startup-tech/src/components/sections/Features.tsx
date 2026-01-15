'use client'

import { motion } from 'framer-motion'

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
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="ds-pill">Produto</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Tudo que você espera de um SaaS moderno
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            Benefícios fictícios para compor a narrativa visual do demo e mostrar
            como organizar informação em seções claras.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
        >
          {FEATURES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 * index }}
            >
              <Card className="p-6 text-left">
                <h3 className="mb-2 text-sm font-semibold text-brand.light">
                  {item.title}
                </h3>
                <p className="text-xs text-brand.muted">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

