import type { CountryCode } from 'libphonenumber-js'

/**
 * Countries Constants
 * 
 * Lista de países com códigos DDI, bandeiras e informações para seleção
 */

export interface Country {
  code: CountryCode
  name: string
  dialCode: string
  flag: string
}

/**
 * Lista de países mais comuns (priorizando Brasil e países da América Latina)
 * 
 * Códigos de bandeira usando emoji Unicode
 */
export const COUNTRIES: Country[] = [
  // Brasil (prioridade)
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷' },
  
  // América Latina
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CO', name: 'Colômbia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
  { code: 'UY', name: 'Uruguai', dialCode: '+598', flag: '🇺🇾' },
  { code: 'PY', name: 'Paraguai', dialCode: '+595', flag: '🇵🇾' },
  { code: 'BO', name: 'Bolívia', dialCode: '+591', flag: '🇧🇴' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
  
  // América do Norte
  { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canadá', dialCode: '+1', flag: '🇨🇦' },
  
  // Europa
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'ES', name: 'Espanha', dialCode: '+34', flag: '🇪🇸' },
  { code: 'GB', name: 'Reino Unido', dialCode: '+44', flag: '🇬🇧' },
  { code: 'FR', name: 'França', dialCode: '+33', flag: '🇫🇷' },
  { code: 'DE', name: 'Alemanha', dialCode: '+49', flag: '🇩🇪' },
  { code: 'IT', name: 'Itália', dialCode: '+39', flag: '🇮🇹' },
  
  // Outros
  { code: 'JP', name: 'Japão', dialCode: '+81', flag: '🇯🇵' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'IN', name: 'Índia', dialCode: '+91', flag: '🇮🇳' },
  { code: 'AU', name: 'Austrália', dialCode: '+61', flag: '🇦🇺' },
]

/**
 * País padrão (Brasil)
 */
export const DEFAULT_COUNTRY: CountryCode = 'BR'

/**
 * Busca um país pelo código
 * 
 * @param code - Código do país
 * @returns País encontrado ou undefined
 */
export function getCountryByCode(code: CountryCode): Country | undefined {
  return COUNTRIES.find((country) => country.code === code)
}

/**
 * Busca países que correspondem a uma query de busca
 * 
 * @param query - Texto de busca
 * @returns Lista de países filtrados
 */
export function searchCountries(query: string): Country[] {
  const lowerQuery = query.toLowerCase().trim()
  
  if (!lowerQuery) {
    return COUNTRIES
  }
  
  return COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(lowerQuery) ||
      country.dialCode.includes(lowerQuery) ||
      country.code.toLowerCase().includes(lowerQuery)
  )
}
