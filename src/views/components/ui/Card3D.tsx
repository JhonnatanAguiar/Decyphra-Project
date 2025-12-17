'use client'

import { HTMLAttributes, ReactNode, useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils/cn'

/**
 * Card3D Component - Otimizado para máxima fluidez
 *
 * Componente de card 3D com efeito de levitação e interações avançadas.
 * Segue o design system da Decyphra com verde neon (#00FF88).
 *
 * Características:
 * - Efeito 3D com tilt dinâmico sincronizado com requestAnimationFrame
 * - Throttling inteligente do mousemove para reduzir cálculos
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
  tiltIntensity?: number
  tiltSmoothing?: number
}

const DEFAULT_PARTICLE_COUNT = 8
const DEFAULT_GLOW_COLOR = '0, 255, 136' // Verde neon da Decyphra (#00FF88)
const MOBILE_BREAKPOINT = 768
const SPOTLIGHT_RADIUS = 500 // Raio do spotlight em pixels
const TILT_INTENSITY = 8 // Intensidade padrão do tilt
const TILT_SMOOTHING = 0.12 // Factor de suavização (lerp)

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
    cardInstances.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2
      const distance = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY)

      // Calcular intensidade baseada na distância (raio 500px)
      let intensity = 0
      if (distance <= SPOTLIGHT_RADIUS) {
        intensity = 1 - distance / SPOTLIGHT_RADIUS
      }

      // Aplicar glow na borda do card
      const relativeX = ((e.clientX - rect.left) / rect.width) * 100
      const relativeY = ((e.clientY - rect.top) / rect.height) * 100

      card.style.setProperty('--glow-x', `${relativeX}%`)
      card.style.setProperty('--glow-y', `${relativeY}%`)
      card.style.setProperty('--glow-intensity', intensity.toString())
    })

    // Mostrar spotlight se houver cards próximos
    const hasNearbyCards = Array.from(cardInstances).some((card) => {
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
    cardInstances.forEach((card) => {
      card.style.setProperty('--glow-intensity', '0')
    })
  }

  document.addEventListener('mousemove', handleGlobalMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)

  // Cleanup será feito quando não houver mais cards
}

const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR
): HTMLDivElement => {
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
  tiltIntensity = TILT_INTENSITY,
  tiltSmoothing = TILT_SMOOTHING,
  ...props
}: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<(ReturnType<typeof setTimeout> | number)[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)
  const isMobileRef = useRef(false)
  const [mounted, setMounted] = useState(false)

  // Refs para tilt otimizado (sem GSAP)
  const tiltX = useRef(0)
  const tiltY = useRef(0)
  const targetTiltX = useRef(0)
  const targetTiltY = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const lastMouseMoveTime = useRef(0)
  const mouseEventQueue = useRef<{ x: number; y: number } | null>(null)

  // Detectar mobile (apenas após mount)
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth <= MOBILE_BREAKPOINT
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const shouldDisableAnimations = disableAnimations || isMobileRef.current

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  // NOTE: não retornar aqui para preservar ordem de hooks (mounted usado apenas na renderização)

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    particlesRef.current.forEach((particle) => {
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
        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        )
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

    // Configurar perspectiva 3D
    if (enableTilt) {
      element.style.transformStyle = 'preserve-3d'
      element.style.perspective = '1000px'
      element.style.willChange = 'transform'
    }

    // Função de animação suave (lerp) sincronizada com RAF
    const animateTilt = () => {
      if (!element || !enableTilt) return

      // Interpolação suave (lerp)
      tiltX.current += (targetTiltX.current - tiltX.current) * tiltSmoothing
      tiltY.current += (targetTiltY.current - tiltY.current) * tiltSmoothing

      // Aplicar transform diretamente no DOM (mais rápido que GSAP para animações contínuas)
      element.style.transform = `perspective(1000px) rotateX(${tiltX.current}deg) rotateY(${tiltY.current}deg)`
      element.style.backfaceVisibility = 'hidden'

      animationFrameRef.current = requestAnimationFrame(animateTilt)
    }

    if (enableTilt) {
      animationFrameRef.current = requestAnimationFrame(animateTilt)
    }

    return () => {
      cardInstances.delete(element)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [shouldDisableAnimations, enableTilt, tiltSmoothing])

  useEffect(() => {
    if (shouldDisableAnimations || !cardRef.current) return

    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      if (enableParticles) {
        animateParticles()
      }
      if (enableTilt) {
        // Apenas levitação, sem rotação fixa para não conflitar com o tilt dinâmico
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
        // Reset suave do tilt target (será interpolado por RAF)
        targetTiltX.current = 0
        targetTiltY.current = 0

        // Levitação volta ao normal
        gsap.to(element, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt || !isHoveredRef.current) return

      // Armazenar evento para processamento - throttling inteligente
      mouseEventQueue.current = { x: e.clientX, y: e.clientY }

      const now = performance.now()
      // Throttle: processar no máximo a cada 8ms (~120fps)
      if (now - lastMouseMoveTime.current < 8) return
      lastMouseMoveTime.current = now

      if (!mouseEventQueue.current) return

      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return

      const { x: clientX, y: clientY } = mouseEventQueue.current
      const x = clientX - rect.left
      const y = clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Cálculo suave do tilt target (será interpolado por RAF)
      targetTiltX.current = ((y - centerY) / centerY) * -tiltIntensity
      targetTiltY.current = ((x - centerX) / centerX) * tiltIntensity
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
  }, [
    animateParticles,
    clearAllParticles,
    shouldDisableAnimations,
    enableTilt,
    enableRipple,
    enableParticles,
    glowColor,
  ])

  if (!mounted) {
    return (
      <div
        ref={cardRef}
        className={cn(
          'relative overflow-hidden rounded-lg border border-dark-700 bg-dark-800 transition-all duration-300',
          enableBorderGlow &&
            'hover:border-primary-500/50 hover:shadow-[0_0_25px_rgba(0,255,136,0.3)]',
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    )
  }

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          'relative overflow-hidden rounded-lg border border-dark-700 bg-dark-800 transition-all duration-300',
          enableBorderGlow &&
            'hover:border-primary-500/50 hover:shadow-[0_0_25px_rgba(0,255,136,0.3)]',
          className
        )}
        style={
          {
            transformStyle: 'preserve-3d',
            perspective: enableTilt ? '1000px' : 'none',
            willChange: enableTilt ? 'transform' : 'auto',
            '--glow-x': '50%',
            '--glow-y': '50%',
            '--glow-intensity': '0',
            '--glow-radius': '200px',
            '--glow-color': glowColor,
            backfaceVisibility: 'hidden',
          } as React.CSSProperties & { [key: string]: string }
        }
        {...props}
      >
        {enableBorderGlow && (
          <div
            className="pointer-events-none absolute inset-0 z-[1] rounded-lg"
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
