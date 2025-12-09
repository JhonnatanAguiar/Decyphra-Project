'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

/**
 * PageTransition Component
 * 
 * Componente de transição entre páginas otimizado.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Transições suaves e otimizadas entre páginas
 * - Logo animado da Decyphra no centro durante transição
 * - Duração sincronizada com animação do logo (0.8s)
 * - Performance otimizada com framer-motion
 */

export interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const TRANSITION_DURATION = 0.8 // Duração da transição e animação do logo (0.8s)

/**
 * Logo animado específico para transição (animação rápida de 0.8s)
 * Não afeta o logo do header que mantém animação de 1.5s
 */
const TransitionLogo = () => {
  const logoSize = 'h-16 w-16'
  const textSize = 'text-4xl'

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <svg
        className={logoSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Aro externo - animação rápida para transição */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            rotate: 360,
          }}
          transition={{ 
            opacity: { duration: TRANSITION_DURATION * 0.4, ease: "easeInOut" },
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
            transition={{ pathLength: { duration: TRANSITION_DURATION * 0.4, ease: "easeInOut" } }}
          />
        </motion.g>
        
        {/* Aro interno tracejado - animação rápida para transição */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.5,
            rotate: -360,
          }}
          transition={{ 
            opacity: { duration: TRANSITION_DURATION * 0.6, delay: TRANSITION_DURATION * 0.2, ease: "easeInOut" },
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
            transition={{ pathLength: { duration: TRANSITION_DURATION * 0.6, delay: TRANSITION_DURATION * 0.2, ease: "easeInOut" } }}
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
          transition={{ duration: TRANSITION_DURATION * 0.3, delay: TRANSITION_DURATION * 0.5, type: "spring", stiffness: 200 }}
        />
      </svg>
      <span className={cn('font-bold text-light-50 tracking-widest', textSize)}>
        DECYPHRA
      </span>
    </motion.div>
  )
}

const PageTransition = ({
  children,
  className,
}: PageTransitionProps) => {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // Inicia transição
    setIsLoading(true)
    
    // Após a duração da animação do logo, atualiza o conteúdo
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsLoading(false)
    }, TRANSITION_DURATION * 1000)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <>
      {/* Overlay com logo animado durante transição */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 backdrop-blur-sm"
          >
            <TransitionLogo />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo da página */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ 
          duration: 0.3,
          delay: isLoading ? TRANSITION_DURATION - 0.3 : 0
        }}
        className={className}
      >
        {displayChildren}
      </motion.div>
    </>
  )
}

PageTransition.displayName = 'PageTransition'

export { PageTransition }
