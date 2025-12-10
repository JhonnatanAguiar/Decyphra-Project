'use client'

import { useRef, useEffect } from 'react'

interface LetterGlitchProps {
  glitchColors?: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
}

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const letters = useRef<
    {
      char: string
      color: string
      targetColor: string
      colorProgress: number
    }[]
  >([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = useRef(Date.now())

  const lettersAndSymbols = Array.from(characters)

  const fontSize = 16
  const charWidth = 10
  const charHeight = 20

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
  }

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)]
  }

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  }

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    }
    return `rgb(${result.r}, ${result.g}, ${result.b})`
  }

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth)
    const rows = Math.ceil(height / charHeight)
    return { columns, rows }
  }

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows }

    const totalLetters = columns * rows
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }))
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !context.current) return
    
    // Estratégia: usar o wrapper para encontrar o Section parent
    let parent: HTMLElement | null = wrapper?.parentElement || null
    
    // Se não encontrou pelo wrapper, tentar pelo canvas
    if (!parent) {
      parent = canvas.parentElement?.parentElement || canvas.parentElement
    }
    
    // Se ainda não encontrou, tentar encontrar o Section usando closest
    if (!parent || !parent.classList.contains('relative')) {
      parent = wrapper?.closest('.relative') as HTMLElement || 
               canvas.closest('.relative') as HTMLElement ||
               parent
    }
    
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    let rect = parent.getBoundingClientRect()

    // Se o rect ainda não tem dimensões válidas, tentar novamente
    if (rect.width === 0 || rect.height === 0) {
      setTimeout(() => resizeCanvas(), 50)
      return
    }

    // Ajustar dimensões do canvas para DPR
    const width = Math.max(rect.width, 100)
    const height = Math.max(rect.height, 100)
    
    canvas.width = width * dpr
    canvas.height = height * dpr

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    // Configurar contexto com DPR - resetar transform e escalar
    if (context.current) {
      context.current.setTransform(1, 0, 0, 1, 0, 0)
      context.current.scale(dpr, dpr)
    }

    const { columns, rows } = calculateGrid(width, height)
    initializeLetters(columns, rows)
    drawLetters()
  }

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0 || !canvasRef.current) return
    const ctx = context.current
    const canvas = canvasRef.current
    
    // Limpar canvas usando dimensões reais (com DPR já aplicado)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Usar DPR para font size
    const dpr = window.devicePixelRatio || 1
    ctx.font = `${fontSize * dpr}px monospace`
    ctx.textBaseline = 'top'

    letters.current.forEach((letter, index) => {
      // Coordenadas escaladas pelo DPR (já que o contexto foi escalado)
      const x = (index % grid.current.columns) * charWidth
      const y = Math.floor(index / grid.current.columns) * charHeight
      ctx.fillStyle = letter.color
      ctx.fillText(letter.char, x, y)
    })
  }

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length)
      if (!letters.current[index]) continue

      letters.current[index].char = getRandomChar()
      letters.current[index].targetColor = getRandomColor()

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor
        letters.current[index].colorProgress = 1
      } else {
        letters.current[index].colorProgress = 0
      }
    }
  }

  const handleSmoothTransitions = () => {
    let needsRedraw = false
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05
        if (letter.colorProgress > 1) letter.colorProgress = 1

        const startRgb = hexToRgb(letter.color)
        const endRgb = hexToRgb(letter.targetColor)
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
          needsRedraw = true
        }
      }
    })

    if (needsRedraw) {
      drawLetters()
    }
  }

  const animate = () => {
    const now = Date.now()
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters()
      drawLetters()
      lastGlitchTime.current = now
    }

    if (smooth) {
      handleSmoothTransitions()
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    context.current = canvas.getContext('2d', { alpha: false })
    if (!context.current) return

    let initTimeout: ReturnType<typeof setTimeout>
    let resizeTimeout: ReturnType<typeof setTimeout>

    // Aguardar múltiplos frames para garantir que o elemento está totalmente renderizado
    // Usar requestAnimationFrame duplo para garantir que o DOM está totalmente renderizado
    const initFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initTimeout = setTimeout(() => {
          // Verificar novamente se o canvas e context estão disponíveis
          if (canvas && context.current && wrapperRef.current) {
            // Forçar um redraw inicial
            resizeCanvas()
            // Aguardar um pouco mais e verificar se o canvas foi redimensionado
            setTimeout(() => {
              if (letters.current.length > 0) {
                animate()
              } else {
                // Se ainda não conseguiu, tentar redimensionar novamente (até 3 tentativas)
                let attempts = 0
                const retryResize = () => {
                  attempts++
                  resizeCanvas()
                  setTimeout(() => {
                    if (letters.current.length > 0) {
                      animate()
                    } else if (attempts < 3) {
                      retryResize()
                    }
                  }, 100)
                }
                retryResize()
              }
            }, 150)
          }
        }, 400)
      })
    })

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        resizeCanvas()
        animate()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(initFrame)
      clearTimeout(initTimeout)
      clearTimeout(resizeTimeout)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth])

  return (
    <div 
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full min-h-[400px] bg-black overflow-hidden pointer-events-none z-0" 
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        style={{ imageRendering: 'pixelated', display: 'block' }}
      />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)] z-10"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)] z-10"></div>
      )}
    </div>
  )
}

export default LetterGlitch
