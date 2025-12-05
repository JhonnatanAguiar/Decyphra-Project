export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-light-50 mb-4">404</h2>
        <p className="text-light-200 mb-8">Página não encontrada</p>
        <a
          href="/"
          className="px-4 py-2 bg-primary-500 text-dark-950 rounded hover:bg-primary-400"
        >
          Voltar para home
        </a>
      </div>
    </div>
  )
}
