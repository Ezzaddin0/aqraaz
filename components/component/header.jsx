'use client'
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/NJqV1EuJF1c
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "../ui/dropdown-menu"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { BookOpen, CalendarIcon, CheckIcon, ChevronDownIcon, MenuIcon, SearchIcon, SunIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { format } from "date-fns"
import useSWR from "swr"
import Image from "next/image"
import { forwardRef } from "react"
// import { useTheme } from "next-themes"

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
  // {
  //   title: "Progress",
  //   href: "/docs/primitives/progress",
  //   description:
  //     "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  // },
  // {
  //   title: "Scroll-area",
  //   href: "/docs/primitives/scroll-area",
  //   description: "Visually or semantically separates content.",
  // },
  // {
  //   title: "Tabs",
  //   href: "/docs/primitives/tabs",
  //   description:
  //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  // },
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
]

const dashboardItems = [
  { name: 'Create Post', path: `dashboard/management/posts/new`, description: 'Create a new post' },
  { name: 'Posts', path: `dashboard/management/posts`, description: 'View and manage posts' },
  { name: 'Categories', path: `dashboard/management/categories`, description: 'Manage post categories' },
  // { name: 'Author', path: `dashboard/management/author`, description: 'View author information' },
  { name: 'Users', path: `dashboard/management/users`, description: 'Manage user accounts' },
  { name: 'Comments', path: `dashboard/management/comments`, description: 'View and manage comments' },
];

