import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ZodError } from 'zod'
import { defaultErrorMsg } from './response'

export function handleZodError(e: ZodError) {
  const errorInfo = e.errors
    .map(i => `${i.path.join('.')} ${i.message}`)
    .join('; ')
  return errorInfo
}

export function handlePrismaError(e: PrismaClientKnownRequestError) {
  let errorInfo = (e.meta?.cause as string) ?? 'unknown'
  if (e.code === 'P2002') errorInfo = 'username has been used. '
  return `${e.code}: ${errorInfo}`
}

export function handleError(e: unknown = defaultErrorMsg) {
  if (e instanceof PrismaClientKnownRequestError) {
    throw handlePrismaError(e)
  } else if (e instanceof ZodError) {
    throw handleZodError(e)
  }
  throw handleNormalError(e)
}

export function handleNormalError(e:unknown){
  return e instanceof Error
    ? e.message
    : typeof e === 'string'
    ? e
    : defaultErrorMsg
}
// import { logFileStruct } from 'lo-utils'
// logFileStruct('./src/app', ['api'])
