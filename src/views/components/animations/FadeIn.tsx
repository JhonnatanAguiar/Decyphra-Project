'use client'

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * FadeIn Component
 * 
 * Componente de animação fade in para elementos que aparecem na tela.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Animação fade in suave
 * - Delay configurável
 * - Direção configurável (up, down, left, right)
 * - Threshold de visibilidade configurável
 */

export interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number // Delay em milissegundos
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  threshold?: number // Threshold do IntersectionObserver (0-1)
  duration?: number // Duração da animação em milissegundos
}

const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  duration = 600,
  className,
  ...props
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold])

  const directions = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: 'translate-y-0',
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-out',
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : `opacity-0 ${directions[direction]}`,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

FadeIn.displayName = 'FadeIn'

export { FadeIn }
