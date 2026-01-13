import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Container Component
 * 
 * Componente de container responsivo para centralizar e limitar largura do conteúdo.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Largura máxima responsiva
 * - Padding horizontal configurável
 * - Centralização automática
 */

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const Container = ({
  children,
  size = 'lg',
  className,
  ...props
}: ContainerProps) => {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Container.displayName = 'Container'

export { Container }
