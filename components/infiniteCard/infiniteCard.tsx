'use client'
import React, { useState } from 'react'
import CardHorizontal from '../Card-Horizontal/CardHorizontal'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { client } from '@/lib/createClient'
import { groq } from 'next-sanity'

interface Props {
    lang: Locale,
    post: any,
    number?: number
}



const InfiniteCard = ({
    lang,
    post,
    number
}:Props) => {

    const [posts, setPosts] = useState(post)
    const [index, setIndex] = useState(number || 3)

    // console.log(posts);
    

    async function loadMoreCard() {
        const next = index + (number || 3)
        if (post?.length) {
            setIndex(next)
        }
    }    

  return (
    <div className="mt-3">
        {posts.slice(0,index).map((post:any) => (
        <CardHorizontal lang={lang} id={post?._id} imageUrl={post?.mainImage} title={post?.title} description={post?.description} categories={post?.categories} createdAt={post?._createdAt} slug={post?.slug}/>
        ))}
        <div className='py-3 d-flex align-items-center justify-content-center'>
            {index >= posts.length ? "finshed" : <button type="button" onClick={loadMoreCard} className="btn btn-primary">load more</button>}
        </div>
    </div>
  )
}

export default InfiniteCard