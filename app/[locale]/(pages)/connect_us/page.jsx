'use client'
import React from 'react'
// import { getDictionary } from '../../../../lib/dictionary'
// import Script from 'next/script'
import { Card } from '../../../../components/ui/card'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Label } from '../../../../components/ui/label'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { Textarea } from '../../../../components/ui/textarea'
import { toast } from "sonner"
import { Toaster } from "../../../../components/ui/sonner"
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import emailjs from '@emailjs/browser';

// export const metadata = {
//   title: 'connect us',
//   description: 'Connect with us and explore a world of possibilities! Our "Connect Us" page serves as your gateway to seamless communication and engagement. Reach out, share your thoughts, ask questions, or simply stay updated with our latest news and events. Join our community, interact with our team, and let"s build meaningful connections together',
//   keywords: ['aqraaz','Aqraaz','aqra','aqraa','connect_us', 'connect us'],
//   alternates: {
//     canonical: "/connect_us",
//     languages: {
//       'en': '/en/connect_us',
//       'ar': '/ar/connect_us',
//     },
//   },
//   other: {
//     'google-adsense-account': `${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`,
//   },
//   robots: {
//     index: false,
//     nocache: true
//   },
//   openGraph: {
//     title: "connect us",
//     description: 'Connect with us and explore a world of possibilities! Our "Connect Us" page serves as your gateway to seamless communication and engagement. Reach out, share your thoughts, ask questions, or simply stay updated with our latest news and events. Join our community, interact with our team, and let"s build meaningful connections together',
//     url: "/connect_us",
//     siteName: "Aqraaz.com"
//   }
// }


export default function page({ params: { locale }}) {
  const isEnglish = locale === 'en';

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_r0ovvbl', 'template_ax3tz39', e.target, 'AuENYI8FwRFeHmA2b')
    .then((result) => {
          console.log(result.text);
          toast("sent succesfully", {
            description: "sent succesfully. Think of us!",
          });
          }, (error) => {
          console.log(error.text);
          alert('Failed to send the message, please try again.');
      });
    e.target.reset();
  };
  
  return (
    <>
    <div className="w-full">
      <section className="bg-muted py-12 md:py-20">
        <div className="container grid gap-10 px-4 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {isEnglish ? 'Get in Touch' : 'اتصل بنا'}
            </h2>
            <p className="text-muted-foreground md:text-lg">
              {isEnglish ? 'Have a question or want to work with us? Fill out the form or use the contact information below.' : 'هل لديك سؤال أو تريد العمل معنا؟ املأ النموذج أو استخدم معلومات الاتصال أدناه.'}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 text-primary" />
                <p>aqraazsite@gmail.com</p>
              </div>
            </div>
          </div>
          <Card className="p-6 md:p-8">
            <form onSubmit={sendEmail}>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isEnglish ? 'Contact Us' : 'تواصل معنا'}
                </CardTitle>
                <CardDescription>
                  {isEnglish ? "Fill out the form below and we'll get back to you as soon as possible." : 'املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {isEnglish ? 'Name' : 'الاسم'}
                    </Label>
                    <Input id="name" name="name" placeholder={isEnglish ? 'Enter your name' : 'أدخل اسمك'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isEnglish ? 'Email' : 'البريد الإلكتروني'}
                    </Label>
                    <Input id="email" name="email" type="email" placeholder={isEnglish ? 'Enter your email' : 'أدخل بريدك الإلكتروني'} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    {isEnglish ? 'Message' : 'الرسالة'}
                  </Label>
                  <Textarea id="message" name="message" placeholder={isEnglish ? 'Enter your message' : 'أدخل رسالتك'} className="min-h-[120px]" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  {isEnglish ? 'Submit' : 'إرسال'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>
    </div>
    <Toaster />


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
