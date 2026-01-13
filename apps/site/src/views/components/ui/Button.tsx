'use client'

import { ButtonHTMLAttributes, forwardRef, useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Button Component
 * 
 * Componente de botão com variantes e tamanhos seguindo o design system da Decyphra.
 * Suporta efeitos 3D opcionais para maior profundidade e interatividade.
 * 
 * Variantes:
 * - primary: Fundo verde neon, texto branco
 * - secondary: Fundo transparente, borda verde, texto verde
 * - ghost: Sem fundo, texto verde (hover com fundo)
 * - dark: Fundo escuro, texto branco
 * 
 * Tamanhos:
 * - sm: padding 0.5rem 1rem, texto 0.875rem
 * - md: padding 0.75rem 1.5rem, texto 1rem
 * - lg: padding 1rem 2rem, texto 1.125rem
 * 
 * Efeitos 3D:
 * - enable3D: Habilita efeitos 3D (tilt, levitação, glow)
 * - tiltIntensity: Intensidade do tilt (padrão: 5)
 * - tiltSmoothing: Suavização do tilt (padrão: 0.15)
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  enable3D?: boolean
  tiltIntensity?: number
  tiltSmoothing?: number
}

const DEFAULT_TILT_INTENSITY = 5
const DEFAULT_TILT_SMOOTHING = 0.15
const MOBILE_BREAKPOINT = 768

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    disabled,
    enable3D = false,
    tiltIntensity = DEFAULT_TILT_INTENSITY,
    tiltSmoothing = DEFAULT_TILT_SMOOTHING,
    children, 
    ...props 
  }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const animationFrameRef = useRef<number | null>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    
    // Refs para tilt otimizado
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
        ref(buttonRef.current)
      } else if (ref) {
        ref.current = buttonRef.current
      }
    }, [ref])

    // Efeito 3D: Tilt e levitação
    useEffect(() => {
      if (!enable3D || !buttonRef.current || isMobile || disabled || isLoading) {
        return
      }

      const button = buttonRef.current
      let throttleTimeout: ReturnType<typeof setTimeout> | null = null

      const handleMouseMove = (e: MouseEvent) => {
        if (throttleTimeout) return

        throttleTimeout = setTimeout(() => {
          throttleTimeout = null
        }, 8) // ~120fps

        const rect = button.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY

        const maxTilt = tiltIntensity
        targetTiltX.current = (mouseY / (rect.height / 2)) * maxTilt
        targetTiltY.current = (mouseX / (rect.width / 2)) * maxTilt * -1
      }

      const handleMouseEnter = () => {
        setIsHovered(true)
        button.style.transition = 'transform 0.3s ease-out'
        button.style.transform = 'translateY(-2px)'
      }

      const handleMouseLeave = () => {
        setIsHovered(false)
        targetTiltX.current = 0
        targetTiltY.current = 0
        button.style.transition = 'transform 0.3s ease-out'
        button.style.transform = 'translateY(0)'
      }

      // Animação suave do tilt
      const animate = () => {
        tiltX.current += (targetTiltX.current - tiltX.current) * tiltSmoothing
        tiltY.current += (targetTiltY.current - tiltY.current) * tiltSmoothing

        if (Math.abs(tiltX.current) > 0.01 || Math.abs(tiltY.current) > 0.01) {
          button.style.transform = `perspective(1000px) rotateX(${tiltX.current}deg) rotateY(${tiltY.current}deg) translateY(${isHovered ? -2 : 0}px)`
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          tiltX.current = 0
          tiltY.current = 0
          if (!isHovered) {
            button.style.transform = 'translateY(0)'
          }
        }
      }

      button.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)

      // Iniciar animação
      animationFrameRef.current = requestAnimationFrame(animate)

      return () => {
        button.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        if (throttleTimeout) {
          clearTimeout(throttleTimeout)
        }
        button.style.transform = ''
        button.style.transition = ''
      }
    }, [enable3D, isMobile, disabled, isLoading, tiltIntensity, tiltSmoothing, isHovered])

    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] hover:shadow-primary-500/50 focus:ring-primary-500',
      secondary: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-dark-950 hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] hover:shadow-primary-500/50 focus:ring-primary-500',
      ghost: 'bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-primary-500/30 focus:ring-primary-500',
      dark: 'bg-dark-800 text-light-50 hover:bg-dark-700 hover:shadow-lg focus:ring-dark-600',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const button3DStyles = enable3D && !isMobile && !disabled && !isLoading
      ? 'transform-gpu will-change-transform'
      : ''

    return (
      <button
        ref={buttonRef}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          button3DStyles,
          enable3D && 'backface-hidden',
          // Acessibilidade: focus visible sempre visível
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950',
          className
        )}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        style={enable3D && !isMobile ? { 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden' as const
        } : undefined}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2" aria-hidden="true">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Carregando...</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
