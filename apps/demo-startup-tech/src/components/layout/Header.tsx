'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand.border/60 bg-brand.dark/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand.primary to-brand.secondary shadow-brand-soft" />
          <span className="font-display text-xs tracking-[0.28em] uppercase text-brand.muted">
            Novaera · SaaS Demo
          </span>
        </div>

        <nav className="hidden gap-6 text-xs font-medium text-brand.muted md:flex">
          <Link href="#features" className="hover:text-brand.light">
            Produto
          </Link>
          <Link href="#social-proof" className="hover:text-brand.light">
            Prova social
          </Link>
          <Link href="#pricing" className="hover:text-brand.light">
            Planos
          </Link>
        </nav>

        <Link
          href="#cta"
          className="hidden rounded-full bg-brand.primary px-4 py-2 text-xs font-semibold text-white shadow-brand-soft hover:bg-brand.primarySoft md:inline-flex"
        >
          Iniciar demo
        </Link>
      </div>
    </header>
  )
}

