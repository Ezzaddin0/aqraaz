import Card from '@/components/Card/Card'
import CategorySection from '@/components/CategorySection/CategorySection'
import TitleSeciton from '@/components/Title-Seciton/TitleSeciton'
import { Locale } from '@/i18n.config';
import { client, urlFor } from '@/lib/createClient';
import { getDictionary } from '@/lib/dictionary';
import { Metadata } from 'next';
import { groq } from 'next-sanity';
import Script from 'next/script';
import React from 'react'

export const revalidate = 30;

export async function generateMetadata({
  params: {lang, slug}
}: {
  params: {lang: Locale, slug: any}
}, parent:any) {

  const query = groq`
*[_type == 'category']{
  ...,
} | order(_createdAt asc)`
  const categories = await client.fetch(query);
  const { page } = await getDictionary(lang);

  let KeywordsEn: any[] = [];
  let KeywordsAr: any[] = [];

  categories.map((data:any) => {
      KeywordsEn.push(data.title)
  })
  categories.map((data:any) => {
      KeywordsAr.push(data.titleAr)
  })
  

  return{
    title: `${lang === "en" ? page.categories.title : "الفئات"}`,
    description: `${lang === "en" ? "Welcome to Aqraaz's Categories Page, your gateway to a world of diverse content. Explore an array of topics, from tech and business to lifestyle and wellness. Find insightful articles, tips, and resources curated to cater to your interests. Dive into our categorized content and embark on a journey of discovery tailored to enrich your knowledge and spark inspiration" : "مرحبًا بكم في صفحة فئات Aqraaz، بوابتكم إلى عالم محتوى متنوع. استكشاف مجموعة من المواضيع، من التكنولوجيا والأعمال إلى نمط الحياة والصحة والعافية. اعثر على مقالات مفيدة، نصائح، وموارد مختارة لتلبية اهتماماتكم. اغمر في محتوىنا المصنَّف وابدأ رحلة اكتشاف مصممة لإثراء معرفتكم وإشعال الإلهام."}`,
    keywords: lang === "en" ? KeywordsEn : KeywordsAr,
    alternates: {
      canonical: `/${lang}/categories`,
      languages: {
        'en': '/en/categories',
        'ar': '/ar/categories',
      },
    },
    openGraph: {
      title: "categories",
      description: `${lang === "en" ? "Welcome to Aqraaz's Categories Page, your gateway to a world of diverse content. Explore an array of topics, from tech and business to lifestyle and wellness. Find insightful articles, tips, and resources curated to cater to your interests. Dive into our categorized content and embark on a journey of discovery tailored to enrich your knowledge and spark inspiration" : "مرحبًا بكم في صفحة فئات Aqraaz، بوابتكم إلى عالم محتوى متنوع. استكشاف مجموعة من المواضيع، من التكنولوجيا والأعمال إلى نمط الحياة والصحة والعافية. اعثر على مقالات مفيدة، نصائح، وموارد مختارة لتلبية اهتماماتكم. اغمر في محتوىنا المصنَّف وابدأ رحلة اكتشاف مصممة لإثراء معرفتكم وإشعال الإلهام."}`,
      url: `/${lang}/categories`,
      siteName: "Aqraaz.com"
    }
  }

}

const query = groq`
*[_type == 'category']{
  ...,
      posts[]->{
        ...,
        categories[]->,
      },
} | order(_createdAt asc)`

const categories = async ({
  params: {lang}
}: {
  params: {lang: Locale}
}) => {
    const categories = await client.fetch(query);
    const { page } = await getDictionary(lang)
    
  return (
  <>
    <div>
        <h1 className='text-center pt-3'>{page.categories.title}</h1>
        
        {categories.map((categoryS: any) => (
        <>
          {categoryS.posts && (
            <CategorySection lang={lang} title={lang === "en" ? categoryS?.title : categoryS?.titleAr} slug={categoryS?.slug.current} cols={3}>
              {categoryS?.posts.slice(0,3).map((post: any) => (
                <div className="col">
                  <Card lang={lang} id={post?._id} imageUrl={post?.mainImage} title={post?.title} description={post?.description} categories={post?.categories} createdAt={post?._createdAt} slug={post?.slug} />
                </div>
              ))}
            </CategorySection>
          )}
        </>
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

export default categories