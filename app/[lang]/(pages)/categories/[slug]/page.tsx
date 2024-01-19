import CardHorizontal from '@/components/Card-Horizontal/CardHorizontal'
import CardText from '@/components/CardText/CardText'
import FilterSection from '@/components/FilterSection/FilterSection'
import List from '@/components/List/List'
import TitleSeciton from '@/components/Title-Seciton/TitleSeciton'
import InfiniteCard from '@/components/infiniteCard/infiniteCard'
import { Locale } from '@/i18n.config'
import { client } from '@/lib/createClient'
import { getDictionary } from '@/lib/dictionary'
import { Post } from '@/types'
import { groq } from 'next-sanity'
import Script from 'next/script'
import React from 'react'

export async function generateMetadata({
  params: {lang, slug}
}: {
  params: {lang: Locale, slug: Props}
}, parent:any) {

  const query = groq`*[_type == 'category' && slug.current == $slug][0]{
    ...,
  }`
  const post:any = await client.fetch(query,{slug})

  // let keywordsEn: any[] = [];
  // let keywordsAr: any[] = [];

  // post.keywords.en?.map((data:any) => {
  //   keywordsEn.push(data)
  // })
  // post.keywords.ar?.map((data:any) => {
  //   keywordsAr.push(data)
  // })

  return{
    title: lang === "en" ? post?.title : post?.titleAr,
    // description: lang === "en" ? post.descriptionEn : post.descriptionAr,
    // keywords: lang === "en" ? post?.title : post?.titleAr,
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
      title: lang === "en" ? post?.title : post?.titleAr,
      description: lang === "en" ? post?.descriptionEn : post?.descriptionAr,
      url: `${lang}/post/${slug}`,
      siteName: "Aqraaz.com"
    }
  }

}

export const revalidate = 30;

interface Props {
    params: {
      slug: string;
    }
}

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
 
const page = async ({
    params:{slug, lang}
}:{
    params: {slug:any, lang:Locale}
}) => {
  

    const query = groq`*[_type == 'category' && slug.current == $slug][0]{
      ...,
        "posts": *[_type == 'post' && references(^._id)]{
          ...,
          categories[]->,
        }
      }`
    const post:any = await client.fetch(query,{slug})

    // console.log(post.posts);
    
    

  return (
  <>
    <div>
        <div className="row py-4">
            <TitleSeciton text={`Result of ${post?.title}`} />
            <div className="col-md-8">
                <div className='py-3'>
                { post?.posts && 
                post?.posts.map((post:any) => (
                    // <div >hhhh</div>
                <CardHorizontal lang={lang} id={post?._id} title={post?.title} description={post?.description} imageUrl={post?.mainImage} categories={post?.categories} createdAt={post?._createdAt} slug={post?.slug}/>
                ))}
                {/* <InfiniteCard post={post.posts} number={5} lang={lang} /> */}
                </div>
            </div>
            <div className="col-md-4 py-3 d-none d-md-block">
                <CardText lang={lang} title={lang == "en" ? post?.title : post?.titleAr} description={lang == "en" ? post?.descriptionEn : post?.descriptionAr}/>
                <TitleSeciton text='Filter' />
                <FilterSection/>
                <hr />
                <div className='py-2'>
                <TitleSeciton text='Categories' />
                    <List lang={lang}/>
                </div>
            </div>
        </div>
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

export default page