export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Demo Startup Tech
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">Página não encontrada</h1>
        <p className="text-zinc-400">
          Esta é uma rota inválida dentro do projeto demo. Volte para a página inicial.
        </p>
      </div>
    </main>
  )
}

