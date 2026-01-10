/**
 * Web Vitals Tracker
 * 
 * Utilitário para rastrear Core Web Vitals e enviar para analytics
 */

import { trackPerformanceMetric } from './analytics-tracker'

/**
 * Inicializa o tracking de Core Web Vitals
 */
export function initWebVitalsTracking() {
  if (typeof window === 'undefined') return

  // FCP - First Contentful Paint (apenas uma vez)
  try {
    let fcpSent = false
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint' && !fcpSent) {
          fcpSent = true
          trackPerformanceMetric('FCP', Math.round(entry.startTime))
        }
      }
    }).observe({ entryTypes: ['paint'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // LCP - Largest Contentful Paint (apenas último entry para evitar múltiplos envios)
  try {
    let lcpSent = false
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      // Enviar apenas uma vez quando o último entry estiver disponível
      if (!lcpSent && lastEntry) {
        lcpSent = true
        trackPerformanceMetric('LCP', Math.round(lastEntry.renderTime || lastEntry.loadTime))
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // FID - First Input Delay (apenas primeiro evento)
  try {
    let fidSent = false
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!fidSent) {
          fidSent = true
          trackPerformanceMetric('FID', Math.round(entry.processingStart - entry.startTime))
        }
      }
    }).observe({ entryTypes: ['first-input'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // CLS - Cumulative Layout Shift (debounce para evitar múltiplos envios)
  try {
    let clsValue = 0
    let clsTimeout: ReturnType<typeof setTimeout> | null = null
    
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      
      // Debounce: enviar apenas após 2 segundos sem novos layout shifts
      if (clsTimeout) clearTimeout(clsTimeout)
      clsTimeout = setTimeout(() => {
        trackPerformanceMetric('CLS', Math.round(clsValue * 1000) / 1000)
      }, 2000)
    }).observe({ entryTypes: ['layout-shift'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // TTFB - Time to First Byte (apenas uma vez)
  try {
    let ttfbSent = false
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation' && !ttfbSent) {
          ttfbSent = true
          const navEntry = entry as PerformanceNavigationTiming
          const ttfb = navEntry.responseStart - navEntry.requestStart
          if (ttfb > 0) {
            trackPerformanceMetric('TTFB', Math.round(ttfb))
          }
        }
      }
    }).observe({ entryTypes: ['navigation'] })
  } catch {
    // Fallback: usar performance.timing (apenas uma vez)
    if (performance.timing && !performance.timing.ttfb) {
      const ttfb = performance.timing.responseStart - performance.timing.requestStart
      if (ttfb > 0) {
        trackPerformanceMetric('TTFB', Math.round(ttfb))
        // Marcar como enviado para evitar reenvio
        ;(performance.timing as any).ttfb = ttfb
      }
    }
  }
}
