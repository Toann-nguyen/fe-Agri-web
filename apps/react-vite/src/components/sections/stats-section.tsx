import { GlassCard, Reveal } from '../ui';

const stats = [
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
        <path d='M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z' />
      </svg>
    ),
    color: 'cyan',
    value: 20,
    suffix: '+',
    label: 'Projects Delivered',
    chartType: 'bars',
    chartValues: [40, 60, 45, 80, 100, 75, 90],
    chartColor: 'cyan',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
        <path d='M7 2v11h3v9l7-12h-4l4-8z' />
      </svg>
    ),
    color: 'ember',
    value: 23,
    suffix: 'ms',
    label: 'Avg Response Time',
    chartType: 'line',
    lineColor: '#f97316',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
        <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z' />
      </svg>
    ),
    color: 'emerald',
    value: 99.9,
    suffix: '%',
    decimal: true,
    label: 'Uptime Guarantee',
    chartType: 'circle',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' width='28' height='28'>
        <path d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' />
      </svg>
    ),
    color: 'purple',
    value: 50,
    suffix: 'K+',
    label: 'Lines of Code',
    chartType: 'bars',
    chartValues: [20, 35, 50, 45, 70, 65, 85, 80, 95, 100, 90, 75],
    chartColor: 'purple',
  },
];

export function StatsSection() {
  return (
    <section className='relative py-24 md:py-32'>
      <div className='dot-grid-light absolute inset-0 opacity-40'></div>
      <div className='relative mx-auto max-w-7xl px-6'>
        <div className='reveal active mb-16 text-center'>
          <div className='glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm'>
            <svg viewBox='0 0 24 24' fill='currentColor' width='14' height='14'>
              <path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' />
            </svg>
            By The Numbers
          </div>
          <h2 className='text-3xl font-bold tracking-tight text-ink-800 md:text-4xl'>
            Impact <span className='text-gradient-cyan'>Dashboard</span>
          </h2>
        </div>

        <div className='grid gap-5 md:grid-cols-4'>
          {stats.map((stat, index) => (
            <Reveal key={index} direction='up' staggerIndex={index}>
              <GlassCard className='rounded-2xl p-6 text-center' glow>
                <div
                  className={`mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl ${
                    stat.color === 'cyan'
                      ? 'border border-cyan-500/15 bg-cyan-500/10 text-cyan-600'
                      : stat.color === 'ember'
                        ? 'border border-ember-500/15 bg-ember-500/10 text-ember-500'
                        : stat.color === 'emerald'
                          ? 'border border-emerald-500/15 bg-emerald-500/10 text-emerald-500'
                          : 'border border-purple-500/15 bg-purple-500/10 text-purple-600'
                  }`}
                >
                  {stat.icon}
                </div>
                <div className='mb-1 font-mono text-4xl font-bold text-ink-800'>
                  {stat.decimal ? stat.value.toFixed(1) : stat.value}
                  {stat.suffix}
                </div>
                <div className='mb-4 text-sm font-medium text-ink-400'>{stat.label}</div>

                {stat.chartType === 'bars' && (
                  <div className='flex h-16 items-end justify-center gap-1'>
                    {stat.chartValues?.map((h, i) => (
                      <div
                        key={i}
                        className={`chart-bar w-3 rounded-t ${
                          stat.chartColor === 'cyan' ? 'bg-cyan-200' : 'bg-purple-200'
                        }`}
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {stat.chartType === 'line' && (
                  <div className='flex items-center justify-center gap-1'>
                    <svg width='80' height='40' viewBox='0 0 80 40' className='overflow-visible'>
                      <polyline
                        points='0,35 12,28 24,30 36,15 48,18 60,8 72,12 80,5'
                        fill='none'
                        stroke={stat.lineColor}
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeDasharray='200'
                        strokeDashoffset='200'
                        style={{
                          animation: 'draw-line 2s ease forwards',
                          animationDelay: '0.5s',
                        }}
                      />
                    </svg>
                  </div>
                )}

                {stat.chartType === 'circle' && (
                  <div className='relative mx-auto size-16'>
                    <svg className='size-full -rotate-90' viewBox='0 0 36 36'>
                      <path
                        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                        fill='none'
                        stroke='rgba(0,0,0,0.05)'
                        strokeWidth='3'
                      />
                      <path
                        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                        fill='none'
                        stroke='#10b981'
                        strokeWidth='3'
                        strokeDasharray='99.9, 100'
                        strokeLinecap='round'
                      />
                    </svg>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <svg viewBox='0 0 24 24' fill='#10b981' width='18' height='18'>
                        <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
                      </svg>
                    </div>
                  </div>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
