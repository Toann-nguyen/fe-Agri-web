import type { Locale } from '@repo/i18n';
import enCommon from '@repo/i18n/locales/en/common.json';
import enEdu from '@repo/i18n/locales/en/edu.json';
import viCommon from '@repo/i18n/locales/vi/common.json';
import viEdu from '@repo/i18n/locales/vi/edu.json';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

// Static imports keep the workspace-package resolution robust across bundlers.
// For apps with many locales, switch to dynamic `import(\`@repo/i18n/locales/${locale}/...\`)`.
const messageMap = {
  vi: { common: viCommon, edu: viEdu },
  en: { common: enCommon, edu: enEdu },
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? (requested as Locale)
      : routing.defaultLocale;

  return {
    locale,
    messages: messageMap[locale],
  };
});
