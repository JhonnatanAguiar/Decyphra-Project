'use client'

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export interface TextRevealProps extends Omit<HTMLAttributes<HTMLDivElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDrop' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' |
  'onTransitionEnd'
> {
  children: ReactNode
  delay?: number
  duration?: number
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  once?: boolean
  amount?: number
  splitBy?: 'word' | 'char' | 'line'
  className?: string
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const directionVariants = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  stagger = 0.05,
  direction = 'up',
  once = true,
  amount = 0.3,
  splitBy = 'word',
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const [splitText, setSplitText] = useState<string[]>([])

  // Função para extrair texto de elementos React
  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node)
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join('')
    }
    if (node && typeof node === 'object' && 'props' in node) {
      return extractText((node as any).props?.children || '')
    }
    return ''
  }

  useEffect(() => {
    const text = extractText(children)
    if (text) {
      if (splitBy === 'char') {
        setSplitText(text.split(''))
      } else if (splitBy === 'word') {
        setSplitText(text.split(/\s+/).filter(word => word.length > 0))
      } else if (splitBy === 'line') {
        setSplitText(text.split('\n').filter(line => line.length > 0))
      } else {
        setSplitText([text])
      }
    } else {
      setSplitText([])
    }
  }, [children, splitBy])

  const variants = direction ? directionVariants[direction] : defaultVariants

  // Se não conseguir dividir o texto, usa animação simples
  if (splitText.length === 0) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration, delay }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  if (splitBy === 'line') {
    // Anima linha por linha
    return (
      <div ref={ref} className={cn('overflow-hidden', className)} {...props}>
        {splitText.map((line, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {line}
            {index < splitText.length - 1 && <br />}
          </motion.div>
        ))}
      </div>
    )
  }

  if (splitBy === 'word') {
    // Anima palavra por palavra
    return (
      <div ref={ref} className={cn('inline-block', className)} {...props}>
        {splitText.map((word, index) => (
          <motion.span
            key={index}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
            {index < splitText.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </div>
    )
  }

  // Anima caractere por caractere
  return (
    <div ref={ref} className={cn('inline-block', className)} {...props}>
      {splitText.map((char, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}
