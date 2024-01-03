import CardHorizontal from '@/components/Card-Horizontal/CardHorizontal'
import FilterSection from '@/components/FilterSection/FilterSection'
import List from '@/components/List/List'
import TitleSeciton from '@/components/Title-Seciton/TitleSeciton'
import { Locale } from '@/i18n.config'
import { client } from '@/lib/createClient'
import { getDictionary } from '@/lib/dictionary'
import { groq } from 'next-sanity'
import Script from 'next/script'
import React from 'react'

export const revalidate = 30;


const serach = async ({
    params: {lang, slug}
  }: {
    params: {lang: Locale, slug: any}
  }) => {
    const decodedString = decodeURIComponent(slug);

    const query = groq`*[_type == 'post' && (title.en match $decodedString || title.ar match $decodedString)] {
      ...,
        categories[]->,
    } | order(_createdAt asc)
    `
    const posts:any = await client.fetch(query,{decodedString})

    const { page, ui } = await getDictionary(lang);

    
    
  return (
  <>
  <div>
        <div className="row py-4">
            <TitleSeciton text={`${page.search.description} ${decodedString}`} />
            <div className="col-md-8">
                <div className='py-3'>
                {posts.map((post:any) => (

                <CardHorizontal lang={lang} id={post?._id} title={post?.title} description={post?.description} imageUrl={post?.mainImage} categories={post?.categories} createdAt={post?._createdAt} slug={post?.slug}/>
                ))}
                
                </div>
            </div>
            <div className="col-md-4 d-none d-md-block">
                <TitleSeciton text={ui.filter.title} />
                <FilterSection lang={lang}/>
                <hr />
                <div className='py-2'>
                <TitleSeciton text={ui.categories.title} />
                    <List lang={lang}/>
                </div>
            </div>
        </div>
    </div>
    {/* Google tag (gtag.js) */}
    <Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}></Script>
    <Script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');
    `}
    </Script>
  </>
  )
}

export default serach