'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  })
  redirect('/dashboard')
}
