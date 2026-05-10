import { GlassCard, Badge, Reveal } from '../ui';

const projects = [
  {
    image: 'https://picsum.photos/seed/agritech-field-green/800/500.jpg',
    tag: 'Flagship',
    tagType: 'gradient',
    status: 'In Development',
    statusColor: 'amber',
    title: 'AgriTech Vision AI',
    description:
      'AI-powered crop disease detection. Real-time field scanning with TensorFlow.js, processed through Laravel API with Redis queue.',
    tags: ['Next.js', 'Laravel', 'TensorFlow', 'Redis'],
    link: '#',
    direction: 'left' as const,
  },
  {
    image: 'https://picsum.photos/seed/streaming-dark-server/800/500.jpg',
    tag: 'Live',
    tagType: 'live',
    status: 'Production',
    statusColor: 'emerald',
    title: 'High-Concurrency Streaming',
    description:
      'Real-time streaming platform handling 10K+ concurrent connections. Load-balanced WebSocket with NestJS and Redis pub/sub.',
    tags: ['NestJS', 'WebSocket', 'Redis Pub/Sub', 'Docker'],
    metrics: [
      { icon: 'latency', value: '12ms', label: 'latency' },
      { icon: 'users', value: '10K+', label: 'concurrent' },
    ],
    direction: 'right' as const,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-white py-24 md:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-40"></div>
      <div className="pointer-events-none absolute right-0 top-0 size-[400px] rounded-full bg-ember-400/5 blur-[120px]"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal active mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
            Featured Projects
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            The <span className="text-gradient-mixed">Bridge</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={index} direction={project.direction} staggerIndex={index}>
              <GlassCard className="group overflow-hidden rounded-2xl" glow>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-img size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                  <div
                    className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg ${
                      project.tagType === 'gradient'
                        ? 'bg-gradient-to-r from-cyan-500 to-ember-500'
                        : 'bg-red-500'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {project.tag}
                  </div>

                  {project.tagType === 'live' && (
                    <div className="glass-light absolute bottom-4 right-4 translate-y-2 rounded-lg px-3 py-2 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="mb-1.5 font-mono text-[9px] text-ink-400">Server Load</div>
                      <div className="flex h-5 items-end gap-0.5">
                        <div
                          className="w-1.5 rounded-t bg-emerald-400"
                          style={{
                            height: '30%',
                            animation: 'wave 1.5s ease-in-out infinite',
                            animationDelay: '0s',
                          }}
                        ></div>
                        <div
                          className="w-1.5 rounded-t bg-emerald-400"
                          style={{
                            height: '50%',
                            animation: 'wave 1.5s ease-in-out infinite',
                            animationDelay: '0.1s',
                          }}
                        ></div>
                        <div
                          className="w-1.5 rounded-t bg-emerald-400"
                          style={{
                            height: '45%',
                            animation: 'wave 1.5s ease-in-out infinite',
                            animationDelay: '0.2s',
                          }}
                        ></div>
                        <div
                          className="w-1.5 rounded-t bg-amber-400"
                          style={{
                            height: '70%',
                            animation: 'wave 1.5s ease-in-out infinite',
                            animationDelay: '0.3s',
                          }}
                        ></div>
                        <div
                          className="w-1.5 rounded-t bg-emerald-400"
                          style={{
                            height: '55%',
                            animation: 'wave 1.5s ease-in-out infinite',
                            animationDelay: '0.4s',
                          }}
                        ></div>
                        <div
                          className="w-1.5 rounded-t bg-emerald-400"
                          style={{
                            height: '40%',
                            animation: 'wave 1.5s ease-in-out infinite',
                            animationDelay: '0.5s',
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-700 group-hover:opacity-100">
                    <div
                      className="relative size-32 rounded-lg border-2 border-cyan-500/50"
                      style={{ animation: 'ripple 2s ease-out infinite' }}
                    >
                      <div className="absolute -left-0.5 -top-0.5 size-5 border-l-2 border-t-2 border-cyan-500"></div>
                      <div className="absolute -right-0.5 -top-0.5 size-5 border-r-2 border-t-2 border-cyan-500"></div>
                      <div className="absolute -bottom-0.5 -left-0.5 size-5 border-b-2 border-l-2 border-cyan-500"></div>
                      <div className="absolute -bottom-0.5 -right-0.5 size-5 border-b-2 border-r-2 border-cyan-500"></div>
                      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-400/30"></div>
                      <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-400/30"></div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`relative flex size-2 ${project.statusColor === 'amber' ? 'animate-ping' : ''}`}
                    >
                      {project.statusColor === 'amber' && (
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                      )}
                      <span
                        className={`relative inline-flex size-2 rounded-full ${
                          project.statusColor === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      ></span>
                    </span>
                    <span
                      className={`font-mono text-[10px] font-medium uppercase tracking-wider ${
                        project.statusColor === 'amber' ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-ink-800 transition-colors duration-300 group-hover:text-cyan-700">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-ink-500">{project.description}</p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant={tagIndex < 2 ? 'cyan' : ('ember' as 'cyan' | 'ember')}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-cyan-600 transition-all duration-200 hover:text-cyan-700"
                    >
                      View Case Study
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="16"
                        height="16"
                        className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                      >
                        <path d="M10 17l5-5-5-5v10z" />
                      </svg>
                    </a>
                  )}

                  {project.metrics && (
                    <div className="flex items-center gap-6 font-mono text-[11px] text-ink-400">
                      {project.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center gap-1.5">
                          <svg
                            viewBox="0 0 24 24"
                            fill={metricIndex === 0 ? '#10b981' : '#06b6d4'}
                            width="14"
                            height="14"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <span>
                            <span
                              className={`font-semibold ${metricIndex === 0 ? 'text-emerald-600' : 'text-cyan-600'}`}
                            >
                              {metric.value}
                            </span>{' '}
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
