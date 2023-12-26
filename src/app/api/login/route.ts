import { userInfo } from '@/db'
import { rp } from '@/utils/response'
import { genToken, handleError } from '@/utils/server'
import { headers } from 'next/headers'
import { pick } from 'lo-utils'
import redis from '@/db/redis'
import { setToken } from '@/db/redis/token'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const user = await userInfo(data)
    if (!user) return rp.ret500('账号密码错误')
    const token = await genToken(pick(user, ['id', 'username']))
    await setToken(user.id, token)
    return rp.ret200({ ...user, token })
  } catch (e) {
    return rp.ret500(e)
  }
}
