import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { cookieName, defaultLang, languages } from '@/i18n/setting'

import acceptLanguage from 'accept-language'

acceptLanguage.languages(languages)

export function middleware(request: NextRequest) {
  let lang
  const cookieStore = cookies()
  if (cookieStore.has(cookieName))
    lang = acceptLanguage.get(cookieStore.get(cookieName)?.value)
  if (!lang) lang = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!lang) lang = defaultLang

  if (!languages.some((i) => request.nextUrl.pathname.startsWith(`/${i}`))) {
    return NextResponse.redirect(
      new URL(`/${lang}/${request.nextUrl.pathname}`, request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
}
