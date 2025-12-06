'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Textarea Component
 * 
 * Componente de textarea com variantes e tamanhos seguindo o design system da Decyphra.
 * 
 * Variantes:
 * - default: Borda padrão, fundo escuro
 * - primary: Borda verde neon com glow no focus
 * - error: Borda vermelha para estados de erro
 * 
 * Tamanhos:
 * - sm: padding 0.5rem 0.75rem, texto 0.875rem, altura mínima menor
 * - md: padding 0.75rem 1rem, texto 1rem, altura mínima padrão
 * - lg: padding 1rem 1.25rem, texto 1.125rem, altura mínima maior
 */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'primary' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'w-full rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-dark-800 text-light-50 placeholder:text-light-300 resize-y'
    
    const variants = {
      default: 'border border-dark-700 focus:border-dark-600 focus:ring-2 focus:ring-dark-600 focus:ring-offset-2 focus:ring-offset-dark-950',
      primary: 'border border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 focus:shadow-[0_0_10px_rgba(0,255,136,0.2)]',
      error: 'border border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dark-950',
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm min-h-[80px]',
      md: 'px-4 py-3 text-base min-h-[120px]',
      lg: 'px-5 py-4 text-lg min-h-[160px]',
    }

    return (
      <textarea
        ref={ref}
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

Textarea.displayName = 'Textarea'

export { Textarea }
