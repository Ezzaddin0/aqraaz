import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { withAuth } from "next-auth/middleware"; // Correct import for NextAuth middleware
import { getToken } from 'next-auth/jwt';

import { i18n } from './i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { auth } from './app/auth'
import prisma from './app/connect';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;  

  // Locale handling
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = await getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }  

  const isLoggedIn = !!auth()
  const isAdmin = (await auth())?.user?.role === "ADMIN"  

  if (request.nextUrl.pathname.startsWith("/en/dashboard")) {    
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } else if (!isLoggedIn) {    
    return NextResponse.redirect(new URL("/login", request.url))
  }   
   

  return NextResponse.next();
}

// export default auth((req) => {
//   const isLoggedIn = !!req.auth
//   const isAdmin = req.auth?.user?.role === "ADMIN"  
//   console.log(req);
  

//   if (req.nextUrl.pathname.startsWith("/en/dashboard")) {    
//     if (!isAdmin) {
//       // return NextResponse.redirect(new URL("/login", req.url))
//     }
//   } else if (!isLoggedIn) {    
//     // return NextResponse.redirect(new URL("/login", req.url))
//   }

//   return NextResponse.next()
// })

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };