// import React from 'react'
// import Filter from '../../../../../components/Filter';
// import { groq } from 'next-sanity';
// import { client } from '../../../../../lib/createClient'
// import CardColumn from '../../../../../components/CardColumn'
// import Script from 'next/script';
import { fetchSearch } from '@/data/dataApi';
import CardCustom from '@/components/component/Card';
import { groq } from 'next-sanity';
import { client, urlFor } from '@/lib/createClient';
export const revalidate = 30;

export async function generateMetadata({params: {locale, slug}}) {
  const decodedString = decodeURIComponent(slug);
  // const field = ['title', 'desc', 'img', 'keywords', 'slug', 'createdAt']


  // const post = await fetchSearch(locale, field, null, 1, slug);

  const query = groq`*[_type == 'post' && status == "active" && (title.en match $decodedString + "*" || title.ar match $decodedString + "*")] {
    title,
    description,
    keywords,
    catSlug,
    mainImage
  } | order(_createdAt asc)
  `
  const post = await client.fetch(query, { decodedString })
  

  return{
    title: post[0]?.title[locale],
    description: post[0]?.description[locale],
    // keywords: post[0]?.keywords[locale],
    keywords: locale == "en" ? post[0]?.keywords[0].words : post[0]?.keywords[1].words,
    category: post[0]?.catSlug,
    alternates: {
      canonical: `${locale}/search/${slug}`,
      languages: {
        'en': `/en/search/${slug}`,
        'ar': `/ar/search/${slug}`,
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: post[0]?.title[locale],
      description: post[0]?.description[locale],
      url: `${locale}/search/${slug}`,
      siteName: "Aqraaz.com",
      images: [{
        // url: post[0]?.img,
        url: post[0] > 0 && urlFor(post[0]?.mainImage).url(),
        alt: post[0]?.title[locale],
      }]
    }
  }
}

export default async function page({ params: { slug, locale }}) {
    const decodedString = decodeURIComponent(slug);    
  // const field = ['title', 'desc', 'img', 'slug', 'createdAt']
  
  const query = groq`*[_type == 'post' && status == "active" && (title.en match $decodedString + "*" || title.ar match $decodedString + "*")] {
    title,
    slug,
    description,
    keywords,
    catSlug,
    _createdAt,
    mainImage
  } | order(_createdAt asc)
  `
  const posts = await client.fetch(query,{decodedString})


    // const query = groq`*[_type == 'post' && (title.en match $decodedString + "*" || title.ar match $decodedString + "*")] {
    //   ...,
    //     categories[]->,
    //   author->,
    // } | order(_createdAt asc)
    // `
    // const posts = await client.fetch(query,{decodedString});

  // const posts = await getSearch(decodedString, {
  //   select: {
  //     title: true,
  //     desc: true,
  //     img: true,
  //     slug: true,
  //     createdAt: true,
  //   },
  // });
  // const posts = await fetchSearch(locale, field, null, 1, slug);
  // console.log(decodedString);

  return (
    <>
    <div className='px-4 py-6 sm:px-4 sm:py-12 lg:px-6 flex flex-col gap-6'>
        {posts.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
              <CardCustom key={index} article={post} lang={locale} time  />
          ))}
        </div> : <h1 className=' text-center'>Not Found</h1>}
    </div>  

    {/* Google tag (gtag.js) */}
    {/* <Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}></Script>
    <Script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');
    `}
    </Script> */}
  </>
  )
}
