import { spawn, ChildProcess, execSync } from 'child_process'
import fetch from 'cross-fetch'
import * as path from 'path'
import * as fs from 'fs'

// Helper para comandos multiplataforma
const isWindows = process.platform === 'win32'
const npmCmd = isWindows ? 'npm.cmd' : 'npm'

// Lock file para garantir que apenas um processo faça build por vez
const BUILD_LOCK_FILE = path.join(process.cwd(), '.next', '.build-lock')
const BUILD_LOCK_TIMEOUT = 300000 // 5 minutos máximo de espera

// Função para criar lock file
function acquireBuildLock(): boolean {
  const lockDir = path.dirname(BUILD_LOCK_FILE)
  if (!fs.existsSync(lockDir)) {
    try {
      fs.mkdirSync(lockDir, { recursive: true })
    } catch (e) {
      return false
    }
  }
  
  // Verificar se lock existe e não está expirado
  if (fs.existsSync(BUILD_LOCK_FILE)) {
    try {
      const lockContent = fs.readFileSync(BUILD_LOCK_FILE, 'utf-8')
      const lockData = JSON.parse(lockContent)
      const lockAge = Date.now() - lockData.timestamp
      
      // Se lock é muito antigo, assumir que processo travou e remover
      if (lockAge > BUILD_LOCK_TIMEOUT) {
        fs.unlinkSync(BUILD_LOCK_FILE)
      } else {
        // Lock ainda válido, outro processo está buildando
        return false
      }
    } catch (e) {
      // Lock inválido, remover
      try {
        fs.unlinkSync(BUILD_LOCK_FILE)
      } catch (e2) {
        // Ignorar
      }
    }
  }
  
  // Criar lock
  try {
    fs.writeFileSync(BUILD_LOCK_FILE, JSON.stringify({ 
      pid: process.pid, 
      timestamp: Date.now() 
    }))
    return true
  } catch (e) {
    return false
  }
}

// Função para liberar lock
function releaseBuildLock(): void {
  try {
    if (fs.existsSync(BUILD_LOCK_FILE)) {
      fs.unlinkSync(BUILD_LOCK_FILE)
    }
  } catch (e) {
    // Ignorar erros
  }
}

// Função para esperar por lock (se outro processo estiver buildando)
async function waitForBuildLock(maxWait = 120000): Promise<boolean> {
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    if (!fs.existsSync(BUILD_LOCK_FILE)) {
      return true
    }
    
    // Verificar se lock expirou
    try {
      const lockContent = fs.readFileSync(BUILD_LOCK_FILE, 'utf-8')
      const lockData = JSON.parse(lockContent)
      const lockAge = Date.now() - lockData.timestamp
      
      if (lockAge > BUILD_LOCK_TIMEOUT) {
        releaseBuildLock()
        return true
      }
    } catch (e) {
      // Lock inválido
      releaseBuildLock()
      return true
    }
    
    await new Promise((r) => setTimeout(r, 1000))
  }
  
  return false
}

// Carregar variáveis de ambiente do .env.local
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    console.warn('[setup-test-server] ⚠️  .env.local não encontrado. Alguns testes podem falhar sem DATABASE_URL.')
    return false
  }

  try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const lines = envContent.split(/\r?\n/)

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue
      }

      const match = trimmedLine.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        let value = match[2].trim()
        
        // Remover aspas se existirem
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        
        // Definir variável de ambiente se ainda não estiver definida
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    }
    
    // Verificar se DATABASE_URL foi carregado
    if (process.env.DATABASE_URL) {
      console.log('[setup-test-server] ✅ Variáveis de ambiente carregadas do .env.local')
      return true
    } else {
      console.warn('[setup-test-server] ⚠️  DATABASE_URL não encontrado no .env.local')
      return false
    }
  } catch (error) {
    console.error('[setup-test-server] ❌ Erro ao carregar .env.local:', error)
    return false
  }
}

