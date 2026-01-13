import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Section Component
 * 
 * Componente de seção para estruturar páginas com espaçamento consistente.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Padding vertical configurável
 * - Background opcional
 * - ID para navegação
 */

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  variant?: 'default' | 'dark' | 'light' | 'accent'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const Section = ({
  children,
  variant = 'default',
  spacing = 'md',
  className,
  ...props
}: SectionProps) => {
  const variants = {
    default: 'bg-dark-950',
    dark: 'bg-dark-1000',
    light: 'bg-dark-900',
    accent: 'bg-gradient-to-br from-dark-950 to-dark-900',
  }

  const spacings = {
    none: 'py-0',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32',
  }

  return (
    <section
      className={cn(
        variants[variant],
        spacings[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

Section.displayName = 'Section'

export { Section }
