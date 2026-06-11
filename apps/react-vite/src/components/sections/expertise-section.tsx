import { GlassCard, CodeToken, Badge, Card3D, Reveal } from '../ui';

const expertiseItems = [
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='24' height='24'>
        <path d='M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z' />
      </svg>
    ),
    iconColor: 'ember',
    title: 'System Architecture',
    subtitle: 'Backend & Infrastructure',
    description:
      'Designing robust backend systems with Laravel and NestJS, implementing Repository Pattern for clean separation.',
    code: (
      <div>
        <CodeToken type='comment'>{'// Repository Pattern'}</CodeToken>
        <br />
        <CodeToken type='keyword'>interface</CodeToken> <CodeToken type='type'>UserRepository</CodeToken>{' '}
        <CodeToken type='operator'>{'{'}</CodeToken>
        <br />
        &nbsp;&nbsp;<CodeToken type='function'>findById</CodeToken>
        <CodeToken type='operator'>(</CodeToken>
        <CodeToken type='variable'>id</CodeToken>
        <CodeToken type='operator'>:</CodeToken> <CodeToken type='type'>string</CodeToken>
        <CodeToken type='operator'>):</CodeToken> <CodeToken type='type'>Promise</CodeToken>
        <CodeToken type='operator'>&lt;</CodeToken>
        <CodeToken type='type'>User</CodeToken>
        <CodeToken type='operator'>&gt;;</CodeToken>
        <br />
        &nbsp;&nbsp;<CodeToken type='function'>getActive</CodeToken>
        <CodeToken type='operator'>():</CodeToken> <CodeToken type='type'>Collection</CodeToken>
        <CodeToken type='operator'>;</CodeToken>
        <br />
        <CodeToken type='operator'>{'}'}</CodeToken>
      </div>
    ),
    tags: ['Laravel', 'NestJS', 'REST API'],
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='24' height='24'>
        <path d='M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm-1 15H9v-2h2v2zm4 0h-2v-2h2v2zm1-10.5V8h-2v1.5h-1V8H9v1.5H8V8H6v4.5c0 1.1.9 2 2 2h1.5v7H9v2h6v-2h-1v-7H14c1.1 0 2-.9 2-2V7c0-.55-.45-1-1-1z' />
      </svg>
    ),
    iconColor: 'cyan',
    title: 'Performance & Database',
    subtitle: 'Optimization Layer',
    description: 'Resolving N+1 queries, implementing Redis caching, optimizing MySQL for sub-50ms responses.',
    stats: [
      { label: 'Query Optimization', value: 94 },
      { label: 'Cache Hit Rate', value: 98 },
      { label: 'Avg Response', value: 77, suffix: 'ms' },
    ],
    tags: ['MySQL', 'Redis', 'N+1 Fix'],
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='24' height='24'>
        <path d='M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' />
      </svg>
    ),
    iconColor: 'purple',
    title: 'Modern UI & UX',
    subtitle: 'Frontend Interface',
    description: 'Crafting intuitive React.js/Next.js dashboards with responsive design and micro-interactions.',
    chart: true,
    tags: ['React', 'Next.js', 'Tailwind'],
  },
];

