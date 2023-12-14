import { NextResponse } from 'next/server'
export const defaultErrorMsg = '500 Internal Error.'

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
  ret200(data: any) {
    return this.common('OK', data)
  },
  ret201(data: any, message: string) {
    return this.common('OPERATE_DONE', data, message)
  },
  ret500(message: any = defaultErrorMsg) {
    return this.common('OPERATE_FAIL', {}, message)
  },
  ret401(message: string = 'Token fail.') {
    return this.common('TOKEN_FAIL', {}, message, { status: 401 })
  },
}

export const infoConfig = {}
