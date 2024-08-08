"use client"
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function UserDropdown({lang}) {
    const {status, data} = useSession();
  return (
    status === 'authenticated' ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="overflow-hidden rounded-full" size="icon" variant="outline">
              <Image alt="Avatar" className="overflow-hidden aspect-[36/36] object-cover rounded-full" height={36} src={data.user.image} width={36} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>          
      ) : (
          <Link href={`/${lang}/login`} className="py-2 px-4 text-sm font-medium text-black bg-gray-50 rounded-md border hover:bg-gray-100">{lang == "en" ? "Login" : "تسجيل الدخول"}</Link>
        )
  )
}