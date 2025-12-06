'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Button Component
 * 
 * Componente de botão com variantes e tamanhos seguindo o design system da Decyphra.
 * 
 * Variantes:
 * - primary: Fundo verde neon, texto branco
 * - secondary: Fundo transparente, borda verde, texto verde
 * - ghost: Sem fundo, texto verde (hover com fundo)
 * - dark: Fundo escuro, texto branco
 * 
 * Tamanhos:
 * - sm: padding 0.5rem 1rem, texto 0.875rem
 * - md: padding 0.75rem 1.5rem, texto 1rem
 * - lg: padding 1rem 2rem, texto 1.125rem
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500',
      secondary: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-dark-950 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:ring-primary-500',
      ghost: 'bg-transparent text-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] focus:ring-primary-500',
      dark: 'bg-dark-800 text-light-50 hover:bg-dark-700 hover:shadow-lg focus:ring-dark-600',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Carregando...</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
