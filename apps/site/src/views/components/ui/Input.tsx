'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { CheckCircle, XCircle } from 'lucide-react'

/**
 * Input Component
 * 
 * Componente de input de texto com variantes e tamanhos seguindo o design system da Decyphra.
 * Inclui micro-interações para melhor experiência do usuário.
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

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'primary' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showValidationIcon?: boolean
  isValid?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'md', type = 'text', showValidationIcon = false, isValid, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = value !== undefined && value !== null && String(value).length > 0
    
    const baseStyles = 'w-full rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-dark-800 text-light-50 placeholder:text-light-300'
    
    const variants = {
      default: 'border border-dark-700 focus:border-dark-600 focus:ring-2 focus:ring-dark-600 focus:ring-offset-2 focus:ring-offset-dark-950 hover:border-dark-600',
      primary: 'border border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 focus:shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:border-primary-500/50',
      error: 'border border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dark-950 hover:border-red-400',
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm pr-8',
      md: 'px-4 py-3 text-base pr-10',
      lg: 'px-5 py-4 text-lg pr-12',
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            showValidationIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {/* Ícone de validação */}
        {showValidationIcon && hasValue && !isFocused && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {isValid ? (
              <CheckCircle className="w-5 h-5 text-primary-500 animate-in fade-in duration-200" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 animate-in fade-in duration-200" />
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
