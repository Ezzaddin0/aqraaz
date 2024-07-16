// 'use client'
// import React, { useState } from 'react'
// import { fetchAllPosts } from '../../../../data/data'
// import CardColumn from '../../../../components/CardColumn'
// import Filter from '../../../../components/Filter';
// import InfiniteCards from '../../../../components/InfiniteCards'
// import { getDictionary } from '../../../../lib/dictionary';
// import Script from 'next/script';
// import PopularArticles from '../../../../components/component/popular-articles';
import CardCustom from '../../../../components/component/Card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import SelectComponent from '../../../../components/SelectComponent';
import { getPosts } from '../../../../lib/posts';
export const revalidate = 30;

export async function generateMetadata({params: {locale}}) {  

  return{
    title: locale == "en" ? "Latest posts" : "اخر المنشورات",
    description: locale == "en" ? "Discover the freshest insights and updates in Aqraaz's Latest Posts. Stay ahead with the most recent articles, trends, and informative content across a spectrum of topics. Engage with our newest offerings, curated to keep you informed and inspired. Dive into our latest contributions and explore the forefront of knowledge and innovation" : "اكتشف أحدث الرؤى والتحديثات في أحدث المقالات في Aqraaz. تبقَ على رأس الأمور مع أحدث المقالات والاتجاهات والمحتوى المفيد عبر مجموعة من المواضيع. تفاعل مع آخر ما نقدمه، مختارًا خصيصًا ليبقيك على اطلاع دائم وملهم. اغمر في أحدث مساهماتنا واستكشف الرائد في المعرفة والابتكار.",
    keywords: locale == "en" ? ["Latest articles, Trending topics, Fresh insights, Up-to-date content, Current trends, Recent updates, Newest information, Timely articles, Current events, Contemporary discussions, Cutting-edge knowledge, Recent developments, Modern perspectives, Contemporary analysis, Latest news, Recent discoveries, Fresh perspectives, Current perspectives, Emerging trends, Recent insights"] : ["أحدث المقالات، المواضيع الرائجة، رؤى جديدة، محتوى محدّث، الاتجاهات الحالية، التحديثات الأخيرة، أحدث المعلومات، مقالات موجهة، الأحداث الحالية، المناقشات المعاصرة، المعرفة الحديثة، التحليل المعاصر، آخر الأخبار، الاكتشافات الأخيرة، رؤى جديدة، منظورات حالية، الاتجاهات الناشئة، رؤى حديثة، منظورات حالية، الرؤى الأخيرة"],
    alternates: {
      canonical: "/lastast",
      languages: {
        'en': '/en/lastast',
        'ar': '/ar/lastast',
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: "lastast",
      description: locale === "en" ? "Discover the freshest insights and updates in Aqraaz's Latest Posts. Stay ahead with the most recent articles, trends, and informative content across a spectrum of topics. Engage with our newest offerings, curated to keep you informed and inspired. Dive into our latest contributions and explore the forefront of knowledge and innovation" : "اكتشف أحدث الرؤى والتحديثات في أحدث المقالات في Aqraaz. تبقَ على رأس الأمور مع أحدث المقالات والاتجاهات والمحتوى المفيد عبر مجموعة من المواضيع. تفاعل مع آخر ما نقدمه، مختارًا خصيصًا ليبقيك على اطلاع دائم وملهم. اغمر في أحدث مساهماتنا واستكشف الرائد في المعرفة والابتكار.",
      url: "/lastast",
      siteName: "Aqraaz.com"
    }
  }

}

export default async function page({ searchParams, params: {locale}}) {
  // const allPosts = await fetchAllPosts();

    // const { page } = await getDictionary(locale);

    // const data = await getPosts();

    const sort = searchParams.sort || "";
    const posts = await getPosts(sort);  
    
  return (
    <div className='px-4 py-6 sm:px-4 sm:py-12 lg:px-6 '>
    <SelectComponent defaultSort={sort} />
    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {posts.map((post, index) => (
        <CardCustom key={index} article={post} lang={locale} views time />
      ))}
      {/* <PopularArticles Posts={allPosts} num={9} lang={locale} /> */}
      {/* <InfiniteCards postsAll={postsAll} number={5} lang={locale} /> */}
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
  </div>
  )
}