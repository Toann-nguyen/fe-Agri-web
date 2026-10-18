'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@/i18n/navigation';

const SOURCE_URL = 'https://aerive-template.modulify.website/';
const CLONE_URL = 'https://aerive.toanrobert.online/';

type PaneKey = 'source' | 'clone';

const panes: { key: PaneKey; url: string; host: string }[] = [
  { key: 'source', url: SOURCE_URL, host: 'aerive-template.modulify.website' },
  { key: 'clone', url: CLONE_URL, host: 'aerive.toanrobert.online' },
];

export const AeriveCompare = () => {
  const t = useTranslations('common');
  const [active, setActive] = useState<PaneKey>('source');

  const label = (key: PaneKey) =>
    key === 'source'
      ? t('portfolio.compare.sourceLabel')
      : t('portfolio.compare.cloneLabel');

  return (
    <div className="pf-editorial flex h-dvh flex-col">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center gap-6 border-b border-[color:var(--pf-rule)] px-4 md:px-6">
        <Link
          href="/"
          className="pf-link shrink-0 font-mono text-[10px] uppercase tracking-[0.16em]"
        >
          <span aria-hidden>←</span>
          {t('portfolio.compare.back')}
        </Link>
        <h1 className="pf-serif min-w-0 flex-1 truncate text-base md:text-lg">
          {t('portfolio.compare.title')}
        </h1>
        <span className="pf-serif hidden shrink-0 text-lg text-[color:var(--pf-accent)] md:block">
          1:1
        </span>
      </header>

      {/* Mobile pane switch */}
      <div className="flex shrink-0 gap-2 border-b border-[color:var(--pf-rule)] px-4 py-2.5 lg:hidden">
        {panes.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setActive(p.key)}
            aria-pressed={active === p.key}
            className={`rounded-[2px] border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
              active === p.key
                ? 'border-transparent bg-[color:var(--pf-ink)] text-[color:var(--pf-paper)]'
                : 'border-[color:var(--pf-rule)] text-[color:var(--pf-ink-soft)] hover:border-[color:var(--pf-rule-strong)] hover:text-[color:var(--pf-ink)]'
            }`}
          >
            {label(p.key)}
          </button>
        ))}
      </div>

      {/* Panes */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {panes.map((p, i) => (
          <section
            key={p.key}
            className={`min-h-0 min-w-0 flex-1 flex-col lg:flex ${
              active === p.key ? 'flex' : 'hidden'
            } ${i === 0 ? 'lg:border-r lg:border-[color:var(--pf-rule)]' : ''}`}
          >
            <div className="flex h-10 shrink-0 items-center justify-between gap-4 border-b border-[color:var(--pf-rule)] px-4">
              <span className="flex min-w-0 items-baseline gap-3">
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--pf-accent)]">
                  {label(p.key)}
                </span>
                <span className="truncate font-mono text-[10px] tracking-[0.08em] text-[color:var(--pf-ink-faint)]">
                  {p.host}
                </span>
              </span>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-link shrink-0 font-mono text-[10px] uppercase tracking-[0.16em]"
              >
                {t('portfolio.compare.openTab')}
                <span aria-hidden>↗</span>
              </a>
            </div>
            <iframe
              src={p.url}
              title={`${label(p.key)} — ${p.host}`}
              loading="lazy"
              className="min-h-0 w-full flex-1 border-0 bg-[color:var(--pf-paper-2)]"
            />
          </section>
        ))}
      </div>
    </div>
  );
};
