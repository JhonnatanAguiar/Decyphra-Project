'use client'

import { useState } from 'react'
import { requestAccessSchema } from '@/lib/request-access-schema'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const inputBase =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-brand.light placeholder:text-brand.muted focus:outline-none focus:ring-2 focus:ring-brand.secondary/50 focus:border-white/25 transition-colors'

export function RequestAccessForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    const parsed = requestAccessSchema.safeParse({ name: name.trim(), email: email.trim() })
    if (!parsed.success) {
      const err = parsed.error.flatten().fieldErrors
      setMessage(err.name?.[0] ?? err.email?.[0] ?? 'Verifique os campos.')
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setMessage(data.error ?? 'Erro ao enviar. Tente novamente.')
        setStatus('error')
        return
      }

      setStatus('success')
      setMessage('Obrigado! Em breve entraremos em contato.')
      setName('')
      setEmail('')
    } catch {
      setMessage('Erro de conexão. Tente novamente.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-xl border border-white/15 bg-white/5 px-6 py-8 text-center',
          'text-brand.light'
        )}
      >
        <p className="text-lg font-medium text-brand.secondary">{message}</p>
        <button
          type="button"
          onClick={() => { setStatus('idle'); setMessage('') }}
          className="mt-4 text-sm text-brand.muted hover:text-brand.light underline underline-offset-2"
        >
          Enviar outra solicitação
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <label htmlFor="request-name" className="sr-only">
          Nome
        </label>
        <input
          id="request-name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className={inputBase}
          disabled={status === 'loading'}
          autoComplete="name"
        />
        <label htmlFor="request-email" className="sr-only">
          E-mail
        </label>
        <input
          id="request-email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className={inputBase}
          disabled={status === 'loading'}
          autoComplete="email"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={status === 'loading'}
        className="w-full sm:w-auto sm:self-stretch sm:shrink-0"
      >
        {status === 'loading' ? 'Enviando…' : 'Solicitar acesso'}
      </Button>
      {message && status === 'error' && (
        <p className="w-full basis-full text-sm text-red-400" role="alert">
          {message}
        </p>
      )}
    </form>
  )
}
