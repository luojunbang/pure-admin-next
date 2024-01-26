import { getToken, removeToken } from './auth'
import { parseParams } from 'lo-utils'
import { ResponseType } from './types'
export const tokenName = 'authorization'

import { CODE } from './types'
type method = 'get' | 'post' | 'put' | 'delete'

export const request = {
  async rq<T>(
    method: method,
    url: string,
    data: any,
    config: {
      headers?: Record<string, any>
      params?: Record<string, any>
    } = {},
  ) {
    const headers = {
      [tokenName]: getToken(),
      ...(config.headers ?? {}),
    }
    const _url = `${process.env.NEXT_PUBLIC_BASE_URL}${parseParams(
      config.params ?? {},
      url,
    )}`
    let ret: Response
    if (['post', 'put'].includes(method.toLocaleLowerCase())) {
      headers['Content-Type'] = 'application/json'
      ret = await fetch(_url, { method, headers, body: JSON.stringify(data) })
    } else {
      ret = await fetch(_url, {
        method,
        headers,
      })
    }
    const resData: ResponseType<T> = await ret.json()
    if (ret.status === 401) navgateToLogin()
    if (ret.ok && ret.status === 200) {
      if (isOk(resData.code)) {
        if (resData.code === CODE.DONE) showMessage(resData.msg)
        return resData
      } else return Promise.reject(resData)
    }
    fetchErrorHandler(resData)
    return Promise.reject(ret)
  },
  get<T>(url, data?, config?) {
    return this.rq<T>('get', url, {}, { ...config, params: data })
  },
  post<T>(url, data?, config?) {
    return this.rq<T>('post', url, data, config)
  },
}

export function fetchErrorHandler(ret: ResponseType<any>) {
  showMessage(ret.msg)
}

export function navgateToLogin() {
  removeToken()
  window.location.href = '/login'
}

export function showMessage(msg, type = 'success') {}

export function isOk(code) {
  return [CODE.OK, CODE.DONE].includes(code)
}
