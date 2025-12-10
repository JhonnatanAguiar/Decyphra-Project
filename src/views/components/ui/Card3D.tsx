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
 * - Efeito 3D com tilt dinâmico que acompanha o cursor
 * - Efeito de levitação (hover)
 * - Partículas animadas no hover
 * - Efeito de ripple no clique
 * - Glow neon na borda
 * - Spotlight effect global que ilumina cards próximos
 */

export interface Card3DProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  enableTilt?: boolean
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
const SPOTLIGHT_RADIUS = 500 // Raio do spotlight em pixels

// Spotlight global (singleton)
let spotlightElement: HTMLDivElement | null = null
let spotlightInitialized = false
const cardInstances = new Set<HTMLDivElement>()

const initializeSpotlight = () => {
  if (spotlightInitialized || typeof window === 'undefined') return

  spotlightElement = document.createElement('div')
  spotlightElement.className = 'card3d-spotlight'
  spotlightElement.style.cssText = `
    position: fixed;
    width: ${SPOTLIGHT_RADIUS * 2}px;
    height: ${SPOTLIGHT_RADIUS * 2}px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(
      circle,
      rgba(${DEFAULT_GLOW_COLOR}, 0.15) 0%,
      rgba(${DEFAULT_GLOW_COLOR}, 0.08) 15%,
      rgba(${DEFAULT_GLOW_COLOR}, 0.04) 25%,
      rgba(${DEFAULT_GLOW_COLOR}, 0.02) 40%,
      transparent 70%
    );
    z-index: 100;
    opacity: 0;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
    transition: opacity 0.2s ease;
  `
  document.body.appendChild(spotlightElement)
  spotlightInitialized = true

  // Handler global de movimento do mouse para spotlight
  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!spotlightElement) return

    gsap.to(spotlightElement, {
      left: e.clientX,
      top: e.clientY,
      duration: 0.1,
      ease: 'none',
    })

    // Atualizar glow em todos os cards baseado na distância
    cardInstances.forEach(card => {
      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2
      const distance = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY)
      
      // Calcular intensidade baseada na distância (raio 500px)
      let intensity = 0
      if (distance <= SPOTLIGHT_RADIUS) {
        intensity = 1 - (distance / SPOTLIGHT_RADIUS)
      }

      // Aplicar glow na borda do card
      const relativeX = ((e.clientX - rect.left) / rect.width) * 100
      const relativeY = ((e.clientY - rect.top) / rect.height) * 100
      
      card.style.setProperty('--glow-x', `${relativeX}%`)
      card.style.setProperty('--glow-y', `${relativeY}%`)
      card.style.setProperty('--glow-intensity', intensity.toString())
    })

    // Mostrar spotlight se houver cards próximos
    const hasNearbyCards = Array.from(cardInstances).some(card => {
      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2
      const distance = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY)
      return distance <= SPOTLIGHT_RADIUS
    })

    gsap.to(spotlightElement, {
      opacity: hasNearbyCards ? 0.8 : 0,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!spotlightElement) return
    gsap.to(spotlightElement, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    // Resetar glow em todos os cards
    cardInstances.forEach(card => {
      card.style.setProperty('--glow-intensity', '0')
    })
  }

  document.addEventListener('mousemove', handleGlobalMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)

  // Cleanup será feito quando não houver mais cards
}

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
  const quickTiltX = useRef<gsap.QuickTo | null>(null)
  const quickTiltY = useRef<gsap.QuickTo | null>(null)
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

  // Inicializar spotlight e registrar card
  useEffect(() => {
    if (shouldDisableAnimations || !cardRef.current) return

    const element = cardRef.current
    cardInstances.add(element)

    // Inicializar spotlight se ainda não foi
    initializeSpotlight()

    // Inicializar quickTo para tilt ultra-rápido e fluido
    if (enableTilt) {
      // Configurar perspectiva 3D
      gsap.set(element, {
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      })

      // Inicializar quickTo para máxima responsividade (ultra-rápido)
      quickTiltX.current = gsap.quickTo(element, 'rotateX', {
        duration: 0.08,
        ease: 'none', // Linear para resposta instantânea
      })
      quickTiltY.current = gsap.quickTo(element, 'rotateY', {
        duration: 0.08,
        ease: 'none', // Linear para resposta instantânea
      })
    }

    return () => {
      cardInstances.delete(element)
    }
  }, [shouldDisableAnimations, enableTilt])

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
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
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
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(element, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    // Usar requestAnimationFrame para otimizar chamadas do mousemove
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt) return
      
      // Cancelar frame anterior se existir para evitar fila
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      // Usar requestAnimationFrame para sincronizar com refresh rate do browser
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Tilt dinâmico usando quickTo para máxima fluidez e responsividade
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        // Usar quickTo se disponível (ultra-rápido e fluido)
        if (quickTiltX.current && quickTiltY.current) {
          quickTiltX.current(rotateX)
          quickTiltY.current(rotateY)
        } else {
          // Fallback: usar gsap.to com overwrite para cancelar animações anteriores
          gsap.to(element, {
            rotateX,
            rotateY,
            duration: 0.03, // Ultra-rápido no fallback
            ease: 'none', // Linear para resposta instantânea
            transformPerspective: 1000,
            overwrite: 'auto', // Cancela automaticamente animações em conflito
          })
        }

        rafId = null
      })
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
      // Cancelar requestAnimationFrame pendente
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('click', handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, shouldDisableAnimations, enableTilt, enableRipple, enableParticles, glowColor])

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
          perspective: enableTilt ? '1000px' : 'none',
          willChange: enableTilt ? 'transform' : 'auto',
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
