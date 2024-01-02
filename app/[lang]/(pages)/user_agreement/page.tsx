import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'


export const metadata: Metadata = {
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
    openGraph: {
      title: "user agreement",
      description: "Welcome to Aqraaz's User Agreement page, outlining the terms and conditions for accessing and utilizing our services. By accessing or using our platform, you agree to adhere to these Terms of Service, which govern your interaction with our website. Explore a wealth of diverse content, safeguarded by intellectual property rights, including articles, images, videos, and more, available for personal, non-commercial use. Creating an account grants access to exclusive features, and your privacy is our priority; our Privacy Policy details how your information is handled. While we strive to maintain the quality of our service, Aqraaz holds no liability for indirect or consequential damages resulting from your use of our platform. We may update these terms periodically, and your continued use constitutes acceptance of any revisions. For inquiries regarding these terms, reach out to us at aqraazsite@gmail.com. Thank you for being a part of Aqraaz",
      url: "/privacy_policy",
      siteName: "Aqraaz.com"
    }
}


const user_agreement = async ({
    params: {lang}
  }: {
    params: {lang: Locale}
  }) => {
    const { page } = await getDictionary(lang)
  return (
    <div>
        <h1 className='mt-3 mb-2'>{page.user_agreement.title}</h1>
        <div className='mt-4'>
            <div className='my-5'>
                <h2>{page.user_agreement.content.TermsofService.title}</h2>
                <p>{page.user_agreement.content.TermsofService.paragraphOne}</p>
                <p>{page.user_agreement.content.TermsofService.paragraphTwo}</p>
            </div>

            <div className='my-5'>
                <h2>{page.user_agreement.content.content.title}</h2>
                <p>{page.user_agreement.content.content.description}</p>
            </div>

            <div className='my-5'>
                <h2>{page.user_agreement.content.UserAccounts.title}</h2>
                <p>{page.user_agreement.content.UserAccounts.description}</p>
            </div>

            <div className='my-5'>
                <h2>{page.user_agreement.content.Privacy.title}</h2>
                <p>{page.user_agreement.content.Privacy.description}</p>
            </div>

            <div className='my-5'>
                <h2>{page.user_agreement.content.IntellectualProperty.title}</h2>
                <p>{page.user_agreement.content.IntellectualProperty.description}</p>
            </div>

            <div className='my-5'>
                <h2>{page.user_agreement.content.LimitationOfLiability.title}</h2>
                <p>{page.user_agreement.content.LimitationOfLiability.description}</p>
                <ul>
                    <li>{page.user_agreement.content.LimitationOfLiability.list.first}</li>
                    <li>{page.user_agreement.content.LimitationOfLiability.list.second}</li>
                    <li>{page.user_agreement.content.LimitationOfLiability.list.third}</li>
                </ul>
            </div>

            <div className='my-5'>
                <h2>{page.user_agreement.content.Changes.title}</h2>
                <p>{page.user_agreement.content.Changes.description}</p>
            </div>

            <div className='my-5'>
                <h2>{page.user_agreement.content.ContactUs.title}</h2>
                <p>{page.user_agreement.content.ContactUs.description} <Link className='h5 link-underline link-underline-opacity-0' href="mailto:aqraazsite@gmail.com">aqraazsite@gmail.com</Link></p>
            </div>
        </div>

    </div>
  )
}

export default user_agreement