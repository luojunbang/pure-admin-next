'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home({ params }: { params: { lang: string } }) {
  const { lang } = params
  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  })
  return `Your language is ${lang}`
}
