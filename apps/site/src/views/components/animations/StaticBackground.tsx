'use client'

import { useEffect, useRef } from 'react'

interface StaticBackgroundProps {
  /**
   * Cores do gradiente (padrão: cores Decyphra)
   */
  colors?: string[]
  /**
   * Intensidade do padrão (0-1)
   */
  intensity?: number
  /**
   * Opacidade do background (0-1)
   */
  opacity?: number
}

/**
 * StaticBackground Component
 * 
 * Background estático moderno para uso em dispositivos móveis.
 * Cria um padrão visual elegante com gradientes e formas geométricas sutis.
 * 
 * Características:
 * - Design moderno e minimalista
 * - Performance otimizada (sem animações)
 * - Responsivo e adaptável
 * - Cores da identidade Decyphra
 */
export function StaticBackground({
  colors = ['#01080E', '#001510', '#000A0E', '#001A15'],
  intensity = 0.3,
  opacity = 0.8,
}: StaticBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const width = rect.width || window.innerWidth
      const height = rect.height || window.innerHeight

      // Ajusta para alta resolução (retina)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      drawBackground(ctx, width, height)
    }

    const drawBackground = (
      context: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      // Limpa o canvas
      context.clearRect(0, 0, width, height)

      // Cria gradiente radial principal
      const centerX = width / 2
      const centerY = height / 2
      const maxRadius = Math.max(width, height) * 0.8

      const gradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        maxRadius
      )

      // Adiciona cores ao gradiente
      const colorStops = [
        { stop: 0, color: colors[0] },
        { stop: 0.3, color: colors[1] || colors[0] },
        { stop: 0.6, color: colors[2] || colors[1] || colors[0] },
        { stop: 1, color: colors[3] || colors[0] },
      ]

      colorStops.forEach(({ stop, color }) => {
        gradient.addColorStop(stop, color)
      })

      // Preenche com gradiente
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      // Adiciona padrão de grid sutil
      context.strokeStyle = `rgba(0, 255, 136, ${intensity * 0.1})`
      context.lineWidth = 0.5

      const gridSize = 60
      const offsetX = (width % gridSize) / 2
      const offsetY = (height % gridSize) / 2

      // Linhas verticais
      for (let x = offsetX; x < width; x += gridSize) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }

      // Linhas horizontais
      for (let y = offsetY; y < height; y += gridSize) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }

      // Adiciona pontos de brilho verde neon sutis
      const glowPoints = 8
      for (let i = 0; i < glowPoints; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const radius = 2 + Math.random() * 3
        const glowIntensity = intensity * (0.3 + Math.random() * 0.4)

        const glowGradient = context.createRadialGradient(x, y, 0, x, y, radius * 4)
        glowGradient.addColorStop(0, `rgba(0, 255, 136, ${glowIntensity})`)
        glowGradient.addColorStop(0.5, `rgba(0, 255, 136, ${glowIntensity * 0.5})`)
        glowGradient.addColorStop(1, 'rgba(0, 255, 136, 0)')

        context.fillStyle = glowGradient
        context.beginPath()
        context.arc(x, y, radius * 4, 0, Math.PI * 2)
        context.fill()
      }

      // Adiciona vignette nas bordas
      const vignetteGradient = context.createRadialGradient(
        centerX,
        centerY,
        Math.min(width, height) * 0.4,
        centerX,
        centerY,
        Math.max(width, height) * 0.8
      )
      vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)')

      context.fillStyle = vignetteGradient
      context.fillRect(0, 0, width, height)
    }

    // Inicializa
    resizeCanvas()

    // Listener de resize com debounce
    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [colors, intensity, opacity])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  )
}

