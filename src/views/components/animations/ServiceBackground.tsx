'use client'

import { useState, useEffect } from 'react'
import LetterGlitch from './LetterGlitch'
import { StaticBackground } from './StaticBackground'

interface ServiceBackgroundProps {
  /**
   * Props para o LetterGlitch (usado em desktop)
   */
  glitchColors?: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  /**
   * Breakpoint para mobile (padrão: 768px)
   */
  mobileBreakpoint?: number
}

/**
 * ServiceBackground Component
 * 
 * Componente que alterna entre LetterGlitch (desktop) e StaticBackground (mobile)
 * para páginas de serviços. Garante performance em mobile e visual moderno em desktop.
 * 
 * Características:
 * - LetterGlitch em desktop (>= breakpoint)
 * - StaticBackground em mobile (< breakpoint)
 * - Detecção responsiva automática
 * - Performance otimizada
 */
export function ServiceBackground({
  glitchColors = ['#0a1a0f', '#00FF88', '#00CC6A'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  mobileBreakpoint = 768,
}: ServiceBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }

    // Verifica no mount
    checkMobile()

    // Listener de resize com debounce
    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(checkMobile, 150)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [mobileBreakpoint])

  if (isMobile) {
    return (
      <StaticBackground
        colors={['#01080E', '#001510', '#000A0E', '#001A15']}
        intensity={0.3}
        opacity={0.8}
      />
    )
  }

  return (
    <LetterGlitch
      glitchColors={glitchColors}
      glitchSpeed={glitchSpeed}
      centerVignette={centerVignette}
      outerVignette={outerVignette}
      smooth={smooth}
    />
  )
}

