import React from 'react'
import {PortableText} from '@portabletext/react'
import { RichText } from '@/components/RichText'
// import { fetchMostPopular, fetchPost } from '../../../../../data/data';
import { groq } from 'next-sanity';
import { client, urlFor } from '@/lib/createClient';
// import Card from '../../../../../components/Card';
// import { getDictionary } from '../../../../../lib/dictionary';
// import Script from 'next/script';
import { Clock, Eye, Send, User } from 'lucide-react';
// import { Input } from '../../../../../components/ui/input';
// import { Button } from '../../../../../components/ui/button';
import Comments from "@/components/Comments"
// import { useSession } from 'next-auth/react';
import { format } from 'date-fns'
import CardCustom from '@/components/component/Card';
import Image from 'next/image';
import { fetchPost, fetchPosts, getCategory, getPost } from '@/data/dataApi';
import AdsCard from '@/components/AdsCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { en, ar } from "date-fns/locale";

export const revalidate = 30;

export async function generateMetadata({params: {locale, slug}}) {
  // const post = await fetchPost(slug);

  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    title,
    description,
    keywords,
    catSlug,
    mainImage
  }`

  const post = await client.fetch(query, { slug });

  return{
    title: post.title[locale],
    description: post.description[locale],
    keywords: post.keywords[locale],
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
      title: post.title[locale],
      description: post.description[locale],
      url: `${locale}/post/${slug}`,
      siteName: "Aqraaz.com",
      images: [{
        // url: post.img,
        url: post.mainImage && urlFor(post.mainImage).url(),
        alt: post.title[locale],
      }]
    }
  }
}

export default async function page({ params: {slug, locale} }) {
  // const data = await fetchPost(slug);

  // const fields = ['title', 'desc', 'img', 'createdAt', 'slug']; // يمكنك تغيير هذه الحقول حسب احتياجاتك
  // const posts = await fetchPosts(locale, fields, [data.catSlug]);  

  
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    title,
    _createdAt,
    body,
    author->,
    categories[0]->{
    posts[0...6]->{
      title,
      slug,
      description,
      mainImage,
      _createdAt
    }
    },
  }`

  const post = await client.fetch(query, { slug });    
  
  return (
    <>
    {/* <div>
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
          <AdsCard />
          <div className='w-full singlePost' dangerouslySetInnerHTML={{ __html: data.body[locale] }}></div>
      </div>

      <Comments postSlug={slug} avatar={data.img} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4 p-2 rounded bg-gray-100 gap-6'>
        {posts.slice(0, 6).map((post, index) => {
          return (
            <CardCustom key={index} article={post} lang={locale}  time />
          )
        })}
      </div>
    </div> */}

<div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
      <main className="lg:w-3/4 lg:pr-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* <h1 className="text-3xl font-bold mb-4">{post.title[locale]}</h1> */}
          <div className="flex flex-wrap items-center text-gray-600 mb-4">
            <Image 
              alt="Author Avatar" 
              src={urlFor(post.author.image).url()} 
              className="h-12 w-12 aspect-[48/48] object-cover rounded-full border" 
              height={48} 
              width={48} 
              />
            <span className="flex items-center mx-4"><User className="mr-1" size={16} /> {post.author.name}</span>
            <span className="mr-4">Date: {format(post._createdAt, "MMMM d, yyyy 'at' h:mm a")}</span>
            <span className="flex items-center mr-4"><Clock className="mr-1" size={16} /> 5 min read</span>
            {/* <span className="flex items-center"><Eye className="mr-1" size={16} /> {data.views.length} views</span> */}
          </div>
        </header>

        {/* Article Content */}
          {/* <article dangerouslySetInnerHTML={{ __html: data.body[locale] }} className="prose lg:prose-xl max-w-none"></article> */}
        <PortableText value={locale == "en" ? post.body[0].body : post.body[1].body} components={RichText}/>

        {/* Comments Section */}
        {/* <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-bold flex items-center"><User className="mr-2" size={20} /> Alex</p>
            <p>Great article! Thanks for the valuable information.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-bold flex items-center"><User className="mr-2" size={20} /> Sarah</p>
            <p>I completely agree with the points made in the article. Looking forward to more similar content.</p>
          </div>
          
          Comment Input Field
          <form className="mt-6">
            <textarea 
              className="w-full p-2 border rounded-lg mb-2" 
              rows={4} 
              placeholder="Write your comment here..."
            ></textarea>
            <Button className="w-full" variant="outline">
              <Send className="mr-2" size={16} /> Submit Comment
            </Button>
          </form>
        </section> */}

        {/* Similar Articles */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Similar Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {post.categories.posts.slice(0, 6).map((post, index) => {
            return (
              <CardCustom key={index} article={post} lang={locale}  time />
            )
          })}
          </div>
        </section>
      </main>

      {/* Sidebar Advertisement */}
      <aside className="lg:w-1/4 mt-8 lg:mt-0">
        <div className="sticky top-8">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Advertisement</h3>
            {/* <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Advertisement image"
              width={300}
              height={200}
              className="w-full rounded-lg mb-4"
            /> */}
            <p>Ad copy appears here. Discover more of our products and services!</p>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors">
              Discover Now
            </button> */}
          </div>
        </div>
      </aside>
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