'use client'

import { Card } from '@/components/ui/Card'

export function ValueProp() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-start">
        <div className="space-y-4 md:w-1/2">
          <span className="ds-pill">Visão geral do produto</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Plataforma SaaS B2B para empresas em crescimento
          </h2>
          <p className="text-sm md:text-base text-brand.muted">
            A <span className="font-semibold text-brand.light">Startup Tech</span> é uma
            plataforma SaaS B2B desenvolvida para empresas que precisam centralizar
            operações, automatizar processos e enxergar indicadores estratégicos em
            tempo real.
          </p>
          <p className="text-sm md:text-base text-brand.muted">
            Ela foi concebida para decisores, gestores e times operacionais que
            buscam eficiência, clareza e escalabilidade — sem complexidade técnica
            desnecessária.
          </p>
        </div>

        <Card className="md:w-1/2 md:self-stretch">
          <div className="space-y-3 text-left">
            <h3 className="text-sm font-semibold text-brand.light">
              Proposta de valor
            </h3>
            <p className="text-xs md:text-sm text-brand.muted">
              Empresas modernas operam com múltiplas ferramentas, planilhas e sistemas
              isolados. A Startup Tech resolve esse problema ao centralizar informações
              críticas, reduzir retrabalho e oferecer controle total da operação em um
              único painel.
            </p>
            <p className="text-xs md:text-sm text-brand.muted">
              A plataforma foi projetada para crescer junto com a empresa, acompanhando
              desde times enxutos até estruturas mais complexas e distribuídas, sem
              perder desempenho ou clareza.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

