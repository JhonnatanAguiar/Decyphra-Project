import { Card } from '@/components/ui/Card'

const LOGOS = ['Acme Corp', 'Skyline', 'NeonLabs', 'Corelytics', 'Northwind']

export function SocialProof() {
  return (
    <section id="social-proof" className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10 text-center">
        <div className="space-y-3">
          <span className="ds-pill">Prova social</span>
          <h2 className="ds-heading-display text-2xl md:text-3xl text-brand.light">
            Criada para escalar junto com empresas modernas
          </h2>
          <p className="text-sm md:text-base text-brand.muted max-w-2xl mx-auto">
            Marcas fictícias apenas para reforçar a percepção de confiança e
            maturidade do produto.
          </p>
        </div>

        <Card className="flex flex-wrap items-center justify-center gap-6 bg-white/[0.03]">
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="text-xs font-medium uppercase tracking-[0.28em] text-brand-muted/80"
            >
              {logo}
            </span>
          ))}
        </Card>
      </div>
    </section>
  )
}

