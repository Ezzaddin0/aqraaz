"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function LanguageDropdown({lang}) {
  const pathName = usePathname();
  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
        <span className="text-gray-800">{lang == 'en' ? 'English' : 'Arabic'}</span>
        <ChevronDownIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
        <DropdownMenuItem>
        <Link href={redirectedPathName('en')} className="w-full flex items-center justify-between gap-2 text-sm font-medium">English {lang == 'en' && <CheckIcon className="h-4 w-4" />}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href={redirectedPathName('ar')} className="w-full flex items-center justify-between gap-2 text-sm font-medium">Arabic {lang == 'ar' && <CheckIcon className="h-4 w-4" />}</Link>
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}