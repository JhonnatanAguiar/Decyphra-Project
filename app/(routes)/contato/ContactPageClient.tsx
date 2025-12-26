'use client'

import { useState } from 'react'
import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal, Waves } from '@/views/components/animations'
import { Input, Textarea, Select, Button, Toast } from '@/views/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/site'
import { API_ROUTES } from '@/lib/constants/routes'
import { contactSchema, type ContactInput } from '@/models/schemas'

/**
 * Página de Contato Client Component
 * 
 * Componente client-side da página de contato
 */

type ContactFormData = ContactInput

// Lista de serviços para o select
const services = [
  { value: '', label: 'Selecione um serviço' },
  { value: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  { value: 'seo-otimizacao', label: 'SEO & Otimização' },
  { value: 'google-ad', label: 'Google Ad' },
  { value: 'marketing-de-conteudo', label: 'Marketing de Conteúdo' },
  { value: 'inteligencia-artificial', label: 'Inteligência Artificial' },
  { value: 'ecommerce-completo', label: 'E-commerce Completo' },
  { value: 'consultoria-digital', label: 'Consultoria Digital' },
]

// Lista de garantias de qualidade
const qualityGuarantees = [
  'Resposta em até 24 horas',
  'Orçamento gratuito e sem compromisso',
  'Consultoria personalizada',
  'Suporte contínuo pós-projeto',
]

// Horários de atendimento
const businessHours = [
  { day: 'Segunda a Sexta', hours: '09:00 - 18:00' },
  { day: 'Sábado', hours: '09:00 - 13:00' },
  { day: 'Domingo', hours: 'Fechado' },
]

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  // Observar valores dos campos para validação visual
  const watchedName = watch('name')
  const watchedEmail = watch('email')
  const watchedMessage = watch('message')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setToast(null)

    try {
      const response = await fetch(API_ROUTES.v1.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      setToast({
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        type: 'success',
      })
      reset()
    } catch {
      setToast({
        message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Seção Introdutória "Vamos Conversar?" */}
      <Section variant="dark" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <Waves
            lineColor="#00FF88"
            backgroundColor="transparent"
            waveSpeedX={0.0125}
            waveSpeedY={0.005}
            waveAmpX={32}
            waveAmpY={16}
            xGap={10}
            yGap={32}
            friction={0.925}
            tension={0.005}
            maxCursorMove={100}
            className="opacity-50 z-0"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50 z-[1] pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center py-12 lg:py-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary-500 drop-shadow-[0_0_30px_rgba(0,255,136,0.8)]">
                Contato
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Conte sobre seu projeto. A gente responde com direção — não com enrolação.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Main Content - Formulário e Informações */}
      <Section variant="default" spacing="lg" className="py-12 lg:py-16">
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Formulário de Contato */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="up" delay={0}>
                {/* Título do Formulário */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-50">
                  Fale com a Decyphra
                </h2>
                <p className="text-light-300 mb-8">
                  Quanto mais contexto você mandar, mais precisa fica a nossa proposta.
                </p>

                {/* Formulário */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nome e E-mail */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-light-200 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        variant={errors.name ? 'error' : 'primary'}
                        showValidationIcon={!!watchedName}
                        isValid={!errors.name && !!watchedName && watchedName.length >= 3}
                        value={watchedName}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-light-200 mb-2">
                        E-mail *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        variant={errors.email ? 'error' : 'primary'}
                        showValidationIcon={!!watchedEmail}
                        isValid={!errors.email && !!watchedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail)}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Telefone e Empresa */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-light-200 mb-2">
                        WhatsApp
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        variant="primary"
                        {...register('phone')}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-light-200 mb-2">
                        Empresa
                      </label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Nome da empresa (opcional)"
                        variant="primary"
                        {...register('company')}
                      />
                    </div>
                  </div>

                  {/* Serviço de Interesse */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-light-200 mb-2">
                      Serviço
                    </label>
                    <Select
                      id="service"
                      variant="primary"
                      {...register('service')}
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-light-200 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Me diga objetivo, prazo, referências e o que você quer que o site faça."
                      variant={errors.message ? 'error' : 'primary'}
                      size="lg"
                      rows={6}
                      showValidationIcon={!!watchedMessage}
                      isValid={!errors.message && !!watchedMessage && watchedMessage.length >= 10}
                      showCharCount={true}
                      maxLength={1000}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Botão de Envio */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    enable3D={true}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        Enviar mensagem
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </ScrollReveal>
            </div>

            {/* Sidebar - Informações de Contato e Dicas */}
            <div className="lg:col-span-1 space-y-6">
              {/* O que ajuda */}
              <ScrollReveal direction="up" delay={100}>
                <div className="bg-dark-900/50 rounded-lg border border-primary-500/20 p-6">
                  <h3 className="text-xl font-semibold mb-6 text-light-50">
                    O que ajuda a gente a ser mais rápido
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Link de referências (sites que você curte)',
                      'Objetivo principal (vender, captar leads, autoridade)',
                      'Prazo e urgência',
                      'Se já tem logo/identidade e conteúdo',
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                        <span className="text-light-300 leading-relaxed text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              {/* Informações de Contato */}
              <ScrollReveal direction="up" delay={200}>
                <div className="bg-dark-900/50 rounded-lg border border-primary-500/20 p-6 lg:sticky lg:top-24">
                  <h3 className="text-xl font-semibold mb-6 text-light-50">
                    Informações de Contato
                  </h3>
                  <div className="space-y-6">
                    {/* E-mail */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary-500/20">
                        <Mail className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm text-light-300 mb-1">E-mail</p>
                        <a
                          href={`mailto:${CONTACT_INFO.email}`}
                          className="text-light-50 hover:text-primary-500 transition-colors break-all"
                        >
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </div>

                    {/* Telefones */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary-500/20">
                        <Phone className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm text-light-300 mb-1">Telefone</p>
                        <div className="space-y-1">
                          {CONTACT_INFO.phones.map((phone, index) => (
                            <a
                              key={index}
                              href={`tel:${phone.replace(/\s/g, '')}`}
                              className="block text-light-50 hover:text-primary-500 transition-colors"
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Localização */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary-500/20">
                        <MapPin className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm text-light-300 mb-1">Localização</p>
                        <p className="text-light-50">Sumaré, SP - Brasil</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Garantia de Qualidade */}
              <ScrollReveal direction="up" delay={300}>
                <div className="bg-primary-500/5 rounded-lg border border-primary-500/30 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-light-50">
                      Garantia de Qualidade
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {qualityGuarantees.map((guarantee, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                        <span className="text-light-200 leading-relaxed">{guarantee}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Horário de Atendimento */}
              <ScrollReveal direction="up" delay={400}>
                <div className="bg-dark-900/50 rounded-lg border border-primary-500/20 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-primary-500 flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-light-50">
                      Horário de Atendimento
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-light-200 font-medium">{schedule.day}</span>
                        <span className="text-light-300">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Toast Notification */}
      {toast && (
        <Toast
          description={toast.message}
          variant={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
