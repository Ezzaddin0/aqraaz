import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export default async function FeaturedArticle({ lang, posts }) {
  return (
    (<section className="relative overflow-hidden rounded-lg py-6 md:py-12 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-gray-950/80" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link href={`${lang}/categories/${posts.catSlug}`} className="rounded-full first:bg-gray-200 first:text-gray-900 first:dark:bg-gray-800 first:dark:text-gray-400 bg-primary px-4 py-1 text-xs font-medium text-white">
            {posts.catSlug}
          </Link>
          <p className="text-sm text-gray-400">{format((posts.createdAt), 'MMMM d, yyyy')}</p>
        </div>
        <div className="max-w-3xl">
          <Link href={`${lang}/post/${posts.slug}`} className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            {lang == 'en' ? posts.title.en : posts.title.ar}
          </Link>
          <p className="mt-4 line-clamp-4 md:line-clamp-none text-lg leading-relaxed text-gray-300">
            {lang == 'en' ? posts.desc.en : posts.desc.ar}
          </p>
        </div>
      </div>
      <Image src={posts.img} width={1280} loading="lazy" height={720} alt={posts.title.en} className={`absolute inset-0 -z-10 h-full w-full aspect-video`} />
    </section>)
  );
}