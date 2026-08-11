'use client';

import { Icon } from '@iconify/react';
import * as React from 'react';

import { cn } from '@/utils/cn';

import { useTheme } from './theme-provider';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md transition-all hover:border-cyan-500/50 hover:text-cyan-400',
        className,
      )}
    >
      <Icon
        icon={isDark ? 'mdi:white-balance-sunny' : 'mdi:weather-night'}
        width="18"
      />
    </button>
  );
}
