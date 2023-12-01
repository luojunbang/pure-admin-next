'use client'

import { useEffect } from 'react'

export default function Page({ params }: { params: { userId: string } }) {
  const { userId } = params
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await fetch(`/api/user/${params.userId}`).then((res) =>
        res.json(),
      )
      console.log(data)
      // ...
    }
    fetchData()
  })
  return <div>{userId}</div>
}
