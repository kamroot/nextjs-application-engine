import Link from 'next/link';
import React from 'react';
import Subscribe from '../cta/subscribe';
import meta from 'facade/data/meta.json';
import { H2, H3 } from '~/lib/components/primitives/headers';
// eslint-disable-next-line import/extensions
import { navigation } from 'facade/data/footer.js';

// from https://tailwindui.com/components/marketing/sections/footers

const Footer: React.FC = () => {
  return (
    <div className="bg-stone-800 text-slate-500">
      <Subscribe
        id="subscribe-cta"
        redirectURL="blog"
        showToast={true}
        message="⭐ You are on your way to getting the best in real-estate news and information"
      />
      <footer className="bg-gray-800" aria-labelledby="footer-heading">
        <H2 id="footer-heading" className="sr-only">
          Footer
        </H2>
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-4">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <H3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Features</H3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.features.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}>
                          <a className="text-base text-gray-300 hover:text-white">{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <H3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">IRS Tax Forms</H3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.irs.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}>
                          <a className="text-base text-gray-300 hover:text-white" target="_blank">
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <H3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resources</H3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.resources.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}>
                          <a className="text-base text-gray-300 hover:text-white">{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <H3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</H3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}>
                          <a className="text-base text-gray-300 hover:text-white">{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {navigation.social.map((item) => (
                <Link href={item.href} key={item.name}>
                  <a className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
              &copy; 2018-{new Date().getFullYear()} {meta.name} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
