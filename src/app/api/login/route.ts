import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = headers()
  console.log('headers:', headersList)
  console.log('request:', request)

  return Response.json({ data: 'api/get' })
}
