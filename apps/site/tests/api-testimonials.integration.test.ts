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

describe('GET /api/v1/testimonials', () => {
  it('should return 200 status code', async () => {
    let res: any = null
    for (let i = 0; i < 6; i++) {
      res = await fetch(`http://127.0.0.1:${port}/api/v1/testimonials`)
      if (res.status !== 404) break
      await new Promise((r) => setTimeout(r, 500))
    }
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
  })

  it('should return testimonials data with correct structure', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/testimonials`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body).toHaveProperty('testimonials')
    expect(body).toHaveProperty('total')
    expect(body).toHaveProperty('limit')
    expect(body).toHaveProperty('offset')
    expect(Array.isArray(body.testimonials)).toBe(true)
  })

  it('should return testimonials with required fields', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/testimonials`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    if (body.testimonials.length > 0) {
      const testimonial = body.testimonials[0]
      expect(testimonial).toHaveProperty('id')
      expect(testimonial).toHaveProperty('name')
      expect(testimonial).toHaveProperty('message')
    }
  })

  it('should support pagination with offset and limit query params', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/testimonials?offset=0&limit=5`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body.offset).toBe(0)
    expect(body.limit).toBe(5)
    expect(body.testimonials.length).toBeLessThanOrEqual(5)
  })

  it('should support featured filter', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/testimonials?featured=true`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(Array.isArray(body.testimonials)).toBe(true)
  })

  it('should have total count matching or greater than testimonials array length', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/testimonials`)
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body.total).toBeGreaterThanOrEqual(body.testimonials.length)
  })
})
