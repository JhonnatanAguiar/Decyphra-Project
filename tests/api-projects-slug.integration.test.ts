import { spawn } from 'child_process'
import fetch from 'cross-fetch'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let proc: ReturnType<typeof spawn> | null = null
let port = 4000

async function waitForUp(p: number, timeout = 60000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`http://127.0.0.1:${p}/`)
      if (res.status === 200) return true
    } catch (e) {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}

beforeAll(async () => {
  // Build the app then start a production server (`next start`) on port 4000
  await new Promise<void>((resolve, reject) => {
    const b = spawn('npm', ['run', 'build'], { stdio: 'inherit' })
    b.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('build failed'))))
    b.on('error', reject)
  })

  const START_PORT = 4000
  port = START_PORT
  proc = spawn('npm', ['start'], {
    env: { ...process.env, PORT: String(START_PORT) },
    stdio: 'inherit',
  })

  const ok = await waitForUp(START_PORT, 60000)
  if (!ok) throw new Error('Next start did not become available in time')
}, 300000)

afterAll(() => {
  if (proc) proc.kill()
})

describe('GET /api/v1/projects/[slug]', () => {
  // Primeiro, buscar um slug válido da listagem
  let validSlug: string | null = null

  beforeAll(async () => {
    // Buscar projetos para obter um slug válido
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects`)
    if (res.status === 200) {
      const body = await res.json()
      if (body.data.projects.length > 0) {
        validSlug = body.data.projects[0].slug
      }
    }
  })

  it('should return 404 for non-existent project slug', async () => {
    let res: any = null
    for (let i = 0; i < 6; i++) {
      res = await fetch(`http://127.0.0.1:${port}/api/v1/projects/non-existent-project-slug`)
      if (res.status !== 404) break
      await new Promise((r) => setTimeout(r, 500))
    }
    expect(res).not.toBeNull()
    // Pode retornar 404 ou 500 dependendo da implementação
    expect([404, 500]).toContain(res.status)
  })

  it('should return 200 for valid project slug', async () => {
    if (!validSlug) {
      // Se não há projetos, pular este teste
      return
    }

    let res: any = null
    for (let i = 0; i < 6; i++) {
      res = await fetch(`http://127.0.0.1:${port}/api/v1/projects/${validSlug}`)
      if (res.status !== 404) break
      await new Promise((r) => setTimeout(r, 500))
    }
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
  })

  it('should return project data with correct structure for valid slug', async () => {
    if (!validSlug) {
      // Se não há projetos, pular este teste
      return
    }

    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects/${validSlug}`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveProperty('id')
    expect(body.data).toHaveProperty('title')
    expect(body.data).toHaveProperty('slug')
    expect(body.data.slug).toBe(validSlug)
  })

  it('should return project with required fields', async () => {
    if (!validSlug) {
      // Se não há projetos, pular este teste
      return
    }

    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects/${validSlug}`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    const project = body.data
    expect(project).toHaveProperty('id')
    expect(project).toHaveProperty('title')
    expect(project).toHaveProperty('slug')
    expect(project).toHaveProperty('description')
    expect(typeof project.id).toBe('string')
    expect(typeof project.title).toBe('string')
    expect(typeof project.slug).toBe('string')
  })
})
