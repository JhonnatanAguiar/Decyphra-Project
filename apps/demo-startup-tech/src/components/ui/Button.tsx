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
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand.secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand.dark'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-brand.primary text-white shadow-brand-soft hover:bg-brand.primarySoft hover:-translate-y-0.5 hover:shadow-brand-soft',
    secondary:
      'border border-brand.border bg-transparent text-brand.light hover:bg-white/5 hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-brand.light hover:bg-white/5 hover:text-white hover:-translate-y-0.5',
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

