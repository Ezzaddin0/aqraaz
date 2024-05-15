import React from 'react'
import { urlFor } from '../lib/createClient'
import { colors } from '../helper/Colors'
import formatDate from '../helper/formatDate'; // Adjust the path according to your file structure
import Link from 'next/link';
import Image from 'next/image';

// function formatDate(dateString) {
//   const dateObject = new Date(dateString);
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: '2-digit',
//     year: 'numeric',
//   }).format(dateObject);
// }


export default function Card({ post, lang }) {
  const datePost = formatDate(post._createdAt)
  return (
    <article ml-autoy={post._id} className="flex max-w-xl flex-col items-start justify-between">
        <div className="relative w-full">
            <Image width={378} height={252} src={urlFor(post.mainImage).url()} alt={lang == 'en' ? post.title.en : post.title.ar} className=" aspect-video w-full rounded-2xl bg-gray-100 dark:bg-gray-800 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        </div>
        <div className=" max-w-xl">
            <div className="flex mt-8 items-center gap-x-2 text-xs">
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
            <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                <Link className='line-clamp-2' href={`/${lang}/post/${post.slug.current}`}>
                <span className="absolute inset-0" />
                {lang == 'en' ? post.title.en : post.title.ar}
                </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{lang == 'en' ? post.description.en : post.description.ar}</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
            <Image width={40} height={40} src={urlFor(post.author.image).url()} alt={post.author.name} className="h-10 w-10 rounded-full object-cover bg-gray-50 dark:bg-gray-700" />
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
    </article>
  )
}