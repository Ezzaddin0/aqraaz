// 'use client'
import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon, YoutubeIcon, BookOpen, CalendarIcon, SunIcon, User } from 'lucide-react';
import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation'
// import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "./ui/dropdown-menu"
// import { Button } from "./ui/button"
// import { signOut, useSession } from "next-auth/react"
import { format } from "date-fns"
// import useSWR from "swr"
// import Image from "next/image"
// import { useTheme } from "next-themes"
import HiddenWrapper from "./HiddenWrapper"
import LanguageDropdown from "./LanguageDropdown"
import {NavbarList, Sidebar} from "./NavbarList"
import SearchInput from "./SearchInput"
import UserDropdown from "./UserDropdown"
import { getCategories } from '../data/dataApi';

const ganeral = [
  {
    title: {
      en: "Categories",
      ar: "الفئات"
    },
    href: "categories",
    description: {
      en: "Explore various categories of articles and news. Dive into specialized content tailored to your interests and expertise.",
      ar: "استكشف مختلف فئات المقالات والأخبار. تعمق في محتوى متخصص مصمم لاهتماماتك ومستوى خبرتك."
    }
  },
  {
    title: {
      en: "Latest",
      ar: "الأحدث"
    },
    href: "latest",
    description: {
      en: "Check out the latest articles and updates. Stay informed with current news and trends across various domains.",
      ar: "اطلع على أحدث المقالات والتحديثات. ابقَ على اطلاع بالأخبار والاتجاهات الحالية عبر مختلف المجالات."
    }
  },
]

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export async function Footer({lang, dataCategories}) {
    // const { data: dataCategories, isLoading } = useSWR(
    //     `${process.env.NEXTAUTH_URL}/api/categories`,
    //     fetcher
    // );
  const Categories = await getCategories({
    include: {
      posts: {
        include: {
          views: true,
          comments: true
        }
      },
    },
  });
  return (
    <HiddenWrapper>
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
              {[{ title: { en: "Home", ar: "الرئيسية" }, href: "", }, ...ganeral].map((data) => (
                <li key={data.title.en}><Link className="hover:underline" href={`/${lang}/${data.href}`}>{lang === 'en' ? data.title.en : data.title.ar}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold">{lang === 'en' ? 'Categories' : 'الفئات'}</h2>
            <ul className="space-y-1 text-sm">
              {Categories.slice(0, 4).map((category) => (
                <li key={category.slug}><Link className="hover:underline" href={`/${lang}/categories/${category.slug}`}>{lang == 'en' ? category.title.en : category.title.ar}</Link></li>
              ))}
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
        <div className="flex flex-wrap md:items-center justify-between mt-8 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-800">© 2024 Aqraaz.</p>
          <div className="flex flex-wrap space-x-4">
            {[{ name: "Facebook", link: "https://www.facebook.com/profile.php?id=61555628315309", icon: <FacebookIcon className="w-6 h-6" /> }, { name: "Instagram", link: "https://www.instagram.com/aqrraz/", icon: <InstagramIcon className="w-6 h-6" /> }, { name: "Twitter", link: "https://twitter.com/aqraazbh", icon: <TwitterIcon className="w-6 h-6" /> }, { name: "Youtube", link: "https://www.youtube.com/@Ezzaddin_", icon: <YoutubeIcon className="w-6 h-6" /> }].map((social) => (
              <Link key={social.name} className="hover:text-gray-700" aria-label={social.name} href={social.link}>{social.icon}</Link>
            ))}
          </div>
        </div>
      </footer>
    </HiddenWrapper>
  )
}

export async function Header({lang}) {
  // const { resolvedTheme, theme, setTheme } = useTheme();
  // const theme = 'sun'

  // const { data: dataCategories, isLoading } = useSWR(
  //   `${process.env.NEXTAUTH_URL}/api/categories`,
  //   fetcher
  // );
  const Categories = await getCategories({
    include: {
      posts: {
        include: {
          views: true,
          comments: true
        }
      },
    },
  });

  return (
    <HiddenWrapper>
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-gray-800">{format(new Date(), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-800">
            <SunIcon className="h-4 w-4" />
            <span>25°C</span>
          </div>
        </div>
        <LanguageDropdown lang={lang} />
      </div>
      <header dir="ltr" className="bg-white dark:bg-gray-950 px-4 py-4 flex items-center justify-between shadow">
        <nav className="flex items-center gap-6">
          <Link className="flex items-center gap-2" href="/">
            <div className="relative w-3 h-6 overflow-hidden">
              <BookOpen className="w-6 h-6 absolute left-[0%]"/>
            </div>
            Aqraaz
          </Link>
          <NavbarList lang={lang} dataCategories={Categories} />
        </nav>
        <div className="flex items-center gap-4">
        <SearchInput lang={lang} />

        <UserDropdown lang={lang} />
        <Sidebar lang={lang} dataCategories={Categories} />
        </div>
      </header>
    </HiddenWrapper>
  )
}