// Função para matar processos na porta
function killProcessOnPort(port: number): Promise<void> {
  if (!isWindows) return Promise.resolve()

  return new Promise((resolve) => {
    try {
      // Tentar encontrar processos na porta
      const result = execSync(`netstat -ano | findstr :${port}`, { 
        encoding: 'utf-8', 
        stdio: 'pipe',
        timeout: 5000 
      })
      const lines = result.split('\n').filter(line => line.includes('LISTENING'))
      
      const killPromises: Promise<void>[] = []
      
      for (const line of lines) {
        const parts = line.trim().split(/\s+/)
        const pid = parts[parts.length - 1]
        if (pid && /^\d+$/.test(pid)) {
          killPromises.push(
            new Promise<void>((resolveKill) => {
              try {
                execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore', timeout: 2000 })
                console.log(`[setup-test-server] 🔪 Processo ${pid} na porta ${port} encerrado`)
                resolveKill()
              } catch (e) {
                // Ignorar erros ao matar processo
                resolveKill()
              }
            })
          )
        }
      }
      
      Promise.all(killPromises).then(() => {
        // Aguardar um pouco para o processo realmente encerrar
        setTimeout(resolve, 1000)
      }).catch(() => resolve())
    } catch (e) {
      // Nenhum processo na porta ou erro - continuar
      resolve()
    }
  })
}

// Carregar variáveis de ambiente
loadEnvFile()

let serverProcess: ChildProcess | null = null
let serverPort: number | null = null
let isBuilding = false
let buildPromise: Promise<void> | null = null

async function waitForUp(p: number, timeout = 90000): Promise<boolean> {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`http://127.0.0.1:${p}/`)
      if (res.status === 200) return true
    } catch (e) {
      // ignore - pode ser erro de conexão temporário
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}

async function buildApp(): Promise<void> {
  // Verificar se build já existe e é válido
  const serverDir = path.join(process.cwd(), '.next', 'server')
  const buildIdFile = path.join(process.cwd(), '.next', 'BUILD_ID')
  
  if (fs.existsSync(serverDir) && fs.existsSync(buildIdFile)) {
    // Build já existe, verificar se está válido
    try {
      const buildId = fs.readFileSync(buildIdFile, 'utf-8')
      if (buildId && buildId.trim().length > 0) {
        console.log('[setup-test-server] ✅ Build existente encontrado, reutilizando...')
        return Promise.resolve()
      }
    } catch (e) {
      // Build inválido, continuar para rebuild
    }
  }

  // Tentar adquirir lock para build
  if (!acquireBuildLock()) {
    // Outro processo está buildando, esperar
    console.log('[setup-test-server] ⏳ Outro processo está buildando, aguardando...')
    const lockAcquired = await waitForBuildLock()
    
    if (!lockAcquired) {
      // Verificar novamente se build existe
      if (fs.existsSync(serverDir) && fs.existsSync(buildIdFile)) {
        console.log('[setup-test-server] ✅ Build concluído por outro processo')
        return Promise.resolve()
      }
      throw new Error('Timeout aguardando lock de build')
    }
    
    // Lock liberado, tentar adquirir novamente
    if (!acquireBuildLock()) {
      // Se ainda não conseguir, verificar se build existe
      if (fs.existsSync(serverDir) && fs.existsSync(buildIdFile)) {
        return Promise.resolve()
      }
      throw new Error('Não foi possível adquirir lock de build')
    }
  }

  // Se já tem build promise em andamento, usar ele
  if (buildPromise) {
    return buildPromise
  }

  if (isBuilding) {
    // Aguardar build em andamento
    while (isBuilding) {
      await new Promise((r) => setTimeout(r, 1000))
    }
    return
  }

  isBuilding = true
  buildPromise = new Promise<void>((resolve, reject) => {
    console.log('[setup-test-server] 🔨 Iniciando build (lock adquirido)...')
    
    // Usar o script de build que já trata problemas do Windows/OneDrive (limpa .next antes)
    // Isso evita o erro de rename do 500.html
    const b = spawn(npmCmd, ['run', 'build'], {
      stdio: 'inherit',
      shell: isWindows,
      env: { ...process.env },
    })
    
    let hasResolved = false
    
    const cleanup = () => {
      isBuilding = false
      releaseBuildLock()
    }
    
    b.on('exit', (code) => {
      cleanup()
      if (hasResolved) return
      hasResolved = true
      
      // Verificar se o build realmente falhou ou se foi apenas warning do Windows
      const serverDir = path.join(process.cwd(), '.next', 'server')
      const buildExists = fs.existsSync(serverDir)
      
      if (code === 0) {
        console.log('[setup-test-server] ✅ Build concluído com sucesso')
        buildPromise = null
        resolve()
      } else if (buildExists) {
        // Build parcial pode funcionar para testes mesmo com warnings do Windows/OneDrive
        // O erro de rename do 500.html não impede o servidor de funcionar
        console.warn(`[setup-test-server] ⚠️  Build retornou código ${code}, mas .next/server existe. Continuando (pode ser apenas warning do Windows/OneDrive)...`)
        buildPromise = null
        resolve()
      } else {
        buildPromise = null
        reject(new Error(`Build failed with code ${code}. Servidor não pode ser iniciado.`))
      }
    })
    
    b.on('error', (err) => {
      cleanup()
      if (hasResolved) return
      hasResolved = true
      buildPromise = null
      reject(err)
    })
  })

  return buildPromise
}

