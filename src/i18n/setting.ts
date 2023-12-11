export const defaultLang = 'en'
export const languages = [defaultLang, 'zh']
export const cookieName = 'i18next'
export const defaultNS = 'lang'

export function getOptions(lng = defaultLang, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: defaultLang,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
