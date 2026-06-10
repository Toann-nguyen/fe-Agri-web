'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const EXPERTISE_ITEMS = [
  {
    icon: 'mdi:server-network',
    iconColor: 'text-orange-400',
    gradientFrom: 'from-orange-500/20',
    gradientTo: 'to-red-500/5',
    borderColor: 'border-orange-500/25',
    glowColor: 'rgba(249,115,22,0.15)',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    bgColor: 'bg-orange-500/8',
    accentColor: '#f97316',
    title: 'Backend',
    subtitle: 'System Architecture',
    description:
      'Thiết kế backend mạnh mẽ với Laravel & NestJS, áp dụng Repository Pattern, SOLID principles và clean architecture.',
    skills: [
      { icon: 'mdi:laravel', name: 'Laravel', color: '#FF2D20' },
      { icon: 'simple-icons:nestjs', name: 'NestJS', color: '#E0234E' },
      { icon: 'mdi:api', name: 'REST API', color: '#f97316' },
      { icon: 'mdi:message-outline', name: 'Queue', color: '#FF9900' },
    ],
    stats: [
      { label: 'API Endpoints', value: '200+' },
      { label: 'Response Time', value: '<50ms' },
    ],
    codeSnippet: (
      <>
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
        <span className="code-operator">{'}'}</span>
      </>
    ),
  },
  {
    icon: 'mdi:react',
    iconColor: 'text-cyan-400',
    gradientFrom: 'from-cyan-500/20',
    gradientTo: 'to-blue-500/5',
    borderColor: 'border-cyan-500/25',
    glowColor: 'rgba(6,182,212,0.15)',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    bgColor: 'bg-cyan-500/8',
    accentColor: '#06b6d4',
    title: 'Frontend',
    subtitle: 'Modern UI & UX',
    description:
      'Xây dựng giao diện React/Next.js hiện đại với TypeScript, responsive design và micro-interactions đẹp mắt.',
    skills: [
      { icon: 'mdi:react', name: 'React', color: '#61DAFB' },
      { icon: 'ri:nextjs-fill', name: 'Next.js', color: '#fff' },
      { icon: 'mdi:language-typescript', name: 'TypeScript', color: '#3178C6' },
      { icon: 'mdi:tailwind', name: 'Tailwind', color: '#06B6D4' },
    ],
    stats: [
      { label: 'Components', value: '100+' },
      { label: 'Lighthouse', value: '95+' },
    ],
    codeSnippet: (
      <>
        <span className="code-keyword">const</span>{' '}
        <span className="code-variable">App</span>{' '}
        <span className="code-operator">=</span>{' '}
        <span className="code-operator">{'() => ('}</span>
        <br />
        &nbsp;&nbsp;<span className="code-keyword">&lt;</span>
        <span className="code-type">Layout</span>{' '}
        <span className="code-function">responsive</span>
        <span className="code-keyword">&gt;</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">&lt;</span>
        <span className="code-type">UI</span>{' '}
        <span className="code-function">animated</span>{' '}
        <span className="code-keyword">/&gt;</span>
        <br />
        &nbsp;&nbsp;<span className="code-keyword">&lt;/</span>
        <span className="code-type">Layout</span>
        <span className="code-keyword">&gt;</span>
        <br />
        <span className="code-operator">{');'}</span>
      </>
    ),
  },
  {
    icon: 'mdi:database-cog',
    iconColor: 'text-emerald-400',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-teal-500/5',
    borderColor: 'border-emerald-500/25',
    glowColor: 'rgba(16,185,129,0.15)',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    bgColor: 'bg-emerald-500/8',
    accentColor: '#10b981',
    title: 'Database',
    subtitle: 'Performance & Optimization',
    description:
      'Tối ưu hóa N+1 queries, triển khai Redis caching, thiết kế schema MySQL chuẩn ACID với sub-50ms response.',
    skills: [
      { icon: 'simple-icons:mysql', name: 'MySQL', color: '#4479A1' },
      { icon: 'simple-icons:redis', name: 'Redis', color: '#DC382D' },
      { icon: 'mdi:database-search', name: 'N+1 Fix', color: '#10b981' },
      { icon: 'simple-icons:mongodb', name: 'MongoDB', color: '#47A248' },
    ],
    stats: [
      { label: 'Cache Hit Rate', value: '98%' },
      { label: 'Avg Response', value: '23ms' },
    ],
    codeSnippet: (
      <>
        <span className="code-comment">{'// Redis caching'}</span>
        <br />
        <span className="code-keyword">await</span>{' '}
        <span className="code-variable">redis</span>
        <span className="code-operator">.</span>
        <span className="code-function">setex</span>
        <span className="code-operator">(</span>
        <br />
        &nbsp;&nbsp;<span className="code-string">&apos;users:all&apos;</span>
        <span className="code-operator">,</span>{' '}
        <span className="code-type">300</span>
        <span className="code-operator">,</span>
        <br />
        &nbsp;&nbsp;<span className="code-variable">data</span>
        <br />
        <span className="code-operator">)</span>
      </>
    ),
  },
  {
    icon: 'mdi:cloud-braces',
    iconColor: 'text-purple-400',
    gradientFrom: 'from-purple-500/20',
    gradientTo: 'to-indigo-500/5',
    borderColor: 'border-purple-500/25',
    glowColor: 'rgba(168,85,247,0.15)',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    bgColor: 'bg-purple-500/8',
    accentColor: '#a855f7',
    title: 'DevOps',
    subtitle: 'Infrastructure & Deploy',
    description:
      'Containerization với Docker, deploy lên AWS, cấu hình Nginx reverse proxy và CI/CD pipeline hiệu quả.',
    skills: [
      { icon: 'mdi:docker', name: 'Docker', color: '#2496ED' },
      { icon: 'mdi:aws', name: 'AWS S3', color: '#FF9900' },
      { icon: 'simple-icons:nginx', name: 'Nginx', color: '#009639' },
      { icon: 'mdi:git', name: 'Git', color: '#F05032' },
    ],
    stats: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Deploy Time', value: '<5min' },
    ],
    codeSnippet: (
      <>
        <span className="code-comment">{'# docker-compose'}</span>
        <br />
        <span className="code-function">services</span>
        <span className="code-operator">:</span>
        <br />
        &nbsp;&nbsp;<span className="code-variable">app</span>
        <span className="code-operator">:</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-function">image</span>
        <span className="code-operator">:</span>{' '}
        <span className="code-string">laravel:prod</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-function">restart</span>
        <span className="code-operator">:</span>{' '}
        <span className="code-type">always</span>
      </>
    ),
  },
];

