import { useTranslation } from '@/i18n'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = params
  const { t } = await useTranslation(lang)

  return (
    <div>
      {t('title')} Your language is {lang}
    </div>
  )
}
