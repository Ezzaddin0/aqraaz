import { Eye, Flame } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'

export default function CardCustom({article, lang, index, time, ...props}) {
  return (
    <article key={index} ml-autoy={index} className="flex w-full flex-col items-start justify-between">
        <Link title={lang == 'en' ? article.title.en : article.title.ar} className='relative w-full' href={`/${lang}/post/${article.slug}`}>
            <Image width={378} height={252} loading='lazy' src={article.img} alt={lang == "en"? article.title.en : article.title.ar}  className=" aspect-video w-full border rounded-2xl bg-gray-100 dark:bg-gray-800 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        </Link>
        <div>
            <div className="flex mt-4 items-center justify-between gap-x-2 text-xs">
            {time  && <time dateTime={format((article.publishedAt || article.createdAt), 'MMMM d, yyyy')} className="text-gray-500 dark:text-gray-400">
                {format((article.publishedAt || article.createdAt), 'MMMM d, yyyy')}
            </time>}
            {props.views && <p className="flex items-center px-2 py-1 bg-gray-100 text-black rounded w-fit">{article.views.length} <Eye className="w-4 h-4 ml-2" /></p>}

            {props.visitors && <p className="flex items-center px-2 py-1 my-2 bg-gray-100 text-black text-xs rounded w-fit">{"187"} now<Flame className="w-4 h-4 ml-2" /></p>}
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                <Link title={lang == 'en' ? article.title.en : article.title.ar} className='line-clamp-2' href={`/${lang}/post/${article.slug}`}>
                {lang == 'en' ? article.title.en : article.title.ar}
                </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{lang == 'en' ? article.desc.en : article.desc.ar}</p>
            </div>
        </div>
    </article>
  )
}