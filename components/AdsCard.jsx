import Script from "next/script"
import { Alert, AlertDescription } from "../components/ui/alert"
export default function AdsCard() {
    return (
      // <div className='my-4 bg-indigo-400 h-20 flex items-center justify-center border-y border-gray-200'>
      //     ADS
      // </div>  
      <Alert className="my-4 text-center">
      {/* <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle> */}
      <AlertDescription>
        {/* You can add components to your app using the cli. */}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8893594961186089"
     crossorigin="anonymous" />
      </AlertDescription>
    </Alert>
    )
}  