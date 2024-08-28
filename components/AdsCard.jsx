"use client"
import Script from "next/script";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useEffect, useRef } from "react";

export default function AdsCard() {
  const banner = useRef()

    const atOptions = {
        key: '9c6fb7c9b8688fb4a40951b1740b6d67',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {},
    }
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])
  return (
    <Alert className="my-4 text-center">
      <AlertDescription ref={banner}>
        {/* Google AdSense Script */}
        {/* <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8893594961186089"
          crossOrigin="anonymous"
        /> */}
        
        {/* Adsterra Ads Script */}

      </AlertDescription>
    </Alert>
  );
}