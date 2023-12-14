import { getToken } from './auth'
import { parseParams } from 'lo-utils'

export const tokenName = 'authorization'

export const request = {
  async rq(
    method: string,
    url: string,
    data: any,
    config: { headers?: Record<string, any>; params?: Record<string, any> }
  ) {
    const headers = {
      [tokenName]: getToken(),
      'Content-Type': data,
      ...(config.headers ?? {}),
    }
    const _url = `${process.env.NEXT_PUBLIC_BASE_URL}${parseParams(
      config.params ?? {},
      url
    )}`
    try {
      let ret
      if (method.toLocaleLowerCase() === 'get') {
        ret = await fetch(_url, {
          method,
          headers,
        })
      }
      if (['post', 'put'].includes(method.toLocaleLowerCase())) {
        headers['Content-Type'] = 'application/json'
        ret = await fetch(_url, { method, headers })
      }
      return ret.json()
    } catch (err) {}
  },
  get(url, data?, config?) {
    return this.rq('get', url, {}, { ...config, params: data })
  },
  post(url, data?, config?) {
    return this.rq('post', url, data, config)
  },
}
