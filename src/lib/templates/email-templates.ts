/**
 * Templates de E-mail
 * 
 * Templates HTML com identidade visual da Decyphra
 * Usado para e-mails transacionais enviados via Resend
 */

/**
 * Template base com identidade visual da Decyphra
 */
function getBaseEmailTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Decyphra</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #01080E; color: #E6F0F3;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #01080E; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #000000; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 255, 136, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00FF88 0%, #00CC6A 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #000000; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                Decyphra
              </h1>
              <p style="margin: 8px 0 0; color: #000000; font-size: 14px; font-weight: 500; opacity: 0.8;">
                Agência de Marketing Digital e Desenvolvimento Web
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px; background-color: #000000;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #01080E; padding: 30px 40px; text-align: center; border-top: 1px solid rgba(0, 255, 136, 0.2);">
              <p style="margin: 0 0 12px; color: #E6F0F3; font-size: 14px; line-height: 1.6;">
                <strong style="color: #00FF88; font-weight: 600;">Decyphra</strong><br>
                <span style="color: #CCCCCC;">Agência de Marketing Digital e Desenvolvimento Web</span>
              </p>
              <p style="margin: 0 0 12px; color: #999999; font-size: 12px;">
                <a href="https://decyphra.com.br" style="color: #00FF88; text-decoration: none; font-weight: 500;">decyphra.com.br</a>
              </p>
              <p style="margin: 0; color: #AAAAAA; font-size: 11px; line-height: 1.5;">
                Este é um e-mail automático. Por favor, não responda diretamente a esta mensagem.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Template de confirmação para o cliente
 * Enviado quando o formulário de contato é enviado com sucesso
 */
export function getConfirmationEmailTemplate(name: string): string {
  const content = `
    <p style="margin: 0 0 24px; color: #E6F0F3; font-size: 16px; line-height: 1.6;">
      Olá <strong style="color: #00FF88;">${escapeHtml(name)}</strong>!
    </p>
    
    <p style="margin: 0 0 24px; color: #E6F0F3; font-size: 16px; line-height: 1.6;">
      Recebemos sua mensagem através do formulário de contato em nosso site. 
      Agradecemos muito pelo seu interesse em nossos serviços!
    </p>
    
    <p style="margin: 0 0 24px; color: #E6F0F3; font-size: 16px; line-height: 1.6;">
      Nossa equipe entrará em contato o mais breve possível para conversarmos sobre 
      sua necessidade e como podemos ajudar a transformar sua presença digital.
    </p>
    
    <div style="margin: 32px 0; padding: 24px; background-color: rgba(0, 255, 136, 0.1); border-left: 3px solid #00FF88; border-radius: 4px;">
      <p style="margin: 0; color: #00FF88; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
        O que esperar:
      </p>
      <ul style="margin: 0; padding-left: 20px; color: #E6F0F3; font-size: 14px; line-height: 1.8;">
        <li style="color: #E6F0F3; margin-bottom: 6px;">Resposta em até 24 horas úteis</li>
        <li style="color: #E6F0F3; margin-bottom: 6px;">Análise personalizada do seu projeto</li>
        <li style="color: #E6F0F3; margin-bottom: 6px;">Proposta sob medida para sua necessidade</li>
      </ul>
    </div>
    
    <p style="margin: 32px 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
      Enquanto isso, que tal conhecer mais sobre nosso trabalho?<br>
      <a href="https://decyphra.com.br/portfolio" style="color: #00FF88; text-decoration: none; font-weight: 500;">Veja nosso portfólio →</a>
    </p>
  `
  
  return getBaseEmailTemplate(content)
}

/**
 * Template de notificação interna para a equipe
 * Enviado para contato@decyphra.com.br quando um formulário é preenchido
 */
export function getInternalNotificationTemplate(data: {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  message: string
}): string {
  const content = `
    <h2 style="margin: 0 0 24px; color: #00FF88; font-size: 24px; font-weight: 600;">
      Novo Contato Recebido
    </h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">
          <strong style="color: #00FF88; font-size: 14px; display: inline-block; width: 120px; vertical-align: top;">Nome:</strong>
          <span style="color: #E6F0F3; font-size: 14px; font-weight: 500;">${escapeHtml(data.name)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">
          <strong style="color: #00FF88; font-size: 14px; display: inline-block; width: 120px; vertical-align: top;">E-mail:</strong>
          <a href="mailto:${escapeHtml(data.email)}" style="color: #00FF88; font-size: 14px; text-decoration: none; font-weight: 500;">${escapeHtml(data.email)}</a>
        </td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">
          <strong style="color: #00FF88; font-size: 14px; display: inline-block; width: 120px; vertical-align: top;">Telefone:</strong>
          <a href="tel:${escapeHtml(data.phone)}" style="color: #E6F0F3; font-size: 14px; text-decoration: none; font-weight: 500;">${escapeHtml(data.phone)}</a>
        </td>
      </tr>
      ` : ''}
      ${data.company ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">
          <strong style="color: #00FF88; font-size: 14px; display: inline-block; width: 120px; vertical-align: top;">Empresa:</strong>
          <span style="color: #E6F0F3; font-size: 14px; font-weight: 500;">${escapeHtml(data.company)}</span>
        </td>
      </tr>
      ` : ''}
      ${data.service ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">
          <strong style="color: #00FF88; font-size: 14px; display: inline-block; width: 120px; vertical-align: top;">Serviço:</strong>
          <span style="color: #E6F0F3; font-size: 14px; font-weight: 500;">${escapeHtml(data.service)}</span>
        </td>
      </tr>
      ` : ''}
    </table>
    
    <div style="margin: 32px 0; padding: 24px; background-color: rgba(0, 255, 136, 0.1); border-left: 3px solid #00FF88; border-radius: 4px;">
      <p style="margin: 0 0 16px; color: #00FF88; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
        Mensagem:
      </p>
      <p style="margin: 0; color: #E6F0F3; font-size: 14px; line-height: 1.8; white-space: pre-wrap; font-weight: 400;">
${escapeHtml(data.message)}
      </p>
    </div>
    
    <p style="margin: 32px 0 0; padding-top: 24px; border-top: 1px solid rgba(0, 255, 136, 0.1);">
      <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; padding: 12px 24px; background-color: #00FF88; color: #000000; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 14px;">
        Responder Cliente
      </a>
    </p>
  `
  
  return getBaseEmailTemplate(content)
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
