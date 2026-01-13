'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollToTop Component
 * 
 * Componente que garante que a página sempre comece no topo
 * quando é recarregada ou quando a rota muda.
 * 
 * Características:
 * - Rola para o topo no mount (refresh)
 * - Rola para o topo quando a rota muda
 * - Comportamento instantâneo (sem animação)
 * - Não interfere com scroll suave do usuário
 */

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Rola para o topo quando o componente é montado (refresh da página)
    // ou quando a rota muda
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

