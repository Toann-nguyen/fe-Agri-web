'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { routing } from '@/i18n/navigation';

export const LanguageSwitcher = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.replace(segments.join('/'));
  };

  const localeLabel = (loc: 'vi' | 'en') => {
    if (loc === 'vi') return t('vietnamese');
    return t('english');
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          className={`rounded-full border px-2 py-1 transition-colors ${
            locale === loc
              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
              : 'border-white/10 text-slate-400 hover:text-slate-200'
          }`}
        >
          {localeLabel(loc as 'vi' | 'en')}
        </button>
      ))}
    </div>
  );
};
