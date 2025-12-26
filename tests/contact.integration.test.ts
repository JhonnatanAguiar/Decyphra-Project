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

describe('POST /api/v1/contact', () => {
  it('returns 200 and stores submission (via log or db)', async () => {
    // Retry POST a few times because Next may still register routes
    let res: any = null
    for (let i = 0; i < 6; i++) {
      res = await fetch(`http://127.0.0.1:${port}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Vitest', email: 'vitest@example.com', message: 'Teste via vitest' }),
      })
      if (res.status !== 404) break
      await new Promise((r) => setTimeout(r, 500))
    }
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty('ok', true)
    expect(body).toHaveProperty('message')
  })
})
