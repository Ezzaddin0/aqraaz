import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'
import Script from 'next/script'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "This Privacy Policy governs the manner in which Aqraaz collects, uses, maintains, and discloses information collected from users (each, a 'User') of the Aqraaz website (Site).",
  keywords: ['aqraaz','Aqraaz','aqra','aqraa','privacy_policy', 'privacy policy'],
  alternates: {
    canonical: "/privacy_policy",
    languages: {
      'en': '/en/privacy_policy',
      'ar': '/ar/privacy_policy',
    },
  },
  robots: {
    index: false,
    nocache: true
  },
  openGraph: {
    title: "Privacy Policy",
    description: "This Privacy Policy governs the manner in which Aqraaz collects, uses, maintains, and discloses information collected from users (each, a 'User') of the Aqraaz website (Site).",
    url: "/privacy_policy",
    siteName: "Aqraaz.com"
  }
}

const privacy_policy = async ({
  params: {lang}
}: {
  params: {lang: Locale}
}) => {
  const { page } = await getDictionary(lang)
  return (
  <>
  <div>
      <h1 className='my-3'>{page.PrivacyPolicy.title}</h1>
      <p>{page.PrivacyPolicy.description}</p>
      <div className='my-2'>
        <div className='my-5'>
          <h2>{page.PrivacyPolicy.PersonalIdentificationInformation.title}</h2>
          <p>{page.PrivacyPolicy.PersonalIdentificationInformation.description}</p>
        </div>

        <div className='my-5'>
          <h2>{page.PrivacyPolicy.NonPersonalIdentificationInformation.title}</h2>
          <p>{page.PrivacyPolicy.NonPersonalIdentificationInformation.description}</p>
        </div>

        <div className='my-5'>
          <h2>{page.PrivacyPolicy.WebBrowserCookies.title}</h2>
          <p>{page.PrivacyPolicy.WebBrowserCookies.description}</p>
        </div>

        <div className='my-5'>
          <h2>{page.PrivacyPolicy.HowWeUseCollectedInformation.title}</h2>
          <p>{page.PrivacyPolicy.HowWeUseCollectedInformation.description}</p>
          <ul>
            <li>{page.PrivacyPolicy.HowWeUseCollectedInformation.list.first}</li>
            <li>{page.PrivacyPolicy.HowWeUseCollectedInformation.list.second}</li>
            <li>{page.PrivacyPolicy.HowWeUseCollectedInformation.list.third}</li>
          </ul>
        </div>

        <div className="my-5">
          <h2>{page.PrivacyPolicy.ProtectionOfInformation.title}</h2>
          <p>{page.PrivacyPolicy.ProtectionOfInformation.description}</p>
        </div>

        <div className="my-5">
          <h2>{page.PrivacyPolicy.SharingPersonalInformation.title}</h2>
          <p>{page.PrivacyPolicy.SharingPersonalInformation.description}</p>
        </div>

        <div className="my-5">
          <h2>{page.PrivacyPolicy.ChangesTothisPrivacyPolicy.title}</h2>
          <p>{page.PrivacyPolicy.ChangesTothisPrivacyPolicy.description}</p>
        </div>
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

export default privacy_policy