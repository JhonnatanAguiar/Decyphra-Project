'use client'

import { motion } from 'framer-motion'

import { Card } from '@/components/ui/Card'

const LOGOS = ['Acme Corp', 'Skyline', 'NeonLabs', 'Corelytics', 'Northwind']

export function SocialProof() {
  return (
    <section id="social-proof" className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10 text-center">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="ds-pill">Prova social</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Criada para escalar junto com empresas modernas
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            Marcas fictícias apenas para reforçar a percepção de confiança e
            maturidade do produto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <Card className="flex flex-wrap items-center justify-center gap-6 bg-white/[0.03]">
            {LOGOS.map((logo, index) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.06 * index }}
                className="text-xs font-medium uppercase tracking-[0.28em] text-brand-muted/80"
              >
                {logo}
              </motion.span>
            ))}
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

