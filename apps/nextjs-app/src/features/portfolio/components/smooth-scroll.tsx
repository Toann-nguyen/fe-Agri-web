'use client';

import { useRef, type ReactNode } from 'react';

import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from '../motion/gsap';

/**
 * GSAP ScrollSmoother provider for the portfolio page.
 *
 * Fixed UI (navbar, progress bar) must be rendered OUTSIDE of
 * #smooth-wrapper by the parent — transformed content breaks position:fixed.
 */
export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.15,
        effects: true,
        normalizeScroll: true,
      });

      // Recalculate trigger positions once the serif webfont swaps in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => smoother.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

/** Reading progress: a vermilion hairline pinned to the top edge. */
export const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#smooth-content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return <div ref={ref} className="pf-progress" aria-hidden />;
};
