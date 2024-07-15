'use client'
import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import Link from 'next/link';
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/oJg6VYw3mZk
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { usePathname } from 'next/navigation'

export default function Footer({lang}) {
    const pathName = usePathname().split('/')[2];
    // const { resolvedTheme } = useTheme();
    return (
    <div className={`${['/login', 'login', '/signup', 'signup', '/en/studio', 'studio'].includes(pathName) ? ' hidden' : ''}`}>
    <header className="bg-gray-50 text-black py-4 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-lg font-bold">Aqraaz</h1>
            <p className="text-sm text-gray-800">
              {lang === 'en' ? 'Aqraaz: Your Ticket to a World Beyond Ordinary.' : 'Aqraaz: تذكرتك إلى عالم ما وراء العادي.'}
            </p>
          </div>
        </div>
      </header>
      <footer className="bg-gray-50 text-black py-12 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <h2 className="text-lg font-bold">{lang === 'en' ? 'Pages' : 'الصفحات'}</h2>
            <ul className="space-y-1 text-sm">
              <li><Link className="hover:underline" href="/">{lang === 'en' ? 'Home' : 'الرئيسية'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/categories`}>{lang === 'en' ? 'Categories' : 'الفئات'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/latest`}>{lang === 'en' ? 'Latest' : 'الأحدث'}</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold">{lang === 'en' ? 'Categories' : 'الفئات'}</h2>
            <ul className="space-y-1 text-sm">
              <li><Link className="hover:underline" href={`/${lang}/categories/news`}>{lang === 'en' ? 'News' : 'الأخبار'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/categories/sports`}>{lang === 'en' ? 'Sports' : 'الرياضة'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/categories/countries`}>{lang === 'en' ? 'Countries' : 'الدول'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/categories/technology`}>{lang === 'en' ? 'Technology' : 'التكنولوجيا'}</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold">{lang === 'en' ? 'Legal' : 'القانوني'}</h2>
            <ul className="space-y-1 text-sm">
              <li><Link className="hover:underline" href={`/${lang}/about`}>{lang === 'en' ? 'About' : 'حول'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/privacy_policy`}>{lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/connect_us`}>{lang === 'en' ? 'Connect with us' : 'اتصل بنا'}</Link></li>
              <li><Link className="hover:underline" href={`/${lang}/user_agreement`}>{lang === 'en' ? 'User Agreement' : 'اتفاقية المستخدم'}</Link></li>
            </ul>
          </div>
        </div>
      <div
        className="flex flex-wrap md:items-center justify-between mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-800">© 2024 Aqraaz.</p>
        <div className="flex flex-wrap space-x-4">
          {[{name: "Facebook", link: "https://www.facebook.com/profile.php?id=61555628315309", icon: <FacebookIcon className="w-6 h-6" />}, {name: "Instagram", link: "https://www.instagram.com/aqrraz/", icon: <InstagramIcon className="w-6 h-6" />}, {name: "Twitter", link: "https://twitter.com/aqraazbh", icon: <TwitterIcon className="w-6 h-6" />}, {name: "Youtube", link: "https://www.youtube.com/@Ezzaddin_", icon: <YoutubeIcon className="w-6 h-6" />}].map((soicale) => (
          <Link key={soicale.name} className="hover:text-gray-700" aria-label={soicale.name} href={soicale.link}>{soicale.icon}</Link>
          ))}
        </div>
      </div>
    </footer>
  </div>
  )
}