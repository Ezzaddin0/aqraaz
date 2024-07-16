// import React from 'react'
// import Filter from '../../../../../components/Filter';
// import { groq } from 'next-sanity';
// import { client } from '../../../../../lib/createClient'
// import CardColumn from '../../../../../components/CardColumn'
// import Script from 'next/script';
import CardCustom from '../../../../../components/component/Card';


export const revalidate = 30;

const getData = async (slug) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts?search=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export async function generateMetadata({params: {locale, slug}}) {
  const decodedString = decodeURIComponent(slug);

  const post = await getData(decodedString);

  return{
    title: locale === "en" ? post.posts[0].title.en : post.posts[0].title.ar,
    description: locale == "en" ? post.posts[0].desc.en : post.posts[0].desc.ar,
    keywords: locale == "en" ? post.posts[0].keywords.en : post.posts[0].keywords.ar,
    category: post.posts[0].catSlug,
    alternates: {
      canonical: `${locale}/search/${slug}`,
      languages: {
        'en': `/en/search/${slug}`,
        'ar': `/ar/search/${slug}`,
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: locale === "en" ? post.posts[0].title.en : post.posts[0].title.ar,
      description: locale == "en" ? post.posts[0].desc.en : post.posts[0].desc.ar,
      url: `${locale}/search/${slug}`,
      siteName: "Aqraaz.com",
      images: [{
        url: post.posts[0].img,
        alt: locale === "en" ? post.posts[0].title.en : post.posts[0].title.ar,
      }]
    }
  }
}

export default async function page({ params: { slug, locale }}) {
    const decodedString = decodeURIComponent(slug);
    // console.log(decodedString);

    // const query = groq`*[_type == 'post' && (title.en match $decodedString + "*" || title.ar match $decodedString + "*")] {
    //   ...,
    //     categories[]->,
    //   author->,
    // } | order(_createdAt asc)
    // `
    // const posts = await client.fetch(query,{decodedString});

  const posts = await getData(decodedString);
  // console.log(posts);

  return (
    <>
    <div className='px-4 py-6 sm:px-4 sm:py-12 lg:px-6 flex flex-col gap-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.posts.map((post, index) => (
              <CardCustom key={index} article={post} lang={locale}  />
          ))}
        </div>
    </div>  

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
  )
}
