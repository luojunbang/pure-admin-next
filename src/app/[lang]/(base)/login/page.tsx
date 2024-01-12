import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

import { useTranslationServer } from '@/i18n'
import Logo from '@/assets/logo.svg'
import LoginComp from './components/login'
import './page.css'

export default async function Login({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await useTranslationServer(lang, ['lang', 'login'])

  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/3 bg-zinc-900  p-20">
          <div className="flex items-center text-white">
            <div className="h-10 w-10 mr-4">
              <Logo className="h-full w-full" />
            </div>
            <h1 className="text-2xl">{t('systemName')}</h1>
          </div>
        </div>
        <div className="relative flex-1 h-screen flex flex-col justify-center text-center">
          <div className="w-[350px] mx-auto grid gap-6">
            <h1 className="text-2xl">{t('login')}</h1>
            <LoginComp></LoginComp>
          </div>
          <div className="absolute bottom-5 w-full text-sm text-center text-muted-foreground">
            LO-PURE-ADMIN &copy; 2023
          </div>
        </div>
      </div>
    </>
  )
}
