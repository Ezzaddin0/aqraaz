'use client'
import { hidePage } from '../helper/HidePage'
import { usePathname } from 'next/navigation'
import React from 'react'
import { navigation } from '../data/Pages'
import Link from 'next/link'
import logo from '../assets/images/icon.svg'
import logoWhite from '../assets/images/white-icon.svg'
import { useTheme } from 'next-themes'
import Image from 'next/image'


export default function Footer({lang}) {
    const pathName = usePathname().split('/')[2];
    const { resolvedTheme } = useTheme();
    return (
        <footer className={`bg-slate-50 dark:bg-gray-800 dark:text-gray-600 text-gray-950 body-font ${hidePage.includes(pathName)? 'hidden' : ''}`}>
      <div className="mx-auto max-w-7xl pt-16 sm:pt-24 pb-8 px-6">
        <div className="">
            <div className="main">
                {/* <img className="h-7" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=500" alt="Company name" /> */}
                <Link className='flex items-center dark:text-gray-200' href="/">
                <Image
                    className="h-7 w-auto dark:fill-gray-200"
                    src={resolvedTheme == 'light' ? logo : logoWhite}
                    alt="Your Company"
                />
                Aqraaz
                </Link>
                {/* <p className="mt-6 text-base leading-8 text-gray-600 dark:text-gray-300">
            Explore everything at <span className=" text-indigo-600">Aqraaz</span>: News, articles, and all topics in one place. Stay informed, curious, and connected with us</p>                 */}
            <div className="mt-8 flex flex-wrap gap-x-3">
                <Link href="https://twitter.com/aqraazbh" className="text-gray-900 hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-600 space-x-6">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 bi bi-facebook" viewBox="0 0 18 18">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg> */}
                    <svg className='w-6 h-6' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/>
                    </svg>
                </Link>
                <Link href="https://www.instagram.com/aqrraz/" className="text-gray-900 hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-600 space-x-6">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 bi bi-facebook" viewBox="0 0 18 18">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg> */}
                    <svg className='w-6 h-6' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                    </svg>
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=61555628315309" className="text-gray-900 hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-600 space-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 bi bi-facebook" viewBox="0 0 18 18">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                </Link>
                {/* <Link href="#" className="text-gray-900 hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-600 space-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 bi bi-facebook" viewBox="0 0 18 18">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                </Link>
                <Link href="#" className="text-gray-900 hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-600 space-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 bi bi-facebook" viewBox="0 0 18 18">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                </Link> */}
                </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-8 mt-16">
                <div className="grid grid-cols-12 max-md:space-y-10">
                    {navigation.map(part => (
                    <div key={lang.locale == 'en' ? part.title.en : part.title.ar} className='col-span-12 sm:col-span-4'>
                        <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{lang.locale == 'en' ? part.title.en : part.title.ar}</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            {part.pages.slice(0,4).map(item => (
                                <li key={lang.locale == 'en' ? item.name.en : item.name.ar}><Link href={`/${lang.locale}${item.href}`} className="text-sm leading-6 text-gray-900 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400">{lang.locale == 'en' ? item.name.en : item.name.ar}</Link></li>
                            ))}
                            {/* <li><Link href="#" className="text-sm leading-6 text-gray-900 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400">Analytics</a></li>
                            <li><Link href="#" className="text-sm leading-6 text-gray-900 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400">Commerce</a></li>
                            <li><Link href="#" className="text-sm leading-6 text-gray-900 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400">Insights</a></li> */}
                        </ul>
                    </div>
                    ))}
                    {/* <div className='col-span-12 sm:col-span-4'>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 text-wrap">{lang.locale == 'en' ? ' Explore everything at ' : ' استكشف كل شيء في '}<span className=" text-indigo-600">Aqraaz</span>{lang.locale == 'en' ? ': News, articles, and all topics in one place. Stay informed, curious, and connected with us ' : 'الأخبار والمقالات وجميع المواضيع في مكان واحد. ابق على اطلاع ,لفضولي والتواصل معنا'}</p>
                    </div> */}
                </div>
            </div>
            <div className=" mt-16 border-t border-black dark:border-white/10 border-opacity-10 pt-8">
            <p className=" text-gray-900 dark:text-gray-400 text-xs leading-5">
                {lang.locale == 'en' ? '© 2024 Aqraaz, Inc. All rights reserved.' : '© 2024 Aqraaz، شركة ذات مسؤولية محدودة. كل الحقوق محفوظة.'}
            </p>
            </div>
        </div>
      </div>
    </footer>
  )
}