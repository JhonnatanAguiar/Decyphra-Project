'use client'

import { HTMLAttributes, forwardRef, useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Badge Component
 * 
 * Componente de badge/tag com variantes e tamanhos seguindo o design system da Decyphra.
 * Suporta efeitos 3D opcionais para maior profundidade.
 * 
 * Variantes:
 * - default: Badge padrão com fundo escuro
 * - primary: Badge verde neon
 * - secondary: Badge com borda verde
 * - success: Badge verde para sucesso
 * - warning: Badge amarelo para avisos
 * - error: Badge vermelho para erros
 * 
 * Tamanhos:
 * - sm: padding 0.25rem 0.5rem, texto 0.75rem
 * - md: padding 0.375rem 0.75rem, texto 0.875rem
 * - lg: padding 0.5rem 1rem, texto 1rem
 * 
 * Efeitos 3D:
 * - enable3D: Habilita efeitos 3D sutis (tilt e levitação)
 */

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  enable3D?: boolean
}

const MOBILE_BREAKPOINT = 768
const BADGE_TILT_INTENSITY = 3 // Mais sutil que botões
const BADGE_TILT_SMOOTHING = 0.2

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', enable3D = false, children, ...props }, ref) => {
    const badgeRef = useRef<HTMLSpanElement>(null)
    const animationFrameRef = useRef<number | null>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    
    // Refs para tilt
    const tiltX = useRef(0)
    const tiltY = useRef(0)
    const targetTiltX = useRef(0)
    const targetTiltY = useRef(0)

    // Detectar mobile
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Combinar refs
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(badgeRef.current)
      } else if (ref) {
        ref.current = badgeRef.current
      }
    }, [ref])

    // Efeito 3D: Tilt sutil
    useEffect(() => {
      if (!enable3D || !badgeRef.current || isMobile) {
        return
      }

      const badge = badgeRef.current
      let throttleTimeout: ReturnType<typeof setTimeout> | null = null

      const handleMouseMove = (e: MouseEvent) => {
        if (throttleTimeout) return

        throttleTimeout = setTimeout(() => {
          throttleTimeout = null
        }, 12) // ~80fps (mais lento que botões)

        const rect = badge.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY

        targetTiltX.current = (mouseY / (rect.height / 2)) * BADGE_TILT_INTENSITY
        targetTiltY.current = (mouseX / (rect.width / 2)) * BADGE_TILT_INTENSITY * -1
      }

      const handleMouseEnter = () => {
        setIsHovered(true)
        badge.style.transition = 'transform 0.2s ease-out'
        badge.style.transform = 'translateY(-1px) scale(1.05)'
      }

      const handleMouseLeave = () => {
        setIsHovered(false)
        targetTiltX.current = 0
        targetTiltY.current = 0
        badge.style.transition = 'transform 0.2s ease-out'
        badge.style.transform = 'translateY(0) scale(1)'
      }

      // Animação suave do tilt
      const animate = () => {
        tiltX.current += (targetTiltX.current - tiltX.current) * BADGE_TILT_SMOOTHING
        tiltY.current += (targetTiltY.current - tiltY.current) * BADGE_TILT_SMOOTHING

        if (Math.abs(tiltX.current) > 0.01 || Math.abs(tiltY.current) > 0.01) {
          const scale = isHovered ? 1.05 : 1
          badge.style.transform = `perspective(1000px) rotateX(${tiltX.current}deg) rotateY(${tiltY.current}deg) translateY(${isHovered ? -1 : 0}px) scale(${scale})`
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          tiltX.current = 0
          tiltY.current = 0
          if (!isHovered) {
            badge.style.transform = 'translateY(0) scale(1)'
          }
        }
      }

      badge.addEventListener('mousemove', handleMouseMove)
      badge.addEventListener('mouseenter', handleMouseEnter)
      badge.addEventListener('mouseleave', handleMouseLeave)

      animationFrameRef.current = requestAnimationFrame(animate)

      return () => {
        badge.removeEventListener('mousemove', handleMouseMove)
        badge.removeEventListener('mouseenter', handleMouseEnter)
        badge.removeEventListener('mouseleave', handleMouseLeave)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        if (throttleTimeout) {
          clearTimeout(throttleTimeout)
        }
        badge.style.transform = ''
        badge.style.transition = ''
      }
    }, [enable3D, isMobile, isHovered])

    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300'
    
    const variants = {
      default: 'bg-dark-700 text-light-200',
      primary: 'bg-primary-500 text-dark-950',
      secondary: 'bg-transparent border border-primary-500 text-primary-500',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-dark-950',
      error: 'bg-red-500 text-white',
    }
    
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    }

    const badge3DStyles = enable3D && !isMobile
      ? 'transform-gpu will-change-transform cursor-pointer'
      : ''

    return (
      <span
        ref={badgeRef}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          badge3DStyles,
          enable3D && 'backface-hidden',
          className
        )}
        style={enable3D && !isMobile ? { 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden' as const
        } : undefined}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
