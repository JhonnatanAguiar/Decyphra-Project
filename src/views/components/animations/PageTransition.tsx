'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

/**
 * PageTransition Component
 * 
 * Componente de transição entre páginas.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Transições suaves entre páginas
 * - Múltiplos tipos de animação
 * - Detecção automática de mudança de rota
 * - Configurável (duração, tipo)
 */

export interface PageTransitionProps {
  children: ReactNode
  type?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown'
  duration?: number // Duração em milissegundos
  className?: string
}

const PageTransition = ({
  children,
  type = 'fade',
  duration = 300,
  className,
}: PageTransitionProps) => {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Monta o componente na primeira renderização
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Inicia transição de saída
    setIsTransitioning(true)

    // Após a transição de saída, atualiza o conteúdo e inicia entrada
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [pathname, isMounted, duration])

  const getTransitionClasses = () => {
    if (isTransitioning) {
      switch (type) {
        case 'fade':
          return 'opacity-0'
        case 'slide':
          return 'opacity-0 translate-x-4'
        case 'scale':
          return 'opacity-0 scale-95'
        case 'slideUp':
          return 'opacity-0 translate-y-4'
        case 'slideDown':
          return 'opacity-0 -translate-y-4'
        default:
          return 'opacity-0'
      }
    }

    switch (type) {
      case 'fade':
        return 'opacity-100'
      case 'slide':
        return 'opacity-100 translate-x-0'
      case 'scale':
        return 'opacity-100 scale-100'
      case 'slideUp':
        return 'opacity-100 translate-y-0'
      case 'slideDown':
        return 'opacity-100 translate-y-0'
      default:
        return 'opacity-100'
    }
  }

  // Se ainda não montou, mostra sem animação
  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={cn(
        'transition-all ease-in-out',
        getTransitionClasses(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {displayChildren}
    </div>
  )
}

PageTransition.displayName = 'PageTransition'

export { PageTransition }
