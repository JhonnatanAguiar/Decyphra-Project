import { spawn } from 'child_process'
import fetch from 'cross-fetch'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let proc: ReturnType<typeof spawn> | null = null
let port = 3000

async function waitForUp(p: number, timeout = 20000) {
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
  // Start dev server
  proc = spawn('npm', ['run', 'dev'], { stdio: 'inherit' })

  // wait for either 3000 or 3001
  const ok3000 = await waitForUp(3000, 15000)
  if (ok3000) {
    port = 3000
    return
  }
  const ok3001 = await waitForUp(3001, 15000)
  if (ok3001) {
    port = 3001
    return
  }
  throw new Error('Next dev server did not start in time')
}, 30000)

afterAll(() => {
  if (proc) proc.kill()
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
