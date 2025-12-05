import { type ClassValue, clsx } from 'clsx'

/**
 * Combina classes CSS de forma segura
 * Útil para condicionalmente aplicar classes no Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
