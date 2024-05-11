import { posts } from "../../data/Articles";
import {categories} from "../../data/Categories";
import Image from "next/image";
import Card from "../../components/Card";
import CardColumn from "../../components/CardColumn";
import CardSmall from "../../components/CardSmall";
import { fetchAllPosts, fetchArticle, fetchCategories, fetchMostPopular } from "../../data/data";
import { client } from "../../lib/createClient";
import { groq } from "next-sanity";
import { getDictionary } from "../../lib/dictionary";
import getRandomElements from "../../helper/RandomPosts";
import Link from "next/link";
import Script from "next/script";

export async function generateMetadata({ params: { locale } }) {
  
  return {
    title: locale == "en"? "Home" : "الصفحة الرئيسية",
    description: locale == "en"? "Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories" : 'اكتشف رؤى لا حدود لها عبر مجالات متنوعة على مدونة أقراز. تعمق في مجموعة كبيرة من المحتوى المتخصص الذي يغطي التكنولوجيا واستراتيجيات الأعمال واتجاهات نمط الحياة والنصائح الصحية والمزيد. تلبي مجموعتنا المنسقة من المقالات والموارد جميع مستويات الاهتمام والخبرة، مما يضمن تجربة قراءة مجزية للجميع. استكشف مدونة أقراز اليوم للحصول على وجهات نظر الخبراء والنصائح القيمة والتحليلات المتعمقة عبر عدد لا يحصى من الفئات.',
    keywords: locale == "en" ? ['aqraaz','Aqraaz','aqra','aqraa','seo','digital marketing','technology','business','lifestyle','health','entrepreneurship','content creation','social media','career','finance','innovation','self-improvement','e-commerce','design','data analytics','cybersecurity','remote work','sustainability','travel','sports','news','programming','blogging','web development','online presence',] : ['قراءة','قراز','قراء','قراءة','تحسين محركات البحث','التسويق الرقمي','التكنولوجيا','الأعمال','نمط الحياة','الصحة','ريادة الأعمال','إنشاء المحتوى','وسائل التواصل الاجتماعي','المهنة','التمويل','الابتكار','تطوير الذات','التجارة الإلكترونية','التصميم','تحليل البيانات','أمان المعلومات','العمل عن بُعد','الاستدامة','السفر','الرياضة','الأخبار','البرمجة','كتابة المدونات','تطوير الويب','الوجود على الإنترنت'],
    alternates: {
      canonical: locale == "en" ? "/en" : "/ar",
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
    other: {
      'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
    },
    openGraph: {
      title: locale == "en" ? "Home" : "الصفحة الرئيسية",
      description: locale == "en" ? 'Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories' : 'اكتشف رؤى لا حدود لها عبر مجالات متنوعة على مدونة أقراز. تعمق في مجموعة كبيرة من المحتوى المتخصص الذي يغطي التكنولوجيا واستراتيجيات الأعمال واتجاهات نمط الحياة والنصائح الصحية والمزيد. تلبي مجموعتنا المنسقة من المقالات والموارد جميع مستويات الاهتمام والخبرة، مما يضمن تجربة قراءة مجزية للجميع. استكشف مدونة أقراز اليوم للحصول على وجهات نظر الخبراء والنصائح القيمة والتحليلات المتعمقة عبر عدد لا يحصى من الفئات.',
      url: "/",
      siteName: "Aqraaz.com"
    }
  }
}

export default async function  Home({ params: { locale } }) {

  const { page } = await getDictionary(locale);

  const mostPopularPosts = await fetchMostPopular();
  const allPosts = await fetchAllPosts();
  const allCategories = await fetchCategories();
  const Article = await fetchArticle();

  return (
    <>
    <div>
      <div className="relative isolate px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-12">
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-white ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            <span className=" text-indigo-300"> {page.home.heroes.title} </span>{page.home.heroes.description}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{page.home.heroes.subtitle.first}<span className=" text-indigo-600"> {page.home.heroes.title}</span>: {page.home.heroes.subtitle.second}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${locale}/latest`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {page.home.heroes.btn}
              </Link>
              {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                Lepy-0.5 more <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl my-4 font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">{page.home.popular.title}</h2>
        <div className="grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {mostPopularPosts[0].posts.slice(0,3).map((post) => (
              <Card post={post} lang={locale} />
            ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl py-16 sm:px-6 sm:py-24 lg:px-8">
      <h2 className="text-2xl my-4 font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">{page.home.lastest.title}</h2>
        <div className="grid grid-cols-12 sm:gap-x-8 gap-y-16 lg:max-w-none mx-4 lg:ml-0">
          <div className=" col-span-12 lg:col-span-7 flex flex-col gap-y-12">
            {allPosts.slice(0,3).map((post) => (
              <CardColumn post={post} lang={locale} />
            ))}
            <Link href={`/${locale}/latest`} className="rounded-md w-max self-center bg-indigo-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-gray-100 shadow-sm hover:bg-indigo-100 dark:hover:bg-gray-950">{page.home.lastest.more}</Link>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="bg-gray-100/70 dark:bg-gray-800/70 rounded-lg p-6">
              <h2 className="text-xl font-bold">{locale == 'en' ? Article[0].title.en : Article[0].title.ar}</h2>
              <p>{locale == 'en' ? Article[0].description.en : Article[0].description.ar}</p>
            </div>
            <h2 className="text-2xl my-4 font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">{page.home.randomPosts.title}</h2>
            <div className="flex flex-col gap-y-12 pb-4">
              {getRandomElements(allPosts, 5).map((post) => (
                <CardSmall post={post} lang={locale} />
              ))}
            </div>

            <h2 className="text-2xl my-4 font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">{page.home.categoriesList.title}</h2>
            <nav className="flex flex-1 flex-col mt-8" aria-label="Sidebar">
              <ul role="list" className="-mx-2 abo">
                {allCategories.slice(0,5).map(category => (
                <li>
                  <Link href={`${locale}/${category.slug.current}`} className=" text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-950 bqe flex aaf adu p-2 pl-3 text-sm leading-6 font-semibold">{locale == 'en' ? category.title.en : category.title.ar}{category.posts && <span className="mx-4 w-9 min-w-max whitespace-nowrap rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 dark:text-gray-200 ring-1 ring-inset ring-gray-200 dark:ring-gray-900" aria-hidden="true">{category.posts.length}{category.posts.length > 99 ? '+' : ''}</span>}
                  </Link>
                </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}></Script>
    <Script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');
    `}
    </Script>
    </>
  );
}
