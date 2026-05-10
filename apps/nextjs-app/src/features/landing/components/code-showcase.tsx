'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const CodeShowcase = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="relative bg-white py-24 md:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-30"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <Icon icon="mdi:code-tags" width="14" />
            Code Showcase
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            Real <span className="text-gradient-cyan">Code</span>, Real Impact
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-ink-400">
            Snippets that demonstrate my approach to solving real engineering
            problems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Code 1: N+1 Fix */}
          <div className="reveal-left" style={{ '--stagger': 0 } as any}>
            <div className="glass-light overflow-hidden rounded-2xl shadow-lg shadow-black/5 transition-shadow duration-500 hover:shadow-xl">
              <div className="flex items-center justify-between bg-ink-900 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/70"></span>
                  <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="size-2.5 rounded-full bg-green-500/70"></span>
                  <span className="ml-2 font-mono text-[10px] text-gray-500">
                    n-plus-one-fix.ts
                  </span>
                </div>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                  -85% queries
                </span>
              </div>
              <div className="bg-ink-900 p-5 font-mono text-[12px] leading-[1.8]">
                <div>
                  <span className="code-comment">
                    {'// ❌ Before: N+1 Problem (1200 queries)'}
                  </span>
                </div>
                <div>
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">orders</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-keyword">await</span>{' '}
                  <span className="code-function">Order</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">all</span>
                  <span className="code-operator">();</span>
                </div>
                <div>
                  <span className="code-keyword">for</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">order</span>{' '}
                  <span className="code-keyword">of</span>{' '}
                  <span className="code-variable">orders</span>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-variable">order</span>
                  <span className="code-operator">.</span>
                  <span className="code-variable">user</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-keyword">await</span>{' '}
                  <span className="code-variable">order</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">user</span>
                  <span className="code-operator">();</span>{' '}
                  <span className="code-comment">{'// 💀'}</span>
                </div>
                <div>
                  <span className="code-operator">{'}'}</span>
                </div>
                <div className="mt-3">
                  <span className="code-comment">
                    {'// ✅ After: Eager Loading (2 queries)'}
                  </span>
                </div>
                <div>
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">orders</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-keyword">await</span>{' '}
                  <span className="code-function">Order</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">.</span>
                  <span className="code-function">with</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;user&apos;</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">.</span>
                  <span className="code-function">get</span>
                  <span className="code-operator">();</span>{' '}
                  <span className="code-comment">{'// 🚀'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code 2: Redis Caching */}
          <div className="reveal-right" style={{ '--stagger': 1 } as any}>
            <div className="glass-light overflow-hidden rounded-2xl shadow-lg shadow-black/5 transition-shadow duration-500 hover:shadow-xl">
              <div className="flex items-center justify-between bg-ink-900 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/70"></span>
                  <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="size-2.5 rounded-full bg-green-500/70"></span>
                  <span className="ml-2 font-mono text-[10px] text-gray-500">
                    redis-cache.middleware.ts
                  </span>
                </div>
                <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[9px] text-cyan-400">
                  98% hit rate
                </span>
              </div>
              <div className="bg-ink-900 p-5 font-mono text-[12px] leading-[1.8]">
                <div>
                  <span className="code-keyword">export async function</span>{' '}
                  <span className="code-function">cacheMiddleware</span>
                  <span className="code-operator">(</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-variable">req</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-type">Request</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">res</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-type">Response</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-variable">next</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-type">NextFunction</span>
                </div>
                <div>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-keyword">const</span>{' '}
                  <span className="code-variable">key</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-string">
                    `cache:${'{'}req.url{'}'}`
                  </span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-keyword">const</span>{' '}
                  <span className="code-variable">cached</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-keyword">await</span>{' '}
                  <span className="code-variable">redis</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">get</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">key</span>
                  <span className="code-operator">);</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;<span className="code-keyword">if</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-variable">cached</span>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">return</span>{' '}
                  <span className="code-variable">res</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">json</span>
                  <span className="code-operator">(</span>
                  <span className="code-type">JSON</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">parse</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">cached</span>
                  <span className="code-operator">));</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'}'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-variable">res</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">sendResponse</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-variable">data</span>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">redis</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">setex</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">key</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-type">300</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-type">JSON</span>
                  <span className="code-operator">.</span>
                  <span className="code-function">stringify</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">data</span>
                  <span className="code-operator">));</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'}'};</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-function">next</span>
                  <span className="code-operator">();</span>
                </div>
                <div>
                  <span className="code-operator">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
