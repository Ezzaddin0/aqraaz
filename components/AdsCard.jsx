import Script from "next/script";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function AdsCard() {
  return (
    <Alert className="my-4 text-center">
      <AlertDescription>
        {/* Google AdSense Script */}
        {/* <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8893594961186089"
          crossOrigin="anonymous"
        /> */}
        
        {/* Adsterra Ads Script */}
        <Script id="adsterra-ads" strategy="lazyOnload">
          {`
            atOptions = {
              'key' : '9c6fb7c9b8688fb4a40951b1740b6d67',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `}
        </Script>
        <Script id="adsterra-invoke" strategy="lazyOnload" src="//www.topcreativeformat.com/9c6fb7c9b8688fb4a40951b1740b6d67/invoke.js" />

      </AlertDescription>
    </Alert>
  );
}