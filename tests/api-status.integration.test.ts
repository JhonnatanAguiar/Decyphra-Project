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

describe('GET /api/v1/status', () => {
  it('should return 200 status code', async () => {
    let res: any = null
    for (let i = 0; i < 6; i++) {
      res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
      if (res.status !== 404) break
      await new Promise((r) => setTimeout(r, 500))
    }
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
  })

  it('should return status data with correct structure', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveProperty('status')
    expect(body.data).toHaveProperty('api')
    expect(body.data).toHaveProperty('database')
    expect(body.data).toHaveProperty('server')
    expect(body.data).toHaveProperty('timestamp')
  })

  it('should have status values as operational, degraded, or down', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    const validStatuses = ['operational', 'degraded', 'down']
    expect(validStatuses).toContain(body.data.status)
    expect(validStatuses).toContain(body.data.api.status)
    expect(validStatuses).toContain(body.data.database.status)
    expect(validStatuses).toContain(body.data.server.status)
  })

  it('should have numeric response times', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(typeof body.data.api.responseTime).toBe('number')
    expect(typeof body.data.database.responseTime).toBe('number')
    expect(body.data.api.responseTime).toBeGreaterThanOrEqual(0)
    expect(body.data.database.responseTime).toBeGreaterThanOrEqual(0)
  })

  it('should have boolean connected status for database', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(typeof body.data.database.connected).toBe('boolean')
  })

  it('should return valid ISO timestamp', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(() => new Date(body.data.timestamp)).not.toThrow()
    expect(new Date(body.data.timestamp).toISOString()).toBe(body.data.timestamp)
  })
})
