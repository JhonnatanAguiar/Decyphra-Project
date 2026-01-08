/**
 * Templates de Mensagem WhatsApp
 * 
 * Templates de mensagem para envio via WhatsApp
 * Similar ao template de email automático mas formatado para WhatsApp
 */

/**
 * Template de mensagem de confirmação para o cliente via WhatsApp
 * Enviado quando o formulário de contato é enviado com sucesso
 */
export function getWhatsAppConfirmationTemplate(name: string): string {
  // Limpar nome para evitar caracteres problemáticos
  const cleanName = name.trim().replace(/[*_~`]/g, '')
  
  return `Olá ${cleanName}! 👋

Recebemos sua mensagem através do formulário de contato em nosso site. 

Agradecemos muito pelo seu interesse em nossos serviços!

Nossa equipe entrará em contato o mais breve possível para conversarmos sobre sua necessidade e como podemos ajudar a transformar sua presença digital.

📋 O que esperar:
• Resposta em até 24 horas úteis
• Análise personalizada do seu projeto
• Proposta sob medida para sua necessidade

Enquanto isso, que tal conhecer mais sobre nosso trabalho?
🌐 https://decyphra.com.br/portfolio

_Equipe Decyphra_`
}

/**
 * Template de mensagem interna para notificação via WhatsApp
 * Enviado para o número da Decyphra quando um formulário é preenchido
 */
export function getWhatsAppInternalNotificationTemplate(data: {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  message: string
}): string {
  // Função auxiliar para limpar texto mantendo formatação básica
  const cleanText = (text: string) => text.trim().replace(/\n{3,}/g, '\n\n')
  
  let template = `🆕 *NOVO CONTATO RECEBIDO*

━━━━━━━━━━━━━━━━━━━━
👤 *Nome:* ${cleanText(data.name)}
📧 *E-mail:* ${cleanText(data.email)}
`

  if (data.phone) {
    template += `📱 *Telefone:* ${cleanText(data.phone)}\n`
  }

  if (data.company) {
    template += `🏢 *Empresa:* ${cleanText(data.company)}\n`
  }

  if (data.service) {
    template += `🔧 *Serviço:* ${cleanText(data.service)}\n`
  }

  template += `━━━━━━━━━━━━━━━━━━━━

💬 *Mensagem:*
${cleanText(data.message)}

━━━━━━━━━━━━━━━━━━━━
📧 Responder: ${cleanText(data.email)}
📱 Telefone: ${data.phone ? cleanText(data.phone) : 'N/A'}
━━━━━━━━━━━━━━━━━━━━`

  return template
}
