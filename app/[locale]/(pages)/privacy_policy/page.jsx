import React from 'react'
import { getDictionary } from '../../../../lib/dictionary'
// import Script from 'next/script'


export const metadata = {
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


export default async function page({ params: { locale }}) {
  const { page } = await getDictionary(locale)
  return (
    <>
    <div className='mx-auto max-w-6xl px-2 py-6 sm:px-6 lg:px-8 flex flex-col gap-6'>
      <div className="">
        <h2 className='text-4xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.title}</h2>
        <p className='text-base'>{page.PrivacyPolicy.description}</p>
      </div>

      <div className="">
        <h2 className='text-xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.PersonalIdentificationInformation.title}</h2>
          <p className='text-base'>{page.PrivacyPolicy.PersonalIdentificationInformation.description}</p>
      </div>

      <div className="">
        <h2 className='text-xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.NonPersonalIdentificationInformation.title}</h2>
          <p className='text-base'>{page.PrivacyPolicy.NonPersonalIdentificationInformation.description}</p>
      </div>

      <div className="">
        <h2 className='text-xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.WebBrowserCookies.title}</h2>
          <p className='text-base'>{page.PrivacyPolicy.WebBrowserCookies.description}</p>
      </div>

      <div className="">
        <h2 className='text-xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.HowWeUseCollectedInformation.title}</h2>
          <p className='text-base'>{page.PrivacyPolicy.HowWeUseCollectedInformation.description}</p>
          <ul className=' list-disc mx-4'>
            <li>{page.PrivacyPolicy.HowWeUseCollectedInformation.list.first}</li>
            <li>{page.PrivacyPolicy.HowWeUseCollectedInformation.list.second}</li>
            <li>{page.PrivacyPolicy.HowWeUseCollectedInformation.list.third}</li>
          </ul>
      </div>

      <div className="">
        <h2 className='text-xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.ProtectionOfInformation.title}</h2>
          <p className='text-base'>{page.PrivacyPolicy.ProtectionOfInformation.description}</p>
      </div>

      <div className="">
        <h2 className='text-xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.SharingPersonalInformation.title}</h2>
          <p className='text-base'>{page.PrivacyPolicy.SharingPersonalInformation.description}</p>
      </div>

      <div className="">
        <h2 className='text-xl text-gray-700 font-bold mb-2'>{page.PrivacyPolicy.ChangesTothisPrivacyPolicy.title}</h2>
          <p className='text-base'>{page.PrivacyPolicy.ChangesTothisPrivacyPolicy.description}</p>
      </div>
    </div>

     {/* Google tag (gtag.js) */}
     {/* <Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}></Script>
     <Script>
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
 
       gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');
     `}
     </Script> */}
   </>
  )
}
