import {Skeleton} from "@/components/ui/skeleton"

function PostCard() {
    return (
        <div className="relative rounded-lg overflow-hidden h-[250px] group">
          {/* <Image
            alt={post.title[lang]}
            className="object-cover aspect-[300/150] w-full h-full"
            height={250}
            src={post.img}
            width={300}
          /> */}
          <Skeleton className="w-[300px] h-[250px]" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /> */}
          {/* <div className="absolute bottom-2 left-2 right-2 text-gray-50 group-hover:text-gray-200 transition-colors">
            <Badge className="rounded-sm">{format(new Date(post.createdAt), "MMMM d, yyyy")}</Badge>
            <h3 className="text-lg line-clamp-1 font-semibold">
              {post.title[lang]}
            </h3>
            <p className="text-sm line-clamp-2">{post.desc[lang]}</p>
          </div> */}
        </div>
    );
}

export default function loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mt-4">
      <div className="relative rounded-lg overflow-hidden h-auto">
        {/* <Image
          alt={Posts.posts[0].title[lang]}
          className="object-cover lg:aspect-[800/500]"
          height={500}
          src={Posts.posts[0].img}
          width={800}
        /> */}
        <Skeleton className="w-[800px] h-[500px]" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /> */}
        {/* <Badge className="absolute top-4 right-4 bg-gray-900 text-gray-50 px-3 py-1 rounded-md text-sm">
          {Posts.posts[0].catSlug}
        </Badge> */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6">
          <Badge className="rounded-sm">{format(new Date(Posts.posts[0].createdAt), "MMMM d, yyyy")}</Badge>
          <Link
            href={`${lang}/post/${Posts.posts[0].slug}`}
            className="text-2xl md:text-4xl line-clamp-1 font-bold text-gray-50"
          >
            {Posts.posts[0].title[lang]}
          </Link>
          <p className="text-gray-300 line-clamp-2 mt-2 md:text-lg">
            {Posts.posts[0].desc[lang]}
          </p>
        </div> */}
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {["", "", "", ""].slice(1, 3).map((article, index) => (
            <PostCard />
          ))}
        </div>
      </div>
    </div>
  )
}
