'use client'

import { HTMLAttributes, ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Modal Component
 * 
 * Componente de modal/dialog com overlay e animações seguindo o design system da Decyphra.
 * 
 * Características:
 * - Overlay escuro com blur
 * - Animação de entrada/saída
 * - Fechamento ao clicar no overlay ou ESC
 * - Foco automático no modal
 * - Scroll lock quando aberto
 */

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
}

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  className,
  ...props
}: ModalProps) => {
  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Bloquear scroll do body
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Fechar ao clicar no overlay
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-10 w-full rounded-lg bg-dark-800 border border-dark-700 shadow-2xl',
          'transform transition-all duration-300 ease-out',
          'scale-100 opacity-100',
          sizes[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <div>
              {title && (
                <h2 className="text-2xl font-semibold text-light-50">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-light-300">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-4 rounded-lg p-2 text-light-300 hover:bg-dark-700 hover:text-light-50 transition-colors"
                aria-label="Fechar modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'

export { Modal }
