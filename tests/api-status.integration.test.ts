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
    // apiResponse retorna os dados diretamente, não em um wrapper 'data'
    expect(body).toHaveProperty('status')
    expect(body).toHaveProperty('api')
    expect(body).toHaveProperty('database')
    expect(body).toHaveProperty('server')
    expect(body).toHaveProperty('timestamp')
  })

  it('should have status values as operational, degraded, or down', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    const validStatuses = ['operational', 'degraded', 'down']
    expect(validStatuses).toContain(body.status)
    expect(validStatuses).toContain(body.api.status)
    expect(validStatuses).toContain(body.database.status)
    expect(validStatuses).toContain(body.server.status)
  })

  it('should have numeric response times', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(typeof body.api.responseTime).toBe('number')
    expect(typeof body.database.responseTime).toBe('number')
    expect(body.api.responseTime).toBeGreaterThanOrEqual(0)
    expect(body.database.responseTime).toBeGreaterThanOrEqual(0)
  })

  it('should have boolean connected status for database', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(typeof body.database.connected).toBe('boolean')
  })

  it('should return valid ISO timestamp', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/status`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(() => new Date(body.timestamp)).not.toThrow()
    expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp)
  })
})
