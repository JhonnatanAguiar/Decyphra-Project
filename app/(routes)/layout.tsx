import { Header } from '@/views/components/layout/Header'
import { Footer } from '@/views/components/layout/Footer'

/**
 * Layout para rotas públicas
 * 
 * Inclui Header e Footer em todas as páginas públicas
 */

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="default" sticky={true} />
      <main>{children}</main>
      <Footer variant="default" />
    </>
  )
}
