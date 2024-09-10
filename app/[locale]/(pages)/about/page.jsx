import React from "react";
import PrimaryImage from "@/assets/images/image-home.svg";
// import { getDictionary } from '../../../../lib/dictionary'
// import Script from 'next/script';
import Image from "next/image";
import { ArrowRightIcon, TagIcon } from "lucide-react";
import Link from "next/link";
import {
  fetchCategories,
  fetchPosts,
  getCategories,
  getPosts,
} from "@/data/dataApi";
import { groq } from "next-sanity";
import { client, urlFor } from "@/lib/createClient";

export const metadata = {
  title: "About",
  description:
    'I have a specialized website called "Aqraaz" which is a comprehensive blog covering various topics, specializations, and categories. Aqraaz aims to provide diverse and comprehensive content that meets the needs and interests of a diverse readership.',
  keywords: ["aqraaz", "Aqraaz", "aqra", "aqraa", "about"],
  alternates: {
    canonical: "/about",
    languages: {
      en: "/en/about",
      ar: "/ar/about",
    },
  },
  // robots: {
  //   index: false,
  //   nocache: true
  // },
  other: {
    "google-adsense-account": `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
  },
  openGraph: {
    title: "About",
    description:
      'I have a specialized website called "Aqraaz" which is a comprehensive blog covering various topics, specializations, and categories. Aqraaz aims to provide diverse and comprehensive content that meets the needs and interests of a diverse readership.',
    url: "/about",
    siteName: "Aqraaz.com",
  },
};

const getTags = [
  {
    slug: "technology",
    title: {
      en: "Technology",
      ar: "التكنولوجيا",
    },
  },
  {
    slug: "artificial-intelligence",
    title: {
      en: "Artificial Intelligence",
      ar: "الذكاء الاصطناعي",
    },
  },
  {
    slug: "cristiano-ronaldo",
    title: {
      en: "Cristiano Ronaldo",
      ar: "كريستيانو رونالدو",
    },
  },
  {
    slug: "football",
    title: {
      en: "Football",
      ar: "الرياضة",
    },
  },
  {
    slug: "bahrain",
    title: {
      en: "Bahrain",
      ar: "البحرين",
    },
  },
];

export default async function page({ params: { locale } }) {
  // const { page } = await getDictionary(locale);

  // const categories = await getCategories();
  // const categories = await getCategories({
  //   select: {
  //     title: true,
  //     slug: true,
  //   },
  // });

  // const categories = await fetchCategories(locale, ['title', 'slug'])

  const query = groq`*[_type == "category"]{
    title,
    slug,
  }[0...5]`;

  const categories = await client.fetch(query);

  // const posts = await getPosts({page: 1});
  // const posts = await getPosts({
  //   page: 1,
  //   select: {
  //     img: true,
  //     title: true,
  //     desc: true,
  //     slug: true,
  //   }
  // })
  // const posts = await fetchPosts(locale, ['img', 'title', 'desc','slug'], [], 3, 1)

  const queryPost = groq`*[_type == "post"]{
   title,
   description,
   slug,
   mainImage,
   _createdAt
  }[0...3]`;

  const posts = await client.fetch(queryPost);
  return (
    <>
      <main>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {locale == "en"
                    ? "Discover the Latest News and Insights"
                    : "اكتشف آخر الأخبار والرؤى"}
                </h1>
                <p className="text-gray-700 md:text-xl">
                  {locale == "en"
                    ? "Aqraaz is your go-to destination for in-depth articles and breaking news across a wide range of topics."
                    : "Aqraaz هو وجهتك المفضلة للحصول على مقالات متعمقة وأخبار عاجلة عبر مجموعة واسعة من المواضيع."}
                </p>
                <div className="flex gap-4">
                  <Link
                    href="latest"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-gray-700 shadow transition-colors hover:text-gray-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {locale == "en" ? "Explore Articles" : "اكتشف المقالات"}
                  </Link>
                  <Link
                    href="categories/news"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {locale == "en" ? "Explore News" : "اكتشف الأخبار"}
                  </Link>
                </div>
              </div>
              <Image
                src={PrimaryImage}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
              <div className="col-span-2">
                <div className="grid gap-8">
                  {posts.map((post, index) => (
                    <article key={index} className="grid md:grid-cols-2 gap-6">
                      <Image
                        src={urlFor(post.mainImage).url()}
                        width="550"
                        height="310"
                        alt={post.title[locale]}
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                      />
                      <div className="space-y-2">
                        <h2 className="text-xl font-bold">
                          {post.title[locale]}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2">
                          {post.description[locale]}
                        </p>
                        <Link
                          href={`post/${post.slug.current}`}
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          {locale == "en" ? "Read More" : "اقرأ المزيد"}
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {locale == "en" ? "Categories" : "الفئات"}
                  </h3>
                  <div className="grid gap-2">
                    {categories.slice(0, 5).map((category, index) => (
                      <Link
                        key={index}
                        href={`categories/${category.slug.current}`}
                        className="inline-flex capitalize items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-gray-900 hover:bg-muted/50"
                      >
                        <TagIcon className="h-4 w-4" />
                        {category.title[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {locale == "en" ? "Popular Tags" : "الكلمات الشعبية"}
                  </h3>
                  <div className="grid gap-2">
                    {getTags.slice(0, 5).map((tag, index) => (
                      <Link
                        key={index}
                        href={`search/${tag.slug}`}
                        className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-gray-900 hover:bg-muted/50"
                      >
                        <TagIcon className="h-4 w-4" />
                        {tag.title[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Google tag (gtag.js) */}
      {/* <Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}></Script>
    <Script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');
    `}
    </Script> */}
    </>
  );
}
