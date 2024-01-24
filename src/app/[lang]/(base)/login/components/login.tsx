'use client'

import { useTranslation } from '@/i18n'
import { useParams } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Password } from '@/components/password'
import { useEffect, useMemo, useState } from 'react'
import { system } from '@/api'
import md5 from 'crypto-js/md5'
import { saveToken } from '@/utils'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const Login = () => {
  const { lang } = useParams()
  const { t } = useTranslation(lang as string, 'login')

  const pleaseEnterAccount = t('pleaseEnterAccount')
  const pleaseEnterPassword = t('pleaseEnterPassword')
  const loginFormSchema = z.object({
    account: z
      .string({
        required_error: pleaseEnterAccount,
      })
      .trim()
      .min(1, { message: pleaseEnterAccount }),
    password: z
      .string({
        required_error: pleaseEnterPassword,
      })
      .trim()
      .min(1, { message: pleaseEnterPassword }),
  })

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      account: '',
      password: '',
    },
  })
  const { handleSubmit, control } = form
  const handleLogin = (values: z.infer<typeof loginFormSchema>) => {
    console.log('values:', values)
    console.log('loginFormSchema.parse(values):', loginFormSchema.parse(values))
  }

  return (
    <>
      <div className="grid gap-6 text-left">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleLogin)} className="grid gap-6">
            <FormField
              control={control}
              name="account"
              render={({ field, fieldState: { error } }) => {
                return (
                  <FormItem>
                    <FormLabel>{t('account')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('account')}
                        {...field}
                        className={cn(
                          error && 'focus-visible:ring-destructive',
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            ></FormField>
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <Password {...field} placeholder={t('password')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="grid gap-2 mt-4">
              <Button color="primary" type="submit" className="w-full">
                {t('signIn')}
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
          </form>
        </Form>
      </div>
    </>
  )
}

export default Login
