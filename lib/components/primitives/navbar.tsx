import React from 'react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { classNames } from '../layouts/classic';
import Button from '~/lib/components/primitives/button';
import Link from 'next/link';
// eslint-disable-next-line import/extensions
import { navigation, dropItemItems } from 'facade/data/navbar.js';

// try this https://codesandbox.io/s/dropdown-menu-jzldk
// https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/

const ShowDropDownList = () => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          Features
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
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {dropItemItems.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link href={item.href} passHref>
                  <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                    {item.name}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

/** Items to show in the main nav bar */
const ShowNavElement = ({ item }) => {
  return (
    <Link href={item.href}>
      <a
        className={classNames(
          item.current
            ? 'bg-gray-900 text-white'
            : 'hover:border-brand-light px-3 py-2 text-red-500 hover:border-b-2  hover:bg-gray-700 hover:text-blue-500'
        )}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.name === 'Features' ? <ShowDropDownList /> : item.name}
      </a>
    </Link>
  );
};

/** Shows the login button on the navbar on the left side */
const ShowLoginButtons = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
      <Button variant="primary">
        <Link href="https://app.homekasa.io/login">
          <a>Login</a>
        </Link>
      </Button>
    </div>
  );
};

/** main Navbar render component */
export const NavBar: React.FC = () => {
  return (
    <>
      <Disclosure as="nav" className="bg-stone-800 text-slate-100">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/" passHref>
                      <Image
                        className="block h-8 w-auto md:hidden"
                        src="/img/homekasa-logo-white.svg"
                        height="48"
                        width="48"
                        alt="Workflow"
                      />
                    </Link>
                  </div>

                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <ShowNavElement key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
                <ShowLoginButtons />
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
