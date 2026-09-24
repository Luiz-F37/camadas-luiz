import { NewEmployee } from '../types'
import { InvalidInput } from '../errors'

export function employeeDTO(body: unknown): NewEmployee {
  const b = (body ?? {}) as Record<string, unknown>
  const invalid: string[] = []

  if (typeof b.name !== 'string' || b.name.length < 3) invalid.push('name')
  if (typeof b.email !== 'string' || !b.email.includes('@')) invalid.push('email')
  if (!Number.isFinite(Number(b.salary))) invalid.push('salary')
  if (!Number.isInteger(Number(b.companyId))) invalid.push('companyId')

  if (invalid.length > 0) throw new InvalidInput(invalid)

  return {
    name: b.name as string,
    email: b.email as string,
    salary: Number(b.salary),
    companyId: Number(b.companyId),
  }
}