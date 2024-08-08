"use client"
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';

export default function SearchInput({lang}) {
    const pathName = usePathname();
    const hideP = pathName.split('/')[2];
  
    const router = useRouter();
    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value.trim(); // Get the search term from the form
    
        // Redirect to the search page with the search term as a query parameter
        router.push(`/${lang}/search/${decodeURIComponent(searchTerm)}`);
    };
  return (!['dashboard'].includes(hideP) && 
    <form onSubmit={handleSearch} className="relative hidden md:block">
      <Input id="search" className="pr-10 focus:border-gray-400 dark:focus:border-gray-600" placeholder="Search..." type="search" />
      <SearchIcon className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </form>)
}