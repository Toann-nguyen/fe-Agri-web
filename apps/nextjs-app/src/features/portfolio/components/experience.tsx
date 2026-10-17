'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { gsap, motionAllowed, useGSAP } from '../motion/gsap';

import { SectionHeading } from './reveal';

type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlights: string[];
};

// Company links are stable facts, not copy — kept out of messages.
const companyUrls = ['https://infinilab.vn/', 'https://deha-soft.com/'];

/** Work timeline printed on ink: the vermilion rail draws itself on scroll. */
export const PortfolioExperience = () => {
  const t = useTranslations('common');
  const listRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const itemMap = t.raw('portfolio.experience.items') as Record<
    string,
    Omit<ExperienceItem, 'companyUrl' | 'highlights'> & {
      highlights: Record<string, string>;
    }
  >;
  const items: Omit<ExperienceItem, 'companyUrl'>[] = Object.values(
    itemMap,
  ).map((item) => ({ ...item, highlights: Object.values(item.highlights) }));
  const experience: ExperienceItem[] = items.map((item, i) => ({
    ...item,
    companyUrl: companyUrls[i],
  }));

  useGSAP(() => {
    if (!listRef.current || !railRef.current || !motionAllowed()) return;

    gsap.fromTo(
      railRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 72%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <section
      id="experience"
      className="pf-ink-band relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow={t('portfolio.experience.eyebrow')}
          title={
            <>
              {t('portfolio.experience.titleA')}{' '}
              <em className="italic text-[color:var(--pf-accent)]">
                {t('portfolio.experience.titleB')}
              </em>
            </>
          }
          description={t('portfolio.experience.description')}
        />

        <div ref={listRef} className="relative pl-8 md:pl-14">
          {/* Rail: faint base + drawn vermilion line */}
          <div className="absolute inset-y-1 left-[3px] w-px bg-[color:var(--pf-rule)]" />
          <div
            ref={railRef}
            className="absolute inset-y-1 left-[3px] w-px bg-[color:var(--pf-accent)]"
          />

          <div>
            {experience.map((e) => (
              <article
                key={e.role}
                className="relative border-t border-[color:var(--pf-rule)] py-9 first:border-t-0 md:py-11"
              >
                <span
                  aria-hidden
                  className="absolute -left-8 top-[42px] size-[7px] rotate-45 bg-[color:var(--pf-accent)] md:-left-14 md:top-[50px]"
                />

                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--pf-accent)]">
                  {e.period}
                </p>
                <h3 className="pf-serif mt-3 text-2xl leading-tight md:text-[1.75rem]">
                  {e.role}
                </h3>
                {e.companyUrl ? (
                  <a
                    href={e.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-link mt-2 text-sm"
                  >
                    {e.company}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <p className="mt-2 text-sm font-medium text-[color:var(--pf-ink-soft)]">
                    {e.company}
                  </p>
                )}
                <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-[color:var(--pf-ink-soft)]">
                  {e.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.highlights.map((h) => (
                    <span key={h} className="pf-chip">
                      {h}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
