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
      <Script id="adsterra-banner" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : '9c6fb7c9b8688fb4a40951b1740b6d67',  // استبدل XXXXXX بمفتاحك
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
          document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.topcreativeformat.com/9c6fb7c9b8688fb4a40951b1740b6d67/invoke.js"></scr' + 'ipt>');
        `}
      </Script>  

      </AlertDescription>
    </Alert>
  );
}