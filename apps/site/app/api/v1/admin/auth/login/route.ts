import { cookies } from 'next/headers'
import { z } from 'zod'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: POST /api/v1/admin/auth/login
 * 
 * Autenticação do admin
 * - Valida credenciais
 * - Cria sessão (cookie)
 * - Retorna sucesso
 */

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = loginSchema.parse(body)

    // Credenciais padrão (substituir por variáveis de ambiente em produção)
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@decyphra.com.br'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

    // Normalizar e-mail para comparação (lowercase, trim)
    const normalizedEmail = data.email.toLowerCase().trim()
    const normalizedAdminEmail = ADMIN_EMAIL.toLowerCase().trim()

    if (normalizedEmail !== normalizedAdminEmail || data.password !== ADMIN_PASSWORD) {
      // eslint-disable-next-line no-console
      console.log('[api/admin/auth/login] Login falhou:', {
        providedEmail: normalizedEmail,
        expectedEmail: normalizedAdminEmail,
        emailMatch: normalizedEmail === normalizedAdminEmail,
        passwordMatch: data.password === ADMIN_PASSWORD,
      })
      return apiError('E-mail ou senha inválidos', 401)
    }

    // Criar sessão (cookie)
    const cookieStore = await cookies()
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    })

    return apiResponse(
      {
        ok: true,
        message: 'Login realizado com sucesso',
      },
      200
    )
  } catch (err) {
    if (err instanceof z.ZodError) {
      return apiError('Dados inválidos', 400, err.errors)
    }
    // eslint-disable-next-line no-console
    console.error('[api/admin/auth/login] error', err)
    return apiError('Erro interno', 500)
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
