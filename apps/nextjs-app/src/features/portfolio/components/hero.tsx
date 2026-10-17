'use client';

import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, type MouseEvent } from 'react';

import {
  gsap,
  motionAllowed,
  scrollToTarget,
  SplitText,
  useGSAP,
} from '../motion/gsap';

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

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root || !motionAllowed()) return;

      const q = gsap.utils.selector(root);

      // ── Intro: masked serif headline, then the rest of the page set ──
      const title = q('[data-hero-title]')[0] as HTMLElement | undefined;
      if (title) {
        SplitText.create(title, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.15,
              stagger: 0.12,
              delay: 0.15,
              ease: 'power4.out',
            }),
        });
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(
        q('[data-hero-meta] > *'),
        { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 },
        0.05,
      )
        .from(
          q('[data-hero-greet]'),
          { autoAlpha: 0, y: 10, duration: 0.6 },
          0.35,
        )
        .from(
          q('[data-hero-tagline]'),
          { autoAlpha: 0, y: 22, duration: 0.8 },
          0.75,
        )
        .from(
          q('[data-hero-cta] > *'),
          { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1 },
          0.9,
        )
        .from(
          q('[data-hero-stat]'),
          { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.09 },
          1.05,
        )
        .from(
          q('[data-hero-portrait]'),
          { autoAlpha: 0, y: 48, duration: 1.1 },
          0.4,
        )
        .from(
          q('[data-hero-specimen]'),
          { autoAlpha: 0, y: 20, duration: 0.7 },
          0.75,
        )
        .from(q('[data-hero-banner]'), { autoAlpha: 0, duration: 1.2 }, 0.6)
        .from(
          q('[data-hero-hint]'),
          { autoAlpha: 0, y: 10, duration: 0.6 },
          1.2,
        );

      // ── Scroll exit: copy drifts up and fades while the banner takes over ──
      gsap.to(q('[data-hero-copy]'), {
        yPercent: -14,
        autoAlpha: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '70% top',
          scrub: true,
        },
      });

      // ── Scroll hint line: endless gentle pulse ──
      const hintLine = q('[data-hero-hint-line]')[0] as HTMLElement | undefined;
      if (hintLine) {
        gsap.fromTo(
          hintLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            duration: 1.3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 1.6,
          },
        );
      }

      // ── Magnetic pull on the primary CTA (fine pointers only) ──
      const cta = q('[data-magnetic]')[0] as HTMLElement | undefined;
      let move: ((e: PointerEvent) => void) | undefined;
      let leave: (() => void) | undefined;

      if (cta && window.matchMedia('(pointer: fine)').matches) {
        const xTo = gsap.quickTo(cta, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(cta, 'y', { duration: 0.5, ease: 'power3' });

        move = (e) => {
          const r = cta.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.16);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
        };
        leave = () => {
          xTo(0);
          yTo(0);
        };

        cta.addEventListener('pointermove', move);
        cta.addEventListener('pointerleave', leave);
      }

      return () => {
        if (cta && move && leave) {
          cta.removeEventListener('pointermove', move);
          cta.removeEventListener('pointerleave', leave);
        }
      };
    },
    { scope: sectionRef },
  );

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollToTarget(href);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden pt-[72px]"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Meta row */}
        <div
          data-hero-meta
          className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[color:var(--pf-rule)] pb-6 pt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--pf-ink-soft)]"
        >
          <span className="inline-flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[color:var(--pf-accent)] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[color:var(--pf-accent)]" />
            </span>
            {t('portfolio.hero.availability')}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={13} />
            {t('portfolio.hero.location')}
          </span>
          <a
            href={`tel:${t('portfolio.hero.phoneHref')}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--pf-ink)]"
          >
            <Phone size={13} />
            {t('portfolio.hero.phone')}
          </a>
        </div>

        <div className="grid gap-14 py-14 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          {/* Copy column */}
          <div data-hero-copy className="self-center">
            <p data-hero-greet className="pf-eyebrow">
              <span className="text-[color:var(--pf-accent)]">(</span>
              {t('portfolio.hero.greeting')}
              <span className="text-[color:var(--pf-accent)]">)</span>
            </p>

            <h1
              data-hero-title
              className="pf-serif mt-5 text-[clamp(2.9rem,7.5vw,5.9rem)] leading-[1.0] tracking-tight"
            >
              <span className="block">{t('portfolio.hero.name')}</span>
              <span className="block pt-2 text-[0.46em] italic leading-[1.2] text-[color:var(--pf-ink-soft)]">
                {t('portfolio.hero.role')}
                <span className="not-italic text-[color:var(--pf-accent)]">
                  .
                </span>
              </span>
            </h1>

            <p
              data-hero-tagline
              className="mt-7 max-w-xl text-[15px] leading-relaxed text-[color:var(--pf-ink-soft)] md:text-base"
            >
              {t('portfolio.hero.tagline')}
            </p>

            <div
              data-hero-cta
              className="mt-9 flex flex-wrap items-center gap-7"
            >
              <a
                data-magnetic
                href="#projects"
                onClick={(e) => go(e, '#projects')}
                className="pf-btn"
              >
                {t('portfolio.hero.viewProjects')}
              </a>
              <a
                href="#contact"
                onClick={(e) => go(e, '#contact')}
                className="pf-link text-sm"
              >
                {t('portfolio.hero.contactNow')}
                <ArrowUpRight size={15} />
              </a>
            </div>

            <dl className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  data-hero-stat
                  className="border-t border-[color:var(--pf-rule-strong)] pt-4"
                >
                  <dd className="pf-serif text-3xl leading-none md:text-4xl">
                    {s.prefix ? (
                      <span className="text-[color:var(--pf-accent)]">
                        {s.prefix}
                      </span>
                    ) : null}
                    <CountUp value={s.value} />
                    <span className="text-[color:var(--pf-accent)]">
                      {s.suffix}
                    </span>
                  </dd>
                  <dt className="mt-2.5 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-[color:var(--pf-ink-soft)]">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait plate */}
          <div className="mx-auto w-full max-w-[380px] self-center">
            <figure data-hero-portrait className="pf-plate relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-[color:var(--pf-rule-strong)] bg-[color:var(--pf-paper-2)]">
                <Image
                  src="/portfolio/avatar.png"
                  alt={t('portfolio.hero.avatarAlt')}
                  fill
                  sizes="(max-width: 1024px) 340px, 380px"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-x border-b border-[color:var(--pf-rule)] bg-[color:var(--pf-paper)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--pf-ink-soft)]">
                <span>Fig. 01 — {t('portfolio.hero.shortName')}</span>
                <span className="text-[color:var(--pf-accent)]">
                  {t('portfolio.hero.location').split(',')[0]}
                </span>
              </figcaption>
            </figure>

            <div
              data-hero-specimen
              className="pf-card mt-6 p-4 font-mono text-[11.5px] leading-relaxed text-[color:var(--pf-ink-soft)]"
            >
              <p>{t('portfolio.hero.codeComment')}</p>
              <p className="mt-1.5 text-[color:var(--pf-ink)]">
                stack —{' '}
                <span className="text-[color:var(--pf-accent)]">
                  Laravel × Next.js
                </span>
              </p>
              <p className="text-[color:var(--pf-ink)]">
                perf —{' '}
                <span className="text-[color:var(--pf-accent)]">
                  {t('portfolio.hero.badgeTitle')}
                </span>
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {['Laravel', 'Next.js', 'Redis'].map((tag) => (
                  <span key={tag} className="pf-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed banner plate */}
      <div data-hero-banner className="relative mt-2 md:mt-4">
        <div className="relative h-[46vh] min-h-[300px] overflow-hidden border-y border-[color:var(--pf-rule)]">
          <div
            data-speed="0.9"
            className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
          >
            <Image
              src="/portfolio/banner.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center grayscale-[35%]"
              priority
            />
          </div>
          <div
            className="absolute inset-0 bg-[color:var(--pf-ink)] opacity-[0.06]"
            aria-hidden
          />
          <p className="absolute bottom-4 left-1/2 w-full max-w-6xl -translate-x-1/2 px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white mix-blend-difference md:px-8">
            Fig. 02 — {t('portfolio.hero.shortName')} ·{' '}
            {t('portfolio.hero.location')}
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <a
          data-hero-hint
          href="#about"
          onClick={(e) => go(e, '#about')}
          className="mx-auto mt-9 flex w-max flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--pf-ink-soft)] transition-colors hover:text-[color:var(--pf-ink)]"
        >
          scroll
          <span
            data-hero-hint-line
            className="block h-10 w-px bg-[color:var(--pf-ink-soft)]"
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
};

const CountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (!motionAllowed()) {
      el.textContent = String(value);
      return;
    }

    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: 'power2.out',
      snap: { v: 1 },
      scrollTrigger: { trigger: el, start: 'top bottom', once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
    });
  }, []);

  return <span ref={ref}>0</span>;
};
