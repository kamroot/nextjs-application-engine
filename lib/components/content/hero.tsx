import React from 'react';
// import Button from '~/lib/components/core/primitives/button';
import Image from '~/lib/components/primitives/image';
import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { addSubscriber } from 'lib/data/api';
import { useTracking } from 'lib/contexts/ga';
import { url } from '~/lib/functions/utils';
import { useRouter } from 'next/router';
import { H1 } from '~/lib/components/primitives/headers';
import Button from '~/lib/components/primitives/button';

// https://tailwindui.com/components/marketing/sections/heroes

export default function Hero() {
  const { logEvent } = useTracking();
  const [userEmail, setUserEmail] = React.useState('');
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addSubscriber(logEvent, '', userEmail);
    router.push({
      pathname: url('blog'),
    });
  };

  return (
    <>
      <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-24">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <Link href="/blog/what-can-homekasa-do-for-you-2022">
                  <a className="inline-flex items-center rounded-full bg-neutral-200 p-1 pr-2 text-zinc-800 hover:text-brand-core700 sm:text-base lg:text-sm xl:text-base">
                    <span className="rounded-full bg-brand-core px-3 py-0.5 text-xs font-semibold uppercase leading-5 tracking-wide text-white">
                      What can HomeKasa do?
                    </span>
                    <span className="ml-4 text-sm">Learn more</span>
                    <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  </a>
                </Link>
              </div>
              <div className="mt-8">
                <div className="mt-6 sm:max-w-xl">
                  <H1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Self-Service property management
                  </H1>
                  <p className="mt-6 text-xl text-gray-500">
                    It&apos;s your wealth: Best property management software{' '}
                  </p>
                </div>
                <div>
                  <form action="#" className="mt-12 sm:flex sm:w-full sm:max-w-lg" onSubmit={handleSubmit}>
                    <div className="min-w-0 flex-1">
                      <label htmlFor="hero-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="hero-email"
                        type="email"
                        className="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-brand-core200 focus:ring-brand-core200"
                        placeholder="Enter your email"
                        onChange={(event) => setUserEmail(event.target.value)}
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <Button variant="primary" disposition="submit">
                        Signup
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="mt-6">
                  <div className="inline-flex items-center divide-x divide-gray-300">
                    <div className="flex flex-shrink-0 px-5">For property owners</div>
                    <div className="flex flex-shrink-0 px-5">For property managers</div>
                    <div className="flex flex-shrink-0 px-5">For Tenants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                </svg>
              </div>
              <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <Image
                  title=""
                  text=""
                  source="/img/pages/home/dashboard.jpg"
                  id="main-hero-image"
                  alt="HomeKasa - best property management software"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
