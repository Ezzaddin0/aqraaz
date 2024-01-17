import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import "@/app/[lang]/globals.css"
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.css'
import CheckPage from '@/components/checkPage/CheckPage'
import Script from 'next/script'
import { Locale, i18n } from '@/i18n.config'
import Provider from '@/components/Provider/Provider'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import iconWeb from "@/assets/images/white-icon.svg"


const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({weight: "400", subsets: ['arabic']})

export const metadata: Metadata = {
  // title: 'Aqraaz',
  // description: 'Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories',
  // keywords: ['aqraaz','Aqraaz','aqra','aqraa','seo','digital marketing','technology','business','lifestyle','health','entrepreneurship','content creation','social media','career','finance','innovation','self-improvement','e-commerce','design','data analytics','cybersecurity','remote work','sustainability','travel','sports','news','programming','blogging','web development','online presence',],
  icons: {
    icon: `${iconWeb.src}`
  },
  metadataBase: new URL("https://www.aqraaz.com/"),
  // alternates: {
  //   canonical: "/",
  //   languages: {
  //     'en': '/en',
  //     'ar': '/ar',
  //   },
  // },
  // openGraph: {
  //   title: "Aqraaz",
  //   description: "Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories",
  //   url: "https://www.aqraaz.com/",
  //   siteName: "Aqraaz.com"
  // }
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({lang: locale}))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: {lang: Locale}
}) {
  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body className={params.lang === "ar" ? cairo.className : inter.className}>
        <Provider>
          <div className="container">
            <CheckPage lang={params.lang}>
              <Navbar lang={params.lang}/>
            </CheckPage>
            {children}
            <CheckPage lang={params.lang}>
              <Footer lang={params.lang}/>
            </CheckPage>
          </div>
        </Provider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossOrigin="anonymous"></Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
