import Image from "next/image";
import Link from "next/link";
import CardCustom from "./Card";
import { format } from "date-fns";
import { urlFor } from "@/lib/createClient";

export default async function PrimarySectionCard({ Posts, lang }) {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="mb-4 md:mb-8 lg:mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {lang == "en" ? "Sports" : "رياضة"}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <article className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <Link
            className="block md:h-[550px] w-full overflow-hidden"
            href={`${lang}/post/${Posts.posts[0].slug.current}`}
          >
            <Image
              alt={Posts.posts[0].title[lang]}
              className="h-full w-full object-cover aspect-[800/400] transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              height={600}
              // src={Posts.posts[0].img}
              src={urlFor(Posts.posts[0].mainImage).url()}
              width={800}
            />
          </Link>
          <div className="p-4">
            <div className="mb-2 text-sm text-gray-500">
              {format(Posts.posts[0]._createdAt, "MMMM d, yyyy")}
            </div>
            <h3 className="mb-2 text-lg font-bold transition-colors duration-300 group-hover:text-primary">
              <Link href={`${lang}/post/${Posts.posts[0].slug.current}`}>
                {Posts.posts[0].title[lang]}
              </Link>
            </h3>
            <p className="text-gray-500 line-clamp-2">
              {Posts.posts[0].description[lang]}
            </p>
          </div>
        </article>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Posts.posts.slice(1, 5).map((article, index) => (
            <CardCustom time key={index} article={article} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
