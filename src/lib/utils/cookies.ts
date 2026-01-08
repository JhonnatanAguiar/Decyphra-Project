/**
 * Cookie Utilities
 * 
 * Utilitários para gerenciar cookies e preferências de consentimento
 */

export type CookieCategory = 'essential' | 'analytics' | 'marketing'

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const COOKIE_PREFERENCES_KEY = 'decyphra_cookie_preferences'
const COOKIE_CONSENT_KEY = 'decyphra_cookie_consent'

/**
 * Preferências padrão de cookies (sempre aceita essenciais)
 */
export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true, // Sempre true (não pode ser desativado)
  analytics: false,
  marketing: false,
  timestamp: Date.now(),
}

/**
 * Salva as preferências de cookies no localStorage
 */
export function saveCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences))
    // Também salva um cookie simples para indicar que o consentimento foi dado
    document.cookie = `${COOKIE_CONSENT_KEY}=true;path=/;max-age=31536000;SameSite=Lax` // 1 ano
  } catch (error) {
    console.error('Erro ao salvar preferências de cookies:', error)
  }
}

/**
 * Carrega as preferências de cookies do localStorage
 */
export function loadCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    if (!stored) return null

    const preferences = JSON.parse(stored) as CookiePreferences
    // Garantir que essential sempre seja true
    preferences.essential = true

    return preferences
  } catch (error) {
    console.error('Erro ao carregar preferências de cookies:', error)
    return null
  }
}

/**
 * Verifica se o usuário já deu consentimento
 */
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false

  try {
    // Verifica localStorage primeiro
    const preferences = loadCookiePreferences()
    if (preferences) return true

    // Verifica cookie como fallback
    const cookies = document.cookie.split(';')
    const consentCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${COOKIE_CONSENT_KEY}=`)
    )

    return consentCookie !== undefined
  } catch (error) {
    console.error('Erro ao verificar consentimento de cookies:', error)
    return false
  }
}

/**
 * Verifica se uma categoria específica de cookie está permitida
 */
export function isCookieCategoryAllowed(category: CookieCategory): boolean {
  const preferences = loadCookiePreferences()
  if (!preferences) return category === 'essential' // Apenas essenciais se não há preferências

  // Essenciais sempre permitidos
  if (category === 'essential') return true

  return preferences[category] === true
}

/**
 * Remove todas as preferências de cookies
 */
export function clearCookiePreferences(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(COOKIE_PREFERENCES_KEY)
    document.cookie = `${COOKIE_CONSENT_KEY}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`
  } catch (error) {
    console.error('Erro ao limpar preferências de cookies:', error)
  }
}
