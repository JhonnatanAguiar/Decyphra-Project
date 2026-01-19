'use client'

import { motion } from 'framer-motion'

import { Card } from '@/components/ui/Card'
import { RequestAccessForm } from '@/components/ui/RequestAccessForm'

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
              <span className="ds-pill">Acesso antecipado</span>
              <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
                Solicite acesso à plataforma
              </h2>
              <p className="text-base md:text-lg text-brand.muted max-w-2xl mx-auto">
                Deixe seu nome e e-mail. Nossa equipe entra em contato em breve
                para apresentar a solução e abrir seu acesso.
              </p>
            </div>

            <RequestAccessForm />
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

