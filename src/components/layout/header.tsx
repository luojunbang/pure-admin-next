'use client'

import { useTranslation } from '@/i18n'
import { languages } from '@/i18n'
import { Button } from '@ui/button'
import { useEffect, useState } from 'react'
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation'

import { hasToken, getToken } from '@/utils'

export default function Header() {
  const { lang }: { lang: string } = useParams()

  const { t } = useTranslation(lang)
  const router = useRouter()
  useEffect(() => {
    if (!hasToken()) {
      router.replace('/login')
      return
    }
  }, [router])
  return (
    <div className="pl-[320px] h-[70px] fixed left-0 right-0 top-0 bg-gray-600">
      {t('title')}
      <LangSwitch lang={lang} />
    </div>
  )
}

const LangSwitch = ({ lang }: { lang: string }) => {
  const router = useRouter()
  const pathname = usePathname().replace(`/${lang}`, '')
  const searchParams = useSearchParams()
  const handleChangeLang = () => {
    const targetLang =
      languages[(languages.indexOf(lang) + 1) % languages.length]
    router.replace(`/${targetLang}${pathname}?${searchParams}`)
  }
  return (
    <div
      className="w-8 h-8 rounded-lg cursor-pointer"
      onClick={handleChangeLang}
    >
      {lang}
    </div>
  )
}
