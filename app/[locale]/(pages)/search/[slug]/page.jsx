import React from 'react'
import Filter from '../../../../../components/Filter';
import { groq } from 'next-sanity';
import { client } from '../../../../../lib/createClient'
import CardColumn from '../../../../../components/CardColumn'
import Script from 'next/script';


export const revalidate = 30;

export default async function page({ params: { slug, locale }}) {
    const decodedString = decodeURIComponent(slug);

    const query = groq`*[_type == 'post' && (title.en match $decodedString + "*" || title.ar match $decodedString + "*")] {
      ...,
        categories[]->,
      author->,
    } | order(_createdAt asc)
    `
    const posts = await client.fetch(query,{decodedString});

  return (
    <>
    <div className='px-4 py-6 sm:px-4 sm:py-12 lg:px-6 flex flex-col gap-6'>
        <div className="pb-2 flex justify-end mb-4 mr-4 border-b border-gray-200/10">
        {/* <Filter /> */}
        </div>
        {posts.map(post => (
            <CardColumn post={post} lang={locale} />
        ))}
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
