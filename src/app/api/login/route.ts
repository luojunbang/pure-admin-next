import { userLogin } from '@/db';
import { rp } from '@/utils/response'
import { handleError } from '@/utils/server';
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const user = await userLogin(data)
    if(!user) return rp.ret500('账号密码错误')
    return rp.ret200(user)
  } catch (e) {
    return rp.ret500(e)
  }
}
