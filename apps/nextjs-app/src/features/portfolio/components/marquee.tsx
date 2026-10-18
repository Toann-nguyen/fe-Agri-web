'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { gsap, motionAllowed, useGSAP } from '../motion/gsap';

/** Editorial tape: one endless serif line drifting behind a hairline rule. */
export const PortfolioMarquee = () => {
  const t = useTranslations('common');
  const items = Object.values(
    t.raw('portfolio.marquee') as Record<string, string>,
  );
  const row = [...items, ...items];
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track || !motionAllowed()) return;

    gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 32,
      repeat: -1,
    });
  }, []);

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-[color:var(--pf-rule)] py-5 md:py-6"
    >
      <div ref={trackRef} className="pf-marquee-track gap-10 pr-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap"
          >
            <span
              className={`pf-serif text-2xl leading-none md:text-[2rem] ${
                i % 2 === 1
                  ? 'italic text-[color:var(--pf-ink-soft)]'
                  : 'text-[color:var(--pf-ink)]'
              }`}
            >
              {item}
            </span>
            <span className="pf-serif text-[color:var(--pf-accent)]">*</span>
          </span>
        ))}
      </div>
    </section>
  );
};
