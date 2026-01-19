'use client'

import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 400

export function BackToTopFloating() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-8 left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand.secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand.dark ${
        visible ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
      }`}
    >
      <span className="mt-px text-lg text-white" aria-hidden>↑</span>
    </button>
  )
}

