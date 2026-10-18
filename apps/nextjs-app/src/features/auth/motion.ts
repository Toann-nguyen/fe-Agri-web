import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

// Core-only registration for auth pages (no scroll plugins needed here).
gsap.registerPlugin(useGSAP);

/** True when the visitor has not requested reduced motion. */
export const motionAllowed = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

export { gsap, useGSAP };
