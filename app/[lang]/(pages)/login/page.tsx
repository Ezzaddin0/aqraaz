import Image from 'next/image'
import React from 'react'
import icon from "@/assets/images/icon.svg"
import { Kalam } from 'next/font/google'
import Link from 'next/link'
import Script from 'next/script'

const kalam = Kalam({
    weight: '400',
    subsets: ['latin'],
})

const Login = () => {
  return (
  <>
  <div className={`login-section container py-1 `}>
        <Link href={"/"} className='d-flex align-items-center justify-content-center link-underline link-underline-opacity-0 text-body'>
            <Image src={icon} alt='Logo' className='mb-2' width={64}></Image>
            <p className={`h3 m-0 ${kalam.className}`}>Aqraaz</p>
        </Link>
        <form className='m-auto' action="">
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary w-100 mt-3 " type="submit">
            Sign in
            </button>
        </form>
        <div className="form-choose d-flex flex-column mt-2 gap-1">
          <Link href={"/forget"} className='link-underline link-underline-opacity-0 text-body'>Forget Password?</Link>
          <Link href={"/signup"} className='link-underline link-underline-opacity-0 text-body'>Don't have Account?</Link>
        </div>

        <div className="d-flex my-2 align-items-center justify-content-center">
            <hr className="border-2 w-50" />
            <span className="ml-3 mx-2">OR</span>
            <hr className="border-2 w-50" />
        </div>

        <div className="form-btn d-flex flex-column gap-2">
            <button className="btn btn-primary w-100 py-2" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-facebook me-2" viewBox="0 0 18 18">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
          </svg>
              Login with Facebook
            </button>
            <button className="btn btn-light border w-100 py-2" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-google me-2" viewBox="0 0 18 18">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
            </svg>
              Login with Google
            </button>
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

export default Login