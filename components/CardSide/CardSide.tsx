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

  function getRandomElements(arr:any, n:number) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandomElements: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
  const { page } = await getDictionary(lang)
  return (
    <div>
        <p className="h4 fst-italic">{page.home.randomPosts.title}</p>
        <ul className="list-unstyled p-0">
        {getRandomElements(posts, 5).map((post) => (
        <SideItem lang={lang} id={post._id} title={post?.title} description={post?.description} createdAt={post?._createdAt} imageUrl={post?.mainImage} slug={post?.slug}/>
        ))}
        {/* <SideItem/>
        <SideItem/> */}
        </ul>
    </div>
  )
}

export default CardSide