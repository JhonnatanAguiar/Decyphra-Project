'use client'

import { motion } from 'framer-motion'

import { Card } from '@/components/ui/Card'

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
            A Startup Tech acompanha desde times enxutos até operações robustas, para
            empresas que valorizam eficiência operacional, clareza estratégica e
            crescimento sustentável.
          </p>
          <p className="text-sm text-brand.muted max-w-2xl mx-auto">
            Marcas presentes nesta página são ilustrativas e representam empresas que
            priorizam eficiência operacional e visibilidade em tempo real.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <Card className="bg-white/[0.03]">
            <p className="text-sm md:text-base text-brand-muted text-center">
              Confiada por equipes em empresas como{' '}
              <span className="font-semibold text-brand-light">
                Acme Corp, Skyline, NeonLabs, Corelytics e Northwind
              </span>
              , que usam a Startup Tech para unificar dados e decisões em um só lugar.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

