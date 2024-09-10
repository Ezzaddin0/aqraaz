import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components/LayoutComponents";
import iconWeb from '@/assets/images/white-icon.svg'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next';
import AuthProvider from '@/lib/AuthProvider';
import Script from "next/script";

export const revalidate = 30;

const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({weight: "400", subsets: ['arabic']})

export const metadata = {
  title: "Aqraaz",
  description: "Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories",
  icons: {
    icon: `${iconWeb.src}`
  },
  metadataBase: new URL("https://www.aqraaz.com/"),
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.locale} dir={params.locale === "ar" ? "rtl" : "ltr"}>
      <body className={`dark:bg-gray-900 ${params.locale === "ar" ? cairo.className : inter.className}`}>
          <AuthProvider>
            <div className="md:container px-2 mx-auto ">
              <Header lang={params.locale} />
              {children}
              <Footer lang={params.locale} />
            </div>
          </AuthProvider>
        {/* <Analytics />
        <SpeedInsights />
        <Script
          async
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
        ></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');
          `}
        </Script> */}
      </body>
    </html>
  );
}