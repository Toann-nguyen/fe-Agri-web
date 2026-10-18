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
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em]">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          className={`border px-2.5 py-1.5 transition-colors duration-200 ${
            locale === loc
              ? 'border-[color:var(--pf-accent)] text-[color:var(--pf-accent)]'
              : 'border-[color:var(--pf-rule)] text-[color:var(--pf-ink-soft)] hover:border-[color:var(--pf-ink)] hover:text-[color:var(--pf-ink)]'
          }`}
        >
          {localeLabel(loc as 'vi' | 'en')}
        </button>
      ))}
    </div>
  );
};
