'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Tech Stack', href: '#stack' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-strong-light shadow-sm' : ''
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="group flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:shadow-cyan-500/40">
              T
            </div>
            <span className="text-sm font-semibold tracking-tight text-ink-800">
              toan<span className="text-cyan-600">.dev</span>
            </span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-sm text-ink-500"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-ink-400 transition-all duration-200 hover:scale-110 hover:text-cyan-600"
            >
              <Icon icon="mdi:github" width="20" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-ink-400 transition-all duration-200 hover:scale-110 hover:text-cyan-600"
            >
              <Icon icon="mdi:linkedin" width="20" />
            </a>
            <button
              id="mobile-menu-btn"
              className="text-ink-500 transition-colors hover:text-ink-800 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Icon icon="mdi:menu" width="24" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl transition-all duration-300 ${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } flex-col items-center justify-center gap-8`}
      >
        <button
          id="mobile-menu-close"
          className="absolute right-6 top-6 text-ink-500 transition-colors hover:text-ink-800"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Icon icon="mdi:close" width="28" />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="mobile-nav text-2xl text-ink-700 transition-colors hover:text-cyan-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
};
