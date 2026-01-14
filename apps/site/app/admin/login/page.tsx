'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from '@/lib/hooks/useForm'
import { Button } from '@/views/components/ui/Button'
import { Input } from '@/views/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/views/components/ui/Card'
import { Toast } from '@/views/components/ui/Toast'
import { useToast } from '@/lib/hooks/useToast'
import { Lock, Mail } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

/**
 * Página de Login do Admin
 * 
 * Página de autenticação para acesso ao painel administrativo
 */

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast, showToast, hideToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Verificar se já está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/v1/admin/auth/check')
        if (response.ok) {
          router.push('/admin')
        }
      } catch {
        // Não fazer nada se falhar
      }
    }
    checkAuth()
  }, [router])

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/v1/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.ok) {
        showToast('Login realizado com sucesso!', 'success', 2000)
        // Usar refresh para garantir que o layout admin verifique a autenticação novamente
        setTimeout(() => {
          router.refresh()
          router.push('/admin')
        }, 500)
      } else {
        showToast(result.message || 'E-mail ou senha inválidos', 'error')
      }
    } catch {
      showToast('Erro ao fazer login. Tente novamente.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md" variant="elevated">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Painel Administrativo</CardTitle>
          <CardDescription className="text-center">
            Faça login para acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-50 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-light-400" size={20} />
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="pl-10"
                  placeholder="admin@decyphra.com.br"
                  variant={errors.email ? 'error' : 'default'}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-light-50 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-light-400" size={20} />
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="pl-10"
                  placeholder="••••••••"
                  variant={errors.password ? 'error' : 'default'}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      {toast && (
        <Toast
          variant={toast.variant}
          description={toast.message}
          isVisible={!!toast}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
    </div>
  )
}
