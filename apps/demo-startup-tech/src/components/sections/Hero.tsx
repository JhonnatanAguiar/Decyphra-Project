'use client'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[70vh] items-center justify-center px-6 py-16"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.6)_0,_transparent_60%)] blur-3xl"
          animate={{ x: [-40, 40, -40] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <motion.span
          className="ds-pill"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Startup Tech · Plataforma SaaS B2B
        </motion.span>

        <Card className="max-w-3xl">
          <div className="px-4 py-10 sm:px-8 sm:py-12">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h1 className="ds-heading-display text-4xl md:text-5xl lg:text-6xl font-semibold text-brand.light">
                Centralize sua operação{' '}
                <span className="bg-gradient-to-r from-brand.primary via-brand.primarySoft to-brand.accent bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(15,23,42,0.75)]">
                  em uma única plataforma.
                </span>
              </h1>
              <p className="text-sm md:text-base text-brand.muted max-w-xl mx-auto">
                Controle processos, dados e integrações em tempo real com uma solução
                SaaS pensada para escalar junto com o seu negócio.
              </p>
              <p className="text-xs md:text-sm text-brand.muted max-w-xl mx-auto">
                A Startup Tech conecta times, automatiza rotinas e transforma
                informações dispersas em decisões claras — tudo em uma interface
                moderna, segura e preparada para empresas em crescimento.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            >
              <Button size="lg" variant="primary">
                Explorar demo interativa
              </Button>
              <Button size="lg" variant="ghost">
                Ver arquitetura da plataforma
              </Button>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  )
}

