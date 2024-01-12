'use client'

import { useTranslation } from '@/i18n'
import { useParams, useRouter } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EyeSvg from '@/assets/icons/eye.svg'
import EyeSlashSvg from '@/assets/icons/eye-slash.svg'
import { useEffect, useMemo, useState } from 'react'

import { system } from '@/api'
import md5 from 'crypto-js/md5'
import { saveToken } from '@/utils'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useTheme } from 'next-themes'
const Login = () => {
  const router = useRouter()
  const { lang } = useParams()
  const { t } = useTranslation(lang as string, 'login')
  const { setTheme, theme } = useTheme()
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
    setTheme(theme === 'dark' ? 'light' : 'dark')
    return
    if (handleLoginValid()) {
      system
        .login({ username, password: md5(password).toString() })
        .then(({ data }) => {
          const { token } = data
          saveToken(token)
          router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <div className="grid gap-6 text-left">
        <div className="grid gap-2">
          <label htmlFor="account">{t('account')}</label>
          <Input id="account" onChange={(e) => setUsername(e.target.value)} />
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
          <Button color="primary" className="w-full" onClick={handleLogin}>
            {t('login')}
          </Button>
          <div className="flex items-center justify-center text-center text-sm text-muted-foreground">
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