const analysisItems = [
  { name: 'General', path: `analysis/general`, description: 'General analysis overview' },
  { name: 'Posts', path: `analysis/posts`, description: 'Analyze post performance' },
  { name: 'Users', path: `analysis/users`, description: 'Analyze user data' },
  { name: 'Comments', path: `analysis/comments`, description: 'Analyze comments' },
  { name: 'Categories', path: `analysis/categories`, description: 'Analyze categories' },
];

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function Header({lang}) {
  // const { resolvedTheme, theme, setTheme } = useTheme();
  // const theme = 'sun'
  const router = useRouter();

  // const { data: dataCategories, isLoading } = useSWR(
  //   `${process.env.NEXTAUTH_URL}/api/categories`,
  //   fetcher
  // );

  const pathName = usePathname();
  console.log(pathName);
  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const hideP = pathName.split('/')[2];

  const {status, data} = useSession();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim(); // Get the search term from the form

    // Redirect to the search page with the search term as a query parameter
    router.push(`/${lang}/search/${decodeURIComponent(searchTerm)}`);
  };

  return (
    (<div className={`w-full ${['/login', 'login', '/signup', 'signup', '/en/studio', 'studio'].includes(hideP) ? 'hidden' : ''}`}>
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
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <span className="text-gray-800">{lang == 'en' ? 'English' : 'Arabic'}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>
              <div className="w-full flex items-center justify-between gap-2">
                <Link href={redirectedPathName('en')} className="text-sm font-medium">English</Link>
                {lang == 'en' && <CheckIcon className="h-4 w-4" />}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="w-full flex items-center justify-between gap-2">
                <Link href={redirectedPathName('ar')} className="text-sm font-medium">Arabic</Link>
                {lang == 'ar' && <CheckIcon className="h-4 w-4" />}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <header dir="ltr" className="bg-white dark:bg-gray-950 px-4 py-4 flex items-center justify-between shadow">
        <nav className="flex items-center gap-6">
          <Link className="flex items-center gap-2" href={['dashboard'].includes(hideP) ? `/${lang}/dashboard` : `/${lang}`}>
            <div className="relative w-3 h-6 overflow-hidden">
              <BookOpen className="w-6 h-6 absolute left-[0%]"/>
            </div>
            Aqraaz
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {!['dashboard'].includes(hideP) && 
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{lang == "en" ? "Ganeral" : "عام"}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href={`${lang}/about`}>
                            <div className="mb-2 mt-4 text-lg font-medium">{lang == "en" ? "About" : "عنا"}</div>
                            <p className="text-sm leading-tight line-clamp-6 text-muted-foreground">
                              {lang == "en" ? "Learn more about Aqraaz, your go-to source for insightful articles and the latest news across various domains. Discover our mission to deliver high-quality, curated content that caters to every interest and expertise level." : "تعرف علينا على Aqraaz, مصدر النصائح التي تساعدك على العثور على المقالات التي تقدمها الأكثر إبداعا والأحدث الأخيرة في مجالات مختلفة. استكشف مهمتنا لتقديم محتوى متخصص ومناسب لكل مستوى الخبرة والخبرة التي تريدها."}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/" title={lang == "en" ? "Home" : "الرئيسية"}>
                        {lang == "en" ? "Stay updated with the latest articles and news on technology, business strategies, lifestyle trends, health advice, and more. Explore expertly crafted content that offers valuable insights and practical tips." : "ابق على اطلاع بأحدث المقالات والأخبار حول التكنولوجيا واستراتيجيات الأعمال واتجاهات نمط الحياة والنصائح الصحية والمزيد. استكشف المحتوى المصمم بخبرة والذي يقدم رؤى قيمة ونصائح عملية."}
                      </ListItem>
                      <ListItem href={`/${lang}/user_agreement`} title={lang == "en" ? "User Agreement" : "اتفاقية المستخدم"}>
                        {lang == "en" ? "Understand the terms and conditions of using Aqraaz. Learn about our commitment to providing a safe and informative platform for our readers and contributors." : "تعرف على شروط وأحكام استخدام Aqraaz. تعرف على التزامنا بتوفير منصة آمنة وغنية بالمعلومات لقرائنا والمساهمين."}
                      </ListItem>
                      <ListItem href={`/${lang}/connect_us`} title={lang == "en" ? "Contect" : "اتصل بنا"}>
                        {lang == "en" ? "Have any questions or feedback? Get in touch with the Aqraaz team. We value your input and are here to assist you with any inquiries you may have." : "هل لديك أي أسئلة أو تعليقات؟ تواصل مع فريق Aqraaz. نحن نقدر مدخلاتك ونحن هنا لمساعدتك في أي استفسارات قد تكون لديك."}
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>{lang == "en" ? "Pages" : "صفحات"}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {ganeral.map((page) => (
                        <ListItem key={page.title.en} title={lang == "en" ? page.title.en : page.title.ar} href={`/${lang}/${page.href}`}>
                          {lang == "en" ? page.description.en : page.description.ar}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{lang == "en" ? "Categories" : "الفئات"}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {isLoading ? "Waiting for data..." : dataCategories.slice(0, 6).map((category) => (
                        <ListItem key={lang == 'en' ? category.title.en : category.title.ar} title={lang == 'en' ? category.title.en : category.title.ar} href={`/${lang}/categories/${category.slug}`}>
                          {lang == "en" ? category.desc.en : category.desc.ar}
                        </ListItem>
                      ))}
                    </ul> */}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            }

            {['dashboard'].includes(hideP) &&
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {dashboardItems.map((item) => (
                          <ListItem key={item.name} title={item.name} href={`/${item.path}`}>
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem className={`${['dashboard'].includes(hideP) ? '' : 'hidden'}`}>
                    <NavigationMenuTrigger>Analysis</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {analysisItems.map((item) => (
                          <ListItem key={item.name} title={item.name} href={`${item.path}`}>
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            }
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Input id="search" className="pr-10 focus:border-gray-400 dark:focus:border-gray-600" placeholder="Search..." type="search" />
            <SearchIcon className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </form>
        
        {status === 'authenticated' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="overflow-hidden rounded-full" size="icon" variant="outline">
                <Image alt="Avatar" className="overflow-hidden aspect-[36/36] object-cover rounded-full" height={36} src={data.user.image} width={36} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>          
        ) : (
            <Link href={`/${lang}/login`} className="py-2 px-4 text-sm font-medium text-black bg-gray-50 rounded-md border hover:bg-gray-100">{lang == "en" ? "Login" : "تسجيل الدخول"}</Link>
          )
        }
        <Sheet>
          <SheetTrigger asChild>
            <Button className="block lg:hidden" variant="outline" size="sm">
              <MenuIcon className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            {['dashboard'].includes(hideP) ?
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Dashboard</AccordionTrigger>
              <AccordionContent>
              {dashboardItems.map((item) => (
                <Link key={item.name} className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`/${item.path}`}>
                  {item.name}
                </Link>
              ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{lang == "en" ? "Analysis" : "أحصائيات"}</AccordionTrigger>
              <AccordionContent>
              {analysisItems.map((item) => (
                <Link key={item.name} className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`/${item.path}`}>
                  {item.name}
                </Link>
              ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
            :
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{lang == "en" ? "Ganeral" : "عام"}</AccordionTrigger>
              <AccordionContent>
                <Link className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`/`}>
                  {lang == "en" ? "Home" : "الرئيسية"}
                </Link>
                <Link className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`${lang}/about`}>
                  {lang == "en" ? "About" : "عنا"}
                </Link>
                <Link className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`/${lang}/user_agreement`}>
                  {lang == "en" ? "User Agreement" : "اتفاقية المستخدم"}
                </Link>
                <Link className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`/${lang}/connect_us`}>
                  {lang == "en" ? "Contect" : "اتصل بنا"}
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{lang == "en" ? "Pages" : "صفحات"}</AccordionTrigger>
              <AccordionContent>
                {ganeral.map((page) => (
                  <Link key={page.title.en} className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`/${lang}/${page.href}`}>
                  {lang == "en" ? page.title.en : page.title.ar}
                </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{lang == "en" ? "Categories" : "الفئات"}</AccordionTrigger>
              <AccordionContent>
              {/* {isLoading ? "Waiting for data..." : dataCategories.slice(0, 6).map((category) => (
                <Link key={category.title.en} className=" block rounded-sm bg-gray-50 hover:bg-gray-100 ps-2 py-3 no-underline outline-none focus:shadow-md text-lg font-medium" href={`/${lang}/categories/${category.slug}`}>
                  {lang == 'en' ? category.title.en : category.title.ar}
                </Link>
              ))} */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
            }
          </SheetContent>
        </Sheet>
        </div>
      </header>
    </div>)
  );
}

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link ref={ref} className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}{...props}>
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";