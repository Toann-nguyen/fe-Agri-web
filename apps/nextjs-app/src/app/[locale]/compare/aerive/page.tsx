import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import '@/features/portfolio/portfolio.css';

import { AeriveCompare } from './aerive-compare-client';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('portfolio.compare.title'),
    description: t('portfolio.compare.description'),
  };
}

const CompareAerivePage = () => {
  return <AeriveCompare />;
};

export default CompareAerivePage;
