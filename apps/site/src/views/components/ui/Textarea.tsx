'use client'

import { TextareaHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { CheckCircle, XCircle } from 'lucide-react'

/**
 * Textarea Component
 * 
 * Componente de textarea com variantes e tamanhos seguindo o design system da Decyphra.
 * Inclui micro-interações para melhor experiência do usuário.
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
  showValidationIcon?: boolean
  isValid?: boolean
  showCharCount?: boolean
  maxLength?: number
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', size = 'md', showValidationIcon = false, isValid, showCharCount = false, maxLength, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const textareaValue = props.value !== undefined ? props.value : (props as any).defaultValue
    const hasValue = textareaValue !== undefined && textareaValue !== null && String(textareaValue).length > 0
    const charCount = textareaValue ? String(textareaValue).length : 0
    
    const baseStyles = 'w-full rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-dark-800 text-light-50 placeholder:text-light-300 resize-y'
    
    const variants = {
      default: 'border border-dark-700 focus:border-dark-600 focus:ring-2 focus:ring-dark-600 focus:ring-offset-2 focus:ring-offset-dark-950 hover:border-dark-600',
      primary: 'border border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 focus:shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:border-primary-500/50',
      error: 'border border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dark-950 hover:border-red-400',
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm min-h-[80px]',
      md: 'px-4 py-3 text-base min-h-[120px]',
      lg: 'px-5 py-4 text-lg min-h-[160px]',
    }

    return (
      <div className="relative">
        <textarea
          ref={ref}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            (showValidationIcon || showCharCount) && 'pb-8',
            className
          )}
          {...props}
        />
        {/* Container para ícone de validação e contador */}
        {(showValidationIcon || showCharCount) && (
          <div className="absolute bottom-2 right-3 flex items-center gap-2 pointer-events-none">
            {/* Ícone de validação */}
            {showValidationIcon && hasValue && !isFocused && (
              <>
                {isValid ? (
                  <CheckCircle className="w-5 h-5 text-primary-500 animate-in fade-in duration-200" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 animate-in fade-in duration-200" />
                )}
              </>
            )}
            {/* Contador de caracteres */}
            {showCharCount && maxLength && (
              <span className={cn(
                'text-xs font-medium transition-colors duration-200',
                charCount > maxLength * 0.9 ? 'text-yellow-500' : 'text-light-400'
              )}>
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
