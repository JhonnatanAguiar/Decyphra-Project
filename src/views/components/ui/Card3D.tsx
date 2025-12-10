'use client'

import { HTMLAttributes, ReactNode, useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils/cn'

/**
 * Card3D Component
 * 
 * Componente de card 3D com efeito de levitação e interações avançadas.
 * Segue o design system da Decyphra com verde neon (#00FF88).
 * 
 * Características:
 * - Efeito 3D com tilt baseado na posição do mouse
 * - Efeito de levitação (hover)
 * - Partículas animadas no hover
 * - Efeito de ripple no clique
 * - Magnetismo suave
 * - Glow neon na borda
 */

export interface Card3DProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  enableTilt?: boolean
  enableMagnetism?: boolean
  enableParticles?: boolean
  enableRipple?: boolean
  enableBorderGlow?: boolean
  particleCount?: number
  glowColor?: string
  disableAnimations?: boolean
}

const DEFAULT_PARTICLE_COUNT = 8
const DEFAULT_GLOW_COLOR = '0, 255, 136' // Verde neon da Decyphra (#00FF88)
const MOBILE_BREAKPOINT = 768

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div')
  el.className = 'particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const Card3D = ({
  children,
  className,
  enableTilt = true,
  enableMagnetism = true,
  enableParticles = true,
  enableRipple = true,
  enableBorderGlow = true,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
  ...props
}: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<number[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const shouldDisableAnimations = disableAnimations || isMobile

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetismAnimationRef.current?.kill()
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle)
        },
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || !enableParticles) return
    if (!particlesInitialized.current) {
      initializeParticles()
    }
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return
        const clone = particle.cloneNode(true) as HTMLDivElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
        gsap.to(clone, {
          opacity: 0.4,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        })
      }, index * 100)
      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles, enableParticles])

  useEffect(() => {
    if (shouldDisableAnimations || !cardRef.current) return

    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      if (enableParticles) {
        animateParticles()
      }
      if (enableTilt) {
        gsap.to(element, {
          y: -8,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      if (enableParticles) {
        clearAllParticles()
      }
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8
        const rotateY = ((x - centerX) / centerX) * 8
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03
        const magnetY = (y - centerY) * 0.03
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      // Atualizar glow da borda
      if (enableBorderGlow && element) {
        const relativeX = ((x / rect.width) * 100).toFixed(2)
        const relativeY = ((y / rect.height) * 100).toFixed(2)
        element.style.setProperty('--glow-x', `${relativeX}%`)
        element.style.setProperty('--glow-y', `${relativeY}%`)
        element.style.setProperty('--glow-intensity', '1')
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!enableRipple) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )
      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `
      element.appendChild(ripple)
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      )
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('click', handleClick)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('click', handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, shouldDisableAnimations, enableTilt, enableMagnetism, enableRipple, enableParticles, enableBorderGlow, glowColor])

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          'relative overflow-hidden rounded-lg transition-all duration-300 bg-dark-800 border border-dark-700',
          enableBorderGlow && 'hover:border-primary-500/50 hover:shadow-[0_0_25px_rgba(0,255,136,0.3)]',
          className
        )}
        style={{
          transformStyle: 'preserve-3d',
          '--glow-x': '50%',
          '--glow-y': '50%',
          '--glow-intensity': '0',
          '--glow-radius': '200px',
          '--glow-color': glowColor,
        } as React.CSSProperties & { [key: string]: string }}
        {...props}
      >
        {enableBorderGlow && (
          <div
            className="absolute inset-0 pointer-events-none z-[1] rounded-lg"
            style={{
              padding: '2px',
              background: `radial-gradient(
                var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%
              )`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              opacity: 1,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </>
  )
}

Card3D.displayName = 'Card3D'

export { Card3D }