export function ExpertiseSection() {
  return (
    <section id='expertise' className='relative py-24 md:py-32'>
      <div className='dot-grid-light absolute inset-0 opacity-60'></div>
      <div className='relative mx-auto max-w-7xl px-6'>
        <div className='reveal active mb-16 text-center'>
          <div className='glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm'>
            <svg viewBox='0 0 24 24' fill='currentColor' width='14' height='14'>
              <path d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' />
            </svg>
            Core Expertise
          </div>
          <h2 className='text-3xl font-bold tracking-tight text-ink-800 md:text-4xl'>
            Engineering <span className='text-gradient-cyan'>Excellence</span>
          </h2>
          <p className='mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-400'>
            Task-oriented expertise across the full stack, from database queries to pixel-perfect interfaces.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          {expertiseItems.map((item, index) => (
            <Reveal key={index} direction='up' staggerIndex={index}>
              <Card3D emberGlow={item.iconColor === 'ember'} className='h-full'>
                <GlassCard className='group flex h-full flex-col p-7' glow>
                  <div className='mb-5 flex items-center gap-3'>
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl shadow-sm transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 ${
                        item.iconColor === 'ember'
                          ? 'border border-ember-400/20 bg-gradient-to-br from-ember-400/20 to-ember-600/5 group-hover:shadow-lg group-hover:shadow-ember-400/10'
                          : item.iconColor === 'cyan'
                            ? 'border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/5 group-hover:shadow-lg group-hover:shadow-cyan-400/10'
                            : 'border border-purple-400/20 bg-gradient-to-br from-purple-400/20 to-purple-600/5 group-hover:shadow-lg group-hover:shadow-purple-400/10'
                      }`}
                    >
                      <span
                        className={
                          item.iconColor === 'ember'
                            ? 'text-ember-500'
                            : item.iconColor === 'cyan'
                              ? 'text-cyan-600'
                              : 'text-purple-600'
                        }
                      >
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className='text-base font-semibold text-ink-800'>{item.title}</h3>
                      <span
                        className={`font-mono text-[11px] ${item.iconColor === 'ember' ? 'text-ember-500/80' : item.iconColor === 'cyan' ? 'text-cyan-600/80' : 'text-purple-600/80'}`}
                      >
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <p className='mb-5 text-sm leading-relaxed text-ink-500'>{item.description}</p>

                  {item.code && (
                    <div className='code-block-light mb-4 px-4 py-3 text-[11px] shadow-lg shadow-black/5'>
                      {item.code}
                    </div>
                  )}

                  {item.stats && (
                    <div className='mb-4 space-y-4'>
                      {item.stats.map((stat, statIndex) => (
                        <div key={statIndex}>
                          <div className='mb-2 flex justify-between'>
                            <span className='font-mono text-[11px] text-ink-400'>{stat.label}</span>
                            <span className='font-mono text-[11px] font-semibold text-cyan-600'>
                              {stat.value}
                              {stat.suffix || '%'}
                            </span>
                          </div>
                          <div className='perf-bar'>
                            <div
                              className='perf-bar-fill bg-gradient-to-r from-cyan-600 to-cyan-400'
                              style={{ width: `${stat.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.chart && (
                    <div className='mb-4 overflow-hidden rounded-xl border border-ink-300/10 shadow-sm'>
                      <div className='flex items-center gap-2 border-b border-ink-300/10 bg-surface-100 px-3 py-2'>
                        <span className='size-2 rounded-full bg-purple-400/50'></span>
                        <span className='font-mono text-[9px] text-ink-400'>dashboard.view</span>
                      </div>
                      <div className='space-y-2 bg-white p-3'>
                        <div className='flex gap-2'>
                          <div className='flex h-9 flex-1 items-center rounded-lg bg-surface-100 px-3'>
                            <div className='h-2.5 w-14 rounded bg-purple-200/60'></div>
                          </div>
                          <div className='flex h-9 flex-1 items-center rounded-lg bg-surface-100 px-3'>
                            <div className='h-2.5 w-10 rounded bg-cyan-200/60'></div>
                          </div>
                        </div>
                        <div className='flex h-20 items-end gap-1.5 rounded-lg bg-surface-50 p-2'>
                          <div className='flex-1 rounded-t-md bg-purple-200/70' style={{ height: '40%' }}></div>
                          <div className='flex-1 rounded-t-md bg-purple-200/70' style={{ height: '65%' }}></div>
                          <div className='flex-1 rounded-t-md bg-purple-300/70' style={{ height: '85%' }}></div>
                          <div className='flex-1 rounded-t-md bg-cyan-300/70' style={{ height: '100%' }}></div>
                          <div className='flex-1 rounded-t-md bg-cyan-200/70' style={{ height: '70%' }}></div>
                          <div className='flex-1 rounded-t-md bg-cyan-200/70' style={{ height: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='mt-auto flex flex-wrap gap-2'>
                    {item.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant={item.iconColor as 'cyan' | 'ember' | 'purple'}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
