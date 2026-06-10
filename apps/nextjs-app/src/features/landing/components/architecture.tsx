'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const Architecture = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="dot-grid-dark absolute inset-0 opacity-20"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-cyan-400 backdrop-blur-sm">
            <Icon icon="mdi:sitemap" width="14" />
            Architecture
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            How I <span className="text-gradient-cyan">Build</span>
          </h2>
        </div>
        <div className="reveal bg-slate-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-black/20 md:p-10">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-5">
            {/* Client */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/15 to-purple-600/5 shadow-lg shadow-purple-400/5">
                  <Icon
                    icon="mdi:monitor-cellphone"
                    className="text-purple-600"
                    width="28"
                  />
                </div>
                <div
                  className="absolute inset-0 animate-ripple rounded-2xl border-2 border-purple-400/20"
                  style={{ animation: 'ripple 3s ease-out infinite' }}
                ></div>
              </div>
              <span className="mt-4 text-sm font-semibold text-white">
                Client
              </span>
              <span className="mt-1 font-mono text-[10px] text-white/50">
                Next.js / React
              </span>
            </div>

            {/* Line 1 */}
            <div className="relative hidden items-center justify-center md:flex">
              <svg
                className="w-full"
                height="2"
                viewBox="0 0 200 2"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="200"
                  y2="1"
                  stroke="url(#g1)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-dash-move"
                />
                <defs>
                  <linearGradient id="g1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-slate-950/80 px-2.5 py-1 font-mono text-[9px] text-white/50 backdrop-blur-sm">
                HTTPS
              </div>
            </div>
            <div className="flex justify-center py-3 md:hidden">
              <svg width="2" height="30">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="30"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  className="animate-dash-move"
                />
              </svg>
            </div>

            {/* API Gateway */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 shadow-lg shadow-cyan-400/5">
                  <Icon icon="mdi:api" className="text-cyan-600" width="28" />
                </div>
                <div
                  className="absolute inset-0 animate-ripple rounded-2xl border-2 border-cyan-400/20"
                  style={{
                    animation: 'ripple 3s ease-out infinite',
                    animationDelay: '0.5s',
                  }}
                ></div>
              </div>
              <span className="mt-4 text-sm font-semibold text-white">
                API Gateway
              </span>
              <span className="mt-1 font-mono text-[10px] text-white/50">
                NestJS / Laravel
              </span>
            </div>

            {/* Line 2 */}
            <div className="relative hidden items-center justify-center md:flex">
              <svg
                className="w-full"
                height="2"
                viewBox="0 0 200 2"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="200"
                  y2="1"
                  stroke="url(#g2)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-dash-move"
                />
                <defs>
                  <linearGradient id="g2">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-slate-950/80 px-2.5 py-1 font-mono text-[9px] text-white/50 backdrop-blur-sm">
                Query
              </div>
            </div>
            <div className="flex justify-center py-3 md:hidden">
              <svg width="2" height="30">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="30"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  className="animate-dash-move"
                />
              </svg>
            </div>

            {/* Data Layer */}
            <div className="flex flex-col items-center text-center">
              <div className="flex gap-2">
                <div className="relative">
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-ember-400/20 bg-gradient-to-br from-ember-500/15 to-ember-600/5 shadow-lg shadow-ember-400/5">
                    <Icon
                      icon="mdi:database"
                      className="text-ember-500"
                      width="28"
                    />
                  </div>
                  <div
                    className="absolute inset-0 animate-ripple rounded-2xl border-2 border-ember-400/20"
                    style={{
                      animation: 'ripple 3s ease-out infinite',
                      animationDelay: '1s',
                    }}
                  ></div>
                </div>
                <div className="relative">
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500/15 to-red-600/5 shadow-lg shadow-red-400/5">
                    <Icon
                      icon="mdi:database-flash"
                      className="text-red-500"
                      width="28"
                    />
                  </div>
                  <div
                    className="absolute inset-0 animate-ripple rounded-2xl border-2 border-red-400/20"
                    style={{
                      animation: 'ripple 3s ease-out infinite',
                      animationDelay: '1.5s',
                    }}
                  ></div>
                </div>
              </div>
              <span className="mt-4 text-sm font-semibold text-white">
                Data Layer
              </span>
              <span className="mt-1 font-mono text-[10px] text-white/50">
                MySQL + Redis
              </span>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink-300/10 pt-8 md:grid-cols-4">
            {[
              {
                label: 'Clean Architecture',
                value: 'SOLID',
                color: 'text-white',
              },
              {
                label: 'Zero Duplication',
                value: 'DRY',
                color: 'text-cyan-400',
              },
              {
                label: 'Constant Lookups',
                value: 'O(1)',
                color: 'text-white',
              },
              { label: 'Reliability', value: '99.9%', color: 'text-orange-400' },
            ].map((stat, i) => (
              <div
                key={i}
                className="reveal text-center"
                style={{ '--stagger': i } as any}
              >
                <div
                  className={`mb-1 font-mono text-xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-white/50">{stat.label}</div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};
