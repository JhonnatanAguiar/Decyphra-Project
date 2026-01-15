export function Footer() {
  return (
    <footer className="border-t border-brand.border/60 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-brand.muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Novaera · Demo SaaS criada pela Decyphra.</p>
        <p className="text-right md:text-left">
          Esta é uma demonstração de portfólio — não representa um produto real.
        </p>
      </div>
    </footer>
  )
}

