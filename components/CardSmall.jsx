import React from 'react'
import { urlFor } from '../lib/createClient'
import Link from 'next/link'
import Image from 'next/image'

export default function CardSmall({ post, lang }) {
  return (
    <article ml-autoy={post._id} className="relative isolate flex flex-col gap-8 lg:flex-row">
        <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-36 lg:flex-shrink-0">
        <Image width={144} height={152} src={urlFor(post.mainImage).url()} alt={post.title.en} className=" absolute inset-0 h-full w-full rounded-2xl bg-gray-100 dark:bg-gray-800 object-cover" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
        </div>
        <div className="">
        {/* <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={post.datetime} className="text-gray-500">
            {post.date}
            </time>
            <a
            href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-mediflex-1 text-gray-600 hover:bg-gray-100"
            >
            {post.category.title}
            </a>
        </div> */}
        <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
            <Link href={`${lang}/post/${post.slug.current}`}>
                <span className="absolute inset-0" />
                {lang == 'en' ? post.title.en : post.title.ar}
            </Link>
            </h3>
            <p className="mt-5 text-sm leading-6 line-clamp-3 text-gray-600 dark:text-gray-300">{lang == 'en' ? post.description.en : post.description.ar}</p>
        </div>
        {/* <div className="mt-6 flex border-t border-gray-900/5 pt-6">
            <div className="relative flex items-center gap-x-4">
            <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
            <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                <a href={post.author.href}>
                    <span className="absolute inset-0" />
                    {post.author.name}
                </a>
                </p>
                <p className="text-gray-600">{post.author.role}</p>
            </div>
            </div>
        </div> */}
        </div>
    </article>
  )
}