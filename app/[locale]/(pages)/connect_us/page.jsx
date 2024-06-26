import React from 'react'
import { getDictionary } from '../../../../lib/dictionary'
import Script from 'next/script'


export const metadata = {
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


export default async function page({ params: { locale }}) {
  const { page } = await getDictionary(locale)
  return (
    <>
    <div className="relative isolate overflow-hidden bg-gray-100 dark:bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight dark:text-white text-black sm:text-4xl">{page.connect_us.title}</h2>
            <p className="mt-4 text-lg leading-8 text-gray-900 dark:text-gray-300">
            {page.connect_us.description}
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {page.connect_us.btn}
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:pt-2">
            <div className="flex flex-col items-start">
              {/* <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div> */}
              <dt className="mt-4 font-semibold text-black dark:text-white">{page.connect_us.list.first.title}</dt>
              <dd className="mt-2 leading-7 text-gray-900 dark:text-gray-400">
              {page.connect_us.list.first.description}
              </dd>
            </div>
            {/* <div className="flex flex-col items-start">
              <dt className="mt-4 font-semibold text-black dark:text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-900 dark:text-gray-400">
                Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
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
