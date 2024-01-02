import CardHorizontal from '@/components/Card-Horizontal/CardHorizontal'
import InfiniteCard from '@/components/infiniteCard/infiniteCard';
import TitleSeciton from '@/components/Title-Seciton/TitleSeciton'
import { Locale } from '@/i18n.config';
import { client } from '@/lib/createClient';
import { getDictionary } from '@/lib/dictionary';
import { Post } from '@/types';
import { groq } from 'next-sanity';
import React from 'react'

interface Props {
  posts: Post[];
}

export const revalidate = 30;

export async function generateMetadata({
  params: {lang, slug}
}: {
  params: {lang: Locale, slug: any}
}, parent:any) {
  const { page } = await getDictionary(lang);
  

  return{
    title: `${lang === "en" ? "Latest posts" : "اخر المنشورات"}`,
    description: `${lang === "en" ? "Discover the freshest insights and updates in Aqraaz's Latest Posts. Stay ahead with the most recent articles, trends, and informative content across a spectrum of topics. Engage with our newest offerings, curated to keep you informed and inspired. Dive into our latest contributions and explore the forefront of knowledge and innovation" : "اكتشف أحدث الرؤى والتحديثات في أحدث المقالات في Aqraaz. تبقَ على رأس الأمور مع أحدث المقالات والاتجاهات والمحتوى المفيد عبر مجموعة من المواضيع. تفاعل مع آخر ما نقدمه، مختارًا خصيصًا ليبقيك على اطلاع دائم وملهم. اغمر في أحدث مساهماتنا واستكشف الرائد في المعرفة والابتكار."}`,
    keywords: lang === "en" ? ["Latest articles, Trending topics, Fresh insights, Up-to-date content, Current trends, Recent updates, Newest information, Timely articles, Current events, Contemporary discussions, Cutting-edge knowledge, Recent developments, Modern perspectives, Contemporary analysis, Latest news, Recent discoveries, Fresh perspectives, Current perspectives, Emerging trends, Recent insights"] : ["أحدث المقالات، المواضيع الرائجة، رؤى جديدة، محتوى محدّث، الاتجاهات الحالية، التحديثات الأخيرة، أحدث المعلومات، مقالات موجهة، الأحداث الحالية، المناقشات المعاصرة، المعرفة الحديثة، التحليل المعاصر، آخر الأخبار، الاكتشافات الأخيرة، رؤى جديدة، منظورات حالية، الاتجاهات الناشئة، رؤى حديثة، منظورات حالية، الرؤى الأخيرة"],
    alternates: {
      canonical: "/lastast",
      languages: {
        'en': '/en/lastast',
        'ar': '/ar/lastast',
      },
    },
    openGraph: {
      title: "lastast",
      description: `${lang === "en" ? "Discover the freshest insights and updates in Aqraaz's Latest Posts. Stay ahead with the most recent articles, trends, and informative content across a spectrum of topics. Engage with our newest offerings, curated to keep you informed and inspired. Dive into our latest contributions and explore the forefront of knowledge and innovation" : "اكتشف أحدث الرؤى والتحديثات في أحدث المقالات في Aqraaz. تبقَ على رأس الأمور مع أحدث المقالات والاتجاهات والمحتوى المفيد عبر مجموعة من المواضيع. تفاعل مع آخر ما نقدمه، مختارًا خصيصًا ليبقيك على اطلاع دائم وملهم. اغمر في أحدث مساهماتنا واستكشف الرائد في المعرفة والابتكار."}`,
      url: "/lastast",
      siteName: "Aqraaz.com"
    }
  }

}


const query = groq`
*[_type == 'post']{
  ...,
  author->,
    categories[]->,
} | order(_createdAt desc)`


const Category = async ({
  params: {lang}
}: {
  params: {lang: Locale}
}) => {
  const posts = await client.fetch(query);
  const { page } = await getDictionary(lang)

  return (
    <div className='py-4'>
      <TitleSeciton text={page.lastest.title} />
      <InfiniteCard post={posts} lang={lang} />
    </div>
  )
}

export default Category