export const Expertise = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-20 md:py-28"
    >
      <div className="dot-grid-dark absolute inset-0 opacity-20" />
      {/* Soft gradient top */}
      <div className="pointer-events-none absolute left-1/2 top-0 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Tiêu đề section */}
        <div className="reveal mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-cyan-400 backdrop-blur-sm">
            <Icon icon="mdi:code-braces-box" width="14" />
            Core Expertise
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Engineering <span className="text-gradient-cyan">Excellence</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60">
            Fullstack expertise từ database đến pixel-perfect interface — được
            xây dựng qua từng dự án thực tế.
          </p>
        </div>

        {/* Grid 4 expertise cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {EXPERTISE_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className={`expertise-card glow-border card-3d reveal group relative overflow-hidden rounded-2xl border ${item.borderColor} bg-slate-900/50 backdrop-blur-sm p-6 shadow-md transition-all duration-500`}
              style={{ '--stagger': index } as any}
            >
              {/* Gradient background khi hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Glow blob */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
                style={{ background: item.glowColor }}
              />

              <div className="relative z-10">
                {/* Icon + title */}
                <div className="mb-4 flex items-start gap-3">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${item.borderColor} bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}
                  >
                    <Icon
                      icon={item.icon}
                      className={item.iconColor}
                      width="22"
                    />
                  </div>
                  <div>
                    {/* Category badge */}
                    <span
                      className={`mb-1 inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${item.badgeColor}`}
                    >
                      {item.title}
                    </span>
                    <p className="text-xs font-medium text-white/50">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-[13px] leading-relaxed text-white/70">
                  {item.description}
                </p>

                {/* Code snippet */}
                <div className="code-block-light mb-4 px-3 py-2.5 text-[10.5px] shadow-lg shadow-black/10">
                  {item.codeSnippet}
                </div>

                {/* Stats nhỏ */}
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {item.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-lg border ${item.borderColor} ${item.bgColor} px-2.5 py-2 text-center`}
                    >
                      <div
                        className="font-mono text-base font-bold"
                        style={{ color: item.accentColor }}
                      >
                        {stat.value}
                      </div>
                      <div className="mt-0.5 font-mono text-[9px] text-white/40">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill icon chips */}
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`flex items-center gap-1 rounded-md border ${item.borderColor} ${item.bgColor} px-2 py-1 transition-all duration-200 hover:scale-105`}
                    >
                      <Icon
                        icon={skill.icon}
                        width="12"
                        style={{ color: skill.color }}
                      />
                      <span
                        className="font-mono text-[10px] font-medium"
                        style={{ color: item.accentColor }}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
