import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies, headers } from 'next/headers'
import { cookieName, fallbackLng, languages } from '@/i18n/settings'

import acceptLanguage from 'accept-language'
import { tokenName } from './utils'
import { rp } from './utils/response'
import { validateToken } from './utils/token'

acceptLanguage.languages(languages)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api')) {
    return await authMiddleware(request)
  }

  return pageMiddleware(request)
}

/**
 * i18n 重定向
 * @param request
 * @returns
 */
const pageMiddleware = (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl

  let lang
  const cookieStore = cookies()
  if (cookieStore.has(cookieName))
    lang = acceptLanguage.get(cookieStore.get(cookieName)?.value)
  if (!lang) lang = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!lang) lang = fallbackLng

  if (!languages.some(i => pathname.startsWith(`/${i}`))) {
    return NextResponse.redirect(
      new URL(`/${lang}${pathname}?${searchParams}`, request.url)
    )
  }

  return NextResponse.next()
}

/**
 * 请求 headers 鉴权
 * @param request
 * @returns
 */
const authMiddleware = async (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl
  if (WHITE_LIST.includes(pathname)) return NextResponse.next()
  const headersList = headers()
  const token = headersList.get(tokenName)
  const [err, data] = await validateToken(token)
  if (err) return rp.ret401()
  const { payload } = data
  return NextResponse.next()
}

export const WHITE_LIST = ['/login', '/register'].map(i => `/api${i}`)

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
