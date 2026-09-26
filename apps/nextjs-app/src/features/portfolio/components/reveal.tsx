'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Fade + slide-up each time a section enters the viewport. */
export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
}: RevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

/** Consistent section heading: eyebrow + big title + description. */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
      <Reveal>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c4b5fd]">
          <span className="size-1.5 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#22d3ee]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.2}>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
};
