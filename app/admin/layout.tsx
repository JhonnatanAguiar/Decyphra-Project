'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Mail, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

/**
 * Layout do Painel Admin
 * 
 * Layout específico para área administrativa
 * Inclui sidebar de navegação e header
 */

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/projetos', label: 'Projetos', icon: Briefcase },
  { href: '/admin/depoimentos', label: 'Depoimentos', icon: MessageSquare },
  { href: '/admin/servicos', label: 'Serviços', icon: FileText },
  { href: '/admin/contatos', label: 'Contatos', icon: Mail },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/v1/admin/auth/check')
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // Redirecionar para login se não estiver autenticado
          if (pathname !== '/admin/login') {
            router.push('/admin/login')
          }
        }
      } catch {
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    // Só verificar se não estiver na página de login
    if (pathname !== '/admin/login') {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [pathname, router])

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch {
      router.push('/admin/login')
    }
  }

  // Se estiver na página de login, não mostrar layout admin
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-light-50">Carregando...</div>
      </div>
    )
  }

  // Se não estiver autenticado, não renderizar nada (redirect em andamento)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-dark-700 transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header da Sidebar */}
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <Link href="/admin" className="text-xl font-bold text-primary-500">
              Decyphra Admin
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-light-300 hover:text-light-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname?.startsWith(item.href))

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary-500/10 text-primary-500 border-l-2 border-primary-500'
                          : 'text-light-300 hover:bg-dark-800 hover:text-light-50'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer da Sidebar */}
          <div className="p-4 border-t border-dark-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-light-300 hover:bg-dark-800 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-dark-900 border-b border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-light-300 hover:text-light-50"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1" />
            <div className="text-sm text-light-300">
              Painel Administrativo
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
