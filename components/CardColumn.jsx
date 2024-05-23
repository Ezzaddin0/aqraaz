import React from 'react'
import formatDate from '../helper/formatDate'
import { urlFor } from '../lib/createClient'
import Link from 'next/link'
import Image from 'next/image'

export default function CardColumn({ post, lang, key }) {
    const datePost = formatDate(post._createdAt)
  return (
    <article key={key} ml-autoy={post._id} className="relative isolate flex flex-col gap-8 lg:flex-row">
        <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:flex-shrink-0">
            <Image width={256} height={256} src={urlFor(post.mainImage).url()} alt={lang == 'en' ? post.title.en : post.title.ar} className=" absolute inset-0 h-full w-full rounded-2xl bg-gray-100 dark:bg-gray-800 object-cover" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
        </div>
        <div className="">
            <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={post._createdAt} className="text-gray-500 dark:text-gray-400">
                {datePost}
            </time>
            {post.categories.slice(0,2).map((category, index) => (
            <Link
                href={`/${lang}/categories/${category.slug.current}`}
                className={`relative z-10 rounded-full  ${index == 0 ? 'bg-blue-300 hover:bg-blue-400' : 'bg-indigo-300 hover:bg-indigo-400'} px-3 py-1.5 font-mediflex-1 text-gray-50`}
            >
                {lang == 'en' ? category.title.en : category.title.ar}
            </Link>
            ))}
            </div>
            <div className="group relative ">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                <Link className='line-clamp-2' href={`/${lang}/post/${post.slug.current}`}>
                <span className="absolute inset-0" />
                {lang == 'en' ? post.title.en : post.title.ar}
                </Link>
            </h3>
            <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300 line-clamp-3">{lang == 'en' ? post.description.en && post.description.en : post.description.ar && post.description.ar}</p>
            </div>
            <div className="mt-6 flex border-t border-gray-900/5 dark:border-gray-100/5 pt-6">
            <div className="relative flex items-center gap-x-4">
                <Image width={256} height={256} src={urlFor(post.author.image).url()} alt={post.author.name} className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700" />
                <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                    <Link href={''}>
                        {/* href={post.author.slug} */}
                    <span className="absolute inset-0" />
                    {post.author.name}
                    </Link>
                </p>
                <p className="text-gray-600 dark:text-gray-300">{post.author.descroption}</p>
                </div>
            </div>
            </div>
        </div>
    </article>
  )
}