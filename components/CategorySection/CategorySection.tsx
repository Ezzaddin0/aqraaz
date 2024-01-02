import React from 'react'
import TitleSeciton from '../Title-Seciton/TitleSeciton'
import Link from 'next/link'
import { Locale } from '@/i18n.config'

type Props = {
    title: string,
    cols: number,
    slug: string,
    children: React.ReactNode,
    lang: Locale
}

const CategorySection = ({title, cols, children, slug, lang}:Props) => {
  return (
    <div className='Category-section'>
        {/* <TitleSeciton text={title} /> */}
        <div className='border-bottom'>
            <Link href={{pathname:`/${lang}/categories/${slug}`}} className=' link-underline link-underline-opacity-0 text-body fs-4 fw-medium'>{title} 
            {lang === "en" ? 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right mx-1" viewBox="0 0 16 16">
                <path fillRule='evenodd' d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left mx-1" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          }
            </Link>
        </div>
        <div className={`row row-cols-1 row-cols-sm-2 row-cols-lg-${cols} justify-content-center py-4`}>
            {children}
        </div>
    </div>
  )
}

export default CategorySection