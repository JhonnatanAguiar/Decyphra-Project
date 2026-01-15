import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export function CallToAction() {
  return (
    <section id="cta" className="px-6 pb-20 pt-10">
      <div className="mx-auto max-w-4xl">
        <Card className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-3">
            <span className="ds-pill">Próximo passo</span>
            <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
              Pronto para imaginar seu próximo produto SaaS?
            </h2>
            <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
              Esta interface é apenas uma demonstração visual. Nas próximas fases
              podemos conectar formulários, fluxos e integrações mínimas para uma
              experiência ainda mais próxima de um produto real.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="md" variant="primary">
              Conversar sobre um projeto
            </Button>
            <Button size="md" variant="ghost">
              Ver outros demos de portfólio
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

