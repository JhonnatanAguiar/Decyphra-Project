'use client'

import { Card } from '@/components/ui/Card'

export function Security() {
  return (
    <section id="security" className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-8 text-center">
        <div className="space-y-3">
          <span className="ds-pill">Segurança e confiabilidade</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Pensada para dados sensíveis e operações críticas
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            A segurança da Startup Tech foi desenhada desde o início para atender
            empresas que lidam com informações estratégicas e processos
            essenciais ao negócio.
          </p>
        </div>

        <Card className="grid gap-4 text-left md:grid-cols-2">
          <ul className="space-y-2 text-sm text-brand.muted">
            <li>• Criptografia de dados em trânsito e em repouso</li>
            <li>• Infraestrutura escalável em nuvem</li>
          </ul>
          <ul className="space-y-2 text-sm text-brand.muted">
            <li>• Controle de acessos baseado em permissões</li>
            <li>• Conformidade com boas práticas modernas de segurança</li>
          </ul>
        </Card>
      </div>
    </section>
  )
}

