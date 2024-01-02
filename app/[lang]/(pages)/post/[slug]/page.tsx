import { client, urlFor } from '@/lib/createClient';
import { Post } from '@/types';
import { groq } from 'next-sanity';
import Image from 'next/image';
import React from 'react'
import {PortableText} from '@portabletext/react'
import { RichText } from '@/components/RichText/RichText';
import { Locale } from '@/i18n.config';
import { Metadata } from 'next';

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
      canonical: `/post/${slug}`,
      languages: {
        'en': `/en/post/${slug}`,
        'ar': `/ar/post/${slug}`,
      },
    },
    openGraph: {
      title: lang === "en" ? post?.title.en : post?.title.ar,
      description: lang === "en" ? post?.description.en : post?.description.ar,
      images: `${urlFor(post?.mainImage).url()}`,
      url: `/post/${slug}`,
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
    author->
  }`
  const post:Post = await client.fetch(query,{slug})
  
  return (
    <div>
      <div className='mb-5'>
        <h1 className='pt-3 pb-1'>{lang === "en" ? post?.title?.en : post?.title?.ar}</h1>
        <Image src={urlFor(post?.mainImage).url()} alt='main Image' className='w-100 object-fit-cover' width={500} height={500}></Image>
      </div>
      <PortableText value={lang === "en" ? post?.body[0].en : post?.body[0].ar} components={RichText}/>
    </div>
  )
}

export default SlugPage