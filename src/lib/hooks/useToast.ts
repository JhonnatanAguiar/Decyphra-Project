'use client'

import { useState, useCallback } from 'react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

/**
 * Hook para gerenciar toasts
 * 
 * Hook simples para exibir mensagens toast
 */
export function useToast() {
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration: number = 5000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(7)}`
      setToast({ id, message, variant, duration })

      if (duration > 0) {
        setTimeout(() => {
          setToast(null)
        }, duration)
      }
    },
    []
  )

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  return {
    toast,
    showToast,
    hideToast,
  }
}
