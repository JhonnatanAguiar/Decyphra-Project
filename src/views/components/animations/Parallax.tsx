'use client'

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Parallax Component
 * 
 * Componente de efeito parallax para criar profundidade visual durante o scroll.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Movimento em velocidade diferente durante scroll
 * - Direção configurável (vertical, horizontal)
 * - Velocidade configurável
 * - Performance otimizada com requestAnimationFrame
 */

export interface ParallaxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  speed?: number // Velocidade do parallax (0.1 a 1.0, onde 1.0 = velocidade normal do scroll)
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  disabled?: boolean // Desabilita parallax (útil para mobile)
}

const Parallax = ({
  children,
  speed = 0.5,
  direction = 'up',
  className,
  disabled = false,
  ...props
}: ParallaxProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Validação de speed (deve estar entre 0.1 e 1.0)
  const validatedSpeed = Math.max(0.1, Math.min(1.0, speed))

  useEffect(() => {
    if (disabled || !elementRef.current) return

    // IntersectionObserver para detectar quando o elemento está visível
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(elementRef.current)

    const handleScroll = () => {
      if (!elementRef.current || !isVisible) return

      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calcula a posição do elemento em relação à viewport
      // Quando o elemento está no centro da tela, o offset é 0
      const elementCenter = elementTop + elementHeight / 2
      const viewportCenter = windowHeight / 2
      const offset = (viewportCenter - elementCenter) * validatedSpeed

      setTransform(offset)
    }

    // Usa requestAnimationFrame para performance
    let animationFrameId: number

    const onScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      animationFrameId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // Executa uma vez para posicionar inicialmente

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [validatedSpeed, isVisible, disabled])

  const getTransformStyle = () => {
    if (disabled || !isVisible) {
      return 'translate3d(0, 0, 0)'
    }

    switch (direction) {
      case 'up':
        return `translate3d(0, ${transform}px, 0)`
      case 'down':
        return `translate3d(0, ${-transform}px, 0)`
      case 'left':
        return `translate3d(${transform}px, 0, 0)`
      case 'right':
        return `translate3d(${-transform}px, 0, 0)`
      default:
        return `translate3d(0, ${transform}px, 0)`
    }
  }

  return (
    <div
      ref={elementRef}
      className={cn('will-change-transform', className)}
      style={{
        transform: getTransformStyle(),
        transition: disabled ? 'transform 0.3s ease-out' : 'none',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

Parallax.displayName = 'Parallax'

export { Parallax }
