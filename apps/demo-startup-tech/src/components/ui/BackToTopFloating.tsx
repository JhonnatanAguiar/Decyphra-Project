'use client'

import { useEffect, useState } from 'react'

export function BackToTopFloating() {
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerHeight, innerWidth } = window
      const distanceY = Math.abs(innerHeight - event.clientY)
      const distanceX = Math.abs(innerWidth / 2 - event.clientX)

      const nearBottom = distanceY < 160
      const nearCenter = distanceX < 220

      setIsNear(nearBottom && nearCenter)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={handleClick}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/25 bg-white/10 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40 flex h-12 w-12 items-center justify-center ${
        isNear ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'
      }`}
    >
      <span className="mt-[1px] text-lg text-white">↑</span>
    </button>
  )
}

