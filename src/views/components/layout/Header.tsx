'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { ROUTES } from '@/lib/constants/routes'
import { DecyphraLogo } from './DecyphraLogo'

/**
 * Header Component
 * 
 * Componente de header/navegação principal do site.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Logo e navegação
 * - Menu mobile responsivo
 * - Scroll detection (opcional)
 * - Sticky header
 */

export interface HeaderProps {
  variant?: 'default' | 'transparent' | 'solid'
  sticky?: boolean
}

const Header = ({
  variant = 'default',
  sticky = true,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Detectar scroll para mudar estilo do header
  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  // Fechar menu mobile ao clicar em um link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  const variants = {
    default: isScrolled ? 'bg-dark-950/95 backdrop-blur-sm border-b border-dark-800' : 'bg-dark-950 border-b border-dark-800',
    transparent: isScrolled ? 'bg-dark-950/95 backdrop-blur-sm border-b border-dark-800' : 'bg-transparent',
    solid: 'bg-dark-950 border-b border-dark-800',
  }

  const navLinks = [
    { href: ROUTES.home, label: 'Home' },
    { href: ROUTES.services, label: 'Serviços' },
    { href: ROUTES.portfolio, label: 'Portfólio' },
    { href: ROUTES.about, label: 'Sobre' },
    { href: ROUTES.testimonials, label: 'Depoimentos' },
    { href: ROUTES.contact, label: 'Contato' },
  ]

  return (
    <header
      className={cn(
        'w-full z-50 transition-all duration-300',
        sticky && 'sticky top-0',
        variants[variant]
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <DecyphraLogo
            layout="horizontal"
            size="md"
            showText={true}
            linkToHome={true}
            onClick={handleLinkClick}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-light-200 hover:text-primary-500 transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 px-4 py-2 text-sm bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950"
            >
              Fale Conosco
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-light-50 hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="py-4 space-y-4 border-t border-dark-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-light-200 hover:text-primary-500 transition-colors font-medium py-2"
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-dark-800">
              <Link
                href={ROUTES.contact}
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center w-full rounded-lg font-medium transition-all duration-300 px-4 py-2 text-sm bg-primary-500 text-dark-950 hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950"
              >
                Fale Conosco
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export { Header }
