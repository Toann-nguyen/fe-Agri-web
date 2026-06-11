import { GlassCard, Reveal } from '../ui';

const architectureItems = [
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
        <path d='M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 12h-5c0 2.76 2.24 5 5 5s5-2.24 5-5h-5z' />
      </svg>
    ),
    color: 'purple',
    label: 'Client',
    description: 'Next.js / React',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
        <path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' />
      </svg>
    ),
    color: 'cyan',
    label: 'API Gateway',
    description: 'NestJS / Laravel',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
        <path d='M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z' />
      </svg>
    ),
    color: 'ember',
    label: 'Data Layer',
    description: 'MySQL + Redis',
  },
];

const principles = [
  { value: 'SOLID', label: 'Clean Architecture' },
  { value: 'DRY', label: 'Zero Duplication' },
  { value: 'O(1)', label: 'Constant Lookups' },
  { value: '99.9%', label: 'Reliability' },
];

export function ArchitectureSection() {
  return (
    <section className='relative py-24 md:py-32'>
      <div className='dot-grid-light absolute inset-0 opacity-30'></div>
      <div className='relative mx-auto max-w-7xl px-6'>
        <div className='reveal active mb-16 text-center'>
          <div className='glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm'>
            <svg viewBox='0 0 24 24' fill='currentColor' width='14' height='14'>
              <path d='M14 6l-4.22 4.17 1.42 1.42L12 11l-4-4V2H6v16h10V6zM4 6V2h2v4h4V2h2v4H4zm12 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2zm0 6h-2v-2h2v2zm0 4h-2v-2h2v2z' />
            </svg>
            Architecture
          </div>
          <h2 className='text-3xl font-bold tracking-tight text-ink-800 md:text-4xl'>
            How I <span className='text-gradient-cyan'>Build</span>
          </h2>
        </div>

        <GlassCard className='rounded-2xl p-8 shadow-xl shadow-black/5 md:p-10' glow>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-5'>
            <div className='flex flex-col items-center text-center'>
              <div className='relative'>
                <div
                  className={`flex size-16 items-center justify-center rounded-2xl shadow-lg ${
                    architectureItems[0].color === 'purple'
                      ? 'border border-purple-400/20 bg-gradient-to-br from-purple-500/15 to-purple-600/5 text-purple-600 shadow-purple-400/5'
                      : ''
                  }`}
                >
                  {architectureItems[0].icon}
                </div>
                <div
                  className='absolute inset-0 rounded-2xl border-2 border-purple-400/20'
                  style={{ animation: 'ripple 3s ease-out infinite' }}
                ></div>
              </div>
              <span className='mt-4 text-sm font-semibold text-ink-800'>{architectureItems[0].label}</span>
              <span className='mt-1 font-mono text-[10px] text-ink-400'>{architectureItems[0].description}</span>
            </div>

            <div className='relative hidden items-center justify-center md:flex'>
              <svg className='w-full' height='2' viewBox='0 0 200 2' preserveAspectRatio='none'>
                <line
                  x1='0'
                  y1='1'
                  x2='200'
                  y2='1'
                  stroke='url(#g1)'
                  strokeWidth='2'
                  strokeDasharray='6 4'
                  style={{ animation: 'dash-move 1s linear infinite' }}
                />
                <defs>
                  <linearGradient id='g1'>
                    <stop offset='0%' stopColor='#a855f7' stopOpacity='0.4' />
                    <stop offset='100%' stopColor='#06b6d4' stopOpacity='0.4' />
                  </linearGradient>
                </defs>
              </svg>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-ink-300/10 bg-white px-2.5 py-1 font-mono text-[9px] text-ink-400 shadow-sm'>
                HTTPS
              </div>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='relative'>
                <div
                  className={`flex size-16 items-center justify-center rounded-2xl shadow-lg ${
                    architectureItems[1].color === 'cyan'
                      ? 'border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 text-cyan-600 shadow-cyan-400/5'
                      : ''
                  }`}
                >
                  {architectureItems[1].icon}
                </div>
                <div
                  className='absolute inset-0 rounded-2xl border-2 border-cyan-400/20'
                  style={{
                    animation: 'ripple 3s ease-out infinite',
                    animationDelay: '0.5s',
                  }}
                ></div>
              </div>
              <span className='mt-4 text-sm font-semibold text-ink-800'>{architectureItems[1].label}</span>
              <span className='mt-1 font-mono text-[10px] text-ink-400'>{architectureItems[1].description}</span>
            </div>

            <div className='relative hidden items-center justify-center md:flex'>
              <svg className='w-full' height='2' viewBox='0 0 200 2' preserveAspectRatio='none'>
                <line
                  x1='0'
                  y1='1'
                  x2='200'
                  y2='1'
                  stroke='url(#g2)'
                  strokeWidth='2'
                  strokeDasharray='6 4'
                  style={{ animation: 'dash-move 1s linear infinite' }}
                />
                <defs>
                  <linearGradient id='g2'>
                    <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.4' />
                    <stop offset='100%' stopColor='#f97316' stopOpacity='0.4' />
                  </linearGradient>
                </defs>
              </svg>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-ink-300/10 bg-white px-2.5 py-1 font-mono text-[9px] text-ink-400 shadow-sm'>
                Query
              </div>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='flex gap-2'>
                <div className='relative'>
                  <div className='flex size-16 items-center justify-center rounded-2xl border border-ember-400/20 bg-gradient-to-br from-ember-500/15 to-ember-600/5 text-ember-500 shadow-lg shadow-ember-400/5'>
                    <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
                      <path d='M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z' />
                    </svg>
                  </div>
                  <div
                    className='absolute inset-0 rounded-2xl border-2 border-ember-400/20'
                    style={{
                      animation: 'ripple 3s ease-out infinite',
                      animationDelay: '1s',
                    }}
                  ></div>
                </div>
                <div className='relative'>
                  <div className='flex size-16 items-center justify-center rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500/15 to-red-600/5 text-red-500 shadow-lg shadow-red-400/5'>
                    <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
                      <path d='M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z' />
                    </svg>
                  </div>
                  <div
                    className='absolute inset-0 rounded-2xl border-2 border-red-400/20'
                    style={{
                      animation: 'ripple 3s ease-out infinite',
                      animationDelay: '1.5s',
                    }}
                  ></div>
                </div>
              </div>
              <span className='mt-4 text-sm font-semibold text-ink-800'>Data Layer</span>
              <span className='mt-1 font-mono text-[10px] text-ink-400'>MySQL + Redis</span>
            </div>
          </div>

          <div className='mt-10 grid grid-cols-2 gap-6 border-t border-ink-300/10 pt-8 md:grid-cols-4'>
            {principles.map((principle, index) => (
              <Reveal key={index} direction='up' staggerIndex={index}>
                <div className='text-center'>
                  <div
                    className={`mb-1 font-mono text-xl font-bold ${
                      index === 1 ? 'text-cyan-600' : index === 3 ? 'text-ember-600' : 'text-ink-800'
                    }`}
                  >
                    {principle.value}
                  </div>
                  <div className='text-[11px] text-ink-400'>{principle.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
