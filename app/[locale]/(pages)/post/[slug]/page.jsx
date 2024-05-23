import React from 'react'
import {PortableText} from '@portabletext/react'
import { RichText } from '../../../../../components/RichText'
import { fetchMostPopular, fetchPost } from '../../../../../data/data';
import { groq } from 'next-sanity';
import { client, urlFor } from '../../../../../lib/createClient';
import Card from '../../../../../components/Card';
import { getDictionary } from '../../../../../lib/dictionary';
import Script from 'next/script';

export const revalidate = 30;

export async function generateMetadata({params: {locale, slug}}) {

  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->
  }`
  const post = await client.fetch(query,{slug})

  return{
    title: locale == "en" ? post.title.en : post.title.ar,
    description: locale == "en" ? post.description.en : post.description.ar,
    keywords: locale == "en" ? post.keywords[0].en : post.keywords[0].ar,
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
      title: locale == "en" ? post.title.en : post.title.ar,
      description: locale == "en" ? post.description.en : post.description.ar,
      images: `${urlFor(post?.mainImage).url()}`,
      url: `${locale}/post/${slug}`,
      siteName: "Aqraaz.com"
    }
  }

}


export default async function page({ params: {slug, locale} }) {
  const { page } = await getDictionary(locale)
    const query = groq`*[_type == 'post' && slug.current == $slug][0]{
      ...,
      categories[0]->{
        posts[]->{
          ...,
          author->,
          categories[]->,
        },
      },
    }`;
    const post = await client.fetch(query,{slug});
    // console.log(post.categories[0].posts);


  return (
    <>
    <div>
      <div className='mx-auto mt-4 max-w-3xl max-sm:px-4 text-base leading-7 text-gray-700 dark:text-gray-200'>
          <PortableText value={locale == 'en' ? post.body[0].body : post.body[1].body} components={RichText} />
      </div>

      {post.categories.posts &&
      <div className=" mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl my-4 font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">{page.postsPage.sectionLikeYou.title}</h2>
        <div className="grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {post.categories.posts.slice(0,3).map((postCate) => (
              <Card post={postCate} lang={locale} />
            ))}
        </div>
      </div>
      }
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