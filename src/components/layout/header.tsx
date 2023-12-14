'use client'

import { useTranslation } from '@/i18n'
import { Select, SelectSection, SelectItem } from '@nextui-org/select'
import { languages } from '@/i18n'
import { Button } from '@nextui-org/button'
import { Switch, VisuallyHidden, useSwitch } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation'

import { hasToken, saveToken } from '@/utils'

export default function Header() {
  const { lang }: { lang: string } = useParams()

  const { t } = useTranslation(lang)
  const router = useRouter()
  useEffect(() => {
    saveToken(
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiJ9.yWqvSQz84SUGrxBXbhVO7U4oNrtU9dhK1SX-2pAPZ3w'
    )
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
