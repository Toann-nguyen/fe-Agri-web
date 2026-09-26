'use client';

import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';

/** Smooth scrolling for the whole portfolio page via Lenis. */
export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Route anchor links (#about, #projects, ...) through Lenis.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -72 });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

/** Reading progress bar pinned to the top edge. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#8b5cf6] via-[#818cf8] to-[#22d3ee]"
      style={{ scaleX }}
    />
  );
};

/** Soft glow following the mouse (fine-pointer devices only). */
export const CursorGlow = () => {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[500px] w-[500px] rounded-full opacity-25 md:block"
      style={{
        x: sx,
        y: sy,
        background:
          'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(34,211,238,0.12) 40%, transparent 70%)',
      }}
    />
  );
};
