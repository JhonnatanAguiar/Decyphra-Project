'use client'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-2xl px-6 text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Demo de Portfólio · Startup Tech · SaaS
        </p>
        <h1 className="text-4xl md:text-6xl font-bold">
          Projeto demo <span className="text-emerald-400">Startup Tech</span>
        </h1>
        <p className="text-zinc-300 text-base md:text-lg">
          Esta é apenas a estrutura inicial da Fase 1. Nas próximas fases vamos
          aplicar o Design System próprio, seções, animações e toda a experiência
          planejada.
        </p>
      </div>
    </main>
  )
}

