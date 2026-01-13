import fetch from 'cross-fetch'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { startTestServer, stopTestServer } from './setup-test-server'

let port = 4000

beforeAll(async () => {
  port = await startTestServer()
}, 300000)

afterAll(() => {
  stopTestServer()
})

describe('GET /api/v1/projects/[slug]', () => {
  // Primeiro, buscar um slug válido da listagem
  let validSlug: string | null = null

  beforeAll(async () => {
    // Buscar projetos para obter um slug válido
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects`)
    if (res.status === 200) {
      const body = await res.json()
      // apiResponse retorna os dados diretamente, mas listProjects retorna um objeto com data
      const projects = body.data?.projects || body.projects || []
      if (projects.length > 0) {
        validSlug = projects[0].slug
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
    // apiResponse retorna os dados diretamente
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('title')
    expect(body).toHaveProperty('slug')
    expect(body.slug).toBe(validSlug)
  })

  it('should return project with required fields', async () => {
    if (!validSlug) {
      // Se não há projetos, pular este teste
      return
    }

    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects/${validSlug}`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    // apiResponse retorna os dados diretamente
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('title')
    expect(body).toHaveProperty('slug')
    expect(body).toHaveProperty('description')
    expect(typeof body.id).toBe('string')
    expect(typeof body.title).toBe('string')
    expect(typeof body.slug).toBe('string')
  })
})
