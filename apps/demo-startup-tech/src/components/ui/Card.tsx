'use client'

import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-2xl transition-transform duration-200 hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {/* Glow sutil */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35)_0,_transparent_55%)] blur-3xl" />
      <div className="relative z-10">{children}</div>
    </article>
  )
}


