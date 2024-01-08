import { NextResponse } from 'next/server'
import { CODE } from './types'
export const defaultErrorMsg = '500 Internal Error.'
export const defaultTokenFailMsg = 'TOKEN_FAIL'

export const rp = {
  common(code: string, data: any, message?: string, config?: any) {
    const response = NextResponse.json(
      {
        code,
        msg: message ?? '',
        data,
      },
      {
        ...config,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
    return response
  },
  ret200(data: any = {}) {
    return this.common(CODE.OK, data)
  },
  ret201(data: any, message: string) {
    return this.common(CODE.DONE, data, message)
  },
  ret500(e: unknown) {
    return this.common(CODE.FAIL, {}, handleNormalError(e))
  },
  ret401() {
    return this.common(CODE.FAIL, {}, defaultTokenFailMsg, { status: 401 })
  },
}

export const infoConfig = {}

export function handleNormalError(e: unknown) {
  return e instanceof Error
    ? e.message
    : typeof e === 'string'
    ? e
    : defaultErrorMsg
}
