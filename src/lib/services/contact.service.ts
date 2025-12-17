export type ContactPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}

async function sendViaResend(payload: ContactPayload) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'noreply@decyphra.com.br'
  const to = process.env.EMAIL_TO || 'jhonnatanaguiar@decyphra.com.br'
  if (!key) throw new Error('RESEND_API_KEY not configured')

  const subject = `Novo contato: ${payload.name} — ${payload.service ?? 'Sem serviço'}`
  const bodyHtml = `
    <p><strong>Nome:</strong> ${payload.name}</p>
    <p><strong>E-mail:</strong> ${payload.email}</p>
    <p><strong>Telefone:</strong> ${payload.phone ?? '-'}</p>
    <p><strong>Empresa:</strong> ${payload.company ?? '-'}</p>
    <p><strong>Serviço:</strong> ${payload.service ?? '-'}</p>
    <hr/>
    <p>${payload.message}</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html: bodyHtml,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend error: ${res.status} ${text}`)
  }

  return true
}

export async function sendContactEmail(payload: ContactPayload) {
  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(payload)
      return { ok: true, provider: 'resend' }
    }

    // Fallback: apenas logar quando não há chave configurada
    // eslint-disable-next-line no-console
    console.info('[contact.service] fallback log:', payload)
    return { ok: true, provider: 'log' }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact.service] error', err)
    return { ok: false, error: String(err) }
  }
}
