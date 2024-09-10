'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import useSWR from "swr";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';


const fetcher = async (url) => {
    const res = await fetch(url);
  
    const data = await res.json();
  
    if (!res.ok) {
      const error = new Error(data.message);
      throw error;
    }
  
    return data.documents;
};


export default function Comments({ postSlug, avatar }) {
    const { status, data } = useSession();

  const { data: dataComments, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );  

  const [desc, setDesc] = useState("");


  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };
  return (
    <div className='pt-4 mt-4 border-t border-gray-200 dark:border-gray-700'>
        <h2 className="mb-4 text-2xl font-bold">Comments &#10088;{isLoading ? "0" : dataComments.length}&#10089;</h2>
        <div className="space-y-6">
        {status === "authenticated" ? (
        <div className="mt-6 flex space-x-4">
          <Image alt="Your Avatar" className="h-12 w-12 aspect-[48/48] object-cover rounded-full" height={48} src={data?.user?.image}width={48} />
          <Input onChange={(e) => setDesc(e.target.value)} className="flex-1" placeholder="Write a comment..." type="text" />
          <Button onClick={handleSubmit} type="submit">Post</Button>
        </div>
        )
        :
        (
        <Link className='border border-gray-200 flex w-full rounded shadow-sm p-2' href={`/login`}>Login to write a comment</Link>
        )
        }

        {isLoading ? "loading" :
            dataComments?.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            {comment.user[0].image && (
            <Image alt="Comment Author Avatar" className="h-12 w-12 aspect-[48/48] object-cover rounded-full" height={48} src={comment.user[0].image} width={48} />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{comment.user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.desc}</p>
            </div>
          </div>
            )
        )}
          {/* <div className="flex items-start space-x-4">
            <img
              alt="Comment Author Avatar"
              className="h-12 w-12 rounded-full"
              height={48}
              src="http://localhost:3001/placeholder.svg"
              style={{
                aspectRatio: "48/48",
                objectFit: "cover",
              }}
              width={48} />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">John Smith</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">June 13, 2024 at 12:30 PM</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Excellent article! The section on edge computing was particularly insightful. I can't wait to try
                out Vercel for our next project.
              </p>
            </div>
          </div> */}
        </div>
    </div>
  )
}