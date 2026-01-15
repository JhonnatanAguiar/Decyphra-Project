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
        'relative overflow-hidden rounded-2xl border border-brand.border/60 bg-gradient-to-b from-white/5 via-white/2 to-white/[0.02] p-8 shadow-brand-soft backdrop-blur transition-transform duration-200 hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {/* Glow sutil */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-brand.primary/20 via-transparent to-transparent blur-3xl" />
      <div className="relative z-10">{children}</div>
    </article>
  )
}


