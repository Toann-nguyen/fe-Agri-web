'use client';

import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const CodeShowcase = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="dot-grid-dark absolute inset-0 opacity-20"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-cyan-400 backdrop-blur-sm">
            <Icon icon="mdi:code-tags" width="14" />
            Code Showcase
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Real <span className="text-gradient-cyan">Code</span>, Real Impact
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/60">
            Snippets that demonstrate my approach to solving real engineering
            problems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ── Card 1: Repository + DI + Transaction + Enum ── */}
          <div className="reveal-left" style={{ '--stagger': 0 } as any}>
            <div className="bg-slate-900/60 border border-white/10 backdrop-blur-sm overflow-hidden rounded-2xl shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5">
              <div className="flex items-center justify-between bg-ink-900 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/70"></span>
                  <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="size-2.5 rounded-full bg-green-500/70"></span>
                  <span className="ml-2 font-mono text-[10px] text-gray-500">
                    InvoiceService.php
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                    readonly
                  </span>
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[9px] text-cyan-400">
                    ACID
                  </span>
                </div>
              </div>
              <div className="bg-ink-900 p-5 font-mono text-[12px] leading-[1.8]">
                <div>
                  <span className="code-operator">&lt;?</span>
                  <span className="code-keyword">php</span>
                </div>
                <div>
                  <span className="code-keyword">declare</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">strict_types</span>
                  <span className="code-operator">=</span>
                  <span className="code-type">1</span>
                  <span className="code-operator">);</span>
                </div>
                <div className="mt-1">
                  <span className="code-keyword">namespace</span>{' '}
                  <span className="code-type">App\Services</span>
                  <span className="code-operator">;</span>
                </div>
                <div className="mt-1">
                  <span className="code-keyword">use</span>{' '}
                  <span className="code-type">App\Enums\InvoiceStatus</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  <span className="code-keyword">use</span>{' '}
                  <span className="code-type">
                    Illuminate\Support\Facades\DB
                  </span>
                  <span className="code-operator">;</span>
                </div>
                <div className="mt-2">
                  <span className="code-keyword">final readonly</span>{' '}
                  <span className="code-keyword">class</span>{' '}
                  <span className="code-function">InvoiceService</span>
                </div>
                <div>
                  <span className="code-keyword">implements</span>{' '}
                  <span className="code-type">InvoiceServiceInterface</span>
                </div>
                <div>
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;
                  <span className="code-keyword">public function</span>{' '}
                  <span className="code-function">__construct</span>
                  <span className="code-operator">(</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">private</span>{' '}
                  <span className="code-type">InvoiceRepositoryInterface</span>{' '}
                  <span className="code-variable">$repository</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">)</span>{' '}
                  <span className="code-operator">{'{}'}</span>
                </div>
                <div className="mt-2">
                  &nbsp;&nbsp;
                  <span className="code-keyword">public function</span>{' '}
                  <span className="code-function">create</span>
                  <span className="code-operator">(</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">array</span>{' '}
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-type">User</span>{' '}
                  <span className="code-variable">$actor</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">):</span>{' '}
                  <span className="code-type">Invoice</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">DB</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">beginTransaction</span>
                  <span className="code-operator">();</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">try</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">[</span>
                  <span className="code-string">&apos;issued_by&apos;</span>
                  <span className="code-operator">]</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-variable">$actor</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">id</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">[</span>
                  <span className="code-string">&apos;status&apos;</span>
                  <span className="code-operator">]</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-type">InvoiceStatus</span>
                  <span className="code-operator">::</span>
                  <span className="code-variable">UNPAID</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">value</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">if</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-operator">!</span>
                  <span className="code-keyword">empty</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">[</span>
                  <span className="code-string">&apos;fee_types&apos;</span>
                  <span className="code-operator">]</span>
                  <span className="code-operator">))</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">[</span>
                  <span className="code-string">&apos;total_amount&apos;</span>
                  <span className="code-operator">]</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-function">array_sum</span>
                  <span className="code-operator">(</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-function">array_column</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">[</span>
                  <span className="code-string">&apos;fee_types&apos;</span>
                  <span className="code-operator">]</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-string">&apos;amount&apos;</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">{'}'}</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$invoice</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-variable">$this</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">repository</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">create</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$this</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">repository</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">syncFeeTypes</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">$invoice</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">$payload</span>
                  <span className="code-operator">[</span>
                  <span className="code-string">&apos;fee_types&apos;</span>
                  <span className="code-operator">]</span>
                  <span className="code-operator">);</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-type">DB</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">commit</span>
                  <span className="code-operator">();</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">return</span>{' '}
                  <span className="code-variable">$invoice</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">load</span>
                  <span className="code-operator">([</span>
                  <span className="code-string">
                    &apos;student.profile&apos;
                  </span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-string">&apos;feeTypes&apos;</span>
                  <span className="code-operator">]);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">{'}'}</span>{' '}
                  <span className="code-keyword">catch</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-type">\Throwable</span>{' '}
                  <span className="code-variable">$e</span>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-type">DB</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">rollBack</span>
                  <span className="code-operator">();</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">throw</span>{' '}
                  <span className="code-variable">$e</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">{'}'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'}'}</span>
                </div>
                <div>
                  <span className="code-operator">{'}'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 2: Redis Lua Sliding Window ── */}
          <div className="reveal-right" style={{ '--stagger': 1 } as any}>
            <div className="bg-slate-900/60 border border-white/10 backdrop-blur-sm overflow-hidden rounded-2xl shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5">
              <div className="flex items-center justify-between bg-ink-900 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/70"></span>
                  <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="size-2.5 rounded-full bg-green-500/70"></span>
                  <span className="ml-2 font-mono text-[10px] text-gray-500">
                    RateLimitService.php
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="rounded bg-red-500/20 px-2 py-0.5 font-mono text-[9px] text-red-400">
                    Lua
                  </span>
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[9px] text-cyan-400">
                    0 race
                  </span>
                </div>
              </div>
              <div className="bg-ink-900 p-5 font-mono text-[12px] leading-[1.8]">
                <div>
                  <span className="code-keyword">final class</span>{' '}
                  <span className="code-function">RateLimitService</span>
                </div>
                <div>
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;
                  <span className="code-keyword">
                    private const string
                  </span>{' '}
                  <span className="code-variable">PREFIX</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-string">&apos;ratelimit&apos;</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  &nbsp;&nbsp;
                  <span className="code-keyword">private const int</span>{' '}
                  <span className="code-variable">MAX</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-type">10</span>
                  <span className="code-operator">;</span>
                </div>
                <div className="mt-2">
                  &nbsp;&nbsp;
                  <span className="code-keyword">public function</span>{' '}
                  <span className="code-function">check</span>
                  <span className="code-operator">(</span>
                  <span className="code-keyword">string</span>{' '}
                  <span className="code-variable">$id</span>
                  <span className="code-operator">):</span>{' '}
                  <span className="code-keyword">array</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$key</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-string">&quot;ratelimit:&quot;</span>{' '}
                  <span className="code-operator">.</span>{' '}
                  <span className="code-function">md5</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">$id</span>
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$lua</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-string">&quot;&quot;&quot;</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">local</span>{' '}
                  <span className="code-variable">k</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-type">KEYS</span>
                  <span className="code-operator">[</span>
                  <span className="code-type">1</span>
                  <span className="code-operator">]</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">local</span>{' '}
                  <span className="code-variable">now</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-function">tonumber</span>
                  <span className="code-operator">(</span>
                  <span className="code-type">ARGV</span>
                  <span className="code-operator">[</span>
                  <span className="code-type">1</span>
                  <span className="code-operator">])</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-function">redis.call</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">
                    &apos;ZREMRANGEBYSCORE&apos;
                  </span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">k</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-string">&apos;-inf&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">now</span>{' '}
                  <span className="code-operator">-</span>{' '}
                  <span className="code-type">60</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">local</span>{' '}
                  <span className="code-variable">c</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-function">redis.call</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;ZCARD&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">k</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">if</span>{' '}
                  <span className="code-variable">c</span>{' '}
                  <span className="code-operator">&gt;=</span>{' '}
                  <span className="code-type">10</span>{' '}
                  <span className="code-keyword">then</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">return</span>{' '}
                  <span className="code-operator">{'{'}</span>
                  <span className="code-type">0</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">c</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-function">retry</span>
                  <span className="code-operator">{'}'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">end</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-function">redis.call</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;ZADD&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">k</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">now</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-type">ARGV</span>
                  <span className="code-operator">[</span>
                  <span className="code-type">4</span>
                  <span className="code-operator">])</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-function">redis.call</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;EXPIRE&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">k</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-type">60</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">return</span>{' '}
                  <span className="code-operator">{'{'}</span>
                  <span className="code-type">1</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">c</span>
                  <span className="code-operator">+</span>
                  <span className="code-type">1</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-type">0</span>
                  <span className="code-operator">{'}'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">&quot;&quot;&quot;</span>
                  <span className="code-operator">;</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$result</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-type">Redis</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">eval</span>
                  <span className="code-operator">(</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$lua</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-type">1</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">$key</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-function">microtime</span>
                  <span className="code-operator">(</span>
                  <span className="code-keyword">true</span>
                  <span className="code-operator">),</span>{' '}
                  <span className="code-type">60</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-keyword">self</span>
                  <span className="code-operator">::</span>
                  <span className="code-variable">MAX</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-function">uniqid</span>
                  <span className="code-operator">()</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">return</span>{' '}
                  <span className="code-operator">[</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">&apos;allowed&apos;</span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-keyword">bool</span>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-variable">$result</span>
                  <span className="code-operator">[</span>
                  <span className="code-type">0</span>
                  <span className="code-operator">]</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">
                    &apos;remaining&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-keyword">self</span>
                  <span className="code-operator">::</span>
                  <span className="code-variable">MAX</span>{' '}
                  <span className="code-operator">-</span>{' '}
                  <span className="code-variable">$result</span>
                  <span className="code-operator">[</span>
                  <span className="code-type">1</span>
                  <span className="code-operator">]</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">];</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'}'}</span>
                </div>
                <div>
                  <span className="code-operator">{'}'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 3: JWT Rotation + Theft Detection ── */}
          <div className="reveal-left" style={{ '--stagger': 2 } as any}>
            <div className="bg-slate-900/60 border border-white/10 backdrop-blur-sm overflow-hidden rounded-2xl shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5">
              <div className="flex items-center justify-between bg-ink-900 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/70"></span>
                  <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="size-2.5 rounded-full bg-green-500/70"></span>
                  <span className="ml-2 font-mono text-[10px] text-gray-500">
                    AuthService.php
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 font-mono text-[9px] text-purple-400">
                    JWT
                  </span>
                  <span className="rounded bg-red-500/20 px-2 py-0.5 font-mono text-[9px] text-red-400">
                    anti-theft
                  </span>
                </div>
              </div>
              <div className="bg-ink-900 p-5 font-mono text-[12px] leading-[1.8]">
                <div>
                  <span className="code-keyword">final class</span>{' '}
                  <span className="code-function">AuthService</span>
                </div>
                <div>
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;
                  <span className="code-keyword">public function</span>{' '}
                  <span className="code-function">rotate</span>
                  <span className="code-operator">(</span>
                  <span className="code-keyword">string</span>{' '}
                  <span className="code-variable">$rawToken</span>
                  <span className="code-operator">):</span>{' '}
                  <span className="code-keyword">array</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$hash</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-function">hash</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;sha256&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">$rawToken</span>
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$record</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-type">RefreshToken</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">where</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;token_hash&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">$hash</span>
                  <span className="code-operator">)</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">first</span>
                  <span className="code-operator">();</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-comment">
                    {'// 🚨 Theft Detection: revoked token reused'}
                  </span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">if</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-variable">$record</span>{' '}
                  <span className="code-operator">&amp;&amp;</span>{' '}
                  <span className="code-variable">$record</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">revoked_at</span>{' '}
                  <span className="code-operator">!==</span>{' '}
                  <span className="code-keyword">null</span>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-type">RefreshToken</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">where</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;user_id&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">$record</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">user_id</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">whereNull</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;revoked_at&apos;</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">update</span>
                  <span className="code-operator">([</span>
                  <span className="code-string">
                    &apos;revoked_at&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-function">now</span>
                  <span className="code-operator">()]);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">throw new</span>{' '}
                  <span className="code-type">SecurityException</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">
                    &apos;Token reuse detected.&apos;
                  </span>
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">{'}'}</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">if</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-operator">!</span>
                  <span className="code-variable">$record</span>{' '}
                  <span className="code-operator">||</span>{' '}
                  <span className="code-variable">$record</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">expires_at</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">isPast</span>
                  <span className="code-operator">())</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">throw new</span>{' '}
                  <span className="code-type">AuthenticationException</span>
                  <span className="code-operator">();</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">{'}'}</span>
                </div>
                <div className="mt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$record</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">update</span>
                  <span className="code-operator">([</span>
                  <span className="code-string">
                    &apos;revoked_at&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-function">now</span>
                  <span className="code-operator">()]);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">return</span>{' '}
                  <span className="code-variable">$this</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">issuePair</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">$record</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">user</span>
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'}'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;
                  <span className="code-keyword">private function</span>{' '}
                  <span className="code-function">issuePair</span>
                  <span className="code-operator">(</span>
                  <span className="code-type">User</span>{' '}
                  <span className="code-variable">$user</span>
                  <span className="code-operator">):</span>{' '}
                  <span className="code-keyword">array</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$access</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-function">auth</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;api&apos;</span>
                  <span className="code-operator">)</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">login</span>
                  <span className="code-operator">(</span>
                  <span className="code-variable">$user</span>
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$refresh</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-type">Str</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">random</span>
                  <span className="code-operator">(</span>
                  <span className="code-type">64</span>
                  <span className="code-operator">);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-type">RefreshToken</span>
                  <span className="code-operator">::</span>
                  <span className="code-function">create</span>
                  <span className="code-operator">([</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">&apos;user_id&apos;</span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-variable">$user</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">id</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">
                    &apos;token_hash&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-function">hash</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;sha256&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">$refresh</span>
                  <span className="code-operator">),</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">
                    &apos;expires_at&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-function">now</span>
                  <span className="code-operator">()-&gt;</span>
                  <span className="code-function">addDays</span>
                  <span className="code-operator">(</span>
                  <span className="code-type">7</span>
                  <span className="code-operator">),</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">]);</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">return</span>{' '}
                  <span className="code-operator">[</span>
                  <span className="code-string">
                    &apos;access_token&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-variable">$access</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">
                    &apos;refresh_token&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-variable">$refresh</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-string">
                    &apos;token_type&apos;
                  </span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-string">&apos;Bearer&apos;</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">];</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'}'}</span>
                </div>
                <div>
                  <span className="code-operator">{'}'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 4: Match Enum Authorization ── */}
          <div className="reveal-right" style={{ '--stagger': 3 } as any}>
            <div className="bg-slate-900/60 border border-white/10 backdrop-blur-sm overflow-hidden rounded-2xl shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5">
              <div className="flex items-center justify-between bg-ink-900 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/70"></span>
                  <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="size-2.5 rounded-full bg-green-500/70"></span>
                  <span className="ml-2 font-mono text-[10px] text-gray-500">
                    AccessPolicy.php
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="rounded bg-yellow-500/20 px-2 py-0.5 font-mono text-[9px] text-yellow-400">
                    enum
                  </span>
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[9px] text-cyan-400">
                    match
                  </span>
                </div>
              </div>
              <div className="bg-ink-900 p-5 font-mono text-[12px] leading-[1.8]">
                <div>
                  <span className="code-keyword">enum</span>{' '}
                  <span className="code-function">InvoiceStatus</span>
                  <span className="code-operator">:</span>{' '}
                  <span className="code-keyword">string</span>
                </div>
                <div>
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-keyword">case</span>{' '}
                  <span className="code-variable">UNPAID</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-string">&apos;unpaid&apos;</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-keyword">case</span>{' '}
                  <span className="code-variable">PAID</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-string">&apos;paid&apos;</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-keyword">case</span>{' '}
                  <span className="code-variable">OVERDUE</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-string">&apos;overdue&apos;</span>
                  <span className="code-operator">;</span>
                </div>
                <div>
                  <span className="code-operator">{'}'}</span>
                </div>
                <div className="mt-2">
                  <span className="code-keyword">private function</span>{' '}
                  <span className="code-function">canView</span>
                  <span className="code-operator">(</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-type">Invoice</span>{' '}
                  <span className="code-variable">$invoice</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-type">User</span>{' '}
                  <span className="code-variable">$user</span>
                </div>
                <div>
                  <span className="code-operator">):</span>{' '}
                  <span className="code-keyword">bool</span>
                </div>
                <div>
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-keyword">return</span>{' '}
                  <span className="code-keyword">match</span>{' '}
                  <span className="code-operator">(</span>
                  <span className="code-keyword">true</span>
                  <span className="code-operator">)</span>{' '}
                  <span className="code-operator">{'{'}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$user</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">hasRole</span>
                  <span className="code-operator">([</span>
                  <span className="code-string">&apos;admin&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-string">&apos;principal&apos;</span>
                  <span className="code-operator">])</span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-keyword">true</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$user</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">hasRole</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;student&apos;</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">&amp;&amp;</span>{' '}
                  <span className="code-variable">$user</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">student</span>
                  <span className="code-operator">?-&gt;</span>
                  <span className="code-variable">id</span>{' '}
                  <span className="code-operator">===</span>{' '}
                  <span className="code-variable">$invoice</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">student_id</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-keyword">true</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-variable">$user</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">hasRole</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;parent&apos;</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">&amp;&amp;</span>{' '}
                  <span className="code-variable">$user</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">guardianStudents</span>
                  <span className="code-operator">()</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">where</span>
                  <span className="code-operator">(</span>
                  <span className="code-string">&apos;students.id&apos;</span>
                  <span className="code-operator">,</span>{' '}
                  <span className="code-variable">$invoice</span>
                  <span className="code-operator">-&gt;</span>
                  <span className="code-variable">student_id</span>
                  <span className="code-operator">)</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">-&gt;</span>
                  <span className="code-function">exists</span>
                  <span className="code-operator">()</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-keyword">true</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-keyword">default</span>{' '}
                  <span className="code-operator">=&gt;</span>{' '}
                  <span className="code-keyword">false</span>
                  <span className="code-operator">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-operator">{'}'};</span>
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
