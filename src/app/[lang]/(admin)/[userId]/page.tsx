'use client'

import { useTranslation } from '@/i18n'
import { useEffect } from 'react'

let a = 1

export default function Page({
  params,
}: {
  params: { userId: string; lang: string }
}) {
  const { userId, lang } = params
  const { t } = useTranslation(lang)
  useEffect(() => {
    async function fetchData() {                
      // You can await here
      const data = await fetch(`/api/user/${params.userId}`).then(res =>
        res.json()
      )
      console.log(data)
      // ...
    }
    a += 1
    console.log('Mount...')
    return () => console.log('unMount...', a)
  }, [params.userId])
  return (
    <div>
      {userId}
      {t('title')}
    </div>
  )
}
