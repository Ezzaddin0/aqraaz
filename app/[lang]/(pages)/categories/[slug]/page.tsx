import CardHorizontal from '@/components/Card-Horizontal/CardHorizontal'
import FilterSection from '@/components/FilterSection/FilterSection'
import List from '@/components/List/List'
import TitleSeciton from '@/components/Title-Seciton/TitleSeciton'
import { Locale } from '@/i18n.config'
import { client } from '@/lib/createClient'
import { getDictionary } from '@/lib/dictionary'
import { Post } from '@/types'
import { groq } from 'next-sanity'
import React from 'react'
export const revalidate = 30;

interface Props {
    params: {
      slug: string;
    }
}

export async function generateMetadata({
    params: {lang, slug}
  }: {
    params: {lang: Locale, slug: any}
  }, parent:any) {
    
    
  
    const query = groq`*[_type == 'category' && slug.current == $slug][0]{
        ...,
          posts[]->{
            ...,
            categories[]->,
          }
      }`
    const post:any = await client.fetch(query,{slug})
    const { page } = await getDictionary(lang);
    console.log(post);
  
    // let keywordsEn: any[] = [];
    // let keywordsAr: any[] = [];
  
    // post.keywords?.en.map((data:any) => {
    //     keywordsEn.push(data)
    // })
  
    // post.keywords?.ar.map((data:any) => {
    //     keywordsAr.push(data)
    // })
    
  
    return{
      title: lang === "en" ? post?.title : post?.titleAr,
      description: `${lang === "en" ? post?.descriptionEn : post?.descriptionAr}`,
      alternates: {
        canonical: `${lang}/categories/${post?.slug}`,
        languages: {
          'en': `/en/categories/${post?.slug}`,
          'ar': `/ar/categories/${post?.slug}`,
        },
      },
      // keywords: lang === "en" ? keywordsEn : keywordsAr,
      openGraph: {
        title: `${lang === "en" ? post?.title : post?.titleAr}`,
        description: `${lang === "en" ? post?.descriptionEn : post?.descriptionAr}`,
        url: `${lang}/categories/${post?.slug}`,
        siteName: "Aqraaz.com"
      }
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
          posts[]->{
            ...,
            categories[]->,
          }
      }`
    const post:any = await client.fetch(query,{slug})
    

  return (
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
                </div>
            </div>
            <div className="col-md-4 d-none d-md-block">
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
  )
}

export default page