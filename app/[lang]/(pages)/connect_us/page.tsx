import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'

export const metadata: Metadata = {
  title: 'connect us',
  description: 'Connect with us and explore a world of possibilities! Our "Connect Us" page serves as your gateway to seamless communication and engagement. Reach out, share your thoughts, ask questions, or simply stay updated with our latest news and events. Join our community, interact with our team, and let"s build meaningful connections together',
  keywords: ['aqraaz','Aqraaz','aqra','aqraa','connect_us', 'connect us'],
  alternates: {
    canonical: "/connect_us",
    languages: {
      'en': '/en/connect_us',
      'ar': '/ar/connect_us',
    },
  },
  other: {
    'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
  },
  robots: {
    index: false,
    nocache: true
  },
  openGraph: {
    title: "connect us",
    description: 'Connect with us and explore a world of possibilities! Our "Connect Us" page serves as your gateway to seamless communication and engagement. Reach out, share your thoughts, ask questions, or simply stay updated with our latest news and events. Join our community, interact with our team, and let"s build meaningful connections together',
    url: "/connect_us",
    siteName: "Aqraaz.com"
  }
}

const connect_us = async ({
  params: {lang}
}: {
  params: {lang: Locale}
}) => {
  const { page } = await getDictionary(lang)

  return (
  <>
    <div className='row flex-lg-row-reverse align-items-center justify-content-center g-5 py-0' style={{height: "70vh"}}>
      <div className='col-lg-4'>
        <h1 className='mt-3'>{page.connect_us.title}</h1>
      </div>
      <div className="col-lg-8">
        <Link className='btn btn-primary btn-lg mx-5' href="mailto:aqraazsite@gmail.com">aqraazsite@gmail.com</Link>
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

export default connect_us