import Image from 'next/image'
import React from 'react'
import Logo from "@/assets/images/logo.svg"
import whiteIcon from '@/assets/images/white-icon.svg'
import icon from "@/assets/images/icon.svg"
import Link from 'next/link'
import { Kalam } from 'next/font/google'
import SearchInput from '../SearchInput/SearchInput'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import SwitchLang from '../SwitchLang/SwitchLang'
import ThemeMode from '../ThemeMode/ThemeMode'
import { useTheme } from 'next-themes'
import IconBtn from '../IconBtn/IconBtn'

const kalam = Kalam({
    weight: '400',
    subsets: ['latin'],
  })

const Navbar = async ({lang}: { lang: Locale}) => {
    const { navigation } = await getDictionary(lang)
  return (
    <nav className="navbar navbar-expand-lg border-body border-bottom p-3">
        <Link className={`navbar-brand d-flex align-items-center ${kalam.className}`} href={`/${lang}`}>
            <IconBtn/> {navigation.title}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" href={`/${lang}/categories`}>{navigation.categories}</Link>
                </li>
                <li className="nav-item">
                    <Link href={`/${lang}/lastast`} className="nav-link" aria-disabled="true">{navigation.lastest}</Link>
                </li>
                <li className="nav-item">
                    <Link href={`/${lang}/about`} className="nav-link" aria-disabled="true">{navigation.about}</Link>
                </li>
            </ul>
            <div className='d-flex gap-2 '>
            <SearchInput lang={lang}/>

            {/* <Link href={`/${lang}/login`} className="btn btn-outline-success">{navigation.login}</Link>
            <Link href={`/${lang}/signup`} className="btn btn-outline-secondary" type="submit">{navigation.signup}</Link> */}
            <SwitchLang/>
            <div className='mx-2 d-flex align-items-center'>
                <ThemeMode/>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar