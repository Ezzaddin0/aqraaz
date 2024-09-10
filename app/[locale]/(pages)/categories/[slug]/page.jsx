// 'use client'
// import { Menu, Transition } from '@headlessui/react'
import { groq } from 'next-sanity'
// import React, { Fragment } from 'react'
import { client, urlFor } from '../../../../../lib/createClient'
// import CardColumn from '../../../../../components/CardColumn'
// import Filter from '../../../../../components/Filter' 
// import Script from 'next/script'
import CardCustom from '@/components/component/Card'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select'
// import PopularArticles from '../../../../../components/component/popular-articles'
import { getData } from '../../../../../lib/posts'
import SelectComponent from '@/components/SelectComponent'
import Link from 'next/link';
import { fetchCategories, getCategory } from '@/data/dataApi';
export const revalidate = 30;

export async function generateMetadata({params: {locale, slug}}) {
  // const fields = ['title', 'desc', 'img', 'keywords']; // يمكنك تغيير هذه الحقول حسب احتياجاتك

  // const post = await getCategory(slug, {
  //   select: {
  //     title: true,
  //     desc: true,
  //     keywords: true,
  //     img: true,
  //   },
  // });

  // const post = await fetchCategories(locale, [...fields], [slug]);  

  const query = groq`*[_type == 'category' && slug.current == $slug][0]{
    title,
    description,
    keywords,
    mainImage,
  }`
  const post = await client.fetch(query, { slug })
  
  return{
    title: post.title[locale],
    description: post.description[locale],
    keywords: post.keywords[locale],
    alternates: {
      canonical: `${locale}/categories/${slug}`,
      languages: {
        'en': `/en/categories/${slug}`,
        'ar': `/ar/categories/${slug}`,
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: post.title[locale],
      description: post.description[locale],
      url: `${locale}/categories/${slug}`,
      siteName: "Aqraaz.com",
      images: [{
        // url: post[0].img,
        url: post.mainImage && urlFor(post.mainImage).url(),
        alt: post.title[locale],
      }]
    }
  }
}

// Sorting functions
export default async function Page({ params: {slug, locale}, searchParams }) {
  const sort = searchParams.sort || "";
  // const posts = await getData(params.slug, sort);
  // const fields = ['title', 'desc', 'img', 'createdAt', 'catSlug', 'keywords', 'slug']; // يمكنك تغيير هذه الحقول حسب احتياجاتك
  // const posts = await fetchCategories(params.locale, [...fields, "posts"], [params.slug]);

  const query = groq`*[_type == 'category' && slug.current == $slug][0]{
    "posts": *[_type == 'post' && references(^._id)]{
      title,
      slug,
      description,
      _createdAt,
      mainImage
    }
  }`
  const posts = await client.fetch(query,{slug})
  

  return (
    <>
      <div className="px-4 py-6 sm:px-4 sm:py-12 lg:px-6">
        {posts.posts.length > 0 ? (
          <>
            <SelectComponent defaultSort={sort} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {posts.posts.map((post, index) => (
                // <CardCustom key={index} article={post} lang={params.locale} views time />
                <CardCustom key={index} article={post} lang={locale} time />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-100 dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {locale === 'en' ? 'No Articles Available' : 'لا توجد مقالات'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {locale === 'en'
                ? 'There are no articles to display at the moment. Please check back later.'
                : 'لا توجد مقالات لعرضها في الوقت الحالي. يرجى التحقق مرة أخرى لاحقًا.'}
            </p>
            <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md">
              {locale === 'en' ? 'Go to Homepage' : 'العودة إلى الصفحة الرئيسية'}
            </Link>
          </div>
        )}
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
  );
}