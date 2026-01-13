'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useAnimation Hook
 * 
 * Hook customizado para controlar animações baseadas em IntersectionObserver.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Detecta quando elemento entra na viewport
 * - Controla estado de animação
 * - Threshold configurável
 * - Opção de animar apenas uma vez
 */

export interface UseAnimationOptions {
  threshold?: number // Threshold do IntersectionObserver (0-1)
  rootMargin?: string // Margem do root (ex: "0px" ou "100px")
  triggerOnce?: boolean // Se true, anima apenas uma vez
  initialVisible?: boolean // Estado inicial (padrão: false)
}

export interface UseAnimationReturn {
  ref: React.RefObject<HTMLDivElement>
  isVisible: boolean // Se o elemento está visível
  hasAnimated: boolean // Se já animou (quando triggerOnce = true)
}

export const useAnimation = (
  options: UseAnimationOptions = {}
): UseAnimationReturn => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    initialVisible = false,
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(initialVisible)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            setHasAnimated(true)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return {
    ref,
    isVisible,
    hasAnimated,
  }
}
