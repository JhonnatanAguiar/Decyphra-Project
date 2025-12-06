'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Badge Component
 * 
 * Componente de badge/tag com variantes e tamanhos seguindo o design system da Decyphra.
 * 
 * Variantes:
 * - default: Badge padrão com fundo escuro
 * - primary: Badge verde neon
 * - secondary: Badge com borda verde
 * - success: Badge verde para sucesso
 * - warning: Badge amarelo para avisos
 * - error: Badge vermelho para erros
 * 
 * Tamanhos:
 * - sm: padding 0.25rem 0.5rem, texto 0.75rem
 * - md: padding 0.375rem 0.75rem, texto 0.875rem
 * - lg: padding 0.5rem 1rem, texto 1rem
 */

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300'
    
    const variants = {
      default: 'bg-dark-700 text-light-200',
      primary: 'bg-primary-500 text-dark-950',
      secondary: 'bg-transparent border border-primary-500 text-primary-500',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-dark-950',
      error: 'bg-red-500 text-white',
    }
    
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
