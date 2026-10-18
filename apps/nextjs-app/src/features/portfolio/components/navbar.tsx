'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

import { LanguageSwitcher } from '@/components/language-switcher';

import { gsap, scrollToTarget, useGSAP } from '../motion/gsap';

export const PortfolioNavbar = () => {
  const t = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: t('portfolio.nav.home'), href: '#home' },
    { label: t('portfolio.nav.about'), href: '#about' },
    { label: t('portfolio.nav.projects'), href: '#projects' },
    { label: t('portfolio.nav.experience'), href: '#experience' },
    { label: t('portfolio.nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobile menu: GSAP staggered reveal.
  useGSAP(
    () => {
      const el = menuRef.current;
      if (!el) return;

      if (open) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: -10 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        );
        gsap.fromTo(
          el.querySelectorAll('[data-mobile-link]'),
          { autoAlpha: 0, x: -14 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.08,
            ease: 'power2.out',
          },
        );
      } else {
        gsap.to(el, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
      }
    },
    { dependencies: [open] },
  );

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollToTarget(href);
    setOpen(false);
  };

  return (
    <header
      className={`pf-nav fixed inset-x-0 top-0 z-50 ${
        scrolled ? 'pf-nav-scrolled' : ''
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#home"
          onClick={(e) => go(e, '#home')}
          className="pf-serif text-[22px] leading-none tracking-tight text-[color:var(--pf-ink)]"
        >
          {t('portfolio.nav.brand')}
          <span className="text-[color:var(--pf-accent)]">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className={`inline-flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                  active === link.href
                    ? 'text-[color:var(--pf-ink)]'
                    : 'text-[color:var(--pf-ink-soft)] hover:text-[color:var(--pf-ink)]'
                }`}
              >
                {active === link.href ? (
                  <span
                    className="inline-block size-1.5 bg-[color:var(--pf-accent)]"
                    aria-hidden
                  />
                ) : null}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <a
            href="#contact"
            onClick={(e) => go(e, '#contact')}
            className="pf-btn pf-btn-sm hidden md:inline-flex"
          >
            {t('portfolio.nav.hireMe')}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-[2px] border border-[color:var(--pf-rule)] text-[color:var(--pf-ink)] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="invisible absolute inset-x-0 top-full border-b border-[color:var(--pf-rule)] bg-[color:var(--pf-paper)] md:hidden"
      >
        <ul className="px-5 py-2">
          {links.map((link) => (
            <li
              key={link.href}
              data-mobile-link
              className="border-b border-[color:var(--pf-rule)] last:border-b-0"
            >
              <a
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="flex items-center justify-between py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--pf-ink)]"
              >
                {link.label}
                {active === link.href ? (
                  <span
                    className="inline-block size-1.5 bg-[color:var(--pf-accent)]"
                    aria-hidden
                  />
                ) : null}
              </a>
            </li>
          ))}
          <li data-mobile-link className="border-b border-transparent py-3">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
};
