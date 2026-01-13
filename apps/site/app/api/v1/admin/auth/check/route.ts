import { cookies } from 'next/headers'
import { apiResponse, apiError } from '@/lib/api/response'

/**
 * API Route: GET /api/v1/admin/auth/check
 * 
 * Verifica se o usuário está autenticado
 * - Verifica cookie de sessão
 * - Retorna status de autenticação
 */

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session || !session.value) {
      return apiError('Não autenticado', 401)
    }

    // TODO: Validar sessão no banco de dados se necessário
    // Por enquanto, apenas verifica se o cookie existe

    return apiResponse(
      {
        ok: true,
        authenticated: true,
      },
      200
    )
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/admin/auth/check] error', err)
    return apiError('Erro interno', 500)
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
