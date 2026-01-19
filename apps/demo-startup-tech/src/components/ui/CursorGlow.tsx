'use client'

import { useEffect, useState } from 'react'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[9998] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.1)_0%,transparent_65%)]"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    />
  )
}
