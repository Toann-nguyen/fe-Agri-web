'use client';

import { useRef, type ReactNode } from 'react';

import { gsap, motionAllowed, useGSAP } from '../motion/gsap';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Fade + rise once, when the block enters the viewport. */
export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !motionAllowed()) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

/**
 * Editorial section heading: hairline rule, numbered mono eyebrow,
 * serif display title and an optional muted lede.
 */
export const SectionHeading = ({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !motionAllowed()) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });

      tl.from('[data-head-rule]', {
        scaleX: 0,
        duration: 1.1,
        transformOrigin: 'left center',
      })
        .from(
          '[data-head-eyebrow]',
          { autoAlpha: 0, y: 12, duration: 0.6 },
          '-=0.75',
        )
        .from(
          '[data-head-title]',
          { autoAlpha: 0, y: 36, duration: 0.95 },
          '-=0.5',
        )
        .from(
          '[data-head-desc]',
          { autoAlpha: 0, y: 22, duration: 0.75 },
          '-=0.65',
        );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mb-12 md:mb-16">
      <div data-head-rule className="h-px w-full bg-[color:var(--pf-rule)]" />
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <p data-head-eyebrow className="pf-eyebrow flex items-center gap-3">
            {index ? (
              <span className="text-[color:var(--pf-accent)]">({index})</span>
            ) : null}
            <span>{eyebrow}</span>
          </p>
          <h2
            data-head-title
            className="pf-serif mt-4 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] tracking-tight"
          >
            {title}
          </h2>
        </div>
        {description ? (
          <p
            data-head-desc
            className="max-w-md shrink-0 text-sm leading-relaxed text-[color:var(--pf-ink-soft)] md:pb-1.5 md:text-[15px]"
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
};
