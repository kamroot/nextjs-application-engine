import React from 'react';
import { useRouter } from 'next/router';
import { log } from '~/lib/functions/log';
import { useTracking } from 'lib/contexts/ga';
import Link from 'next/link';
import { url } from 'lib/functions/utils';
import { addSubscriber } from 'lib/data/api';
import { H2 } from '~/lib/components/primitives/headers';

type SubscribeProps = {
  title?: string;
  subTitle?: string;
  buttonLabel?: string;
  id: string;
  disclaimerURL?: string;
  description?: React.ReactChildren;
  redirectURL: string;
  showToast?: boolean;
  message?: string;
};

const Subscribe: React.FC<SubscribeProps> = ({
  title = 'Never miss an update',
  subTitle = 'Subscribe to receive the best in real-estate. Design, investment, finance and legal resources from HomeKasa.',
  description,
  buttonLabel = 'Submit',
  id,
  disclaimerURL = '/legal/privacy',
  redirectURL = 'blog',
  showToast = false,
  message,
}) => {
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const { logEvent } = useTracking();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addSubscriber(logEvent, userName, userEmail);
    router.push({
      pathname: url(redirectURL),
      query: { showToast: showToast, message: `${message} ${userEmail}` },
    });
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'name' | 'email') => {
    field === 'name' ? setUserName(event.target.value) : setUserEmail(event.target.value);
  };

  const handleFocusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: 'name' | 'email',
    action: 'focus' | 'defocus'
  ) => {
    log('subscribe', `Field ${field} focus changed to ${action}. Current value is ${event.target.value}`);
  };

  return (
    <div className="bg-gray-800 text-slate-500 " id={id}>
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:py-0 lg:px-8 ">
        <div className="space-x-8 rounded-xl py-2 px-2 sm:py-2 sm:px-8 lg:flex lg:items-center lg:p-8 lg:px-20 ">
          <div className="mt-4 sm:w-full sm:max-w-md lg:mt-0 lg:ml-1 lg:flex-1 ">
            <H2 className="text-3xl font-extrabold tracking-tight text-zinc-800">{title}</H2>
            <p className="mt-4 max-w-3xl text-lg text-zinc-500">{subTitle}</p>
            <form className="sm:flex" id="user-email-form" onSubmit={handleSubmit}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-core"
                placeholder="Enter your email"
                onChange={(event) => handleFieldChange(event, 'email')}
                onFocus={(event) => handleFocusChange(event, 'email', 'focus')}
                onBlur={(event) => handleFocusChange(event, 'email', 'defocus')}
              />
              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-brand-core px-5 py-3 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-core sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                {buttonLabel}
              </button>
            </form>
            <p className="mt-3 text-sm text-indigo-100">
              We care about the protection of your data. Read our{' '}
              <Link href={disclaimerURL}>
                <a className="font-medium text-white underline">Privacy Policy.</a>
              </Link>
            </p>
          </div>
          <div className="px-4 lg:w-0 lg:flex-1">
            <p className="mx-0 mt-0 mb-3 box-border break-words p-0 text-base font-bold leading-6 text-white outline-0">
              What you&apos;ll get in your inbox
            </p>
            <ul role="list" className="list-disc space-y-1 pl-5 marker:text-brand-core">
              <li> Property Owner Ideas </li>
              <li> Tax, Legal and financial guides & ideas</li>
              <li> Tenant and owner relationship and disputes </li>
              <li> Managing expenses </li>
              <li> Finding help to maintain your house </li>
              <li> Staging, painting and other design ideas </li>
            </ul>
            <div className="mt-4 font-thin"> No spam ever. Every two weeks </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
