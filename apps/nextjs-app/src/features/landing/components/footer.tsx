'use client';

import { Icon } from '@iconify/react';

export const Footer = () => {
  return (
    <footer className="relative border-t border-ink-300/10 bg-surface-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 text-xs font-bold text-white shadow-md shadow-cyan-500/15">
              T
            </div>
            <span className="text-sm text-ink-400">
              © <span className="font-mono">2024</span> Nguyen Minh Toan.
              Engineered with precision.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Toann-nguyen"
              target="_blank"
              rel="noreferrer"
              className="text-ink-300 transition-all duration-200 hover:scale-110 hover:text-cyan-600"
            >
              <Icon icon="mdi:github" width="18" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-ink-300 transition-all duration-200 hover:scale-110 hover:text-cyan-600"
            >
              <Icon icon="mdi:linkedin" width="18" />
            </a>
            <a
              href="mailto:[EMAIL_ADDRESS]"
              className="text-ink-300 transition-all duration-200 hover:scale-110 hover:text-cyan-600"
            >
              <Icon icon="mdi:email-outline" width="18" />
            </a>
            <span className="ml-2 font-mono text-[10px] text-ink-300">
              v2.1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
