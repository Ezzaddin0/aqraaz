'use client'
import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filter({title, lang}) {
  return (
    <div className='w-full flex justify-between items-center'>
        {title && <h1 className=' text-xl'>{title}</h1>}
        <Menu as="div" className="relative inline-block text-left justify-self-end">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md dark:fill-gray-300 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50">
            Sort
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
          <Menu.Items className={`absolute right-0 z-10 ${lang == 'en' ? '-mr-2' : ''} ${lang == 'ar' ? '-mr-16' : title == null ? '-ml-2' : '-mr-16'} mt-2 w-36 text-center origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    oldest to newest
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    newest to oldest
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Most popular
                  </button>
                )}
              </Menu.Item>
              {/* <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      href='#'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 dark:text-gray-100',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </form> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}