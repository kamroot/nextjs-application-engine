import React from 'react';
import Head from 'next/head';
import { TextContainer } from '~/lib/components/layouts/text-container';
import Footer from '~/lib/components/primitives/footer';
import { NavBar } from '~/lib/components/primitives/navbar';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface LayoutInterface {
  showNav?: boolean;
  // children: React.ReactChildren;
}

export const Layout: React.FC<LayoutInterface> = ({ showNav = true, children }) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/img/homekasa-logo-brand.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>

      {showNav ? <NavBar /> : ''}

      <div className="bg-brand-neutral-50">
        <TextContainer>{children}</TextContainer>
      </div>
      <Footer />
    </>
  );
};
