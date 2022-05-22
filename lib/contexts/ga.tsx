import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga4';
import { log } from '../functions/log';
import meta from 'facade/data/meta.json';
import { config } from '~/lib/functions/config';

const TrackingID = process.env.NODE_ENV === 'development' ? meta.ga4.dev : meta.ga4.prod;
const TrackingContext = React.createContext(undefined);
// const TrackingContext = React.createContext();

const TrackingProvider: React.FC = (props) => {
  const [analytics, setAnalytics] = useState({
    isInitialized: false,
    trackers: ['defaultTracker'],
  });

  type eventProps = {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction: boolean;
    transport: 'xhr' | 'beacon' | 'image';
  };

  const logEvent = (event: eventProps) => {
    log(`ReactGA (event)`, JSON.stringify(event));
    if (analytics.isInitialized) {
      ReactGA.event({
        category: event.category,
        action: event.action,
        label: event.label,
      });
    } else {
      log(`React GA`, 'analytics is NOT initialized');
    }
  };

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      log('ReactGA', `App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`);

      // ReactGA.set({ page: url });
      // ReactGA.send('pageview');
      // ReactGA.send({ hitType: 'pageview', page: url });
    };

    const { isInitialized, trackers } = analytics;

    if (!isInitialized) {
      log(`React GA`, `Initializing GA4 with prop id ${TrackingID}`);
      ReactGA.initialize(TrackingID, {
        testMode: false, // we will use either the prod or dev version of the property
        gaOptions: { name: `${meta.siteId}-tracker`, cookieName: `${meta.siteId}-cookie` },
      });

      Router.events.on('routeChangeComplete', handleRouteChange);

      setAnalytics((prev) => ({
        ...prev,
        isInitialized: true,
      }));
      ReactGA.send('pageview');
    } else {
      ReactGA.set(trackers);
      // ReactGA.send('pageview');
      // ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return <TrackingContext.Provider value={{ logEvent }} {...props} />;
};

const useTracking = () => React.useContext(TrackingContext);

export { TrackingProvider, useTracking };

// https://dev.to/markkdev/setting-up-google-analytics-with-react-context-in-next-js-23h1
