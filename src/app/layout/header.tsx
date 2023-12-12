'use client'

import { useTranslation } from '@/i18n'
import { Select, SelectSection, SelectItem } from '@nextui-org/select'
import { languages } from '@/i18n'
import { Button } from '@nextui-org/button'
import { Switch, VisuallyHidden, useSwitch } from '@nextui-org/react'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function Header() {
  const { lang } = useParams()
  const { t } = useTranslation(lang as string)

  return (
    <div className="pl-[320px] h-[70px] fixed left-0 right-0 top-0 bg-gray-600">
      {t('title')}
      <LangSwitch lang={lang} />
    </div>
  )
}

const LangSwitch = ({ lang }) => {
  const router = useRouter()
  const handleChangeLang = () => {
    router.replace(
      `/${languages[(languages.indexOf(lang) + 1) % languages.length]}`
    )
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
