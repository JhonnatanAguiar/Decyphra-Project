'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand.border/60 bg-brand.dark/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand.primary to-brand.secondary shadow-brand-soft" />
          <span className="font-display text-xs tracking-[0.28em] uppercase text-brand.muted">
            Startup Tech · Plataforma SaaS B2B
          </span>
        </div>

        <nav className="hidden gap-6 text-xs font-medium text-brand.muted md:flex" aria-label="Navegação principal">
          <Link href="#features" className="hover:text-brand.light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand.secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand.dark rounded">
            Produto
          </Link>
          <Link href="#social-proof" className="hover:text-brand.light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand.secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand.dark rounded">
            Prova social
          </Link>
          <Link href="#pricing" className="hover:text-brand.light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand.secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand.dark rounded">
            Planos
          </Link>
        </nav>

        <Link
          href="#cta"
          className="hidden rounded-full border border-white/20 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.4)_0,_rgba(15,23,42,0.9)_45%,_rgba(15,23,42,1)_100%)] px-5 py-2 text-xs font-semibold text-white shadow-brand-soft backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand.secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand.dark md:inline-flex"
        >
          Solicitar acesso
        </Link>
      </div>
    </header>
  )
}

