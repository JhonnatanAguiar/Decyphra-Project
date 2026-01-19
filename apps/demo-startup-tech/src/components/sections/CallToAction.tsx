'use client'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export function CallToAction() {
  return (
    <section id="cta" className="px-6 pb-20 pt-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <Card articleClassName="flex flex-col items-center gap-6 text-center">
            <div className="space-y-3">
              <span className="ds-pill">Próximo passo</span>
              <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
                Pronto para imaginar seu próximo produto SaaS?
              </h2>
              <p className="text-base md:text-lg text-brand.muted max-w-2xl mx-auto">
                A Startup Tech foi projetada para ser o centro da sua operação SaaS
                B2B, integrando formulários, fluxos personalizados, sistemas internos
                e ferramentas externas em uma única experiência.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="md" variant="primary">
                Falar com o time comercial
              </Button>
              <Button size="md" variant="ghost">
                Ver outras soluções
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

