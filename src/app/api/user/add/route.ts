import { userAdd } from '@/db'
import { NextRequest } from 'next/server'
import { rp } from '@/utils'

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json().catch((err) => {})
    if (!userData) rp.ret500('不能为空')
    const { confirmPassword, password } = userData
    if (confirmPassword !== password) {
      return rp.ret500('两次密码输入不一致. ')
    }
    userData.updateDate = new Date()
    const data = await userAdd(userData)
    return rp.ret201(data, '新增成功')
  } catch (e) {
    return rp.ret500(e)
  }
}
