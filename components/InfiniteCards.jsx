'use client'
import React, { useState } from 'react'
import CardColumn from './CardColumn';
import CardCustom from './component/Card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"  

function InfiniteCards({postsAll, number, lang, searchParams}) {
    // const page = 1;
    const [posts, setPosts] = useState(postsAll)
    const [index, setIndex] = useState(number || 3);

    async function loadMoreCard() {
        const next = index + (number || 3)
        if (postsAll.length) {
            setIndex(next)
        }
    } 

    // const POST_PER_PAGE = 2;

    // const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    // const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
  return (
    <div className='flex flex-col gap-8'>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.slice(0,index).map(post => (
            <CardCustom key={post.title.en} article={post} lang={lang} views time />
        ))}
        </div>

        {index >= posts.length ? <p>{lang == 'en' ? 'Finshed' : 'النهاية'}</p> : <button onClick={loadMoreCard} className="rounded-md w-max self-center bg-indigo-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-gray-100 shadow-sm hover:bg-indigo-100 dark:hover:bg-gray-950">{lang == 'en' ? 'load more' : 'تحميل المزيد'}</button>
        }
        {/* <Pagination>
            <PaginationContent>
                <PaginationItem disabled>
                    <PaginationPrevious href="#" />
                </PaginationItem>

                <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#">
                    2
                </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination> */}
    </div>
  )
}

export default InfiniteCards