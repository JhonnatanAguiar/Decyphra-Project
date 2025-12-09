'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { DecyphraLogo } from '@/views/components/layout/DecyphraLogo'

/**
 * PageTransition Component
 * 
 * Componente de transição entre páginas otimizado.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Transições suaves e otimizadas entre páginas
 * - Logo animado da Decyphra no centro durante transição
 * - Duração sincronizada com animação do logo (1.5s)
 * - Performance otimizada com framer-motion
 */

export interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const TRANSITION_DURATION = 1.5 // Mesma duração da animação do logo (1.5s)

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
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <DecyphraLogo 
                size="xl" 
                showText={true}
                layout="vertical"
              />
            </motion.div>
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
