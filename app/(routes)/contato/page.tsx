'use client'

import { useState } from 'react'
import { Container, Section } from '@/views/components/layout'
import { FadeIn, ScrollReveal } from '@/views/components/animations'
import { Input } from '@/views/components/ui/Input'
import { Textarea } from '@/views/components/ui/Textarea'
import { Select } from '@/views/components/ui/Select'
import { Button } from '@/views/components/ui/Button'
import { Toast } from '@/views/components/ui/Toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/site'
import { API_ROUTES } from '@/lib/constants/routes'

/**
 * Página de Contato
 * 
 * Formulário de contato com validação e informações de contato
 * Replicado fielmente do site de referência decyphra.com.br
 */

// Schema de validação
const contactFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

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
    } catch (error) {
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
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 opacity-50" />
        <Container size="lg" className="relative z-10">
          <FadeIn direction="up" delay={0}>
            <div className="text-center py-12 lg:py-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary-500">
                Vamos Conversar?
              </h1>
              <p className="text-lg md:text-xl text-light-200 leading-relaxed max-w-3xl mx-auto">
                Pronto para transformar seu negócio? Entre em contato conosco e receba um orçamento gratuito personalizado.
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
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-light-50">
                  Solicite Seu Orçamento Gratuito
                </h2>

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
                        Telefone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(19) 99999-9999"
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
                        placeholder="Nome da sua empresa"
                        variant="primary"
                        {...register('company')}
                      />
                    </div>
                  </div>

                  {/* Serviço de Interesse */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-light-200 mb-2">
                      Serviço de Interesse
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
                      placeholder="Conte-nos sobre seu projeto e objetivos..."
                      variant={errors.message ? 'error' : 'primary'}
                      size="lg"
                      rows={6}
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
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </ScrollReveal>
            </div>

            {/* Sidebar - Informações de Contato e Garantia */}
            <div className="lg:col-span-1 space-y-6">
              {/* Informações de Contato */}
              <ScrollReveal direction="up" delay={100}>
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
              <ScrollReveal direction="up" delay={200}>
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
              <ScrollReveal direction="up" delay={300}>
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
