import { urlFor } from '@/lib/createClient';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

interface Props {
  id: any;
  title?: any;
  imageUrl: any;
  createdAt?: any;
  slug?: any;
  lang: any;
}

const SideItem = ({ id, title, imageUrl, createdAt, slug, lang }: Props) => {
  return (
    <li>
        <div className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top">
        <Link href={{pathname:`/${lang}/post/${slug?.current}`,query: {slug:slug?.current}}} aria-label={title} key={id} className='w-100'>
        {/* <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}
        <Image src={urlFor(imageUrl).url()} alt='' height="96" width="100" className='w-100 object-fit-cover' ></Image>
        </Link>
        <div className="col-lg-8">
            <Link href={{pathname:`/${lang}/post/${slug?.current}`,query: {slug:slug?.current}}} key={id} className='link-underline link-underline-opacity-0 text-body w-100'><p className="h6 mb-0">{lang === "en" ? title.en : title.ar}</p></Link>
            <small className="text-body-secondary">{new Date(createdAt).toLocaleDateString('en-US',{
              day: "numeric",
              month: "long",
              year: "numeric"
            })}</small>
        </div>
        </div>
    </li>
  )
}

export default SideItem