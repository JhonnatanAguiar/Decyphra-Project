'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * LoadingSpinner Component
 * 
 * Componente de spinner de carregamento com variantes e tamanhos seguindo o design system da Decyphra.
 * 
 * Variantes:
 * - default: Spinner padrão com cor primária
 * - primary: Spinner verde neon
 * - light: Spinner branco/claro
 * - dark: Spinner escuro
 * 
 * Tamanhos:
 * - sm: 16px
 * - md: 24px
 * - lg: 32px
 * - xl: 48px
 */

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const LoadingSpinner = ({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: LoadingSpinnerProps) => {
  const variants = {
    default: 'border-primary-500',
    primary: 'border-primary-500',
    light: 'border-light-50',
    dark: 'border-dark-700',
  }

  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
    xl: 'w-12 h-12 border-[4px]',
  }

  return (
    <div
      className={cn(
        'inline-block rounded-full border-t-transparent animate-spin',
        variants[variant],
        sizes[size],
        className
      )}
      role="status"
      aria-label="Carregando"
      {...props}
    >
      <span className="sr-only">Carregando...</span>
    </div>
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'

export { LoadingSpinner }
