'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Select Component
 * 
 * Componente de select (dropdown) com variantes e tamanhos seguindo o design system da Decyphra.
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

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'primary' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'w-full rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-dark-800 text-light-50 appearance-none cursor-pointer'
    
    const variants = {
      default: 'border border-dark-700 focus:border-dark-600 focus:ring-2 focus:ring-dark-600 focus:ring-offset-2 focus:ring-offset-dark-950 hover:border-dark-600',
      primary: 'border border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 focus:shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:border-primary-500/50',
      error: 'border border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dark-950 hover:border-red-400',
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            'pr-10',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {/* Ícone de seta customizado */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-light-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
