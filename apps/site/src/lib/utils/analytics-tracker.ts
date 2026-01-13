/**
 * Analytics Tracker Utility
 * 
 * Utilitário para tracking de page views e eventos no frontend
 * Envia dados para as APIs de analytics
 */

/**
 * Gera ou recupera session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

/**
 * Detecta dispositivo baseado no user agent
 */
function detectDevice(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const ua = navigator.userAgent.toLowerCase()
  if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return 'mobile'
  }
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'tablet'
  }
  return 'desktop'
}

/**
 * Detecta navegador
 */
function detectBrowser(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const ua = navigator.userAgent
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
  if (ua.includes('Edge')) return 'Edge'
  if (ua.includes('Opera')) return 'Opera'
  return 'Unknown'
}

/**
 * Detecta sistema operacional
 */
function detectOS(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const ua = navigator.userAgent
  if (ua.includes('Windows')) return 'Windows'
  if (ua.includes('Mac')) return 'macOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  return 'Unknown'
}

/**
 * Rastreia uma page view
 */
export async function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') return

  try {
    const sessionId = getSessionId()
    const startTime = performance.now()

    // Enviar page view
    await fetch('/api/v1/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        title: title || document.title,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        device: detectDevice(),
        browser: detectBrowser(),
        os: detectOS(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        sessionId,
      }),
    })

    // Calcular duração quando sair da página
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const duration = Math.round((performance.now() - startTime) / 1000)
        // Enviar atualização de duração (pode ser feito de forma assíncrona)
        fetch('/api/v1/analytics/pageview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path,
            sessionId,
            duration,
          }),
        }).catch(() => {
          // Ignorar erros silenciosamente
        })
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
  } catch (error) {
    // Ignorar erros de tracking silenciosamente
    console.debug('[analytics-tracker] Error tracking page view:', error)
  }
}

/**
 * Rastreia um evento (clique, submit, etc)
 */
export async function trackEvent(
  name: string,
  category?: string,
  action?: string,
  label?: string,
  value?: number,
  metadata?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return

  try {
    const sessionId = getSessionId()

    await fetch('/api/v1/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        category,
        action,
        label,
        value,
        path: window.location.pathname,
        sessionId,
        metadata,
      }),
    })
  } catch (error) {
    console.debug('[analytics-tracker] Error tracking event:', error)
  }
}

/**
 * Rastreia métrica de performance (Core Web Vitals)
 */
export async function trackPerformanceMetric(
  metric: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB',
  value: number,
  metadata?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return

  try {
    await fetch('/api/v1/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname,
        metric,
        value,
        device: detectDevice(),
        connection: (navigator as any).connection?.effectiveType || 'unknown',
        metadata,
      }),
    })
  } catch (error) {
    console.debug('[analytics-tracker] Error tracking performance:', error)
  }
}

/**
 * Rastreia erro do frontend
 */
export async function trackError(
  message: string,
  stack?: string,
  severity: 'error' | 'warning' | 'info' = 'error',
  metadata?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return

  try {
    const sessionId = getSessionId()

    await fetch('/api/v1/analytics/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        stack,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        sessionId,
        severity,
        metadata,
      }),
    })
  } catch (error) {
    console.debug('[analytics-tracker] Error tracking error:', error)
  }
}
