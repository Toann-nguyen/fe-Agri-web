'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { Reveal, SectionHeading } from './reveal';

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

/** Work timeline: the rail draws itself as you scroll. */
export const PortfolioExperience = () => {
  const t = useTranslations('common');
  const ref = useRef<HTMLDivElement>(null);
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.55'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  return (
    <section id="experience" className="relative scroll-mt-20 py-24 md:py-32">
      <div
        className="absolute -left-32 bottom-0 size-96 rounded-full bg-[#06b6d4]/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t('portfolio.experience.eyebrow')}
          title={
            <>
              {t('portfolio.experience.titleA')}{' '}
              <span className="text-gradient">
                {t('portfolio.experience.titleB')}
              </span>
            </>
          }
          description={t('portfolio.experience.description')}
        />

        <div ref={ref} className="relative pl-10 md:pl-14">
          {/* Rail */}
          <div className="absolute inset-y-2 left-[13px] w-[2px] rounded bg-white/10 md:left-[21px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute inset-y-2 left-[13px] w-[2px] origin-top rounded bg-gradient-to-b from-[#8b5cf6] via-[#818cf8] to-[#22d3ee] md:left-[21px]"
          />

          <div className="space-y-8">
            {experience.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="glass card-shine relative rounded-3xl p-6 md:p-8"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.15,
                      type: 'spring',
                      stiffness: 320,
                      damping: 16,
                    }}
                    className="absolute -left-10 top-7 flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] text-white shadow-lg shadow-[#8b5cf6]/40 md:-left-14 md:size-9"
                  >
                    <Briefcase size={14} />
                  </motion.span>
                  <span className="font-mono text-xs tracking-wider text-[#67e8f9]">
                    {e.period}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {e.role}
                  </h3>
                  {e.companyUrl ? (
                    <a
                      href={e.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#c4b5fd] transition-colors hover:text-[#ddd6fe]"
                    >
                      {e.company}
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-[#c4b5fd]">
                      {e.company}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {e.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
