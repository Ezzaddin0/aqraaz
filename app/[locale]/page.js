// import Script from "next/script";
import HeroSection from "../../components/component/hero-section"
import PopularArticles from "../../components/component/popular-articles"
import SectionCards from "../../components/component/section-cards"
import FeaturedArticle from "../../components/component/featured-article"
import PrimarySectionCard from "../../components/component/primary-section-card"
import CategoriesSection from "../../components/component/categories-section"
import AdsCard from '../../components/AdsCard'
import { getPosts, getCategory } from "../../data/dataApi"

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
  // const allPosts = await getPosts({
  //   page: 1,
  //   // cat: 'news',
  //   // searchQuery: 'latest updates',
  //   include: {
  //     user: true,
  //     cat: true,
  //     comments: {
  //       include: {
  //         user: true,
  //       }
  //     },
  //     views: true,
  //   },
  // });
  const allPosts = await getPosts();
  const allNews = await getCategory('news');
  const allSports = await getCategory('sports');
  const allTech = await getCategory('technology');    

  const postWithHighestViews = allPosts.posts.reduce((max, post) => (post.views.length > max.views.length ? post : max), allPosts.posts[0]);
  
  return (
    <>
      <AdsCard />
      
      <HeroSection Posts={allPosts} lang={locale} />

      <AdsCard />

      <PopularArticles Posts={allPosts} lang={locale} />
      
      <AdsCard />

      <SectionCards title={locale == "en" ? "Technology" : "تكنولوجيا"} time Posts={allTech[0]} lang={locale} />

      <AdsCard />

      <FeaturedArticle posts={postWithHighestViews} lang={locale} />

      <AdsCard />

      <SectionCards title={locale == "en" ? "News" : "الاخبار"} time Posts={allNews[0]} lang={locale} />

      <PrimarySectionCard Posts={allSports} lang={locale} />

      <AdsCard />

      <CategoriesSection lang={locale} />

      <AdsCard />
    </>
  );
}