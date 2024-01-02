import React from 'react'
import TitleSeciton from '../Title-Seciton/TitleSeciton'
import { Post } from '@/types';
import Card from '../Card/Card';
import { urlFor } from '@/lib/createClient';
import Link from 'next/link';
import Image from 'next/image';
import styles  from "@/app/page.module.css"

interface Props {
    posts: Post[];
}

const PopularPostSection = ({posts}:Props) => {
    // console.log(posts);
    
  return (
    <section className='popular-post'>
        <TitleSeciton text='Popular Post'/>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center py-3'>
          {posts.slice(0,3).map((post) => (
            <div className="col mb-2">
                <div className="card border border-0 shadow-sm mb-3">
      <Link href={{pathname:`/post/${post?.slug?.current}`,query: {slug:post?.slug?.current}}} key={post?._id}>
        <Image src={urlFor(post?.mainImage).url()} alt='' height="220" width="100" className='w-100 object-fit-cover' ></Image>
      </Link>
      <div className="card-body">
        <div className="d-flex gap-2 text-cneter align-items-center text-body-secondary mb-1">
          {post?.categories && (
          <div className={`fs-7 ${styles.fs7}`} >
            {post?.categories.slice(0,2).map((item,index) => (
              <>
            <Link className='card-subtitle link-underline link-underline-opacity-0' key={item?._id} href={"/"}>{item?.title}</Link>
            {index !== post.categories.slice(0, 2).length - 1 && <span>, </span>}
            </>
            ))}
            {/* <Link className='card-subtitle link-underline link-underline-opacity-0' href={"/"}>, Travel</Link> */}
          </div>
          )}
          <div className={`m-0 ${styles.fs7} fs-7 d-flex align-items-center`}>
            <span className='bg-black' style={{width: "15px", height: "1px"}}></span> <p className='m-0 ps-1'>{new Date(post._createdAt).toLocaleDateString('en-US',{
              day: "numeric",
              month: "long",
              year: "numeric"
            })}</p>
          </div>
        </div>

        <Link href={{pathname:`/post/${post?.slug?.current}`,query: {slug:post?.slug?.current}}} key={post?._id} className={`h5 card-title ${styles.textTruncate2} text-truncate-2 link-underline link-underline-opacity-0`}>
          {post.title}
        </Link>
            
        <p className={`card-text ${styles.textTruncate3} ${styles.fs7} text-truncate-3 fs-7`}>
        {post?.description}
        </p>
      </div>
    </div>
            </div>
          ))}
          {/* <div className="col mb-2">
            <Card/>
          </div> */}
        </div>
      </section>
  )
}

export default PopularPostSection