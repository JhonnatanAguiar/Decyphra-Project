import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { ROUTES } from '@/lib/constants/routes'
import { SITE_CONFIG, CONTACT_INFO } from '@/lib/constants/site'

/**
 * Footer Component
 * 
 * Componente de rodapé do site.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Links de navegação
 * - Informações de contato
 * - Redes sociais (opcional)
 * - Copyright
 */

export interface FooterProps {
  variant?: 'default' | 'minimal'
  className?: string
}

const Footer = ({
  variant = 'default',
  className,
}: FooterProps) => {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: ROUTES.home, label: 'Home' },
    { href: ROUTES.services, label: 'Serviços' },
    { href: ROUTES.portfolio, label: 'Portfólio' },
    { href: ROUTES.about, label: 'Sobre' },
    { href: ROUTES.testimonials, label: 'Depoimentos' },
    { href: ROUTES.contact, label: 'Contato' },
  ]

  const variants = {
    default: 'bg-dark-1000 border-t border-dark-800',
    minimal: 'bg-dark-950 border-t border-dark-800',
  }

  if (variant === 'minimal') {
    return (
      <footer className={cn(variants[variant], className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-light-200 text-sm">
              © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-light-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className={cn(variants[variant], className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <Link
              href={ROUTES.home}
              className="inline-block mb-4 text-2xl font-bold text-light-50 hover:text-primary-500 transition-colors"
            >
              <span className="text-primary-500">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-light-300 text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-light-50 font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-light-300 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-light-50 font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-light-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              {CONTACT_INFO.phones.map((phone, index) => (
                <li key={index}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-light-300 hover:text-primary-500 transition-colors text-sm"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais (placeholder) */}
          <div>
            <h3 className="text-light-50 font-semibold mb-4">Redes Sociais</h3>
            <p className="text-light-300 text-sm mb-4">
              Em breve
            </p>
            {/* Espaço reservado para ícones de redes sociais */}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-light-300 text-sm text-center md:text-left">
              © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
            </p>
            <p className="text-light-400 text-xs text-center md:text-right">
              Desenvolvido com ❤️ pela {SITE_CONFIG.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export { Footer }
