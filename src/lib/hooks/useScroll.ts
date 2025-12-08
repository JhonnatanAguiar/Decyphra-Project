'use client'

import { useEffect, useState } from 'react'

/**
 * useScroll Hook
 * 
 * Hook customizado para detectar e monitorar scroll da página.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Retorna posição atual do scroll
 * - Retorna direção do scroll (up/down)
 * - Retorna se está no topo
 * - Performance otimizada com requestAnimationFrame
 */

export interface UseScrollReturn {
  scrollY: number // Posição Y do scroll
  scrollX: number // Posição X do scroll
  scrollDirection: 'up' | 'down' | null // Direção do scroll
  isScrolled: boolean // Se scrollou mais que threshold
  isAtTop: boolean // Se está no topo
  isAtBottom: boolean // Se está no final da página
}

export interface UseScrollOptions {
  threshold?: number // Threshold para isScrolled (padrão: 0)
  onScroll?: (scrollY: number) => void // Callback quando scrollar
}

export const useScroll = (options: UseScrollOptions = {}): UseScrollReturn => {
  const { threshold = 0, onScroll } = options

  const [scrollY, setScrollY] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScroll = () => {
      const currentScrollY = window.scrollY
      const currentScrollX = window.scrollX

      // Atualiza posição
      setScrollY(currentScrollY)
      setScrollX(currentScrollX)

      // Determina direção
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      // Verifica se está no topo
      setIsAtTop(currentScrollY <= 0)

      // Verifica se está no final
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      setIsAtBottom(currentScrollY + windowHeight >= documentHeight - 10) // 10px de margem

      // Callback
      if (onScroll) {
        onScroll(currentScrollY)
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    // Executa uma vez para valores iniciais
    updateScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [onScroll])

  const isScrolled = scrollY > threshold

  return {
    scrollY,
    scrollX,
    scrollDirection,
    isScrolled,
    isAtTop,
    isAtBottom,
  }
}
