import { NewCompany } from '../types'
import { InvalidInput } from '../errors'

export function companyDTO(body: unknown): NewCompany {
  const b = (body ?? {}) as Record<string, unknown>
  const invalid: string[] = []

  if (typeof b.name !== 'string' || b.name.length < 3) invalid.push('name')
  if (typeof b.cnpj !== 'string' || !/^\d{14}$/.test(b.cnpj)) invalid.push('cnpj')
  if (typeof b.state !== 'string' || !/^[A-Za-z]{2}$/.test(b.state)) invalid.push('state')

  if (invalid.length > 0) throw new InvalidInput(invalid)

  return {
    name: b.name as string,
    cnpj: b.cnpj as string,
    state: b.state as string,
  }
}