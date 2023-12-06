import { userDelete, userInfo, userUpdate } from '@/db'
import { NextRequest } from 'next/server'

interface UserParams {
  userId: string
}

export async function GET(
  request: Request,
  { params }: { params: UserParams },
) {
  try {
    const { userId } = params
    const data = (await userInfo(userId)) ?? {}
    Reflect.deleteProperty(data, 'password')
    return Response.json(data)
  } catch (e) {
    return Response.json(e)
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
    return Response.json(data)
  } catch (e) {
    return Response.json(e)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: UserParams },
) {
  try {
    const { userId } = params
    const data = await userDelete(userId)
    return Response.json({ message: 'delete success' })
  } catch (e) {
    return Response.json(e)
  }
}
