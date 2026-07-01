import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Inter, Fira_Code } from 'next/font/google';
import { ReactNode } from 'react';

import { AppProvider } from '@/app/provider';
import { env } from '@/config/env';

import '@/styles/globals.css';

const siteUrl = env.APP_URL ?? 'https://toanrobert.online';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: 'Nguyen Minh Toan — Full-Stack Developer',
    template: '%s | Nguyen Minh Toan',
  },
  description:
    'Building high-performance, secure, and scalable web applications with precision-engineered architecture.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', type: 'image/png' },
      { url: '/favicon-16x16.png', type: 'image/png' },
    ],
    apple: '/favicon-32x32.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Nguyen Minh Toan',
    title: 'Nguyen Minh Toan — Full-Stack Developer',
    description:
      'Building high-performance, secure, and scalable web applications with precision-engineered architecture.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nguyen Minh Toan — Full-Stack Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nguyen Minh Toan — Full-Stack Developer',
    description:
      'Building high-performance, secure, and scalable web applications with precision-engineered architecture.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  url: siteUrl,
                  name: 'Nguyen Minh Toan — Full-Stack Developer',
                },
                {
                  '@type': 'Person',
                  '@id': `${siteUrl}/#person`,
                  name: 'Nguyen Minh Toan',
                  jobTitle: 'Full-Stack Developer & Performance Architect',
                  url: siteUrl,
                  sameAs: [
                    'https://github.com/robert-pham',
                    'https://linkedin.com/in/nguyenminhtoan',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden bg-slate-950 font-sans text-ink-600 antialiased">
        <AppProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

// We are not prerendering anything because the app is highly dynamic
// and the data depends on the user so we need to send cookies with each request
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
