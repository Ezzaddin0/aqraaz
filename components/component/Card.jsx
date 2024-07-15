import { Eye, Flame } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { urlFor } from '../../lib/createClient'
import { format, parseISO } from 'date-fns'

const formatDate = (isoDateString) => {
    const date = parseISO(isoDateString);
    return format(date, 'MMMM d, yyyy');
};

export default function CardCustom({article, lang, index, time, ...props}) {
    // console.log(urlFor(article.mainImage).url());
  return (
    <article key={index} ml-autoy={index} className="flex w-full flex-col items-start justify-between">
        <div className="relative w-full">
            <Image width={378} height={252} loading='lazy' src={article.img} alt={lang == "en"? article.title.en : article.title.ar}  className=" aspect-video w-full rounded-2xl bg-gray-100 dark:bg-gray-800 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        </div>
        <div className=" w-full">
            <div className="flex mt-4 items-center justify-between gap-x-2 text-xs">
            {time  && <time dateTime={formatDate(article.publishedAt || article.createdAt)} className="text-gray-500 dark:text-gray-400">
                {formatDate(article.createdAt)}
            </time>}
            {props.views && <p className="flex items-center px-2 py-1 bg-gray-100 text-black rounded w-fit">{article.views.length} <Eye className="w-4 h-4 ml-2" /></p>}

            {/* {props.category && <div className="flex items-center gap-2">
            {
                article.categories.slice(0,2).map((category, index) => (
                    <Link
                        key={index}
                        href={`/${lang}/categories/${category.slug.current}`}
                        className={`relative z-10 rounded-full  ${index == 0 ? 'bg-blue-300 hover:bg-blue-400' : 'bg-indigo-300 hover:bg-indigo-400'} px-3 py-1.5 font-mediflex-1 text-gray-50`}
                    >
                        {lang == 'en' ? category.title.en : category.title.ar}
                    </Link>
              ))
            }    
            </div>} */}

            {props.visitors && <p className="flex items-center px-2 py-1 my-2 bg-gray-100 text-black text-xs rounded w-fit">{"187"} now<Flame className="w-4 h-4 ml-2" /></p>}
            {/* {post.categories.slice(0,2).map((category, index) => (
            <Link
                href={`/${lang}/categories/${category.slug.current}`}
                className={`relative z-10 rounded-full  ${index == 0 ? 'bg-blue-300 hover:bg-blue-400' : 'bg-indigo-300 hover:bg-indigo-400'} px-3 py-1.5 font-mediflex-1 text-gray-50`}
            >
                {lang == 'en' ? category.title.en : category.title.ar}
            </Link>
            ))} */}
            </div>
            <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                {/* <Link className='line-clamp-2' href={`/${lang}/post/${article.slug.current}`}> */}
                <Link className='line-clamp-2' href={`/${lang}/post/${article.slug}`}>
                <span className="absolute inset-0" />
                {/* {lang == 'en' ? article.title.en : article.title.ar} */}
                {lang == 'en' ? article.title.en : article.title.ar}
                </Link>
            </h3>
            {/* <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{lang == 'en' ? article.description.en : article.description.ar}</p> */}
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{lang == 'en' ? article.desc.en : article.desc.ar}</p>
            </div>
            {/* <div className="relative mt-8 flex items-center gap-x-4">
            <Image width={40} height={40} src={urlFor(post.author.image).url()} alt={post.author.name} className="h-10 w-10 rounded-full object-cover bg-gray-50 dark:bg-gray-700" />
            <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                <Link href={''}>
                    <span className="absolute inset-0" />
                    {post.author.name}
                </Link>
                </p>
                <p className="text-gray-600 dark:text-gray-300">{post.author.descroption}</p>
            </div>
            </div> */}
        </div>
    </article>
  )
}