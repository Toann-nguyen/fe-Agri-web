import { Reveal } from '../ui';

const experiences = [
  {
    period: '2024 — Present',
    isCurrent: true,
    title: 'Senior Full-Stack Developer',
    company: 'Tech Startup — Remote',
    description:
      'Leading architecture of high-concurrency streaming platform. Implemented WebSocket load balancing with Redis pub/sub, reducing latency from 200ms to 12ms.',
    tags: ['NestJS', 'Redis', 'Docker', 'WebSocket'],
    color: 'cyan',
  },
  {
    period: '2023 — 2024',
    title: 'Full-Stack Developer',
    company: 'Digital Agency — Ho Chi Minh City',
    description:
      'Built 15+ client projects with Laravel + Next.js. Optimized N+1 queries across legacy codebases, achieving 40% average page load improvement.',
    tags: ['Laravel', 'Next.js', 'MySQL', 'Tailwind'],
    color: 'ember',
  },
  {
    period: '2022 — 2023',
    title: 'Junior Developer',
    company: 'Software Company — Ho Chi Minh City',
    description:
      'Started with PHP/MySQL stack. Learned REST API design patterns, Git workflows, and agile methodologies. Contributed to 3 major products.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Git'],
    color: 'purple',
  },
  {
    period: '2021 — 2022',
    title: 'Self-Taught Journey Begins',
    company: 'Online Learning',
    description:
      'First line of code. Built personal projects, contributed to open source, and developed a deep passion for performance optimization and clean architecture.',
    tags: [],
    color: 'ink',
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-40"></div>
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="reveal active mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
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
              style={{ animation: 'dash-move 2s linear infinite' }}
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
              <Reveal key={index} direction="left" staggerIndex={index}>
                <div className="relative">
                  <div
                    className={`timeline-node ${exp.isCurrent ? 'active-node' : ''}`}
                    style={{ top: '8px' }}
                  ></div>
                  <div className="timeline-content glass-light group ml-14 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5 md:ml-14">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                          exp.color === 'cyan'
                            ? 'border-cyan-500/15 bg-cyan-500/10 text-cyan-700'
                            : exp.color === 'ember'
                              ? 'text-ember-700 border-ember-500/15 bg-ember-500/10'
                              : exp.color === 'purple'
                                ? 'border-purple-500/15 bg-purple-500/10 text-purple-700'
                                : 'border-ink-300/20 bg-ink-500/10 text-ink-600'
                        }`}
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
                    <p className="mb-3 text-sm font-medium text-ink-400">{exp.company}</p>
                    <p className="mb-4 text-sm leading-relaxed text-ink-500">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded bg-surface-100 px-2 py-0.5 font-mono text-[9px] text-ink-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
