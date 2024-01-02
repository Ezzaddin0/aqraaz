'use client'
import { Locale } from '@/i18n.config';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  lang: Locale
}

const SearchInput = ({lang}:Props) => {
    const router = useRouter();

  const handleSearch = (e:any) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim(); // Get the search term from the form

    // Redirect to the search page with the search term as a query parameter
    router.push(`/${lang}/search/${decodeURIComponent(searchTerm)}`);
  };
  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input className="form-control me-2" type="search" name='search' placeholder="Search" aria-label="Search"/>
    </form>
  )
}

export default SearchInput