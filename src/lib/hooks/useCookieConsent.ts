'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  type CookiePreferences,
  type CookieCategory,
  DEFAULT_COOKIE_PREFERENCES,
  saveCookiePreferences,
  loadCookiePreferences,
  hasCookieConsent,
  isCookieCategoryAllowed,
  clearCookiePreferences,
} from '@/lib/utils/cookies'

/**
 * Hook para gerenciar consentimento de cookies
 * 
 * Fornece estado e funções para gerenciar preferências de cookies do usuário
 */
export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [hasConsent, setHasConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar preferências ao montar
  useEffect(() => {
    const loadedPreferences = loadCookiePreferences()
    const consent = hasCookieConsent()

    setPreferences(loadedPreferences || DEFAULT_COOKIE_PREFERENCES)
    setHasConsent(consent)
    setIsLoading(false)
  }, [])

  /**
   * Aceita todas as categorias de cookies
   */
  const acceptAll = useCallback(() => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }

    saveCookiePreferences(newPreferences)
    setPreferences(newPreferences)
    setHasConsent(true)

    // Disparar evento customizado para outros componentes reagirem
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: newPreferences }))
    }
  }, [])

  /**
   * Aceita apenas cookies essenciais
   */
  const acceptEssential = useCallback(() => {
    const newPreferences: CookiePreferences = {
      ...DEFAULT_COOKIE_PREFERENCES,
      timestamp: Date.now(),
    }

    saveCookiePreferences(newPreferences)
    setPreferences(newPreferences)
    setHasConsent(true)

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: newPreferences }))
    }
  }, [])

  /**
   * Salva preferências personalizadas
   */
  const savePreferences = useCallback((newPreferences: Partial<CookiePreferences>) => {
    const finalPreferences: CookiePreferences = {
      ...DEFAULT_COOKIE_PREFERENCES,
      ...newPreferences,
      essential: true, // Sempre true (garantir depois do spread)
      timestamp: Date.now(),
    }

    saveCookiePreferences(finalPreferences)
    setPreferences(finalPreferences)
    setHasConsent(true)

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: finalPreferences }))
    }
  }, [])

  /**
   * Alterna uma categoria específica de cookie
   */
  const toggleCategory = useCallback(
    (category: CookieCategory, enabled: boolean) => {
      if (category === 'essential') return // Não pode desativar essenciais

      const currentPreferences = preferences || DEFAULT_COOKIE_PREFERENCES
      savePreferences({
        ...currentPreferences,
        [category]: enabled,
      })
    },
    [preferences, savePreferences]
  )

  /**
   * Verifica se uma categoria está permitida
   */
  const isAllowed = useCallback(
    (category: CookieCategory) => {
      return isCookieCategoryAllowed(category)
    },
    []
  )

  /**
   * Revoga consentimento e limpa preferências
   */
  const revokeConsent = useCallback(() => {
    clearCookiePreferences()
    setPreferences(DEFAULT_COOKIE_PREFERENCES)
    setHasConsent(false)

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: DEFAULT_COOKIE_PREFERENCES }))
    }
  }, [])

  return {
    preferences,
    hasConsent,
    isLoading,
    acceptAll,
    acceptEssential,
    savePreferences,
    toggleCategory,
    isAllowed,
    revokeConsent,
  }
}
