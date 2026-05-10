'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const TechStack = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32"
    >
      <div className="dot-grid-light absolute inset-0 opacity-40"></div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[120px]"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <Icon icon="mdi:view-grid" width="14" />
            Tech Stack
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            Tools of <span className="text-gradient-cyan">the Trade</span>
          </h2>
        </div>

        <div className="grid min-h-[520px] grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-3">
          {/* TypeScript */}
          <div
            className="glow-border bento-large card-3d reveal-scale col-span-2 row-span-1 md:row-span-2"
            style={{ '--stagger': 0 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default flex-col justify-between rounded-2xl p-6">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-cyan-500/30">
                    <Icon
                      icon="mdi:language-typescript"
                      className="text-white"
                      width="26"
                    />
                  </div>
                  <span className="rounded-md bg-surface-100 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-400">
                    Primary
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-ink-800">
                  TypeScript
                </h3>
                <p className="text-sm leading-relaxed text-ink-500">
                  End-to-end type safety. Zero ambiguity from API contracts to
                  UI props.
                </p>
              </div>
              <div className="code-block-light mt-4 px-4 py-3 text-[11px] shadow-lg shadow-black/5">
                <span className="code-keyword">type</span>{' '}
                <span className="code-type">APIResponse</span>
                <span className="code-operator">&lt;</span>
                <span className="code-type">T</span>
                <span className="code-operator">&gt;</span>{' '}
                <span className="code-operator">=</span>{' '}
                <span className="code-operator">{'{'}</span>
                <br />
                &nbsp;&nbsp;<span className="code-function">data</span>
                <span className="code-operator">:</span>{' '}
                <span className="code-type">T</span>
                <span className="code-operator">;</span>
                <br />
                &nbsp;&nbsp;<span className="code-function">latency</span>
                <span className="code-operator">:</span>{' '}
                <span className="code-string">
                  `${'{'}number{'}'}ms`
                </span>
                <span className="code-operator">;</span>
                <br />
                <span className="code-operator">{'}'};</span>
              </div>
            </div>
          </div>

          {/* Docker */}
          <div
            className="glow-border card-3d reveal-scale"
            style={{ '--stagger': 1 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default flex-col items-center justify-center rounded-2xl p-5 text-center">
              <Icon
                icon="mdi:docker"
                className="mb-2 text-sky-500 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125"
                width="36"
              />
              <span className="text-sm font-semibold text-ink-800">Docker</span>
              <span className="mt-1 font-mono text-[10px] text-ink-400">
                Containerization
              </span>
            </div>
          </div>

          {/* Redis */}
          <div
            className="glow-border ember-glow card-3d reveal-scale"
            style={{ '--stagger': 2 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default flex-col items-center justify-center rounded-2xl p-5 text-center">
              <Icon
                icon="mdi:database-flash"
                className="mb-2 text-ember-500 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-125"
                width="36"
              />
              <span className="text-sm font-semibold text-ink-800">Redis</span>
              <span className="mt-1 font-mono text-[10px] text-ink-400">
                Cache Layer
              </span>
            </div>
          </div>

          {/* Next.js */}
          <div
            className="glow-border bento-wide card-3d reveal-scale col-span-2 md:col-span-2"
            style={{ '--stagger': 3 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default items-center gap-5 rounded-2xl p-5">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-black shadow-lg shadow-black/10 transition-all duration-500 group-hover:scale-110">
                <Icon icon="ri:nextjs-fill" className="text-white" width="32" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink-800">Next.js</h3>
                <p className="mt-1 text-xs text-ink-500">
                  SSR, ISR, App Router — lightning-fast page loads.
                </p>
              </div>
            </div>
          </div>

          {/* MySQL */}
          <div
            className="glow-border ember-glow card-3d reveal-scale"
            style={{ '--stagger': 4 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default flex-col items-center justify-center rounded-2xl p-5 text-center">
              <Icon
                icon="mdi:database"
                className="mb-2 text-ember-500 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125"
                width="36"
              />
              <span className="text-sm font-semibold text-ink-800">MySQL</span>
              <span className="mt-1 font-mono text-[10px] text-ink-400">
                Relational DB
              </span>
            </div>
          </div>

          {/* MongoDB */}
          <div
            className="glow-border card-3d reveal-scale"
            style={{ '--stagger': 5 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default flex-col items-center justify-center rounded-2xl p-5 text-center">
              <Icon
                icon="mdi:leaf"
                className="mb-2 text-green-500 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-125"
                width="36"
              />
              <span className="text-sm font-semibold text-ink-800">
                MongoDB
              </span>
              <span className="mt-1 font-mono text-[10px] text-ink-400">
                NoSQL Store
              </span>
            </div>
          </div>

          {/* Tailwind CSS */}
          <div
            className="glow-border bento-wide card-3d reveal-scale col-span-2 md:col-span-2"
            style={{ '--stagger': 6 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default items-center gap-5 rounded-2xl p-5">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/15 transition-all duration-500 group-hover:scale-110">
                <Icon icon="mdi:tailwind" className="text-white" width="32" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink-800">
                  Tailwind CSS
                </h3>
                <p className="mt-1 text-xs text-ink-500">
                  Utility-first CSS, zero runtime overhead.
                </p>
              </div>
            </div>
          </div>

          {/* Laravel */}
          <div
            className="glow-border ember-glow card-3d reveal-scale"
            style={{ '--stagger': 7 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default flex-col items-center justify-center rounded-2xl p-5 text-center">
              <Icon
                icon="mdi:laravel"
                className="mb-2 text-laravel transition-all duration-500 group-hover:rotate-12 group-hover:scale-125"
                width="36"
              />
              <span className="text-sm font-semibold text-ink-800">
                Laravel
              </span>
              <span className="mt-1 font-mono text-[10px] text-ink-400">
                PHP Backend
              </span>
            </div>
          </div>

          {/* NestJS */}
          <div
            className="glow-border ember-glow card-3d reveal-scale"
            style={{ '--stagger': 8 } as any}
          >
            <div className="card-3d-inner glass-light group flex h-full cursor-default flex-col items-center justify-center rounded-2xl p-5 text-center">
              <Icon
                icon="mdi:nodejs"
                className="mb-2 text-ember-500 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-125"
                width="36"
              />
              <span className="text-sm font-semibold text-ink-800">NestJS</span>
              <span className="mt-1 font-mono text-[10px] text-ink-400">
                Node Framework
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
