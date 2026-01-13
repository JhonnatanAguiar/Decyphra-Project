import { NextResponse } from 'next/server'

/**
 * API Response Helpers
 * 
 * Funções utilitárias para padronizar respostas da API
 */

/**
 * Cria uma resposta JSON padronizada com headers de API versionada
 */
export function apiResponse<T>(
  data: T,
  status: number = 200,
  options?: {
    version?: string
    headers?: Record<string, string>
  }
) {
  const { version = 'v1', headers = {} } = options || {}

  return NextResponse.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': version,
      ...headers,
    },
  })
}

/**
 * Cria uma resposta de erro padronizada
 */
export function apiError(
  message: string,
  status: number = 500,
  errors?: unknown,
  options?: {
    version?: string
  }
) {
  const { version = 'v1' } = options || {}

  const responseBody: {
    ok: boolean
    message: string
    errors?: unknown
  } = {
    ok: false,
    message,
  }

  if (errors) {
    responseBody.errors = errors
  }

  return NextResponse.json(responseBody, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': version,
    },
  })
}

