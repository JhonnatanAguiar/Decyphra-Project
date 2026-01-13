'use client'

import { useEffect } from 'react'
import { initWebVitalsTracking } from '@/lib/utils/web-vitals-tracker'

/**
 * Componente para inicializar Web Vitals Tracking
 */
export function WebVitalsInit() {
  useEffect(() => {
    initWebVitalsTracking()
  }, [])

  return null
}
