import { useTranslationServer } from '@/i18n'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = params
  const { t } = await useTranslationServer(lang)

  return (
    <div className="h-screen">
      {t('title')} {t('your language is', { lang })}
    </div>
  )
}
