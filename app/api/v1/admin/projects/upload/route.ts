import { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { apiResponse, apiError } from '@/lib/api/response'
import { cookies } from 'next/headers'

/**
 * API Route: POST /api/v1/admin/projects/upload
 * 
 * Endpoint para upload de imagens de projetos
 * - Requer autenticação admin
 * - Salva imagens em /public/uploads/projects/
 * - Retorna URL da imagem salva
 */

// Diretório de uploads (relativo à raiz do projeto)
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'projects')

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    if (!session || !session.value) {
      return apiError('Não autenticado', 401)
    }

    // Obter arquivo do form data
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return apiError('Arquivo não fornecido', 400)
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return apiError('Tipo de arquivo não permitido. Use: JPEG, PNG, WebP ou GIF', 400)
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return apiError('Arquivo muito grande. Tamanho máximo: 5MB', 400)
    }

    // Criar diretório se não existir
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true })
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${extension}`
    const filepath = join(UPLOAD_DIR, filename)

    // Converter File para Buffer e salvar
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // Retornar URL pública da imagem
    const imageUrl = `/uploads/projects/${filename}`

    return apiResponse(
      {
        url: imageUrl,
        filename,
        size: file.size,
        type: file.type,
      },
      201
    )
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/admin/projects/upload] error', err)
    if (err instanceof Error && err.message.includes('ENOENT')) {
      return apiError('Erro ao criar diretório de upload', 500)
    }
    return apiError('Erro ao fazer upload da imagem', 500)
  }
}

export const runtime = 'nodejs'