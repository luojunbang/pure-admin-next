'use server'

import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { cookies, headers } from 'next/headers'
import { cookieName, fallbackLng, languages } from '@/i18n/settings'
import kv from '@vercel/kv'

import acceptLanguage from 'accept-language'
import { tokenName } from './utils'
import { defaultTokenFailMsg, rp } from './utils/response'
import { validateToken } from './utils/token'
import { getToken, setToken } from './db/redis/token'

acceptLanguage.languages(languages)

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api')) {
    return await authMiddleware(request, event)
  }

  return pageMiddleware(request, event)
}

/**
 * i18n 重定向
 * @param request
 * @returns
 */
const pageMiddleware = (request: NextRequest, event: NextFetchEvent) => {
  const { pathname, searchParams } = request.nextUrl

  let lang
  const cookieStore = cookies()
  if (cookieStore.has(cookieName))
    lang = acceptLanguage.get(cookieStore.get(cookieName)?.value)
  if (!lang) lang = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!lang) lang = fallbackLng

  if (!languages.some((i) => pathname.startsWith(`/${i}`))) {
    return NextResponse.redirect(
      new URL(`/${lang}${pathname}?${searchParams}`, request.url),
    )
  }

  return NextResponse.next()
}

/**
 * 请求 headers 鉴权
 * @param request
 * @returns
 */
const authMiddleware = async (request: NextRequest, event: NextFetchEvent) => {
  if(request.method.toUpperCase() === 'OPTIONS') return rp.ret200()
  const { pathname, searchParams } = request.nextUrl
  const headersList = headers()
  const response = NextResponse.next()

  if (WHITE_LIST.includes(pathname)) return response
  const token = headersList.get(tokenName)?.replace(/^Bearer /, '')
  const [err, data] = await validateToken(token)
  console.log('err:', err)
  if (err) return rp.ret401()
  const { payload } = data
  const { id } = payload
  const redisToken = await getToken(id)
  if (redisToken !== token) return rp.ret401()
  setToken(id, redisToken)
  return response
}

export const WHITE_LIST = ['/login', '/register'].map(
  (i) => `${process.env.NEXT_PUBLIC_BASE_URL}${i}`,
)

export const config = {
  matcher: [
    `/api/(:path.*)`,
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
}
