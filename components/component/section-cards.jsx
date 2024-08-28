"use client"
import { CardContent, Card } from "../ui/card"
import { parseISO, compareDesc } from 'date-fns';
import CardCustom from "./Card";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { Alert, AlertDescription } from "../ui/alert";

export default function SectionCards({Posts, lang, time, title, page, cat}) {
  const sortedPosts = Posts.posts.slice().sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));

  const banner = useRef()

  const atOptions = {
      key: '8377307cb2756e90c6a11a4f1bc0b0db',
      format: 'iframe',
      height: 600,
      width: 160,
      params: {},
  }
  useEffect(() => {
  if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

      banner.current.append(conf)
      banner.current.append(script)
  }
}, [banner])
  
  return (
    (<section className="py-8 md:py-12 lg:py-16">
      <div>
        <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.slice(0, 6).map((topic, index) => (
          <CardCustom index={index} article={topic} lang={lang} time={time} />
          ))}
            </div>
          </div>
          <div>
            {/* <Card className="h-full">
              <CardContent className="p-6" ref={banner}>
              <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8893594961186089"
     crossorigin="anonymous" />

              </CardContent>
            </Card> */}
            <Alert className="text-center h-full">
              <AlertDescription ref={banner}></AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </section>)
  );
}