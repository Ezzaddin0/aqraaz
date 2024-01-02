'use client'
import { i18n } from '@/i18n.config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SwitchLang = () => {
    const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  return (
    <ul className='d-flex gap-2 m-0 list-unstyled'>
        {i18n.locales.map(locale => {
            return (
                <li key={locale}>
                    <Link href={redirectedPathName(locale)} className='btn btn-primary'>
                        {locale}
                    </Link>
                </li>
            )
        })}
    </ul>
  )
}

export default SwitchLang