import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import viCommon from '@repo/i18n/locales/vi/common.json';
import enCommon from '@repo/i18n/locales/en/common.json';

export function createI18nextInstance(locale: string) {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'vi',
    supportedLngs: ['vi', 'en'],
    resources: {
      vi: { common: viCommon },
      en: { common: enCommon },
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}
