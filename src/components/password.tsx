'use client'

import { useState, forwardRef } from 'react'
import { Input, InputProps } from '@/components/ui/input'
import EyeSvg from '@/assets/icons/eye.svg'
import EyeSlashSvg from '@/assets/icons/eye-slash.svg'
import { cn } from '@/lib/utils'

const Password = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, ...props }, ref) => {
    const [visible, setVisible] = useState(false)
    const handleToggle = () => {
      setVisible((val) => !val)
    }
    return (
      <>
        <div className="relative">
          <Input
            ref={ref}
            type={visible ? 'text' : 'password'}
            className={cn('pr-8', className)}
            placeholder={placeholder}
            autoComplete="current-password"
            {...props}
          />
          <div
            onClick={handleToggle}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
          >
            {visible ? <EyeSlashSvg /> : <EyeSvg />}
          </div>
        </div>
      </>
    )
  },
)
Password.displayName = 'Password'

export { Password }
