import Link from 'next/link'
import React from 'react'
import styles  from "@/app/[lang]/page.module.css"
import { urlFor } from '@/lib/createClient';
import { Locale } from '@/i18n.config';
import Image from 'next/image';

interface Props {
    id: any;
    title?: any;
    description?: any;
    imageUrl: string;
    categories?: any;
    createdAt?: any;
    slug?: any;
    lang: Locale;
}

const CardHorizontal = ({ id, title, description, imageUrl, categories, createdAt, slug, lang }: Props) => {
  return (
    <div className="card mb-3 border-0 shadow-sm">
        <div className="row g-0">
        <div className="col-md-5">
            <Link href={{pathname:`/${lang}/post/${slug?.current}`,query: {slug:slug?.current}}} aria-label={title.en} key={id}>
            <Image
            src={urlFor(imageUrl).url()}
            alt=""
            className="img-fluid object-fit-cover w-100 rounded-start"
            height="250"
            width="1000"
            style={{height: "250px"}}
            />
            </Link>
        </div>
        <div className="col-md-7">
            <div className="card-body">
            <div className="d-flex gap-2 text-cneter align-items-center text-body-secondary mb-1">
                <div className={`fs-7 ${styles.fs7}`}>
                {categories.slice(0,2).map((item:any,index:number) => (
                <>
                <Link className='card-subtitle link-underline link-underline-opacity-0' key={item?._id} href={`/${lang}/categories/${item.slug.current}`}>{lang === "en" ? item.title : item.titleAr}</Link>
                {index !== categories.slice(0, 2).length - 1 && <span>, </span>}
                </>
                ))}
                </div>
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
            <p className={`card-text ${styles.textTruncate4} text-truncate-4 ${styles.fs7} fs-7`}>
            {lang === "en" ? description.en : description.ar}
            </p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CardHorizontal