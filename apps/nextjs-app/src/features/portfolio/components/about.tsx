'use client';

import { motion } from 'framer-motion';
import {
  Container,
  Database,
  LayoutTemplate,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

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

  return (
    <section id="about" className="relative scroll-mt-20 py-24 md:py-32">
      <div
        className="absolute -left-40 top-1/3 size-96 rounded-full bg-[#7c3aed]/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t('portfolio.about.eyebrow')}
          title={
            <>
              {t('portfolio.about.titleA')}{' '}
              <span className="text-gradient">
                {t('portfolio.about.titleB')}
              </span>
            </>
          }
          description={t('portfolio.about.description')}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {perks.map((p, i) => {
            const Icon = perkIcons[i] ?? Zap;
            return (
              <Reveal key={p.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="glass card-shine h-full rounded-3xl p-7"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/25 to-[#22d3ee]/20 text-[#c4b5fd] ring-1 ring-white/10">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {p.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Skill groups */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, gi) => {
            const Icon = groupIcons[g.icon] ?? Server;
            return (
              <Reveal key={g.name} delay={gi * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="glass card-shine flex h-full flex-col rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/25 to-[#22d3ee]/20 text-[#c4b5fd] ring-1 ring-white/10">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-xs text-[#67e8f9]">
                      {g.level}%
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-white">{g.name}</h3>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.level}%` }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 1,
                        delay: 0.1 + gi * 0.1,
                        ease: 'easeOut',
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#818cf8] to-[#22d3ee]"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#7c3aed]/20 to-[#06b6d4]/15 p-5 text-center ring-1 ring-white/10">
            <p className="text-sm italic leading-relaxed text-zinc-300">
              {t('portfolio.about.quote')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
