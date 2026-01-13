import { cookies } from 'next/headers'
import { apiResponse } from '@/lib/api/response'

/**
 * API Route: POST /api/v1/admin/auth/logout
 * 
 * Logout do admin
 * - Remove cookie de sessão
 * - Retorna sucesso
 */

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')

    return apiResponse(
      {
        ok: true,
        message: 'Logout realizado com sucesso',
      },
      200
    )
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/admin/auth/logout] error', err)
    return apiResponse(
      {
        ok: true,
        message: 'Logout realizado',
      },
      200
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
