'use client';

import {
  Container,
  Database,
  LayoutTemplate,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { gsap, motionAllowed, useGSAP } from '../motion/gsap';

import { YoutubeIcon } from './icons';
import { Reveal, SectionHeading } from './reveal';

const groupIcons = {
  frontend: LayoutTemplate,
  backend: Server,
  database: Database,
  devops: Container,
} as const;

type SkillGroup = {
  name: string;
  level: number;
  icon: keyof typeof groupIcons;
  items: string[];
};

type Perk = { title: string; desc: string };

const perkIcons = [Zap, ShieldCheck, YoutubeIcon];

export const PortfolioAbout = () => {
  const t = useTranslations('common');
  const perks = Object.values(
    t.raw('portfolio.about.perks') as Record<string, Perk>,
  );
  const groupMap = t.raw('portfolio.about.groups') as Record<
    string,
    Omit<SkillGroup, 'items' | 'level'> & {
      items: Record<string, string>;
      level: string;
    }
  >;
  const groups: SkillGroup[] = Object.values(groupMap).map((g) => ({
    ...g,
    level: Number(g.level),
    items: Object.values(g.items),
  }));

  const sectionRef = useRef<HTMLElement>(null);

  // Hairline skill meters draw themselves once.
  useGSAP(
    () => {
      if (!sectionRef.current || !motionAllowed()) return;

      gsap.from('[data-skill-fill]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '[data-skill-grid]',
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow={t('portfolio.about.eyebrow')}
          title={
            <>
              {t('portfolio.about.titleA')}{' '}
              <em className="italic text-[color:var(--pf-accent)]">
                {t('portfolio.about.titleB')}
              </em>
            </>
          }
          description={t('portfolio.about.description')}
        />

        {/* Perks ledger */}
        <div className="grid gap-px overflow-hidden border border-[color:var(--pf-rule)] bg-[color:var(--pf-rule)] md:grid-cols-3">
          {perks.map((p, i) => {
            const Icon = perkIcons[i] ?? Zap;
            return (
              <div
                key={p.title}
                className="bg-[color:var(--pf-paper)] p-7 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} className="text-[color:var(--pf-accent)]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--pf-ink-faint)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="pf-serif mt-5 text-xl leading-snug md:text-[1.35rem]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--pf-ink-soft)]">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Skill groups */}
        <div
          data-skill-grid
          className="mt-6 grid gap-px overflow-hidden border border-[color:var(--pf-rule)] bg-[color:var(--pf-rule)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {groups.map((g) => {
            const Icon = groupIcons[g.icon] ?? Server;
            return (
              <div
                key={g.name}
                className="bg-[color:var(--pf-paper)] p-6 md:p-7"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="pf-serif inline-flex items-center gap-2.5 text-lg leading-none">
                    <Icon
                      size={15}
                      className="shrink-0 self-center text-[color:var(--pf-accent)]"
                    />
                    {g.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-[color:var(--pf-accent)]">
                    {g.level}%
                  </span>
                </div>

                <div className="relative mt-4 h-px w-full bg-[color:var(--pf-rule)]">
                  <span
                    data-skill-fill
                    className="absolute inset-y-0 left-0 h-px bg-[color:var(--pf-ink)]"
                    style={{ width: `${g.level}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span key={item} className="pf-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pull quote */}
        <Reveal delay={0.1}>
          <figure className="mx-auto mt-16 max-w-3xl text-center md:mt-20">
            <div className="mx-auto h-px w-16 bg-[color:var(--pf-accent)]" />
            <blockquote className="pf-serif mt-8 text-2xl italic leading-snug md:text-[1.9rem]">
              “{t('portfolio.about.quote')}”
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};
