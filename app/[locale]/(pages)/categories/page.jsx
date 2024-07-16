// import React from 'react'
// import { fetchAllCategories } from '../../../../data/data'
// import Card from '../../../../components/Card';
import Link from 'next/link';
// import Script from 'next/script';
// import SectionCards from '../../../../components/component/section-cards';
import CardCustom from '../../../../components/component/Card';
import { ChevronRightIcon } from 'lucide-react';
import { getCategories } from '../../../../data/dataApi';
export const revalidate = 30;

export async function generateMetadata({params: {locale}}) {

  return{
    title: locale === "en" ? 'categories' : "الفئات",
    description: locale === "en" ? "Welcome to Aqraaz's Categories Page, your gateway to a world of diverse content. Explore an array of topics, from tech and business to lifestyle and wellness. Find insightful articles, tips, and resources curated to cater to your interests. Dive into our categorized content and embark on a journey of discovery tailored to enrich your knowledge and spark inspiration" : "مرحبًا بكم في صفحة فئات Aqraaz، بوابتكم إلى عالم محتوى متنوع. استكشاف مجموعة من المواضيع، من التكنولوجيا والأعمال إلى نمط الحياة والصحة والعافية. اعثر على مقالات مفيدة، نصائح، وموارد مختارة لتلبية اهتماماتكم. اغمر في محتوىنا المصنَّف وابدأ رحلة اكتشاف مصممة لإثراء معرفتكم وإشعال الإلهام.",
    keywords: locale === "en" ? ['categories', 'sections', 'types'] : ['فئات', 'اقسام', 'انواع'],
    alternates: {
      canonical: `/${locale}/categories`,
      languages: {
        'en': '/en/categories',
        'ar': '/ar/categories',
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: locale === "en" ? 'categories' : "الفئات",
      description: locale === "en" ? "Welcome to Aqraaz's Categories Page, your gateway to a world of diverse content. Explore an array of topics, from tech and business to lifestyle and wellness. Find insightful articles, tips, and resources curated to cater to your interests. Dive into our categorized content and embark on a journey of discovery tailored to enrich your knowledge and spark inspiration" : "مرحبًا بكم في صفحة فئات Aqraaz، بوابتكم إلى عالم محتوى متنوع. استكشاف مجموعة من المواضيع، من التكنولوجيا والأعمال إلى نمط الحياة والصحة والعافية. اعثر على مقالات مفيدة، نصائح، وموارد مختارة لتلبية اهتماماتكم. اغمر في محتوىنا المصنَّف وابدأ رحلة اكتشاف مصممة لإثراء معرفتكم وإشعال الإلهام.",
      url: `/${locale}/categories`,
      siteName: "Aqraaz.com"
    }
  }

}

export default async function page({params: {locale}, searchParams}) {
  // const categories = await fetchAllCategories();

  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  // console.log(searchParams);  

    const data = await getCategories();
  return (
    <>
    <div className='container px-4 py-6 sm:px-4 sm:py-12 lg:px-6'>
      {/* <div className="mx-auto max-w-2xl px-4 py-16 flex flex-col gap-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {categories.map((category) => (
            <div>
                <Link href={`categories/${category.slug.current}`}>
                <h2 className="text-2xl flex items-center py-1 my-4 font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">{locale == 'en' ? category.title.en : category.title.ar} {category?.posts?.length > 3 && <svg className={`w-5 h-5 ${locale == 'en' ? '' : 'rotate-180'} ml-1 -mb-1 dark:fill-gray-300`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>}</h2>
                </Link>
                <div className="grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {category.posts && category.posts.slice(0,3).map(cate => (
                        <Card post={cate} lang={locale} />
                    ))}
                </div>
            </div>
        ))}
      </div> */}
      {data.map((category, index) => (
        category.posts.length > 0 && (
        <div className='mb-8'>
          <Link href={`categories/${category.slug}`} className='flex items-center text-3xl font-bold  border-b pb-1 mb-2'>
            {locale == "en" ? category.title.en : category.title.ar}
            <ChevronRightIcon className='w-5 h-5 ml-1 -mb-2' />
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
           {category.posts.slice(0, 6).map((post, index) => (
            <CardCustom index={index} article={post} lang={locale} time />
           ))}
          </div>
        </div>
        )
      ))}
      {/* {data.map((category) => {
        return (
          <SectionCards page={1} title={locale == 'en' ? category.title : category.title} Posts={category.posts} lang={locale} time />
        )
      })} */}
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