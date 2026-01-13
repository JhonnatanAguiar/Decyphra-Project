/**
 * Google Analytics Utility Functions
 * 
 * Utilitários para tracking de eventos no Google Analytics 4 (GA4)
 * Funciona apenas no cliente (browser)
 * Respeita o consentimento de cookies do usuário
 */

import { isCookieCategoryAllowed } from './cookies'
import type { CookieCategory } from './cookies'

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'set' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
  }
}

/**
 * Obtém o Measurement ID do Google Analytics
 */
function getGAId(): string {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
}

/**
 * Verifica se o Google Analytics está disponível
 */
export function isGAEnabled(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function'
  )
}

/**
 * Verifica se o tracking de analytics está permitido (consentimento dado)
 */
function isAnalyticsAllowed(): boolean {
  if (typeof window === 'undefined') return false
  return isCookieCategoryAllowed('analytics')
}

/**
 * Configura o consentimento do Google Analytics baseado nas preferências do usuário
 */
export function configureGAConsent(): void {
  if (!isGAEnabled()) return

  const analyticsAllowed = isAnalyticsAllowed()

  // Configurar consentimento do GA4
  window.gtag?.('consent', 'update', {
    analytics_storage: analyticsAllowed ? 'granted' : 'denied',
    ad_storage: 'denied', // Não usamos ad_storage por padrão
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

/**
 * Track page view
 * 
 * @param url - URL da página
 * @param title - Título da página (opcional)
 */
export function trackPageView(url: string, title?: string): void {
  if (!isGAEnabled() || !isAnalyticsAllowed()) return

  const config: Record<string, unknown> = {
    page_path: url,
  }
  
  if (title) {
    config.page_title = title
  }

  window.gtag?.('config', getGAId(), config)
}

/**
 * Track custom event
 * 
 * @param action - Nome da ação (ex: 'click', 'submit', 'download')
 * @param category - Categoria do evento (ex: 'Button', 'Form', 'Download')
 * @param label - Rótulo adicional (opcional)
 * @param value - Valor numérico (opcional)
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (!isGAEnabled() || !isAnalyticsAllowed()) return

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * Track button click
 * 
 * @param buttonLabel - Label do botão
 * @param location - Localização do botão (ex: 'header', 'footer', 'home-hero')
 */
export function trackButtonClick(buttonLabel: string, location?: string): void {
  trackEvent('click', 'Button', `${buttonLabel}${location ? ` - ${location}` : ''}`)
}

/**
 * Track form submission
 * 
 * @param formName - Nome do formulário (ex: 'contact', 'newsletter')
 * @param success - Se a submissão foi bem-sucedida
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent('submit', 'Form', `${formName} - ${success ? 'success' : 'error'}`)
}

/**
 * Track download
 * 
 * @param fileName - Nome do arquivo
 * @param fileType - Tipo do arquivo (ex: 'pdf', 'image')
 */
export function trackDownload(fileName: string, fileType?: string): void {
  trackEvent('download', 'File', `${fileName}${fileType ? ` (${fileType})` : ''}`)
}

/**
 * Track external link click
 * 
 * @param url - URL externa
 * @param location - Localização do link
 */
export function trackExternalLink(url: string, location?: string): void {
  trackEvent('click', 'External Link', `${url}${location ? ` - ${location}` : ''}`)
}

/**
 * Track service page view
 * 
 * @param serviceSlug - Slug do serviço
 * @param serviceName - Nome do serviço
 */
export function trackServiceView(serviceSlug: string, serviceName: string): void {
  trackEvent('view', 'Service', serviceName, undefined)
  trackEvent('page_view', 'Service', serviceSlug)
}

/**
 * Track project view
 * 
 * @param projectSlug - Slug do projeto
 * @param projectName - Nome do projeto
 */
export function trackProjectView(projectSlug: string, projectName: string): void {
  trackEvent('view', 'Project', projectName, undefined)
  trackEvent('page_view', 'Project', projectSlug)
}
