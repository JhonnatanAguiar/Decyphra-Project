'use client'

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * ScrollReveal Component
 * 
 * Componente de animação que revela elementos ao fazer scroll.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Animação ao entrar na viewport
 * - Múltiplas direções e tipos de animação
 * - Delay e duração configuráveis
 * - Opção de animar múltiplas vezes
 */

export interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number // Delay em milissegundos
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  threshold?: number // Threshold do IntersectionObserver (0-1)
  duration?: number // Duração da animação em milissegundos
  once?: boolean // Se true, anima apenas uma vez
  distance?: number // Distância do movimento em pixels
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  duration = 600,
  once = true,
  distance = 50,
  className,
  ...props
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold, once])

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`
        case 'down':
          return `translateY(-${distance}px)`
        case 'left':
          return `translateX(${distance}px)`
        case 'right':
          return `translateX(-${distance}px)`
        case 'scale':
          return 'scale(0.95)'
        case 'fade':
        default:
          return 'translateY(0) translateX(0)'
      }
    }
    if (direction === 'scale') {
      return 'scale(1)'
    }
    return 'translateY(0) translateX(0)'
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transform: getTransform(),
      }}
      {...props}
    >
      {children}
    </div>
  )
}

ScrollReveal.displayName = 'ScrollReveal'

export { ScrollReveal }
