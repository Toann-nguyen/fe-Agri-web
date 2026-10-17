import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Canonical single registration for the whole portfolio feature.
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
);

/** True when the visitor has not requested reduced motion. */
export const motionAllowed = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/**
 * Scroll to a selector (or Y position), honoring the active ScrollSmoother
 * instance when present and falling back to native scrolling otherwise.
 */
export const scrollToTarget = (target: string | number, offsetY = 88) => {
  const smoother = ScrollSmoother.get();

  const y =
    typeof target === 'number'
      ? target
      : (() => {
          const el = document.querySelector(target);
          if (!el) return null;
          const current = smoother ? smoother.scrollTop() : window.scrollY;
          return el.getBoundingClientRect().top + current - offsetY;
        })();

  if (y === null) return;

  if (smoother) {
    smoother.scrollTo(y, true);
    return;
  }

  window.scrollTo({
    top: y,
    behavior: motionAllowed() ? 'smooth' : 'auto',
  });
};

export {
  gsap,
  ScrollSmoother,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
};
