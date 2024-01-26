import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

import acceptLanguage from 'accept-language'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextResponse } from 'next/server'
import { cookieName, fallbackLng, languages } from './settings'

const initI18next = async (lng: string, ns?: string | string[]) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslationServer(
  lng: string,
  ns?: string | string[],
  options: { keyPrefix?: string } = {},
) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  }
}

export const getLangFromCookies = (
  cookieStore: ReadonlyRequestCookies,
  request?: Request,
): string => {
  let lang
  if (cookieStore.has(cookieName))
    lang = acceptLanguage.get(cookieStore.get(cookieName)?.value)
  if (!lang) lang = acceptLanguage.get(request?.headers.get('Accept-Language'))
  if (!lang) lang = fallbackLng
  return lang
}