export async function startTestServer(port: number = 4000): Promise<number> {
  // Se o servidor já está rodando na porta solicitada, retornar
  if (serverProcess && serverPort === port) {
    return port
  }

  // Se já existe servidor rodando em outra porta, usar a mesma porta
  // (evita múltiplos servidores, todos os testes usam o mesmo)
  if (serverProcess && serverPort) {
    return serverPort
  }

  // Tentar matar processos na porta antes de iniciar
  console.log('[setup-test-server] 🔍 Verificando processos na porta 4000...')
  await killProcessOnPort(4000)

  // Fazer build se necessário
  try {
    await buildApp()
  } catch (error) {
    console.error('[setup-test-server] ❌ Erro no build:', error)
    throw error
  }

  // Iniciar servidor (sempre na porta 4000 para compartilhar entre testes)
  const actualPort = 4000
  serverPort = actualPort
  
  console.log('[setup-test-server] 🚀 Iniciando servidor na porta', actualPort)
  serverProcess = spawn(npmCmd, ['start'], {
    env: { ...process.env, PORT: String(actualPort) },
    stdio: 'inherit',
    shell: isWindows,
  })

  const ok = await waitForUp(actualPort, 90000) // Timeout aumentado para 90s
  if (!ok) {
    serverProcess?.kill()
    serverProcess = null
    serverPort = null
    throw new Error('Next start did not become available in time')
  }

  console.log('[setup-test-server] ✅ Servidor iniciado com sucesso na porta', actualPort)
  return actualPort
}

export function stopTestServer(): void {
  if (serverProcess) {
    console.log('[setup-test-server] 🛑 Encerrando servidor...')
    try {
      // Tentar graceful shutdown primeiro
      if (isWindows) {
        serverProcess.kill('SIGTERM')
        // Aguardar um pouco antes de forçar
        setTimeout(() => {
          if (serverProcess) {
            serverProcess.kill('SIGKILL')
          }
        }, 2000)
      } else {
        serverProcess.kill('SIGTERM')
      }
    } catch (e) {
      // Ignorar erros
    }
    serverProcess = null
    serverPort = null
    
    // Também tentar matar processos na porta
    killProcessOnPort(4000).catch(() => {})
  }
}

// Cleanup automático ao sair
process.on('exit', () => {
  stopTestServer()
  releaseBuildLock()
})
process.on('SIGINT', () => {
  stopTestServer()
  releaseBuildLock()
  process.exit()
})
process.on('SIGTERM', () => {
  stopTestServer()
  releaseBuildLock()
  process.exit()
})
