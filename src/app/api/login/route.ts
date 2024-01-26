import { userInfo } from '@/db'
import { rp } from '@/utils/response'
import { genToken, handleError } from '@/utils/server'
import { cookies, headers } from 'next/headers'
import { pick } from 'lo-utils'
import redis from '@/db/redis'
import { getToken, setToken } from '@/db/redis/token'
import { getLangFromCookies, useTranslationServer } from '@/i18n'
import acceptLanguage from 'accept-language'

export async function POST(request: Request) {
  const { t } = await useTranslationServer(
    getLangFromCookies(cookies()),
    'login',
  )
  const msg = t('usernamePasswordError')
  try {
    const data = await request.json()
    const user = await userInfo(data)
    if (!user) return rp.ret500(msg)
    const token =
      (await getToken(user.id)) ??
      (await genToken(pick(user, ['id', 'username'])))
    await setToken(user.id, token)
    return rp.ret200({ ...user, token })
  } catch (e) {
    return rp.ret500(msg)
  }
}
