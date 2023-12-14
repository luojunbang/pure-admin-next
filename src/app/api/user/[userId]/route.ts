import { userDelete, userInfo, userUpdate } from '@/db'
import { NextRequest } from 'next/server'
import { rp } from '@/utils/server'
interface UserParams {
  userId: string
}

export async function GET(
  request: Request,
  { params }: { params: UserParams },
) {
  const { userId } = params
  try {
    const data = await userInfo(userId)
    Reflect.deleteProperty(data, 'password')
    return rp.ret200(data)
  } catch (e) {
    return rp.ret500(e)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: UserParams },
) {
  try {
    const { userId } = params
    const userData = await request.json()
    const data = await userUpdate(userId, userData)
    return rp.ret201(data, '修改成功')
  } catch (e) {
    return rp.ret500(e)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: UserParams },
) {
  try {
    const { userId } = params
    const data = await userDelete(userId)
    return rp.ret201(data, '删除成功')
  } catch (e) {
    return rp.ret500(e)
  }
}
