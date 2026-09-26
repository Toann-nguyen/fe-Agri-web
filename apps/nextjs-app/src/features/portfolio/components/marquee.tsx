'use client';

import { Sparkle } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** Infinite two-row marquee running in opposite directions. */
export const PortfolioMarquee = () => {
  const t = useTranslations('common');
  const items = Object.values(
    t.raw('portfolio.marquee') as Record<string, string>,
  );
  const row = [...items, ...items];
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.015] py-6"
    >
      <div className="pf-marquee flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span
            key={`a-${i}`}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            <span className="text-xl font-extrabold tracking-wide text-white/90 md:text-2xl">
              {item}
            </span>
            <Sparkle size={16} className="shrink-0 text-[#a78bfa]" />
          </span>
        ))}
      </div>
      <div className="pf-marquee-reverse mt-5 flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span
            key={`b-${i}`}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            <span className="text-gradient text-xl font-extrabold tracking-wide md:text-2xl">
              {item}
            </span>
            <Sparkle size={16} className="shrink-0 text-[#67e8f9]" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#06060c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#06060c] to-transparent" />
    </section>
  );
};
