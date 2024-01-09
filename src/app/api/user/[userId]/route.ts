import { userDelete, userInfo, userUpdate } from '@/db'
import { NextRequest } from 'next/server'
import { rp } from '@/utils/server'
import { sysLog } from '@/utils/log'
interface UserParams {
  userId: string
}

/**
 * @description 获取人员信息
 * @swagger
 * /user/{userId}
 *  get:
 *    parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description in CommonMark or HTML.
          schema:
            type: string
 */
export async function getUserInfo(
  request: NextRequest,
  { params }: { params: UserParams }
) {
  const { userId } = params
  try {
    const data = await userInfo({ username: userId })
    return rp.ret200(data)
  } catch (e) {
    return rp.ret500(e)
  }
}

export async function updateUser(
  request: NextRequest,
  { params }: { params: UserParams }
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

export async function deleteUser(
  request: NextRequest,
  { params }: { params: UserParams }
) {
  try {
    const { userId } = params
    const data = await userDelete(userId)
    return rp.ret201(data, '删除成功')
  } catch (e) {
    return rp.ret500(e)
  }
}

export { deleteUser as DELETE, updateUser as PUT, getUserInfo as GET }
