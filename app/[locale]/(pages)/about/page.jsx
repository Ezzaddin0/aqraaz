import React from 'react'
import PrimaryImage from '../../../../assets/images/image-home.svg'
import { getDictionary } from '../../../../lib/dictionary'
import Script from 'next/script';
import Image from 'next/image';


export const metadata = {
  title: 'About',
  description: 'I have a specialized website called "Aqraaz" which is a comprehensive blog covering various topics, specializations, and categories. Aqraaz aims to provide diverse and comprehensive content that meets the needs and interests of a diverse readership.',
  keywords: ['aqraaz','Aqraaz','aqra','aqraa','about'],
  alternates: {
    canonical: "/about",
    languages: {
      'en': '/en/about',
      'ar': '/ar/about',
    },
  },
  robots: {
    index: false,
    nocache: true
  },
  other: {
    'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
  },
  openGraph: {
    title: "About",
    description: 'I have a specialized website called "Aqraaz" which is a comprehensive blog covering various topics, specializations, and categories. Aqraaz aims to provide diverse and comprehensive content that meets the needs and interests of a diverse readership.',
    url: "/about",
    siteName: "Aqraaz.com"
  }
}


export default async function page({params: { locale }}) {
  const { page } = await getDictionary(locale);
  return (
    <>
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-12 md:col-span-6 text-xl font-semibold ">
          <h2 className='mb-4 text-5xl font-bold'>{page.about.title}</h2>
          <p>{page.about.description.paragraphOne}</p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Image width={600} height={500} src={PrimaryImage.src} className='aspect-video' alt="aqraaz-website" />
        </div>
      </div>
      <div className="flex flex-col gap-4 text-lg font-medium my-4">
        <p>{page.about.description.paragraphTwo}</p>
        <p>{page.about.description.paragraphThree}</p>
        <p>{page.about.description.paragraphFour}</p>
        <p>{page.about.description.paragraphFive}</p>
      </div>
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