'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Input Component
 * 
 * Componente de input de texto com variantes e tamanhos seguindo o design system da Decyphra.
 * 
 * Variantes:
 * - default: Borda padrão, fundo escuro
 * - primary: Borda verde neon com glow no focus
 * - error: Borda vermelha para estados de erro
 * 
 * Tamanhos:
 * - sm: padding 0.5rem 0.75rem, texto 0.875rem
 * - md: padding 0.75rem 1rem, texto 1rem
 * - lg: padding 1rem 1.25rem, texto 1.125rem
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'primary' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'md', type = 'text', ...props }, ref) => {
    const baseStyles = 'w-full rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-dark-800 text-light-50 placeholder:text-light-300'
    
    const variants = {
      default: 'border border-dark-700 focus:border-dark-600 focus:ring-2 focus:ring-dark-600 focus:ring-offset-2 focus:ring-offset-dark-950',
      primary: 'border border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 focus:shadow-[0_0_10px_rgba(0,255,136,0.2)]',
      error: 'border border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dark-950',
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
