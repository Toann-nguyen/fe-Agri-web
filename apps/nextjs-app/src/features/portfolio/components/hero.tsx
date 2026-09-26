'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowRight, MapPin, Phone, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { Reveal } from './reveal';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
};

export const PortfolioHero = () => {
  const t = useTranslations('common');
  const statMap = t.raw('portfolio.hero.stats') as Record<
    string,
    Omit<Stat, 'value'> & { value: string }
  >;
  const stats: Stat[] = Object.values(statMap).map((s) => ({
    ...s,
    value: Number(s.value),
  }));

  // Tilt the card with the mouse.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 16,
  });

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative overflow-hidden pt-[72px]"
    >
      {/* Banner background + dark overlay */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/portfolio/banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060c]/60 via-[#06060c]/85 to-[#06060c]" />
      </div>
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            'linear-gradient(90deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%)',
        }}
        aria-hidden
      />
      <motion.div
        className="absolute right-[8%] top-24 size-56 rounded-full bg-[#22d3ee]/15 blur-[100px]"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:px-8 md:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy column */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-zinc-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t('portfolio.hero.availability')}
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium tracking-wide text-zinc-400"
          >
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-[#67e8f9]" />
              {t('portfolio.hero.location')}
            </span>
            <a
              href={`tel:${t('portfolio.hero.phoneHref')}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone size={15} className="text-[#67e8f9]" />
              {t('portfolio.hero.phone')}
            </a>
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {t('portfolio.hero.greeting')}
            <br />
            <span className="text-gradient">{t('portfolio.hero.name')}</span>
            <br />
            <span className="text-zinc-500">{t('portfolio.hero.role')}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            {t('portfolio.hero.tagline')}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#7c3aed]/40"
            >
              {t('portfolio.hero.viewProjects')}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
            >
              <Sparkles size={17} className="text-[#67e8f9]" />
              {t('portfolio.hero.contactNow')}
            </motion.a>
          </motion.div>

          {/* Animated stats */}
          <motion.dl
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div key={s.label}>
                <dt className="order-2 mt-1 text-xs leading-snug text-zinc-500">
                  {s.label}
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-white md:text-3xl">
                  {s.prefix ? (
                    <span className="text-gradient">{s.prefix}</span>
                  ) : null}
                  <CountUp value={s.value} delay={0.6 + i * 0.15} />
                  <span className="text-gradient">{s.suffix}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* 3D card column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{ perspective: 1000 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="pf-spin-slow absolute -inset-6 rounded-[2.5rem] opacity-40 blur-2xl"
            style={{
              background:
                'conic-gradient(from 0deg, #7c3aed, #06b6d4, #f472b6, #7c3aed)',
            }}
            aria-hidden
          />
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="glass card-shine relative rounded-[2rem] p-8"
          >
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-[#8b5cf6]/40 ring-2 ring-[#a78bfa]/60">
                <Image
                  src="/portfolio/avatar.png"
                  alt={t('portfolio.hero.avatarAlt')}
                  fill
                  sizes="64px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <p className="font-bold text-white">
                  {t('portfolio.hero.shortName')}
                </p>
                <p className="text-sm text-zinc-400">
                  {t('portfolio.hero.role')}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3 font-mono text-[13px] leading-relaxed">
              <p className="text-zinc-500">{t('portfolio.hero.codeComment')}</p>
              <p>
                <span className="text-[#e879f9]">const</span>{' '}
                <span className="text-[#67e8f9]">dev</span>{' '}
                <span className="text-zinc-500">=</span>{' '}
                <span className="text-emerald-300">{'{'}</span>
              </p>
              <p className="pl-5 text-zinc-300">
                stack:{' '}
                <span className="text-[#fcd34d]">
                  &quot;Laravel × Next.js&quot;
                </span>
                ,
              </p>
              <p className="pl-5 text-zinc-300">
                perf:{' '}
                <span className="text-[#fcd34d]">&quot;-30% latency&quot;</span>
                ,
              </p>
              <p className="pl-5 text-zinc-300">
                hireable: <span className="text-emerald-300">true</span>
              </p>
              <p className="text-emerald-300">{'}'}</p>
            </div>
            <div className="mt-6 flex gap-2.5">
              {['Laravel', 'Next.js', 'Redis'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl px-5 py-4 sm:flex"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                {t('portfolio.hero.badgeTitle')}
              </p>
              <p className="text-xs text-zinc-400">
                {t('portfolio.hero.badgeDesc')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <Reveal className="relative flex justify-center pb-10" y={10}>
        <motion.a
          href="#about"
          aria-label="Scroll down"
          className="glass flex size-12 items-center justify-center rounded-full text-zinc-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.a>
      </Reveal>
    </section>
  );
};

const CountUp = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return <span ref={ref}>0</span>;
};
