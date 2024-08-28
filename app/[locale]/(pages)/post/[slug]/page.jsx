import React from 'react'
// import {PortableText} from '@portabletext/react'
// import { RichText } from '../../../../../components/RichText'
// import { fetchMostPopular, fetchPost } from '../../../../../data/data';
// import { groq } from 'next-sanity';
// import { client, urlFor } from '../../../../../lib/createClient';
// import Card from '../../../../../components/Card';
// import { getDictionary } from '../../../../../lib/dictionary';
// import Script from 'next/script';
import { Eye } from 'lucide-react';
// import { Input } from '../../../../../components/ui/input';
// import { Button } from '../../../../../components/ui/button';
import Comments from "../../../../../components/Comments"
// import { useSession } from 'next-auth/react';
import { format } from 'date-fns'
import CardCustom from '../../../../../components/component/Card';
import Image from 'next/image';
import { getCategory, getPost } from '../../../../../data/dataApi';
import AdsCard from '../../../../../components/AdsCard';
// import { en, ar } from "date-fns/locale";

export const revalidate = 30;

export async function generateMetadata({params: {locale, slug}}) {
  const post = await getPost(slug);

  return{
    title: locale === "en" ? post.title.en : post.title.ar,
    description: locale == "en" ? post.desc.en : post.desc.ar,
    keywords: locale == "en" ? post.keywords.en : post.keywords.ar,
    category: post.catSlug,
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
      description: locale == "en" ? post.desc.en : post.desc.ar,
      url: `${locale}/post/${slug}`,
      siteName: "Aqraaz.com",
      images: [{
        url: post.img,
        alt: locale === "en" ? post.title.en : post.title.ar,
      }]
    }
  }
}

export default async function page({ params: {slug, locale} }) {
  // const { page } = await getDictionary(locale)
    // const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    //   ...,
    //   author->{
    //     ...
    //   },
    //   categories[0]->{
    //     posts[]->{
    //       ...,
    //       author->,
    //       categories[]->,
    //     },
    //   },
    // }`;
    // const post = await client.fetch(query,{slug});
    // console.log(post.categories[0].posts);
    const data = await getPost(slug);

    const posts = await getCategory(data.catSlug, {
      page: 1,
      include: {
        posts: {
          select: {
            title: true,
            slug: true,
            desc: true,
            img: true,
            createdAt: true,
            views: true,
          }
        },
      },
    });

    // console.log(locale);

    // const {data: user} = useSession();
    // console.log(user);


  return (
    <>
    <div>
      <div className='container mx-auto mt-4 max-sm:px-4 text-base leading-7 text-gray-700 dark:text-gray-200'>
        <header className="mb-8 space-y-4">
          <div className="flex items-center space-x-4 gap-x-2 border-b pb-2">
            <Image alt="Author Avatar" className="h-12 w-12 aspect-[48/48] object-cover rounded-full" height={48} src={data.user.image} width={48} />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{locale == 'en' ? 'By' : 'بواسطة'} {data.user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{locale == 'en' ? 'Published on' : 'نُشرت في'} {format(data.createdAt, "MMMM d, yyyy 'at' h:mm a")}</p>
            </div>
          </div>
          <div
            className="flex items-center justify-between space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center gap-1" dir={locale == 'en' ? 'ltr' : 'rtl'}>{data.views.length} {locale == 'en' ? 'views' : 'مشاهدة'} <Eye className="w-6 h-6 pl-2" /></p>
            <p>5 {locale == 'en' ? 'min read' : 'دقائق قراءة'}</p>
          </div>
        </header>
          {/* <PortableText value={locale == "en" ? data.body.en : data.body.ar} components={RichText} /> */}
          <AdsCard />
          <div className='w-full singlePost' dangerouslySetInnerHTML={{ __html: locale == "en" ? data.body.en : data.body.ar }}></div>
      </div>

      <Comments postSlug={slug} avatar={data.img} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4 p-2 rounded bg-gray-100 gap-6'>
        {posts[0].posts.slice(0, 6).map((post, index) => {
          return (
            <CardCustom key={index} article={post} lang={locale}  time />
          )
        })}
      </div>
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