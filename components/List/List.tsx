import { Locale } from '@/i18n.config';
import { client } from '@/lib/createClient';
import { groq } from 'next-sanity';
import Link from 'next/link'
import React from 'react'

export const revalidate = 30;

interface Props {
  lang: Locale
}

const query = groq`
*[_type == 'category']{
    ...,
  } | order(_createdAt asc)`

const List = async ({lang}:Props) => {
  const categories = await client.fetch(query);
  return (
    <ul className="list-group list-group-flush p-0">
      {categories.slice(0,6).map((category:any) => (
        <li className="list-group-item">
          <Link className='link-underline link-underline-opacity-0 text-body' href={{pathname:`/${lang}/categories/${category.slug.current}`}}>{lang === "en" ? category?.title : category?.titleAr}
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
        </li>
      ))}
    </ul>
  )
}

export default List