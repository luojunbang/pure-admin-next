import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ZodError } from 'zod'

export function handleZodError(e: ZodError) {
  const errorInfo = e.errors
    .map((i) => `${i.path.join('.')} ${i.message}`)
    .join('; ')
  return errorInfo
}

export function handlePrismaError(e: PrismaClientKnownRequestError) {
  let errorInfo = (e.meta?.cause as string) ?? 'unknown'
  if (e.code === 'P2002') errorInfo = 'username has been used. '
  return `${e.code}: ${errorInfo}`
}

export function handleError(e: unknown) {
  if (e instanceof PrismaClientKnownRequestError) {
    throw handlePrismaError(e)
  }
  if (e instanceof ZodError) {
    throw handleZodError(e)
  }
  throw e
}

// import { logFileStruct } from 'lo-utils'
// logFileStruct('./src/app', ['api'])
