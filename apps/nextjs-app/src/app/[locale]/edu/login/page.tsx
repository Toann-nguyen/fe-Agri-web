import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import EduAiLoginPage from './edu-login-client';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'edu' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: { index: false, follow: false },
  };
}

export default function EduLoginPage() {
  return <EduAiLoginPage />;
}
