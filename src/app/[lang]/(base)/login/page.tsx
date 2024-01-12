'use client'

import { useEffect, useMemo, useState } from 'react'
import './page.css'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import EyeSvg from '@/assets/icons/eye.svg'
import EyeSlashSvg from '@/assets/icons/eye-slash.svg'
import { system } from '@/api'
import md5 from 'crypto-js/md5'
import { hasToken, saveToken } from '@/utils'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/i18n'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Logo from '@/assets/logo.svg'
export default function Login({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = useTranslation(lang, 'login')

  const router = useRouter()

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('Admin@123')
  const [message, setMessage] = useState('')

  const [isShowPassword, setIsShowPassword] = useState(false)
  const toggleIsShowPassword = () => setIsShowPassword(!isShowPassword)
  const handleLoginValid = () => {
    if (/^\d/.test(username) || username === '') {
      setMessage('Please enter a valid username')
      return false
    }
    if (password === '') {
      setMessage('Please enter a password')
      return false
    }
    setMessage('')
    return true
  }
  const handleLogin = () => {
    if (handleLoginValid()) {
      system
        .login({ username, password: md5(password).toString() })
        .then(({ data }) => {
          const { token } = data
          saveToken(token)
          router.push('/admin')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <>
      <div className="min-h-screen relative">
        <div className="float-left h-screen w-1/4 items-center justify-center flex shadow-2xl bg-secondary">
          <div className="h-20 w-20 text-secondary-foreground">
            <Logo className="h-full w-full" />
          </div>
        </div>
        <Card className="w-[420px] absolute right-[200px] top-1/2 -translate-y-1/2 p-6">
          <CardHeader>
            <h1 className="flex text-2xl">{t('systemName')}</h1>
          </CardHeader>
          <CardContent className="">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="account">{t('account')}</label>
                <Input
                  id="account"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">{t('password')}</label>
                <Input
                  id="password"
                  type={isShowPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Button
                  color="primary"
                  className="w-full"
                  onClick={handleLogin}
                >
                  {t('login')}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  {t('dont_have_account')}
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: 'link',
                      }),
                      'ml-1 px-0 h-5 underline',
                    )}
                    href="/register"
                  >
                    {' '}
                    {t('signUp')}
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-sm text-center text-foreground-500">
              Lo &copy; 2023
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
