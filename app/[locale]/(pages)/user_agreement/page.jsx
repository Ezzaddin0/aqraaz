import React from 'react'
import { getDictionary } from '../../../../lib/dictionary'
import Script from 'next/script'


export const metadata = {
  title: 'user_agreement',
  description: "Welcome to Aqraaz's User Agreement page, outlining the terms and conditions for accessing and utilizing our services. By accessing or using our platform, you agree to adhere to these Terms of Service, which govern your interaction with our website. Explore a wealth of diverse content, safeguarded by intellectual property rights, including articles, images, videos, and more, available for personal, non-commercial use. Creating an account grants access to exclusive features, and your privacy is our priority; our Privacy Policy details how your information is handled. While we strive to maintain the quality of our service, Aqraaz holds no liability for indirect or consequential damages resulting from your use of our platform. We may update these terms periodically, and your continued use constitutes acceptance of any revisions. For inquiries regarding these terms, reach out to us at aqraazsite@gmail.com. Thank you for being a part of Aqraaz",
  keywords: ['aqraaz','Aqraaz','aqra','aqraa','user_agreement', 'user agreement'],
  alternates: {
    canonical: "/user_agreement",
    languages: {
      'en': '/en/user_agreement',
      'ar': '/ar/user_agreement',
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
    title: "user agreement",
    description: "Welcome to Aqraaz's User Agreement page, outlining the terms and conditions for accessing and utilizing our services. By accessing or using our platform, you agree to adhere to these Terms of Service, which govern your interaction with our website. Explore a wealth of diverse content, safeguarded by intellectual property rights, including articles, images, videos, and more, available for personal, non-commercial use. Creating an account grants access to exclusive features, and your privacy is our priority; our Privacy Policy details how your information is handled. While we strive to maintain the quality of our service, Aqraaz holds no liability for indirect or consequential damages resulting from your use of our platform. We may update these terms periodically, and your continued use constitutes acceptance of any revisions. For inquiries regarding these terms, reach out to us at aqraazsite@gmail.com. Thank you for being a part of Aqraaz",
    url: "/privacy_policy",
    siteName: "Aqraaz.com"
  }
}


export default async function page({ params: { locale }}) {
  const { page } = await getDictionary(locale)
  return (
    <>
    <div className='mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8 flex flex-col gap-6'>
      <h2 className='text-3xl font-semibold'>{page.user_agreement.title}</h2>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.TermsofService.title}</h3>
        <p>{page.user_agreement.content.TermsofService.paragraphOne}</p>
        
        <p>{page.user_agreement.content.TermsofService.paragraphTwo}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.content.title}</h3>
        <p>{page.user_agreement.content.content.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.UserAccounts.title}</h3>
        <p>{page.user_agreement.content.UserAccounts.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.Privacy.title}</h3>
        <p>{page.user_agreement.content.Privacy.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.IntellectualProperty.title}</h3>
        <p>{page.user_agreement.content.IntellectualProperty.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.LimitationOfLiability.title}</h3>
        <p>{page.user_agreement.content.LimitationOfLiability.description}</p>

        <ul className='list-disc mx-4'>
          <li>{page.user_agreement.content.LimitationOfLiability.list.first}</li>
          <li>{page.user_agreement.content.LimitationOfLiability.list.second}</li>
          <li>{page.user_agreement.content.LimitationOfLiability.list.third}</li>
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.Changes.title}</h3>
        <p>{page.user_agreement.content.Changes.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className='text-lg font-semibold'>{page.user_agreement.content.ContactUs.title}</h3>
        <p>{page.user_agreement.content.ContactUs.description} <a href="mailto:aqraazsite@gmail.com">aqraazsite@gmail.com</a></p>
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
