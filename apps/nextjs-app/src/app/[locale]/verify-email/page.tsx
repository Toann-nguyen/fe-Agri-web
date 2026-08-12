import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { VerifyEmailClient } from './verify-email-client';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('auth.verifyEmailTitle'),
    description: t('auth.verifyEmailDescription'),
    robots: { index: false, follow: false },
  };
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailClient />
    </Suspense>
  );
}
