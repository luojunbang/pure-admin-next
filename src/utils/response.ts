import { NextResponse } from 'next/server'
export const defaultErrorMsg = '500 Internal Error.'
export const defaultTokenFailMsg = 'TOKEN_FAIL'

export const rp = {
  common(code: string, data: any, message?: string, config?: any) {
    return NextResponse.json(
      {
        code,
        msg: message ?? '',
        data,
      },
      config
    )
  },
  ret200(data: any = {}) {
    return this.common('OK', data)
  },
  ret201(data: any, message: string) {
    return this.common('OPERATE_DONE', data, message)
  },
  ret500(e: unknown) {
    return this.common('OPERATE_FAIL', {}, handleNormalError(e))
  },
}

export const infoConfig = {}

export function handleNormalError(e:unknown){
  return e instanceof Error
    ? e.message
    : typeof e === 'string'
    ? e
    : defaultErrorMsg
}