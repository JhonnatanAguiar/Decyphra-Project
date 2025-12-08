/**
 * Mapeamento de Ícones Lucide React
 * 
 * Centraliza todos os ícones usados no site para facilitar manutenção
 */

import {
  Globe,
  Search,
  Megaphone,
  PenTool,
  Bot,
  ShoppingCart,
  Lightbulb,
  Code,
  Settings,
  Key,
  Link2,
  BarChart,
  Monitor,
  ShoppingBag,
  Repeat,
  FileText,
  Mail,
  Share2,
  Sparkles,
  Target,
  Check,
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

/**
 * Ícones principais dos serviços (Hero Section)
 */
export const SERVICE_HERO_ICONS: Record<string, LucideIcon> = {
  'desenvolvimento-web': Globe,
  'seo-otimizacao': Search,
  'google-ad': Megaphone,
  'marketing-de-conteudo': PenTool,
  'inteligencia-artificial': Bot,
  'ecommerce-completo': ShoppingCart,
  'consultoria-digital': Lightbulb,
}

/**
 * Ícones de features dos serviços (Sidebar)
 */
export const SERVICE_FEATURE_ICONS: Record<string, LucideIcon> = {
  // Desenvolvimento Web
  'WordPress': Code,
  'Shopify': ShoppingCart,
  'Site Personalizado': Settings,
  'E-commerce': ShoppingCart,
  
  // SEO & Otimização
  'SEO Técnico': Settings,
  'Palavra-chave': Key,
  'Link Building': Link2,
  'Analytics': BarChart,
  
  // Google Ad
  'Campanhas de Pesquisa': Search,
  'Rede de Display': Monitor,
  'Google Shopping': ShoppingBag,
  'Remarketing': Repeat,
  
  // Marketing de Conteúdo
  'Blog Post': FileText,
  'Social Media': Share2,
  'E-mail Marketing': Mail,
  'Copywriting': PenTool,
  
  // Inteligência Artificial
  'Chatbot': Bot,
  'Automação': Settings,
  'Análise Preditiva': BarChart,
  'Personalização': Sparkles,
  
  // E-commerce Completo
  'WooCommerce': ShoppingCart,
  'Pagamentos & Frete': ShoppingBag,
  'SEO para E-commerce': Search,
  
  // Consultoria Digital
  'Diagnóstico Digital': Search,
  'Plano de Ação': FileText,
  'Validação de Projeto': Target,
  'Apoio Técnico': Settings,
}

/**
 * Ícones para cards de serviços (Home Page e Página de Serviços)
 */
export const SERVICE_CARD_ICONS: Record<string, LucideIcon> = {
  'desenvolvimento-web': Globe,
  'seo-otimizacao': Search,
  'google-ad': Megaphone,
  'marketing-de-conteudo': PenTool,
  'inteligencia-artificial': Bot,
  'ecommerce-completo': ShoppingCart,
  'consultoria-digital': Lightbulb,
}

/**
 * Helper para obter ícone de serviço
 */
export function getServiceIcon(slug: string): LucideIcon {
  return SERVICE_CARD_ICONS[slug] || Globe
}

/**
 * Helper para obter ícone de feature
 */
export function getFeatureIcon(featureName: string): LucideIcon {
  return SERVICE_FEATURE_ICONS[featureName] || Check
}
