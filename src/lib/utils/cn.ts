import { type ClassValue, clsx } from 'clsx'

/**
 * Combina classes CSS de forma segura
 * Útil para condicionalmente aplicar classes no Tailwind
 * 
 * @param inputs - Classes CSS para combinar
 * @returns String com classes combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
