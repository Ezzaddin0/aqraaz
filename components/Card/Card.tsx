import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import styles from "@/app/[lang]/page.module.css"
import { urlFor } from '@/lib/createClient';

interface Props {
  id: any;
  title?: any;
  description?: any;
  imageUrl: any;
  categories?: any;
  createdAt?: any;
  slug?: any;
  lang: any;
}

const Card = ({ id, title, description, imageUrl, categories, createdAt, slug, lang }: Props) => {
  // console.log(categories?.categories[0].title);
  // categories.map((item:any) => {
  //   console.log(item);
    
  // })    
  // console.log(imageUrl);
  
  
  
  return (
    <div className="card border border-0 shadow-sm mb-3">
      <Link href={{pathname:`/${lang}/post/${slug?.current}`,query: {slug:slug?.current}}} aria-label={"title"} key={id}>
        <Image src={urlFor(imageUrl).url()} alt='' height="220" width="100" style={{maxHeight: "276px"}} className='w-100 img-fluid object-fit-cover' ></Image>
      </Link>
      <div className="card-body">
        <div className="d-flex gap-2 text-cneter align-items-center text-body-secondary mb-1">
          {categories && (
          <div className={`fs-7 ${styles.fs7}`} >
            {categories.slice(0,2).map((item:any,index:number) => (
              <>
            <Link className='card-subtitle link-underline link-underline-opacity-0' key={item?._id} href={`/${lang}/categories/${item.slug.current}`}>{lang === "en" ? item.title : item.titleAr}</Link>
            {index !== categories.slice(0, 2).length - 1 && <span>, </span>}
            </>
            ))}
            {/* <Link className='card-subtitle link-underline link-underline-opacity-0' href={"/"}>, Travel</Link> */}
          </div>
          )}
          <div className={`m-0 ${styles.fs7} fs-7 d-flex align-items-center`}>
            <span className='bg-black' style={{width: "15px", height: "1px"}}></span> <p className='m-0 ps-1'>{new Date(createdAt).toLocaleDateString('en-US',{
              day: "numeric",
              month: "long",
              year: "numeric"
            })}</p>
          </div>
        </div>

        <Link href={{pathname:`/${lang}/post/${slug?.current}`,query: {slug:slug?.current}}} key={id} className={`h5 card-title ${styles.textTruncate2} text-truncate-2 link-underline link-underline-opacity-0`}>
          {lang === "en" ? title.en : title.ar}
        </Link>
            
        <p className={`card-text ${styles.textTruncate3} ${styles.fs7} text-truncate-3 fs-7`}>
        {lang === "en" ? description.en : description.ar}
        </p>
      </div>
    </div>
  )
}

export default Card