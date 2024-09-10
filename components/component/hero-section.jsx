"use client"
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link"
import { Badge } from "../ui/badge";
import { urlFor } from "@/lib/createClient";

// Component for a single post
function PostCard({ post, lang }) {
  return (
    <Link 
      // href={`${lang}/post/${post.slug}`} 
      href={`${lang}/post/${post.slug.current}`} 
      className="group"
    >
      <div className="relative rounded-lg overflow-hidden h-[250px]">
        <Image
          alt={post.title[lang]}
          className="object-cover aspect-[300/150] w-full h-full"
          height={250}
          loading="lazy"
          // src={post.img}
          src={urlFor(post.mainImage).url()}
          width={300}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 text-gray-50 group-hover:text-gray-200 transition-colors">
          {/* <Badge className="rounded-sm">{format(new Date(post.createdAt), "MMMM d, yyyy")}</Badge> */}
          <Badge className="rounded-sm">{format(new Date(post._createdAt), "MMMM d, yyyy")}</Badge>
          <h3 className="text-lg line-clamp-1 font-semibold">
            {post.title[lang]}
          </h3>
          {/* <p className="text-sm line-clamp-2">{post.desc[lang]}</p> */}
          <p className="text-sm line-clamp-2">{post.description[lang]}</p>
        </div>
      </div>
    </Link>
  );
}

export default function HeroSection({ Posts, lang }) {  
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mt-4">
      <div className="relative rounded-lg overflow-hidden h-auto">
        <Image
          alt={Posts[0].title[lang]}
          className="object-cover lg:aspect-[800/500]"
          loading="lazy"
          height={500}
          // src={Posts[0].img} -- my api
          src={urlFor(Posts[0].mainImage).url()}
          width={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-gray-900 text-gray-50 px-3 py-1 rounded-md text-sm">
          {/* {Posts[0].catSlug} */}
          {Posts[0].categories[0].title[lang]}
        </Badge>
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6">
          {/* <Badge className="rounded-sm">{format(new Date(Posts[0].createdAt), "MMMM d, yyyy")}</Badge> */}
          <Badge className="rounded-sm">{format(new Date(Posts[0]._createdAt), "MMMM d, yyyy")}</Badge>
          <Link
            // href={`${lang}/post/${Posts[0].slug}`}
            href={`${lang}/post/${Posts[0].slug.current}`}
            className="text-2xl md:text-4xl line-clamp-1 font-bold text-gray-50"
          >
            {Posts[0].title[lang]}
          </Link>
          <p className="text-gray-300 line-clamp-2 mt-2 md:text-lg">
            {/* {Posts[0].desc[lang]} */}
            {Posts[0].description[lang]}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {Posts.slice(1, 3).map((article, index) => (
            <PostCard key={index} post={article} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  )
}