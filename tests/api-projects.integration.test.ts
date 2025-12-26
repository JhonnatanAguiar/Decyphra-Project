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

describe('GET /api/v1/projects', () => {
  it('should return 200 status code', async () => {
    let res: any = null
    for (let i = 0; i < 6; i++) {
      res = await fetch(`http://127.0.0.1:${port}/api/v1/projects`)
      if (res.status !== 404) break
      await new Promise((r) => setTimeout(r, 500))
    }
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
  })

  it('should return projects data with correct structure', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveProperty('projects')
    expect(body.data).toHaveProperty('total')
    expect(body.data).toHaveProperty('page')
    expect(body.data).toHaveProperty('limit')
    expect(Array.isArray(body.data.projects)).toBe(true)
  })

  it('should return projects with required fields', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    if (body.data.projects.length > 0) {
      const project = body.data.projects[0]
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('slug')
      expect(project).toHaveProperty('description')
    }
  })

  it('should support pagination with page and limit query params', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects?page=1&limit=5`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body.data.page).toBe(1)
    expect(body.data.limit).toBe(5)
    expect(body.data.projects.length).toBeLessThanOrEqual(5)
  })

  it('should support search query param', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects?search=test`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body).toHaveProperty('data')
    expect(Array.isArray(body.data.projects)).toBe(true)
  })

  it('should have total count matching or greater than projects array length', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/projects`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body.data.total).toBeGreaterThanOrEqual(body.data.projects.length)
  })
})
