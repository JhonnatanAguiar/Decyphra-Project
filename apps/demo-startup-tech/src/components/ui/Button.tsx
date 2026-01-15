'use client'

import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 backdrop-blur-xl border border-white/15 shadow-[0_18px_45px_rgba(15,23,42,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand.secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand.dark'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.6)_0,_rgba(15,23,42,0.95)_45%,_rgba(15,23,42,1)_100%)] text-white hover:border-white/30 hover:-translate-y-0.5',
    secondary:
      'border border-white/15 bg-white/5 text-brand.light hover:bg-white/10 hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-brand.light border border-transparent hover:border-white/10 hover:bg-white/5 hover:text-white hover:-translate-y-0.5',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}


