'use client';

import { useRef, type ReactNode } from 'react';

import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

import '@/features/auth/auth.css';

import { gsap, motionAllowed, useGSAP } from '../motion';

import { AuthBackground } from './auth-background';

type AuthShellProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export const AuthShell = ({ children, title, description }: AuthShellProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Editorial entrance: wordmark → title → rule → card.
  useGSAP(
    () => {
      if (!ref.current || !motionAllowed()) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-auth-wordmark]', { autoAlpha: 0, y: 14, duration: 0.6 })
        .from(
          '[data-auth-title]',
          { autoAlpha: 0, y: 20, duration: 0.7 },
          '-=0.35',
        )
        .from(
          '[data-auth-desc]',
          { autoAlpha: 0, y: 14, duration: 0.6 },
          '-=0.5',
        )
        .from('[data-auth-rule]', { scaleX: 0, duration: 0.7 }, '-=0.45')
        .from(
          '[data-auth-card]',
          { autoAlpha: 0, y: 26, duration: 0.8 },
          '-=0.5',
        );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="auth-editorial relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-14 selection:bg-[color:var(--ax-accent)] selection:text-[color:var(--ax-paper)] sm:px-6 lg:px-8"
    >
      <AuthBackground />

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <div data-auth-wordmark className="flex justify-center">
          <Link
            className="ax-serif inline-flex items-baseline text-[26px] leading-none"
            href={paths.home.getHref()}
          >
            Minh Toan
            <span className="text-[color:var(--ax-accent)]">.</span>
          </Link>
        </div>

        <h1
          data-auth-title
          className="ax-serif mt-8 text-center text-[2.1rem] leading-[1.1]"
        >
          {title}
        </h1>

        {description && (
          <p
            data-auth-desc
            className="mt-3 text-center text-sm leading-relaxed text-[color:var(--ax-ink-soft)]"
          >
            {description}
          </p>
        )}

        <div
          data-auth-rule
          className="mx-auto mt-7 h-px w-14 bg-[color:var(--ax-accent)]"
        />
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div data-auth-card className="ax-card px-5 py-8 sm:px-10">
          {children}
        </div>
      </div>

      <p className="ax-eyebrow relative mt-10 text-center text-[10px]">
        © Nguyen Minh Toan
      </p>
    </div>
  );
};
