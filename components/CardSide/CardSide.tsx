import Link from 'next/link'
import React from 'react'
import SideItem from '@/components/SideItem/SideItem'
import { Post } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

interface Props {
  posts: Post[],
  lang: Locale
}

const CardSide = async ({posts, lang}:Props) => {
  const { page } = await getDictionary(lang)
  return (
    <div>
        <p className="h4 fst-italic">{page.home.randomPosts.title}</p>
        <ul className="list-unstyled p-0">
        {posts.slice(0,4).map((post) => (
        <SideItem lang={lang} id={post._id} title={post?.title} createdAt={post?._createdAt} imageUrl={post?.mainImage} slug={post?.slug}/>
        ))}
        {/* <SideItem/>
        <SideItem/> */}
        </ul>
    </div>
  )
}

export default CardSide