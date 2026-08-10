import { locales, defaultLocale } from '@repo/i18n';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation('common');
  const current = i18n.language || defaultLocale;

  const switchTo = useCallback(
    (locale: string) => {
      i18n.changeLanguage(locale);
    },
    [i18n],
  );
  return (
    <div className='flex items-center gap-2 text-xs'>
      {locales.map((locale) => (
        <button
          key={locale}
          type='button'
          onClick={() => switchTo(locale)}
          className={`rounded-full border px-2 py-1 transition-colors ${
            current === locale
              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
              : 'border-white/10 text-slate-400 hover:text-slate-200'
          }`}
        >
          {locale === 'vi' ? 'Tiếng Việt' : 'English'}
        </button>
      ))}
    </div>
  );
};
