import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link"

export default async function HeroSection({ Posts, lang }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mt-4">
      <div className="relative rounded-lg overflow-hidden h-auto">
        <Image alt={lang == "en"? Posts.posts[0].title.en : Posts.posts[0].title.en} className="object-cover lg:aspect-[800/500]" height={500} src={Posts.posts[0].img} width={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-4 right-4 bg-gray-900 text-gray-50 px-3 py-1 rounded-md text-sm">{lang == "en"? Posts.posts[0].cat.title.en : Posts.posts[0].cat.title.en}</div>
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6">
          <span className="bg-gray-900 text-gray-50 px-3 py-1 rounded-md text-sm">{format(new Date(Posts.posts[0].createdAt), 'MMMM d, yyyy')}</span>
          <Link href={`${lang}/post/${Posts.posts[0].slug}`} className="text-2xl md:text-4xl line-clamp-1 font-bold text-gray-50">{lang == "en"? Posts.posts[0].title.en : Posts.posts[0].title.ar}</Link>
          <p className="text-gray-300 line-clamp-2 mt-2 md:text-lg">
            {lang == "en"? Posts.posts[0].desc.en : Posts.posts[0].desc.ar}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {Posts.posts.slice(1, 3).map((article, index) => {
            return (
              <Link className="group" href={`${lang}/post/${article.slug}`}>
                <div className="relative rounded-lg overflow-hidden h-[250px]">
                <Image alt={lang == "en"? article.title.en : article.title.ar} className="object-cover aspect-[300/150] w-full h-full" height={250} src={article.img} width={300} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-gray-50 group-hover:text-gray-200 transition-colors">
                    <span className="bg-gray-900 text-gray-50 px-3 py-1 rounded-md text-sm">{format(new Date(article.createdAt), 'MMMM d, yyyy')}</span>
                    <h3 className="text-lg line-clamp-1 font-semibold">{lang == "en"? article.title.en : article.title.ar}</h3>
                    <p className="text-sm line-clamp-2">{lang == "en"? article.desc.en : article.desc.ar}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}