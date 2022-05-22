import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { TrackingProvider } from '../lib/contexts/ga';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { DefaultSeo } from 'next-seo';
import 'facade/styles/index.css';
import 'fontsource-montserrat';
import meta from 'facade/data/meta.json';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s - ${meta.name}`}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: meta.productionUrl,
          title: meta.title,
          description: meta.description,
        }}
        twitter={{
          handle: `${meta.social.twitterHandle}`,
          site: `${meta.social.twitter}`,
          cardType: 'summary_large_image',
        }}
      />

      <TrackingProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
          </Hydrate>
        </QueryClientProvider>
      </TrackingProvider>
    </>
  );
};

export default App;
