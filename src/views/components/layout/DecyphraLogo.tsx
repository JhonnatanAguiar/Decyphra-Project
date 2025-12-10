'use client'

import { HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

/**
 * DecyphraLogo Component
 * 
 * Componente do logotipo da Decyphra com animações.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Animação de entrada ao carregar
 * - Animação contínua do aro (rotação)
 * - Layouts horizontal e vertical
 * - Link opcional para home
 */

export interface DecyphraLogoProps extends HTMLAttributes<HTMLDivElement> {
  layout?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  linkToHome?: boolean
  className?: string
}

const DecyphraIcon = ({ 
  className,
  size = 'md',
}: { 
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <svg
      className={cn(sizes[size], className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Aro externo - animação contínua de rotação */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          rotate: 360,
        }}
        transition={{ 
          opacity: { duration: 1, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
        style={{ transformOrigin: '50px 50px' }}
      >
        <motion.path
          d="M50 2.5C23.76 2.5 2.5 23.76 2.5 50C2.5 76.24 23.76 97.5 50 97.5C76.24 97.5 97.5 76.24 97.5 50"
          stroke="#00FF88"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ pathLength: { duration: 1, ease: "easeInOut" } }}
        />
      </motion.g>
      
      {/* Aro interno tracejado - animação contínua de rotação */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.5,
          rotate: -360,
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
        }}
        style={{ transformOrigin: '50px 50px' }}
      >
        <motion.path
          d="M50 97.5C76.24 97.5 97.5 76.24 97.5 50C97.5 23.76 76.24 2.5 50 2.5C23.76 2.5 2.5 23.76 2.5 50"
          stroke="#00FF88"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="5 20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ pathLength: { duration: 1.5, delay: 0.5, ease: "easeInOut" } }}
        />
      </motion.g>
      
      {/* Círculo central */}
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        fill="#00FF88"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
      />
    </svg>
  )
}

const DecyphraLogo = ({
  layout = 'horizontal',
  size = 'md',
  showText = true,
  linkToHome = false,
  className,
  ...props
}: DecyphraLogoProps) => {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }

  const iconSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  } as const

  const content = (
    <motion.div
      className={cn(
        'flex items-center',
        layout === 'vertical' ? 'flex-col gap-2' : 'gap-3',
        className
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      {...(props as Omit<typeof props, 'onDrag'>)}
    >
      <DecyphraIcon size={iconSizes[size]} />
      {showText && (
        <span className={cn(
          'font-bold text-light-50 tracking-wider',
          textSizes[size],
          layout === 'vertical' && 'tracking-widest'
        )}>
          DECYPHRA
        </span>
      )}
    </motion.div>
  )

  if (linkToHome) {
    return (
      <Link href={ROUTES.home} className="inline-block">
        {content}
      </Link>
    )
  }

  return content
}

DecyphraLogo.displayName = 'DecyphraLogo'

export { DecyphraLogo }
