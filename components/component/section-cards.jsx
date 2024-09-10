"use client"
import { CardContent, Card } from "../ui/card"
import { parseISO, compareDesc } from 'date-fns';
import CardCustom from "./Card";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { Alert, AlertDescription } from "../ui/alert";

export default function SectionCards({Posts, lang, time, title, page, cat}) {  
  // const sortedPosts = Posts.posts.slice().sort((a, b) => compareDesc(parseISO(a._createdAt), parseISO(b._createdAt)));

//   const banner = useRef()

//   const atOptions = {
//       key: '49b964dde4b56dd495dac2955331b7e0',
//       format: 'iframe',
//       height: 300,
//       width: 160,
//       params: {},
//   }
//   useEffect(() => {
//   if (banner.current && !banner.current.firstChild) {
//       const conf = document.createElement('script')
//       const script = document.createElement('script')
//       script.type = 'text/javascript'
//       script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`
//       conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

//       banner.current.append(conf)
//       banner.current.append(script)
//   }
// }, [banner])
  
  return (
    (<section className="py-8 md:py-12 lg:py-16">
      <div>
        <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Posts.posts?.slice(0, 6).map((topic, index) => (
            <CardCustom key={index} index={index} article={topic} lang={lang} time={time} />
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
              {/* <AlertDescription ref={banner}></AlertDescription> */}
            </Alert>
          </div>
        </div>
      </div>
    </section>)
  );
}