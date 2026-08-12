import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { RegisterClient } from './register-client';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('auth.registerTitle'),
    description: t('auth.registerDescription'),
    robots: { index: false, follow: false },
  };
}

export default function RegisterPage() {
  return <RegisterClient />;
}
