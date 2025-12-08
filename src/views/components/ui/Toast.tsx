'use client'

import { HTMLAttributes, ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Toast Component
 * 
 * Componente de toast/notification com variantes e posições seguindo o design system da Decyphra.
 * 
 * Variantes:
 * - success: Toast verde para sucesso
 * - error: Toast vermelho para erros
 * - warning: Toast amarelo para avisos
 * - info: Toast azul para informações
 * 
 * Posições:
 * - top-right, top-left, top-center
 * - bottom-right, bottom-left, bottom-center
 */

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  description?: string
  isVisible: boolean
  onClose: () => void
  duration?: number // Duração em milissegundos (0 = não fecha automaticamente)
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
}

const Toast = ({
  variant = 'info',
  title,
  description,
  isVisible,
  onClose,
  duration = 5000,
  position = 'top-right',
  className,
  ...props
}: ToastProps) => {
  // Fechar automaticamente após duration
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const variants = {
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    warning: 'bg-yellow-500 border-yellow-400',
    info: 'bg-dark-900 border-primary-500',
  }

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  }

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  return (
    <div
      className={cn(
        'fixed z-50 flex items-start gap-3 rounded-lg border p-4 shadow-lg',
        'transform transition-all duration-300 ease-out',
        'min-w-[300px] max-w-md',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        variants[variant],
        positions[position],
        className
      )}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      {/* Ícone */}
      <div className="flex-shrink-0 text-white">{icons[variant]}</div>

      {/* Conteúdo */}
      <div className="flex-1">
        {title && (
          <h4 className="font-semibold text-white mb-1">{title}</h4>
        )}
        {description && (
          <p className="text-sm text-white/90">{description}</p>
        )}
      </div>

      {/* Botão de fechar */}
      <button
        onClick={onClose}
        className="flex-shrink-0 rounded p-1 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
        aria-label="Fechar notificação"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

Toast.displayName = 'Toast'

export { Toast }
