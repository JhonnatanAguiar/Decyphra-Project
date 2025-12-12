'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { DecyphraLogo } from '@/views/components/layout/DecyphraLogo'

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string
  showLogo?: boolean
  variant?: 'default' | 'minimal' | 'fullscreen'
  size?: 'sm' | 'md' | 'lg'
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  showLogo = true,
  variant = 'fullscreen',
  size = 'lg',
  className,
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const containerClasses = {
    default: 'min-h-[200px] flex items-center justify-center',
    minimal: 'min-h-[100px] flex items-center justify-center',
    fullscreen: 'min-h-screen flex items-center justify-center bg-dark-950',
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(containerClasses[variant], className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {showLogo && variant === 'fullscreen' && (
          <motion.div variants={itemVariants}>
            <DecyphraLogo size="lg" className="mb-4" />
          </motion.div>
        )}

        <motion.div
          variants={spinnerVariants}
          animate="animate"
          className={cn(
            'relative',
            sizeClasses[size]
          )}
        >
          {/* Spinner principal */}
          <div className="absolute inset-0 rounded-full border-4 border-primary-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-primary-500/10 blur-xl animate-pulse" />
        </motion.div>

        {message && (
          <motion.p
            variants={itemVariants}
            className="text-light-200 text-sm md:text-base font-medium"
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
