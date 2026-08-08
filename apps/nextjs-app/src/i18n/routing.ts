import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  // Option B: default locale (vi) served without prefix, e.g. `/edu/login`
  // other locales get a prefix, e.g. `/en/edu/login`
  localePrefix: 'as-needed',
});
