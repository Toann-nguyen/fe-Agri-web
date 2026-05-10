/* eslint-disable tailwindcss/no-custom-classname */

// eslint-disable-next-line check-file/filename-naming-convention
import { GlassCard, CodeToken, Card3D, Reveal } from '../ui';

const techItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h8v8h-8v-8zm2 2v4h4v-4h-4z" />
      </svg>
    ),
    iconColor: 'cyan',
    label: 'TypeScript',
    description: 'End-to-end type safety. Zero ambiguity from API contracts to UI props.',
    code: (
      <div>
        <CodeToken type="keyword">type</CodeToken> <CodeToken type="type">APIResponse</CodeToken>
        <CodeToken type="operator">&lt;</CodeToken>
        <CodeToken type="type">T</CodeToken>
        <CodeToken type="operator">&gt;</CodeToken> <CodeToken type="operator">=</CodeToken>{' '}
        <CodeToken type="operator">{'{'}</CodeToken>
        <br />
        &nbsp;&nbsp;<CodeToken type="function">data</CodeToken>
        <CodeToken type="operator">:</CodeToken> <CodeToken type="type">T</CodeToken>
        <CodeToken type="operator">;</CodeToken>
        <br />
        &nbsp;&nbsp;<CodeToken type="function">latency</CodeToken>
        <CodeToken type="operator">:</CodeToken>{' '}
        <CodeToken type="string">
          {'$'}
          {'{'}number{'}'}ms
        </CodeToken>
        <CodeToken type="operator">;</CodeToken>
        <br />
        <CodeToken type="operator">{'}'}</CodeToken>
      </div>
    ),
    size: 'large',
    primary: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M1 0l1 1v2l-1 1v2l1 1v2l-1 1v2l1 1v3l-1 1v3l1 1v2l-1 1v1l-2-2-1 1h-1l-1-1v-1l-1-1-1 1-1-1v-1l1-1v-2l-1-1V17l1-1v-2l-1-1v-2l1-1v-2l-1-1v-2l1-1V7l-1-1V5l1-1V2l1 1h2l1-1v1l1 1v1l1-1-1-1v-1l-1-1H5L4 2v1l-1 1v1l-1-1v-2l-1-1v-1L0 1v1l1 1v2zm3 3l-1 1v1l1 1v1l-1 1v2l1 1v1l-1 1v1l1 1v2l-1 1v2l1 1v1l-1 1v1l1 1h1l1-1v-1l1-1v-3l1-1v-3l1-1v-3l1-1v-2l-1-1v-2l1-1v-2l-1-1V7l1-1V5l-1-1V3z" />
      </svg>
    ),
    iconColor: 'sky',
    label: 'Docker',
    description: 'Containerization',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    ),
    iconColor: 'ember',
    label: 'Redis',
    description: 'Cache Layer',
    emberGlow: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    iconColor: 'ink',
    label: 'Next.js',
    description: 'SSR, ISR, App Router — lightning-fast page loads.',
    size: 'wide',
    emberGlow: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm1 16.09V18h2v1.09c.78.14 1.47.41 2.05.8.58-.39 1.27-.66 2.05-.8v-1.09h2v1.09c-.78.14-1.47.41-2.05.8-.58-.39-1.27-.66-2.05-.8v-1.09h-2v1.09c-.78.14-1.47.41-2.05.8-.58-.39-1.27-.66-2.05-.8v-1.09h-2v1.09c.78.14 1.47.41 2.05.8.58-.39 1.27-.66 2.05-.8zM18 11.25c-.73.61-1.69 1.07-2.78 1.33-.67.16-1.41.26-2.22.3.72-.38 1.33-.94 1.78-1.63.22-.34.39-.71.5-1.09.11.38.28.75.5 1.09.45.69 1.06 1.25 1.78 1.63-.81.04-1.55.14-2.22.3 1.09-.26 2.05-.72 2.78-1.33.36-.3.67-.63.93-.99.26.36.57.69.93.99-.73.61-1.69 1.07-2.78 1.33.67.16 1.41.26 2.22.3-.72-.38-1.33-.94-1.78-1.63-.22-.34-.39-.71-.5-1.09-.11.38-.28.75-.5 1.09-.45.69-1.06 1.25-1.78 1.63.81-.04 1.55-.14 2.22-.3-1.09.26-2.05.72-2.78 1.33-.36.3-.67.63-.93.99-.26-.36-.57-.69-.93-.99z" />
      </svg>
    ),
    iconColor: 'ember',
    label: 'MySQL',
    description: 'Relational DB',
    emberGlow: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
    iconColor: 'green',
    label: 'MongoDB',
    description: 'NoSQL Store',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    iconColor: 'cyan',
    label: 'Tailwind CSS',
    description: 'Utility-first CSS, zero runtime overhead.',
    size: 'wide',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="#ff2d20" width="36" height="36">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    iconColor: 'laravel',
    label: 'Laravel',
    description: 'PHP Backend',
    emberGlow: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    iconColor: 'ember',
    label: 'NestJS',
    description: 'Node Framework',
    emberGlow: true,
  },
];

