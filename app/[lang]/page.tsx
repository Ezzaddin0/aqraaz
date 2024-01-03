// import 'bootstrap/dist/css/bootstrap.css'
import styles from './page.module.css'
import heroImage from "@/assets/images/image-home.svg"
import Image from 'next/image'
import TitleSeciton from '@/components/Title-Seciton/TitleSeciton'
import Card from '@/components/Card/Card'
import CardHorizontal from '@/components/Card-Horizontal/CardHorizontal'
import CardText from '@/components/CardText/CardText'
import CardSide from '@/components/CardSide/CardSide'
import List from '@/components/List/List'
import { groq } from 'next-sanity'
import { client } from '@/lib/createClient'
import { Post } from '@/types'
import PopularPostSection from '@/components/PopularPostSection/PopularPostSection'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'
import Script from 'next/script'
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics'


interface Props {
    posts: Post[];
}

export const revalidate = 30;

export async function generateMetadata({
  params: {lang, slug}
}: {
  params: {lang: Locale, slug: any}
}, parent:any) {
  const { page } = await getDictionary(lang);
  

  return{
    title: `${lang === "en" ? "Home" : "الصفحة الرئيسية"}`,
    description: `${lang === "en" ? 'Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories' : 'اكتشف رؤى لا حدود لها عبر مجالات متنوعة على مدونة أقراز. تعمق في مجموعة كبيرة من المحتوى المتخصص الذي يغطي التكنولوجيا واستراتيجيات الأعمال واتجاهات نمط الحياة والنصائح الصحية والمزيد. تلبي مجموعتنا المنسقة من المقالات والموارد جميع مستويات الاهتمام والخبرة، مما يضمن تجربة قراءة مجزية للجميع. استكشف مدونة أقراز اليوم للحصول على وجهات نظر الخبراء والنصائح القيمة والتحليلات المتعمقة عبر عدد لا يحصى من الفئات.'}`,
    keywords: lang === "en" ? ['aqraaz','Aqraaz','aqra','aqraa','seo','digital marketing','technology','business','lifestyle','health','entrepreneurship','content creation','social media','career','finance','innovation','self-improvement','e-commerce','design','data analytics','cybersecurity','remote work','sustainability','travel','sports','news','programming','blogging','web development','online presence',] : ['قراءة','قراز','قراء','قراءة','تحسين محركات البحث','التسويق الرقمي','التكنولوجيا','الأعمال','نمط الحياة','الصحة','ريادة الأعمال','إنشاء المحتوى','وسائل التواصل الاجتماعي','المهنة','التمويل','الابتكار','تطوير الذات','التجارة الإلكترونية','التصميم','تحليل البيانات','أمان المعلومات','العمل عن بُعد','الاستدامة','السفر','الرياضة','الأخبار','البرمجة','كتابة المدونات','تطوير الويب','الوجود على الإنترنت']
    ,
    alternates: {
      canonical: lang === "en" ? "/en" : "/ar",
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: `${lang === "en" ? "Home" : "الصفحة الرئيسية"}`,
      description: `${lang === "en" ? 'Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories' : 'اكتشف رؤى لا حدود لها عبر مجالات متنوعة على مدونة أقراز. تعمق في مجموعة كبيرة من المحتوى المتخصص الذي يغطي التكنولوجيا واستراتيجيات الأعمال واتجاهات نمط الحياة والنصائح الصحية والمزيد. تلبي مجموعتنا المنسقة من المقالات والموارد جميع مستويات الاهتمام والخبرة، مما يضمن تجربة قراءة مجزية للجميع. استكشف مدونة أقراز اليوم للحصول على وجهات نظر الخبراء والنصائح القيمة والتحليلات المتعمقة عبر عدد لا يحصى من الفئات.'}`,
      url: "/",
      siteName: "Aqraaz.com"
    }
  }

}

const queryMost = groq`
*[title match 'most popular']{
  posts[]->{
    ...,
      categories[]->,
  }
} | order(_createdAt asc)`

const query = groq`
*[_type == 'post']{
  ...,
  author->,
    categories[]->,
} | order(_createdAt desc)`

export default async function Home({
  params: {lang}
}: {
  params: {lang: Locale}
}) {
  const posts = await client.fetch(query);
  const mostPopular = await client.fetch(queryMost);
  // console.log(mostPopular);

  const { page } = await getDictionary(lang)

  
  return (
    <>
    <div>
      <section className='Heroes container col-xxl-8 py-4 justify-content-center'>
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-0">
          <div className="col-10 col-sm-8 col-lg-6">
            <Image src={heroImage} alt='Image Hero' className='w-100' width={600} height={400}></Image>
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3"><span className=' text-primary'>{page.home.heroes.title} </span>{page.home.heroes.description}</h1>
            <p className="lead">{page.home.heroes.subtitle.first}<span className=' text-primary'> {page.home.heroes.title}</span>: {page.home.heroes.subtitle.second}</p>
          </div>
        </div>
      </section>
      <section className='popular-post'>
        <TitleSeciton text={page.home.popular.title}/>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center py-3'>
          {mostPopular[0]?.posts.slice(0,3).map((post:any) => (
          <div className="col mb-2">
            <Card lang={lang} id={post?._id} imageUrl={post?.mainImage} title={post?.title} description={post?.description} categories={post?.categories} createdAt={post?._createdAt} slug={post?.slug} />
          </div>
          ))}
        </div>
      </section>
      {/* <PopularPostSection posts={posts} /> */}

      <section>
        <TitleSeciton text={page.home.lastest.title} />
        <div className="row">
          <div className="col-md-7 py-3 gap-2">
          {posts.slice(0,3).map((post:any) => (
            <CardHorizontal lang={lang} id={post?._id} imageUrl={post?.mainImage} title={post?.title} description={post?.description} categories={post?.categories} createdAt={post?._createdAt} slug={post?.slug}/>
          ))}
            <div className='py-3 d-flex align-items-center justify-content-center'>
              <Link href={"/lastast"} className="btn btn-primary">{page.home.lastest.more}</Link>
            </div>
          </div>
          <div className="col-md-5 py-3">
            <CardText lang={lang}/>
            <CardSide posts={posts} lang={lang} />
            <TitleSeciton text={page.home.categoriesList.title} />
            <div className='py-3'>
              <List lang={lang}/>
            </div>
          </div>
        </div>
      </section>
    </div>
    {/* Google tag (gtag.js) */}
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
  )
}
