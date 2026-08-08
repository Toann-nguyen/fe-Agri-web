export type Locale = 'vi' | 'en';

export const locales: readonly Locale[] = ['vi', 'en'] as const;
export const defaultLocale: Locale = 'vi';

export const localeNames: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export type Messages = typeof import('./locales/vi/edu.json');
