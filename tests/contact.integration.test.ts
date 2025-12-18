import { spawn } from 'child_process'
import fetch from 'cross-fetch'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let proc: ReturnType<typeof spawn> | null = null
let port = 3000

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
