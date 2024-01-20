import { client, urlFor } from '@/lib/createClient';
import { Post } from '@/types';
import { groq } from 'next-sanity';
import Image from 'next/image';
import React from 'react'
import {PortableText} from '@portabletext/react'
import { RichText } from '@/components/RichText/RichText';
import { Locale } from '@/i18n.config';
import { Metadata } from 'next';
import Script from 'next/script';
import TitleSeciton from '@/components/Title-Seciton/TitleSeciton';
import { getDictionary } from '@/lib/dictionary';
import Card from '@/components/Card/Card';
import styles from "@/app/[lang]/page.module.css";

export async function generateMetadata({
  params: {lang, slug}
}: {
  params: {lang: Locale, slug: Props}
}, parent:any) {

  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->
  }`
  const post:Post = await client.fetch(query,{slug})

  let keywordsEn: any[] = [];
  let keywordsAr: any[] = [];

  post.keywords[0].en?.map((data:any) => {
    keywordsEn.push(data)
  })
  post.keywords[0].ar?.map((data:any) => {
    keywordsAr.push(data)
  })

  return{
    title: lang === "en" ? post?.title.en : post?.title.ar,
    description: lang === "en" ? post?.description.en : post?.description.ar,
    keywords: lang === "en" ? keywordsEn : keywordsAr,
    alternates: {
      canonical: `${lang}/post/${slug}`,
      languages: {
        'en': `/en/post/${slug}`,
        'ar': `/ar/post/${slug}`,
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: lang === "en" ? post?.title.en : post?.title.ar,
      description: lang === "en" ? post?.description.en : post?.description.ar,
      images: `${urlFor(post?.mainImage).url()}`,
      url: `${lang}/post/${slug}`,
      siteName: "Aqraaz.com"
    }
  }

}

interface Props {
  params: {
    slug: any;
  }
}

export const revalidate = 30;

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
    slug
  }`;
  const slugs: Post[] = await client.fetch(query)
  const slugRoutes = slugs.map((slug) => slug?.slug?.current)
  return slugRoutes.map((slug) => ({
    slug,
  }))
}

const SlugPage = async ({
  params: {lang, slug}
}: {
  params: {lang: Locale, slug: Props}
}) => {
    
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->,
    categories[]->{
      posts[]->{
        ...,
        categories[]->,
      },
    }
  }`
  const post:Post = await client.fetch(query,{slug});
  const { page } = await getDictionary(lang);
  
  return (
  <>
    <div>
      <div className='mb-5'>
        <h1 className='pt-3 pb-1'>{lang === "en" ? post?.title?.en : post?.title?.ar}</h1>
        <Image src={urlFor(post?.mainImage).url()} alt='main Image' className={`w-100 object-fit-fill ${styles.imagePost}`} width={500} height={500}></Image>
      </div>
      <PortableText value={lang === "en" ? post?.body[0].en : post?.body[0].ar} components={RichText}/>
      {post.categories[0].posts &&
      <section className='popular-post'>
        <TitleSeciton text={page.postsPage.sectionLikeYou.title}/>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center py-3'>
          {post.categories[0].posts.slice(0,3).map((post:any) => (
          <div className="col mb-2">
            <Card lang={lang} id={post?._id} imageUrl={post?.mainImage} title={post?.title} description={post?.description} categories={post?.categories} createdAt={post?._createdAt} slug={post?.slug} />
          </div>
          ))}
        </div>
      </section>
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

export default SlugPage