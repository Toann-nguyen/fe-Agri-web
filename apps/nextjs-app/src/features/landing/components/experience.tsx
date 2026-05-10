'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const Experience = () => {
  const sectionRef = useScrollReveal();

  const experiences = [
    {
      period: '2024 — Present',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Startup — Remote',
      description:
        'Leading architecture of high-concurrency streaming platform. Implemented WebSocket load balancing with Redis pub/sub, reducing latency from 200ms to 12ms.',
      tags: ['NestJS', 'Redis', 'Docker', 'WebSocket'],
      isCurrent: true,
      colorClass: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/15',
    },
    {
      period: '2023 — 2024',
      title: 'Full-Stack Developer',
      company: 'Digital Agency — Ho Chi Minh City',
      description:
        'Built 15+ client projects with Laravel + Next.js. Optimized N+1 queries across legacy codebases, achieving 40% average page load improvement.',
      tags: ['Laravel', 'Next.js', 'MySQL', 'Tailwind'],
      isCurrent: false,
      colorClass: 'bg-ember-500/10 text-ember-700 border-ember-500/15',
    },
    {
      period: '2022 — 2023',
      title: 'Junior Developer',
      company: 'Software Company — Ho Chi Minh City',
      description:
        'Started with PHP/MySQL stack. Learned REST API design patterns, Git workflows, and agile methodologies. Contributed to 3 major products.',
      tags: ['PHP', 'MySQL', 'JavaScript', 'Git'],
      isCurrent: false,
      colorClass: 'bg-purple-500/10 text-purple-700 border-purple-500/15',
    },
    {
      period: '2021 — 2022',
      title: 'Self-Taught Journey Begins',
      company: 'Online Learning',
      description:
        'First line of code. Built personal projects, contributed to open source, and developed a deep passion for performance optimization and clean architecture.',
      tags: [],
      isCurrent: false,
      colorClass: 'bg-ink-500/10 text-ink-600 border-ink-300/20',
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="dot-grid-light absolute inset-0 opacity-40"></div>
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <Icon icon="mdi:timeline-clock" width="14" />
            Experience
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            The <span className="text-gradient-cyan">Journey</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-ink-400">
            From first line of code to architecting scalable systems.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line SVG */}
          <svg
            className="absolute inset-y-0 left-[24px] z-[1] w-[2px] md:left-[24px]"
            preserveAspectRatio="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="url(#timeline-grad)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="animate-dash-move"
            />
            <defs>
              <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="20%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="reveal-left relative"
                style={{ '--stagger': index } as any}
              >
                <div
                  className={`timeline-node ${exp.isCurrent ? 'active-node' : ''}`}
                  style={{ top: '8px' }}
                ></div>
                <div className="glass-light group ml-14 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5 md:ml-14">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${exp.colorClass}`}
                    >
                      {exp.period}
                    </span>
                    {exp.isCurrent && (
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-600">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-ink-800 transition-colors group-hover:text-cyan-700">
                    {exp.title}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-ink-400">
                    {exp.company}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-ink-500">
                    {exp.description}
                  </p>
                  {exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-surface-100 px-2 py-0.5 font-mono text-[9px] text-ink-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
