export const fallbackLng = 'en'
export const languages = [fallbackLng, 'zh']
export const cookieName = 'i18next'
export const defaultNS = 'lang'

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
