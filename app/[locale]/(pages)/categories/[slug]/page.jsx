// 'use client'
import { Menu, Transition } from '@headlessui/react'
import { groq } from 'next-sanity'
import React, { Fragment } from 'react'
import { client } from '../../../../../lib/createClient'
import CardColumn from '../../../../../components/CardColumn'
import Filter from '../../../../../components/Filter' 
import Script from 'next/script'

export const revalidate = 30;

export async function generateMetadata({params: {locale, slug}}) {

  const query = groq`*[_type == 'category' && slug.current == $slug][0]{
    ...,
  }`
  const post = await client.fetch(query,{slug})

  // let keywordsEn: any[] = [];
  // let keywordsAr: any[] = [];

  // post.keywords.en?.map((data:any) => {
  //   keywordsEn.push(data)
  // })
  // post.keywords.ar?.map((data:any) => {
  //   keywordsAr.push(data)
  // })

  return{
    title: locale === "en" ? post.title.en : post.title.ar,
    description: locale == "en" ? post.description.en : post.description.ar,
    keywords: locale == "en" ? post.keywords.en : post.keywords.ar,
    alternates: {
      canonical: `${locale}/post/${slug}`,
      languages: {
        'en': `/en/post/${slug}`,
        'ar': `/ar/post/${slug}`,
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: locale === "en" ? post.title.en : post.title.ar,
      description: locale == "en" ? post.description.en : post.description.ar,
      url: `${locale}/post/${slug}`,
      siteName: "Aqraaz.com"
    }
  }

}

export default async function page({params: {slug, locale}}) {
  // console.log(slug);
  const query = groq`*[_type == 'category' && slug.current == $slug][0]{
    ...,
      "posts": *[_type == 'post' && references(^._id)]{
        ...,
        categories[]->,
        author->,
      }
    }`
  const post = await client.fetch(query,{slug});
  // console.log(post);

  return (
    <>
    <div className='px-4 py-6 sm:px-4 sm:py-12 lg:px-6'>
      <div className="py-4 flex justify-end mb-4 mr-4 border-b border-gray-200/10">
      {/* <Filter lang={locale} /> */}
      </div>

      <div className="grid grid-cols-12">
        <div className='col-span-12 md:col-span-7 max-md:order-2 flex flex-col gap-6'>
          {post.posts.map(pos => (
            <CardColumn post={pos} lang={locale} />
          ))}
        </div>
        <div className='col-span-12 md:col-span-5 mb-4 max-md:order-1'>
          <div className="bg-gray-100/70 dark:bg-gray-800/70 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{locale == 'en' ? post.title.en : post.title.ar}</h2>
            <p className=' leading-7'>{locale == 'en' ? post.description.en : post.description.ar}</p>
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
