'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Locale } from '@/i18n.config'


type Props = {
    children: React.ReactNode
    lang: Locale
}

const CheckPage = ({children,lang}:Props) => {
    const pathname = usePathname()
    
  


  return (
    <div className={`${pathname === "/login" || pathname === "/signup" || pathname === "/en/studio" || pathname.startsWith('/studio/') ? "d-none" : ""}`}>{children}</div>
    // <div className={`${pathname === "/login" || pathname === "/signup" || pathname === "/studio" ? "d-none" : ""}`}>{children}</div>
  )
}

export default CheckPage