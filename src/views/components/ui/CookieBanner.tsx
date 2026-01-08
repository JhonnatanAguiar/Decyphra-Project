'use client'

import { useState, useEffect } from 'react'
import { X, Settings, Check, Cookie } from 'lucide-react'
import { useCookieConsent } from '@/lib/hooks/useCookieConsent'
import type { CookieCategory } from '@/lib/utils/cookies'
import Link from 'next/link'
import { Button } from './Button'
import { cn } from '@/lib/utils/cn'

/**
 * Cookie Banner Component
 * 
 * Banner/pop-up de consentimento de cookies que aparece na primeira visita
 * Permite ao usuário escolher quais tipos de cookies aceitar
 */

interface CookieBannerProps {
  className?: string
}

export function CookieBanner({ className }: CookieBannerProps) {
  const { hasConsent, isLoading, acceptAll, acceptEssential, savePreferences, preferences } =
    useCookieConsent()
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Só mostrar o banner se não houver consentimento
    if (!isLoading && !hasConsent) {
      setShowBanner(true)
    }
  }, [hasConsent, isLoading])

  if (isLoading || !showBanner || hasConsent) {
    return null
  }

  const handleSavePreferences = () => {
    if (preferences) {
      savePreferences(preferences)
    }
    setShowBanner(false)
  }

  const toggleCategory = (category: CookieCategory) => {
    if (category === 'essential') return // Não pode desativar essenciais

    if (!preferences) return

    savePreferences({
      ...preferences,
      [category]: !preferences[category],
    })
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[9999] bg-dark-1000 border-t border-dark-800 shadow-2xl',
        'animate-in slide-in-from-bottom-full duration-300',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!showSettings ? (
          // Vista principal do banner
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="w-6 h-6 text-primary-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-light-50 font-semibold mb-2 text-lg">
                  Utilizamos Cookies
                </h3>
                <p className="text-light-300 text-sm leading-relaxed mb-3">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e personalizar conteúdo.{' '}
                  <Link
                    href="/cookies"
                    className="text-primary-500 hover:text-primary-400 underline transition-colors"
                  >
                    Saiba mais
                  </Link>
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    onClick={() => {
                      acceptEssential()
                      setShowBanner(false)
                    }}
                    variant="secondary"
                    size="sm"
                    className="bg-transparent border-dark-700 text-light-200 hover:bg-dark-900 hover:border-primary-500 hover:text-primary-400"
                  >
                    Apenas Essenciais
                  </Button>
                  <Button
                    onClick={() => {
                      acceptAll()
                      setShowBanner(false)
                    }}
                    size="sm"
                    className="bg-primary-500 text-dark-950 hover:bg-primary-400 hover:text-dark-950"
                  >
                    Aceitar Todos
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="secondary"
                    size="sm"
                    className="bg-transparent border-dark-700 text-light-200 hover:bg-dark-900 hover:border-primary-500 hover:text-primary-400"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Personalizar
                  </Button>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                acceptEssential()
                setShowBanner(false)
              }}
              className="flex-shrink-0 text-light-400 hover:text-light-50 transition-colors p-2 hover:bg-dark-900 rounded-lg"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          // Vista de configurações avançadas
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-light-50 font-semibold text-lg">
                Configurações de Cookies
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-light-400 hover:text-light-50 transition-colors p-2 hover:bg-dark-900 rounded-lg"
                aria-label="Voltar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Cookies Essenciais */}
              <div className="bg-dark-900/50 rounded-lg border border-dark-800 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-light-50 font-semibold">Cookies Essenciais</h4>
                      <span className="text-xs text-light-400 bg-dark-800 px-2 py-1 rounded">
                        Obrigatórios
                      </span>
                    </div>
                    <p className="text-light-300 text-sm">
                      Necessários para o funcionamento básico do site. Não podem ser desativados.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-primary-500 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-50">
                      <div className="w-4 h-4 bg-dark-950 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookies de Análise */}
              <div className="bg-dark-900/50 rounded-lg border border-dark-800 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-light-50 font-semibold">Cookies de Análise</h4>
                    </div>
                    <p className="text-light-300 text-sm mb-2">
                      Nos ajudam a entender como os visitantes interagem com o site (Google Analytics, Vercel Analytics).
                    </p>
                    <Link
                      href="/cookies"
                      className="text-primary-500 hover:text-primary-400 text-sm underline"
                    >
                      Saiba mais sobre cookies de análise
                    </Link>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => toggleCategory('analytics')}
                      className={cn(
                        'w-12 h-6 rounded-full flex items-center transition-colors',
                        preferences?.analytics
                          ? 'bg-primary-500 justify-end'
                          : 'bg-dark-700 justify-start'
                      )}
                    >
                      <div className="w-4 h-4 bg-dark-950 rounded-full m-1"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Cookies de Marketing */}
              <div className="bg-dark-900/50 rounded-lg border border-dark-800 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-light-50 font-semibold">Cookies de Marketing</h4>
                    </div>
                    <p className="text-light-300 text-sm mb-2">
                      Utilizados para personalizar anúncios e medir a eficácia de campanhas.
                    </p>
                    <Link
                      href="/cookies"
                      className="text-primary-500 hover:text-primary-400 text-sm underline"
                    >
                      Saiba mais sobre cookies de marketing
                    </Link>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => toggleCategory('marketing')}
                      className={cn(
                        'w-12 h-6 rounded-full flex items-center transition-colors',
                        preferences?.marketing
                          ? 'bg-primary-500 justify-end'
                          : 'bg-dark-700 justify-start'
                      )}
                    >
                      <div className="w-4 h-4 bg-dark-950 rounded-full m-1"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-dark-800">
              <Button
                onClick={handleSavePreferences}
                className="bg-primary-500 text-dark-950 hover:bg-primary-400 hover:text-dark-950"
              >
                <Check className="w-4 h-4 mr-2" />
                Salvar Preferências
              </Button>
              <Button
                onClick={() => {
                  acceptEssential()
                  setShowBanner(false)
                }}
                variant="secondary"
                className="bg-transparent border-dark-700 text-light-200 hover:bg-dark-900 hover:border-primary-500 hover:text-primary-400"
              >
                Apenas Essenciais
              </Button>
              <Button
                onClick={() => {
                  acceptAll()
                  setShowBanner(false)
                }}
                variant="secondary"
                className="bg-transparent border-dark-700 text-light-200 hover:bg-dark-900 hover:border-primary-500 hover:text-primary-400"
              >
                Aceitar Todos
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
