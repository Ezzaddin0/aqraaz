'use client'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { navigation } from '../data/Pages'
import logo from '../assets/images/icon.svg'
import logoWhite from '../assets/images/white-icon.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { hidePage } from '../helper/HidePage'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { i18n } from '../i18n.config'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar({lang}) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathName = usePathname();

  const hideP = pathName.split('/')[2];

  const { resolvedTheme } = useTheme();
  const router = useRouter();


  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim(); // Get the search term from the form

    // Redirect to the search page with the search term as a query parameter
    router.push(`/${lang.locale}/search/${decodeURIComponent(searchTerm)}`);
  };

  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }


  // console.log(pathName);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
      setMounted(true)
  }, [])

  if (!mounted) {
      return null
  }
  return (
    <Disclosure as="nav" className={`bg-slate-50 dark:bg-gray-800 ${hidePage.includes(hideP) ? 'hidden' : ''}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex mx-2 flex-shrink-0 items-center">
                  <Link className='flex items-center font-medium' href={`/${lang.locale}`}>
                    <Image
                      className="h-12 w-auto dark:fill-gray-200"
                      src={resolvedTheme == 'light' ? logo : logoWhite}
                      alt="Your Company"
                    />
                    Aqraaz
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {navigation[0].pages.map((item) => (
                      <Link
                        key={lang.locale == 'en' ? item.name.en : item.name.ar}
                        href={`/${lang.locale}${item.href}`}
                        className={classNames(
                          item.current ? 'text-gray-900 hover:bg-gray-100 hover:text-black dark:text-gray-300' : 'text-gray-900 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {lang.locale == 'en' ? item.name.en : item.name.ar}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-100 max-w-lg lg:w-80 hidden lg:block">
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                  <label htmlFor="search" className="t hidden">Search</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-400">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <input id="search" name="search" className="block w-full rounded-md border-0 bg-white dark:bg-gray-700 py-1.5 pl-10 pr-3  text-gray-900 ring-1 ring-inset ring-gray-300 dark:text-gray-300 dark:ring-transparent dark:focus:bg-gray-700 dark:focus:text-gray-200 dark:focus:ring-0 sm:text-sm sm:leading-6" placeholder="Search" type="search" />
                  </div>
                </form>
                </div>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    // <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    <svg className="block h-6 w-6 dark:fill-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                  ) : (
                    // <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    <svg className="block h-6 w-6 dark:fill-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                    </svg>
                  )}
                </Disclosure.Button>
              </div>

              <div className='mx-2'>
              {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setTheme("light")} width="24" height="24" fill="currentColor" className="bi bi-sun" cursor={"pointer"} viewBox="0 0 16 16">
                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                  </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setTheme("dark")} width="24" height="24" fill="currentColor" className="bi bi-moon" cursor={"pointer"} viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
                  </svg>
              )}
          </div>

              <div className="hidden lg:block lg:ml-4">
                <div className='flex items-center'>
                  {/* <button
                    type="button"
                    className="relative rounded-full dark:bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span> */}
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md dark:fill-gray-300 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50">
                          {lang.locale == 'en' ? 'Language' : 'اللغات'}
                          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                          <svg className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items anchor="bottom start" className="absolute right-0 z-10 mt-2 w-16 text-center origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {i18n.locales.map(loca => (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={redirectedPathName(loca)}
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {loca}
                                </Link>
                              )}
                            </Menu.Item>
                            ))}
                            {/* <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  English
                                </button>
                              )}
                            </Menu.Item> */}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  {/* </button> */}

                  {/* Profile dropdown */}
                  {/* <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> */}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="flex items-center gap-3 w-full lg:w-80">
                <form className="flex-1" role="search" onSubmit={handleSearch}>
                  <label htmlFor="search" className="t hidden">Search</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-400">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <input id="search" name="search" className="block w-full rounded-md border-0 bg-white dark:bg-gray-700 py-1.5 pl-10 pr-3  text-gray-900 ring-1 ring-inset ring-gray-300 dark:text-gray-300 dark:ring-transparent dark:focus:bg-gray-700 dark:focus:text-gray-200 dark:focus:ring-0 sm:text-sm sm:leading-6" placeholder="Search" type="search" />
                  </div>
                </form>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md dark:fill-gray-300 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50">
                      {lang.locale == 'en' ? 'Language' : 'اللغات'}
                      {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                      <svg className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items anchor="bottom start" className="absolute right-0 z-10 mt-2 w-16 text-center origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {i18n.locales.map(loca => (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={redirectedPathName(loca)}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {loca}
                            </Link>
                          )}
                        </Menu.Item>
                        ))}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              English
                            </button>
                          )}
                        </Menu.Item> */}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              {navigation[0].pages.map((item) => (
                <Disclosure.Button
                  key={lang.locale == 'en' ? item.name.en : item.name.ar}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? ' bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white' : 'text-gray-900 dark:text-gray-300 hover:bg-gray-400 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {lang.locale == 'en' ? item.name.en : item.name.ar}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}