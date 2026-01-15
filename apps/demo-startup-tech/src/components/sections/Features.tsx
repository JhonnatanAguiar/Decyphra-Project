'use client'

import { motion } from 'framer-motion'

import { Card } from '@/components/ui/Card'

const FEATURES = [
  {
    title: 'Painéis em tempo real',
    description:
      'Visualize métricas essenciais do seu negócio em dashboards claros e personalizáveis, sem depender de relatórios manuais.',
  },
  {
    title: 'Fluxos automatizados',
    description:
      'Automatize tarefas repetitivas e processos operacionais com fluxos configuráveis que reduzem erros e liberam o time.',
  },
  {
    title: 'Integrações seguras',
    description:
      'Conecte a Startup Tech às ferramentas que você já utiliza, com integrações seguras que mantêm seus dados consistentes.',
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
            Tudo o que você espera de um SaaS moderno
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            A Startup Tech reúne, em um só lugar, painéis em tempo real, fluxos
            automatizados e integrações seguras — a base de um produto SaaS pronto
            para escalar com sua operação.
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
                <p className="text-sm text-brand.muted">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

