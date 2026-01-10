/**
 * Document Utilities
 * 
 * Utilitários para validação e formatação de documentos brasileiros (CPF e CNPJ)
 */

/**
 * Remove caracteres não numéricos de uma string
 */
function cleanDocument(doc: string): string {
  return doc.replace(/\D/g, '')
}

/**
 * Valida um CPF
 * 
 * @param cpf - CPF com ou sem formatação
 * @returns true se o CPF for válido
 */
export function isValidCPF(cpf: string): boolean {
  const cleaned = cleanDocument(cpf)
  
  // Deve ter exatamente 11 dígitos
  if (cleaned.length !== 11) {
    return false
  }
  
  // Não pode ter todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cleaned)) {
    return false
  }
  
  // Validar primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cleaned.charAt(9))) {
    return false
  }
  
  // Validar segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cleaned.charAt(10))) {
    return false
  }
  
  return true
}

/**
 * Valida um CNPJ
 * 
 * @param cnpj - CNPJ com ou sem formatação
 * @returns true se o CNPJ for válido
 */
export function isValidCNPJ(cnpj: string): boolean {
  const cleaned = cleanDocument(cnpj)
  
  // Deve ter exatamente 14 dígitos
  if (cleaned.length !== 14) {
    return false
  }
  
  // Não pode ter todos os dígitos iguais
  if (/^(\d)\1{13}$/.test(cleaned)) {
    return false
  }
  
  // Validar primeiro dígito verificador
  let length = cleaned.length - 2
  let numbers = cleaned.substring(0, length)
  const digits = cleaned.substring(length)
  let sum = 0
  let pos = length - 7
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) {
    return false
  }
  
  // Validar segundo dígito verificador
  length = length + 1
  numbers = cleaned.substring(0, length)
  sum = 0
  pos = length - 7
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) {
    return false
  }
  
  return true
}

/**
 * Valida CPF ou CNPJ
 * 
 * @param doc - CPF ou CNPJ com ou sem formatação
 * @returns 'cpf' | 'cnpj' | null (null se inválido)
 */
export function validateDocument(doc: string): 'cpf' | 'cnpj' | null {
  if (!doc || !doc.trim()) {
    return null
  }
  
  const cleaned = cleanDocument(doc)
  
  if (cleaned.length === 11) {
    return isValidCPF(cleaned) ? 'cpf' : null
  }
  
  if (cleaned.length === 14) {
    return isValidCNPJ(cleaned) ? 'cnpj' : null
  }
  
  return null
}

/**
 * Formata CPF (000.000.000-00)
 * 
 * @param cpf - CPF sem formatação
 * @returns CPF formatado
 */
export function formatCPF(cpf: string): string {
  const cleaned = cleanDocument(cpf)
  if (cleaned.length !== 11) return cpf
  
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Formata CNPJ (00.000.000/0000-00)
 * 
 * @param cnpj - CNPJ sem formatação
 * @returns CNPJ formatado
 */
export function formatCNPJ(cnpj: string): string {
  const cleaned = cleanDocument(cnpj)
  if (cleaned.length !== 14) return cnpj
  
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

/**
 * Formata CPF ou CNPJ automaticamente
 * 
 * @param doc - CPF ou CNPJ
 * @returns Documento formatado
 */
export function formatDocument(doc: string): string {
  if (!doc) return doc
  
  const cleaned = cleanDocument(doc)
  
  if (cleaned.length === 11) {
    return formatCPF(cleaned)
  }
  
  if (cleaned.length === 14) {
    return formatCNPJ(cleaned)
  }
  
  return doc
}

/**
 * Detecta o tipo de documento baseado no tamanho
 * 
 * @param doc - CPF ou CNPJ
 * @returns 'cpf' | 'cnpj' | null
 */
export function detectDocumentType(doc: string): 'cpf' | 'cnpj' | null {
  const cleaned = cleanDocument(doc)
  
  if (cleaned.length === 11) return 'cpf'
  if (cleaned.length === 14) return 'cnpj'
  return null
}