export function TechStackSection() {
  return (
    <section id="stack" className="relative bg-white py-24 md:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-40"></div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[120px]"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal active mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h8v8h-8v-8zm2 2v4h4v-4h-4z" />
            </svg>
            Tech Stack
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            Tools of <span className="text-gradient-cyan">the Trade</span>
          </h2>
        </div>

        <div
          className="bento-grid grid grid-cols-4 grid-rows-3 gap-4"
          style={{ minHeight: '520px' }}
        >
          {techItems.map((item, index) => (
            <Reveal key={index} direction="scale" staggerIndex={index}>
              <Card3D emberGlow={item.emberGlow} className="h-full">
                <GlassCard
                  // eslint-disable-next-line tailwindcss/classnames-order
                  className={`p-5 flex ${item.size === 'large' ? 'flex-col justify-between' : item.size === 'wide' ? 'items-center gap-5' : 'flex-col justify-center items-center text-center'} group h-full cursor-default`}
                  glow
                >
                  {item.size === 'large' ? (
                    <>
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-cyan-500/30">
                            <span className="text-white">{item.icon}</span>
                          </div>
                          <span className="rounded-md bg-surface-100 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-400">
                            Primary
                          </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-ink-800">{item.label}</h3>
                        <p className="text-sm leading-relaxed text-ink-500">{item.description}</p>
                      </div>
                      {item.code && (
                        <div className="code-block-light mt-4 px-4 py-3 text-[11px] shadow-lg shadow-black/5">
                          {item.code}
                        </div>
                      )}
                    </>
                  ) : item.size === 'wide' ? (
                    <>
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-black shadow-lg shadow-black/10 transition-all duration-500 group-hover:scale-110">
                        <span
                          className={item.iconColor === 'cyan' ? 'text-white' : 'text-cyan-400'}
                        >
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-ink-800">{item.label}</h3>
                        <p className="mt-1 text-xs text-ink-500">{item.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span
                        className={`group-hover: mb-2 transition-all duration-500 group-hover:scale-125${item.iconColor === 'ember' ? '-rotate-12' : 'rotate-12'}`}
                        style={{
                          color:
                            item.iconColor === 'ember'
                              ? '#f97316'
                              : item.iconColor === 'sky'
                                ? '#0ea5e9'
                                : item.iconColor === 'green'
                                  ? '#22c55e'
                                  : item.iconColor === 'laravel'
                                    ? '#ff2d20'
                                    : undefined,
                        }}
                      >
                        {item.icon}
                      </span>
                      {/* eslint-disable-next-line prettier/prettier, react/jsx-no-comment-textnodes */}
                      <span className="text-sm font-semibold text-ink-800">{item.label}</span>
                      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                      <span className="mt-1 font-mono text-[10px] text-ink-400">
                        {item.description}
                      </span>
                    </>
                  )}
                </GlassCard>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
