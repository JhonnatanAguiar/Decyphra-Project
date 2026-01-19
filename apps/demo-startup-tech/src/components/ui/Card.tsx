'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Classes no wrapper: layout (md:w-1/2, max-w-*, self-stretch) */
  className?: string
  /** Classes no article: aparência (p-6, text-left, border-*, grid, etc.) */
  articleClassName?: string
}

export function Card({
  className,
  articleClassName,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('group relative block transition-transform duration-300 ease-in-out hover:scale-[1.1]', className)}
      {...props}
    >
      {/* Feixe: pedaço de ~45px da borda que percorre o contorno (hover) */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      >
        <svg className="size-full">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="16"
            ry="16"
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="120 880"
            pathLength="1000"
            style={{ animation: 'card-beam 3s linear infinite' }}
          />
        </svg>
      </div>

      <article className={cn(
        'relative z-10 h-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-2xl',
        articleClassName,
      )}>
        {/* Glow sutil */}
        <div className="pointer-events-none absolute inset-x-0 -top-32 z-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35)_0,_transparent_55%)] blur-3xl" />
        <div className="contents">{children}</div>
      </article>
    </div>
  )
}


