import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#expertise', label: 'Expertise' },
  { href: '#stack', label: 'Tech Stack' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        id='navbar'
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-strong-light shadow-sm' : ''
        }`}
      >
        <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-6'>
          <a href='#' className='group flex items-center gap-3'>
            <div className='flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:shadow-cyan-500/40'>
              T
            </div>
            <span className='text-sm font-semibold tracking-tight text-ink-800'>
              toan<span className='text-cyan-600'>.dev</span>
            </span>
          </a>

          <div className='hidden items-center gap-8 md:flex'>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className='nav-link text-sm text-ink-500'>
                {link.label}
              </a>
            ))}
          </div>

          <div className='flex items-center gap-4'>
            <a
              href='https://github.com/Toann-nguyen'
              target='_blank'
              rel='noopener noreferrer'
              className='text-ink-400 transition-all duration-200 hover:scale-110 hover:text-cyan-600'
            >
              <svg data-icon='mdi:github' data-width='20' className='iconify' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-ink-400 transition-all duration-200 hover:scale-110 hover:text-cyan-600'
            >
              <svg data-icon='mdi:linkedin' data-width='20' className='iconify' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
              </svg>
            </a>
            <button
              id='mobile-menu-btn'
              onClick={() => setMobileMenuOpen(true)}
              className='text-ink-500 transition-colors hover:text-ink-800 md:hidden'
            >
              <svg viewBox='0 0 24 24' fill='currentColor' width='24' height='24'>
                <path d='M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z' />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id='mobile-menu'
        className={`fixed inset-0 z-40 flex-col items-center justify-center gap-8 bg-white/95 backdrop-blur-xl ${
          mobileMenuOpen ? 'flex' : 'hidden'
        }`}
      >
        <button
          id='mobile-menu-close'
          onClick={() => setMobileMenuOpen(false)}
          className='absolute right-6 top-6 text-ink-500 transition-colors hover:text-ink-800'
        >
          <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          </svg>
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className='text-2xl text-ink-700 transition-colors hover:text-cyan-600'
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
