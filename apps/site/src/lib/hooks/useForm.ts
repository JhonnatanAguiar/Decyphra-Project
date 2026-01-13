'use client'

import { useForm as useReactHookForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'

/**
 * useForm Hook
 * 
 * Hook customizado que integra react-hook-form com Zod.
 * Segue o design system da Decyphra.
 * 
 * Características:
 * - Integração automática com Zod
 * - Type-safe com TypeScript
 * - Validação automática
 * - Mensagens de erro configuráveis
 */

export interface UseFormOptions<T extends Record<string, any>> {
  schema: ZodSchema<T> // Schema Zod para validação
  defaultValues?: UseFormProps<T>['defaultValues']
  mode?: UseFormProps<T>['mode'] // 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all'
  reValidateMode?: UseFormProps<T>['reValidateMode'] // 'onBlur' | 'onChange' | 'onSubmit'
}

export const useForm = <T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const { schema, defaultValues, mode = 'onSubmit', reValidateMode = 'onChange' } = options

  return useReactHookForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
    reValidateMode,
  })
}
