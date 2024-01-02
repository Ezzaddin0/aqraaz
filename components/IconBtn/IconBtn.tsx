'use client'
import Image from 'next/image'
import React from 'react'
import icon from "@/assets/images/icon.svg"
import whiteIcon from '@/assets/images/white-icon.svg'
import { useTheme } from 'next-themes'

const IconBtn = () => {
    const { resolvedTheme } = useTheme()
  return (
    <Image src={resolvedTheme === 'dark' ? whiteIcon : icon} alt='Logo'  width={42} priority ></Image>
  )
}

export default IconBtn