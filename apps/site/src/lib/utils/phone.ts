import { parsePhoneNumber, isValidPhoneNumber, type CountryCode } from 'libphonenumber-js'

/**
 * Phone Number Utilities
 * 
 * Utilitários para validação e formatação de números de telefone internacionais
 */

export interface PhoneValidationResult {
  isValid: boolean
  formatted?: string
  internationalFormat?: string
  error?: string
}

/**
 * Valida e formata um número de telefone baseado no código do país
 * 
 * @param phoneNumber - Número de telefone a ser validado
 * @param countryCode - Código do país (ex: 'BR', 'US', 'PT')
 * @returns Resultado da validação com número formatado se válido
 */
export function validateAndFormatPhone(
  phoneNumber: string,
  countryCode: CountryCode
): PhoneValidationResult {
  try {
    // Remove todos os caracteres não numéricos exceto o +
    const cleaned = phoneNumber.trim()
    
    if (!cleaned) {
      return {
        isValid: false,
        error: 'Número de telefone é obrigatório',
      }
    }

    // Tenta parsear o número com o código do país
    const phoneNumberObj = parsePhoneNumber(cleaned, countryCode)
    
    if (!phoneNumberObj) {
      return {
        isValid: false,
        error: 'Número de telefone inválido',
      }
    }

    // Valida o número
    if (!phoneNumberObj.isValid()) {
      return {
        isValid: false,
        error: `Número de telefone inválido para ${countryCode}`,
      }
    }

    return {
      isValid: true,
      formatted: phoneNumberObj.formatNational(), // Formato nacional (ex: (11) 99999-9999)
      internationalFormat: phoneNumberObj.formatInternational(), // Formato internacional (ex: +55 11 99999-9999)
    }
  } catch (error) {
    return {
      isValid: false,
      error: 'Número de telefone inválido',
    }
  }
}

/**
 * Valida um número de telefone sem formatação
 * 
 * @param phoneNumber - Número de telefone a ser validado
 * @param countryCode - Código do país
 * @returns true se válido, false caso contrário
 */
export function isValidPhone(phoneNumber: string, countryCode: CountryCode): boolean {
  try {
    return isValidPhoneNumber(phoneNumber, countryCode)
  } catch {
    return false
  }
}

/**
 * Formata um número de telefone enquanto o usuário digita
 * 
 * @param value - Valor atual do input
 * @param countryCode - Código do país
 * @returns Valor formatado para exibição
 */
export function formatPhoneAsYouType(value: string, countryCode: CountryCode): string {
  try {
    // Importação dinâmica para reduzir bundle size
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { AsYouType } = require('libphonenumber-js')
    const formatter = new AsYouType(countryCode)
    return formatter.input(value)
  } catch {
    // Em caso de erro, retorna o valor original
    return value
  }
}

/**
 * Remove formatação de um número de telefone, deixando apenas dígitos e +
 * 
 * @param phoneNumber - Número formatado
 * @returns Número apenas com dígitos e +
 */
export function unformatPhone(phoneNumber: string): string {
  // Remove tudo exceto dígitos e +
  return phoneNumber.replace(/[^\d+]/g, '')
}

/**
 * Obtém o formato de exemplo para um país
 * 
 * @param countryCode - Código do país
 * @returns String com formato de exemplo
 */
export function getPhoneExample(countryCode: CountryCode): string {
  try {
    // Exemplos comuns por país
    const examples: Record<string, string> = {
      BR: '(11) 99999-9999',
      US: '(555) 123-4567',
      PT: '912 345 678',
      ES: '612 34 56 78',
      AR: '11 1234-5678',
      MX: '55 1234 5678',
      CO: '300 123 4567',
      CL: '9 1234 5678',
    }
    
    return examples[countryCode] || '1234567890'
  } catch {
    return '1234567890'
  }
}
