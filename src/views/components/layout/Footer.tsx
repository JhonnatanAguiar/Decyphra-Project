import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { ROUTES } from '@/lib/constants/routes'
import { SITE_CONFIG } from '@/lib/constants/site'
import { DecyphraLogo } from './DecyphraLogo'
import { Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

/**
 * Footer Component
 * 
 * Componente de rodapé do site.
 * Segue o design system da Decyphra.
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
    { href: ROUTES.home, label: 'Início' },
    { href: ROUTES.about, label: 'Sobre Nós' },
    { href: ROUTES.services, label: 'Serviços' },
    { href: ROUTES.portfolio, label: 'Portfólio' },
    { href: ROUTES.testimonials, label: 'Depoimentos' },
    { href: ROUTES.contact, label: 'Contato' },
  ]

  const services = [
    { label: 'Desenvolvimento Web', href: `${ROUTES.services}/desenvolvimento-web` },
    { label: 'SEO & Otimização', href: `${ROUTES.services}/seo-otimizacao` },
    { label: 'Google Ads', href: `${ROUTES.services}/google-ad` },
    { label: 'Marketing de Conteúdo', href: `${ROUTES.services}/marketing-de-conteudo` },
    { label: 'Inteligência Artificial', href: `${ROUTES.services}/inteligencia-artificial` },
    { label: 'E-commerce', href: `${ROUTES.services}/ecommerce-completo` },
    { label: 'Consultoria Digital', href: `${ROUTES.services}/consultoria-digital` },
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/decyphra', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/decyphra', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/decyphra', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/decyphra', label: 'Twitter' },
  ]

  const emails = [
    'contato@decyphra.com.br',
    'jhonnatan.aguiar@decyphra.com.br',
    'richard.cruz@decyphra.com.br',
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
    <footer className={cn(variants[variant], className, 'relative')}>
      {/* Linha verde lateral direita */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-primary-500 opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo, Descrição e Contato */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <DecyphraLogo
                layout="horizontal"
                size="md"
                showText={true}
                linkToHome={true}
              />
            </div>
            <p className="text-light-300 text-sm leading-relaxed mb-6">
              Somos a Decyphra — uma dupla de desenvolvedores que transforma ideias em presença digital. Combinamos código, design e IA para criar sites que impulsionam negócios reais.
            </p>
            
            {/* Contato */}
            <div className="space-y-4">
              <div>
                <h4 className="text-light-50 font-semibold mb-3 text-sm">Contato</h4>
                <ul className="space-y-2">
                  {emails.map((email, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      <a
                        href={`mailto:${email}`}
                        className="text-light-300 hover:text-primary-500 transition-colors text-sm"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 mt-3">
                    <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-light-300 text-sm">Sumaré, SP - Brasil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div className="text-light-300 text-sm">
                      <div>Seg - Sex: 09:00 - 17:00</div>
                      <div>Sábado e Domingo: Fechado</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nossos Serviços */}
          <div>
            <h3 className="text-light-50 font-semibold mb-4">Nossos Serviços</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-light-300 hover:text-primary-500 transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
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

          {/* Fique por Dentro e Redes Sociais */}
          <div>
            {/* Newsletter */}
            <div className="mb-8">
              <h3 className="text-light-50 font-semibold mb-2">Fique por Dentro</h3>
              <p className="text-light-300 text-sm mb-4">
                Receba dicas exclusivas de marketing digital e novidades do setor.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-light-50 text-sm placeholder:text-light-400 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 text-dark-950 font-semibold rounded-lg hover:bg-primary-400 transition-colors text-sm"
                >
                  Assinar
                </button>
              </form>
            </div>

            {/* Redes Sociais */}
            <div>
              <h3 className="text-light-50 font-semibold mb-4">Siga-nos</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center hover:bg-primary-400 transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-dark-950" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright e Links Legais */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-light-300 text-sm text-center md:text-left">
              © {currentYear} Decyphra. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-light-300 text-sm">
              <Link
                href="/privacidade"
                className="hover:text-primary-500 transition-colors"
              >
                Política de Privacidade
              </Link>
              <span className="text-dark-600">|</span>
              <Link
                href="/termos"
                className="hover:text-primary-500 transition-colors"
              >
                Termos de Uso
              </Link>
              <span className="text-dark-600">|</span>
              <Link
                href="/cookies"
                className="hover:text-primary-500 transition-colors"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export { Footer }
