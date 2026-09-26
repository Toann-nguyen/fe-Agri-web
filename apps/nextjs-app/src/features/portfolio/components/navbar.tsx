'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { LanguageSwitcher } from '@/components/language-switcher';

export const PortfolioNavbar = () => {
  const t = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

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

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#06060c]/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] text-sm font-black text-white shadow-lg shadow-[#8b5cf6]/30 transition-transform duration-300 group-hover:rotate-12">
            TN
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            {t('portfolio.nav.brand')}
            <span className="text-gradient">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                  active === link.href
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/40 md:inline-block"
        >
          {t('portfolio.nav.hireMe')}
        </a>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="glass rounded-xl p-2.5 text-white md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-white/10 bg-[#06060c]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[15px] text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="px-4 py-2">
                <LanguageSwitcher />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
