import Image from 'next/image'
import React from 'react'
import heroImage from "@/assets/images/image-home.svg"
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/i18n.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
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
  openGraph: {
    title: "About",
    description: 'I have a specialized website called "Aqraaz" which is a comprehensive blog covering various topics, specializations, and categories. Aqraaz aims to provide diverse and comprehensive content that meets the needs and interests of a diverse readership.',
    url: "/about",
    siteName: "Aqraaz.com"
  }
}

const About = async ({
  params: {lang}
}: {
  params: {lang: Locale}
}) => {
  const { page } = await getDictionary(lang)
  return (
    <div>
      <h1 className='mt-3'>{page.about.title}</h1>
      <div className='row flex-lg-row-reverse align-items-center justify-content-center g-5 py-0'>
        <div className="col-10 col-sm-8 col-lg-6">
          <Image src={heroImage} alt='Image Hero' className='w-100' width={600} height={400}></Image>
        </div>
        <div className='col-lg-6'>
          <h2 className='h3' >{page.about.description.paragraphOne}</h2>
        </div>
        <h3 className='m-2 h4'>{page.about.description.paragraphTwo}</h3>
        <h4 className='m-2'>{page.about.description.paragraphThree}</h4>
        <h4 className='m-2'>{page.about.description.paragraphFour}</h4>
        <h4 className='mt-2 mb-5'>{page.about.description.paragraphFive}</h4>
      </div>
    </div>
  )
}

export default About