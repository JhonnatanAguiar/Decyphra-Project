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

  // FCP - First Contentful Paint
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          trackPerformanceMetric('FCP', Math.round(entry.startTime))
        }
      }
    }).observe({ entryTypes: ['paint'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // LCP - Largest Contentful Paint
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      trackPerformanceMetric('LCP', Math.round(lastEntry.renderTime || lastEntry.loadTime))
    }).observe({ entryTypes: ['largest-contentful-paint'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // FID - First Input Delay
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        trackPerformanceMetric('FID', Math.round(entry.processingStart - entry.startTime))
      }
    }).observe({ entryTypes: ['first-input'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // CLS - Cumulative Layout Shift
  try {
    let clsValue = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      trackPerformanceMetric('CLS', Math.round(clsValue * 1000) / 1000)
    }).observe({ entryTypes: ['layout-shift'] })
  } catch {
    // Ignorar se PerformanceObserver não estiver disponível
  }

  // TTFB - Time to First Byte
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          const ttfb = navEntry.responseStart - navEntry.requestStart
          trackPerformanceMetric('TTFB', Math.round(ttfb))
        }
      }
    }).observe({ entryTypes: ['navigation'] })
  } catch {
    // Fallback: usar performance.timing
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.requestStart
      if (ttfb > 0) {
        trackPerformanceMetric('TTFB', Math.round(ttfb))
      }
    }
  }
}
