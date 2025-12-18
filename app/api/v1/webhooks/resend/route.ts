import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

export const runtime = 'nodejs'

function secureCompare(a: Buffer, b: Buffer) {
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function POST(req: Request) {
  try {
    const raw = await req.text()

    const secret = process.env.RESEND_WEBHOOK_SECRET
    const sigHeader = req.headers.get('resend-signature') || req.headers.get('x-resend-signature') || req.headers.get('signature')

    if (secret) {
      if (!sigHeader) {
        return NextResponse.json({ ok: false, error: 'missing signature' }, { status: 401 })
      }

      const expected = crypto.createHmac('sha256', secret).update(raw).digest('base64')
      let valid = false
      try {
        valid = secureCompare(Buffer.from(sigHeader, 'base64'), Buffer.from(expected, 'base64'))
      } catch (e) {
        valid = false
      }

      if (!valid) {
        return NextResponse.json({ ok: false, error: 'invalid signature' }, { status: 401 })
      }
    }

    const body = raw ? JSON.parse(raw) : {}

    // Resend webhook payloads vary; try to extract a message id and event type
    const messageId = body?.id || body?.data?.id || body?.message?.id || body?.messageId || null
    const eventType = body?.type || body?.event || body?.name || 'unknown'

    // Persist raw payload and minimal metadata
    const created = await prisma.emailEvent.create({
      data: {
        messageId: messageId ?? 'unknown',
        event: eventType,
        payload: body,
      },
    })

    // Try to associate with an existing ContactSubmission by matching metadata.id
    if (messageId) {
      try {
        const subs = await prisma.contactSubmission.findMany({ where: { metadata: { not: null } } })
        const match = subs.find((s) => {
          try {
            const m: any = s.metadata
            return m && (m.id === messageId || String(m) === String(messageId))
          } catch (e) {
            return false
          }
        })
        if (match) {
          await prisma.emailEvent.update({ where: { id: created.id }, data: { contactSubmissionId: match.id } })
        }
      } catch (e) {
        // ignore association errors, event is persisted
        // eslint-disable-next-line no-console
        console.error('[webhook/resend] association error', e)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[webhook/resend] error', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
