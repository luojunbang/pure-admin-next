import { userAdd } from '@/db'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json().catch((err) => {})
    if (!userData) return Response.json({ message: 'can;t not be null' })
    console.log('userData:', userData)
    userData.updateDate = new Date()
    const res = await userAdd(userData)
    return Response.json(res)
  } catch (e) {
    console.log('e')
    return Response.json(e)
  }
}
