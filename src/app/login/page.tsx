'use client'

import { useMemo, useState } from 'react'
import './page.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  useMenu,
} from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import EyeSvg from '@/assets/icons/eye.svg'
import EyeSlashSvg from '@/assets/icons/eye-slash.svg'
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [isShowPassword, setIsShowPassword] = useState(false)
  const toggleIsShowPassword = () => setIsShowPassword(!isShowPassword)
  const handleLogin = () => {
    console.log(username, password)
    if (/^\d/.test(username) || username === '') {
      setMessage('Please enter a valid username')
      return
    }
    if (password === '') {
      setMessage('Please enter a password')
      return
    }
    setMessage('')
  }
  return (
    <>
      <div className="min-h-screen relative">
        <Card
          isBlurred
          className="w-[420px] absolute right-[200px] top-1/2 -translate-y-1/2 p-6"
        >
          <CardHeader>
            <h1 className="flex text-2xl">SYSTEM NAME</h1>
          </CardHeader>
          <CardBody className="p-3">
            <div>
              <Input
                label="Username"
                isInvalid={false}
                onValueChange={setUsername}
              />
              <Input
                className="mt-5"
                label="Password"
                type={isShowPassword ? 'text' : 'password'}
                isInvalid={false}
                onValueChange={setPassword}
                endContent={
                  <button
                    className="text-xl leading-5 text-foreground-500"
                    onClick={toggleIsShowPassword}
                  >
                    {isShowPassword ? <EyeSvg /> : <EyeSlashSvg />}
                  </button>
                }
              />
            </div>
            <div className="h-5 mt-2 text-danger">{message}</div>
            <Button
              color="primary"
              size="lg"
              className="my-4"
              onClick={handleLogin}
            >
              LOG IN
            </Button>
          </CardBody>
          <CardFooter className="justify-center">
            <div className="text-sm text-center text-foreground-500">
              Copyright 2023
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}