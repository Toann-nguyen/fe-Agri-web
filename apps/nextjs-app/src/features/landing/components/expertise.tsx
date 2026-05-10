'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const Expertise = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="dot-grid-light absolute inset-0 opacity-60"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <Icon icon="mdi:code-braces-box" width="14" />
            Core Expertise
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            Engineering <span className="text-gradient-cyan">Excellence</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-400">
            Task-oriented expertise across the full stack, from database queries
            to pixel-perfect interfaces.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* System Architecture */}
          <div
            className="glow-border ember-glow card-3d reveal"
            style={{ '--stagger': 0 } as any}
          >
            <div className="card-3d-inner glass-light group rounded-2xl p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl border border-ember-400/20 bg-gradient-to-br from-ember-400/20 to-ember-600/5 shadow-sm transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-ember-400/10">
                  <Icon
                    icon="mdi:server-network"
                    className="text-ember-500"
                    width="24"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink-800">
                    System Architecture
                  </h3>
                  <span className="font-mono text-[11px] text-ember-500/80">
                    Backend & Infrastructure
                  </span>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-ink-500">
                Designing robust backend systems with{' '}
                <span className="font-medium text-ink-800">Laravel</span> and{' '}
                <span className="font-medium text-ink-800">NestJS</span>,
                implementing Repository Pattern for clean separation.
              </p>
              <div className="code-block-light px-4 py-3 text-[11px] shadow-lg shadow-black/5">
                <span className="code-comment">{'// Repository Pattern'}</span>
                <br />
                <span className="code-keyword">interface</span>{' '}
                <span className="code-type">UserRepository</span>{' '}
                <span className="code-operator">{'{'}</span>
                <br />
                &nbsp;&nbsp;<span className="code-function">findById</span>
                <span className="code-operator">(</span>
                <span className="code-variable">id</span>
                <span className="code-operator">:</span>{' '}
                <span className="code-type">string</span>
                <span className="code-operator">):</span>{' '}
                <span className="code-type">Promise</span>
                <span className="code-operator">&lt;</span>
                <span className="code-type">User</span>
                <span className="code-operator">&gt;;</span>
                <br />
                &nbsp;&nbsp;<span className="code-function">getActive</span>
                <span className="code-operator">():</span>{' '}
                <span className="code-type">Collection</span>
                <span className="code-operator">;</span>
                <br />
                <span className="code-operator">{'}'}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Laravel', 'NestJS', 'REST API'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-ember-500/8 rounded-lg border border-ember-500/10 px-2.5 py-1 font-mono text-[10px] font-medium text-ember-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Performance & Database */}
          <div
            className="glow-border card-3d reveal"
            style={{ '--stagger': 1 } as any}
          >
            <div className="card-3d-inner glass-light group rounded-2xl p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/5 shadow-sm transition-all duration-500 group-hover:-rotate-3 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-400/10">
                  <Icon
                    icon="mdi:database-cog"
                    className="text-cyan-600"
                    width="24"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink-800">
                    Performance & Database
                  </h3>
                  <span className="font-mono text-[11px] text-cyan-600/80">
                    Optimization Layer
                  </span>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-ink-500">
                Resolving N+1 queries, implementing{' '}
                <span className="font-medium text-ink-800">Redis caching</span>,
                optimizing{' '}
                <span className="font-medium text-ink-800">MySQL</span> for
                sub-50ms responses.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Query Optimization', value: '94%', width: '94%' },
                  { label: 'Cache Hit Rate', value: '98%', width: '98%' },
                  { label: 'Avg Response', value: '23ms', width: '77%' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-2 flex justify-between">
                      <span className="font-mono text-[11px] text-ink-400">
                        {stat.label}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-cyan-600">
                        {stat.value}
                      </span>
                    </div>
                    <div className="perf-bar">
                      <div
                        className="perf-bar-fill bg-gradient-to-r from-cyan-600 to-cyan-400"
                        style={{ width: stat.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['MySQL', 'Redis', 'N+1 Fix'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-cyan-500/8 rounded-lg border border-cyan-500/10 px-2.5 py-1 font-mono text-[10px] font-medium text-cyan-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modern UI & UX */}
          <div
            className="glow-border card-3d reveal"
            style={{ '--stagger': 2 } as any}
          >
            <div className="card-3d-inner glass-light group rounded-2xl p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl border border-purple-400/20 bg-gradient-to-br from-purple-400/20 to-purple-600/5 shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-400/10">
                  <Icon
                    icon="mdi:palette-swatch-variant"
                    className="text-purple-600"
                    width="24"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink-800">
                    Modern UI & UX
                  </h3>
                  <span className="font-mono text-[11px] text-purple-600/80">
                    Frontend Interface
                  </span>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-ink-500">
                Crafting intuitive{' '}
                <span className="font-medium text-ink-800">
                  React.js/Next.js
                </span>{' '}
                dashboards with responsive design and micro-interactions.
              </p>
              <div className="overflow-hidden rounded-xl border border-ink-300/10 shadow-sm">
                <div className="flex items-center gap-2 border-b border-ink-300/10 bg-surface-100 px-3 py-2">
                  <span className="size-2 rounded-full bg-purple-400/50"></span>
                  <span className="font-mono text-[9px] text-ink-400">
                    dashboard.view
                  </span>
                </div>
                <div className="space-y-2 bg-white p-3">
                  <div className="flex gap-2">
                    <div className="flex h-9 flex-1 items-center rounded-lg bg-surface-100 px-3">
                      <div className="h-2.5 w-14 rounded bg-purple-200/60"></div>
                    </div>
                    <div className="flex h-9 flex-1 items-center rounded-lg bg-surface-100 px-3">
                      <div className="h-2.5 w-10 rounded bg-cyan-200/60"></div>
                    </div>
                  </div>
                  <div className="flex h-20 items-end gap-1.5 rounded-lg bg-surface-50 p-2">
                    <div
                      className="flex-1 rounded-t-md bg-purple-200/70"
                      style={{ height: '40%' }}
                    ></div>
                    <div
                      className="flex-1 rounded-t-md bg-purple-200/70"
                      style={{ height: '65%' }}
                    ></div>
                    <div
                      className="flex-1 rounded-t-md bg-purple-300/70"
                      style={{ height: '85%' }}
                    ></div>
                    <div
                      className="flex-1 rounded-t-md bg-cyan-300/70"
                      style={{ height: '100%' }}
                    ></div>
                    <div
                      className="flex-1 rounded-t-md bg-cyan-200/70"
                      style={{ height: '70%' }}
                    ></div>
                    <div
                      className="flex-1 rounded-t-md bg-cyan-200/70"
                      style={{ height: '45%' }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['React', 'Next.js', 'Tailwind'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-500/8 rounded-lg border border-purple-500/10 px-2.5 py-1 font-mono text-[10px] font-medium text-purple-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
