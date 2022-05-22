import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { Layout } from '~/lib/components/layouts/classic';
import { ContentContainer } from '~/lib/components/mdx/mdx';

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <ContentContainer>
        <Head>
          <title>Error 404 / Page Not Found</title>
        </Head>
        <h1>404</h1>
        <p>
          <i>This is not the page you are looking for.</i>
        </p>
        <p>
          <Link href="/">
            <a>Head home and try again</a>
          </Link>
        </p>
      </ContentContainer>
    </Layout>
  );
};

export default NotFoundPage;
