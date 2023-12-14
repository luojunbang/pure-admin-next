'use client'

import { useTranslation } from '@/i18n'
import { useEffect } from 'react'

import { user } from '@/api'

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
      const data = await user.getUserById(userId)
      console.log(data)
    }
    fetchData()
    return () => console.log('unMount...')
  }, [userId])
  return (
    <div>
      {userId}
      {t('title')}
    </div>
  )
}
