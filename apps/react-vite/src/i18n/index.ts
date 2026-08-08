import enCommon from '@repo/i18n/locales/en/common.json';
import viCommon from '@repo/i18n/locales/vi/common.json';
import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export function createI18nextInstance() {
  const instance = createInstance();
  instance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
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
      detection: {
        order: ['localStorage', 'cookie', 'navigator'],
        caches: ['localStorage'],
      },
    });
  return instance;
}
