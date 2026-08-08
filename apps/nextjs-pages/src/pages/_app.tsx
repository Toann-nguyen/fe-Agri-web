import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { AppProvider } from '@/app/provider';
import { createI18nextInstance } from '@/i18n';

import '@/styles/globals.css';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = import('next').NextPage<
  P,
  IP
> & {
  getLayout?: (page: import('react').ReactElement) => import('react').ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const locale = (pageProps as any).locale || router.locale || 'vi';
  const i18n = useMemo(() => createI18nextInstance(locale), [locale]);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
    </I18nextProvider>
  );
}
