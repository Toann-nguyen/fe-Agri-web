'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const Projects = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32"
    >
      <div className="dot-grid-light absolute inset-0 opacity-40"></div>
      <div className="pointer-events-none absolute right-0 top-0 size-[400px] rounded-full bg-ember-400/5 blur-[120px]"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <Icon icon="mdi:rocket-launch" width="14" />
            Featured Projects
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            The <span className="text-gradient-mixed">Bridge</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Project 1 */}
          <div
            className="glow-border project-card reveal-left glass-light group overflow-hidden rounded-2xl"
            style={{ '--stagger': 0 } as any}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://picsum.photos/seed/agritech-field-green/800/500.jpg"
                alt="AgriTech"
                className="project-card-img size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-ember-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                <Icon icon="mdi:star-four-points" width="12" />
                Flagship
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-700 group-hover:opacity-100">
                <div
                  className="relative size-32 animate-ripple rounded-lg border-2 border-cyan-500/50"
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
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-amber-500"></span>
                </span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-amber-600">
                  In Development
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink-800 transition-colors duration-300 group-hover:text-cyan-700">
                AgriTech Vision AI
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-500">
                AI-powered crop disease detection. Real-time field scanning with
                TensorFlow.js, processed through Laravel API with Redis queue.
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {[
                  {
                    name: 'Next.js',
                    color: 'bg-cyan-500/8 text-cyan-700 border-cyan-500/10',
                  },
                  {
                    name: 'Laravel',
                    color: 'bg-ember-500/8 text-ember-700 border-ember-500/10',
                  },
                  {
                    name: 'TensorFlow',
                    color:
                      'bg-purple-500/8 text-purple-700 border-purple-500/10',
                  },
                  {
                    name: 'Redis',
                    color: 'bg-green-500/8 text-green-700 border-green-500/10',
                  },
                ].map((tag) => (
                  <span
                    key={tag.name}
                    className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] font-medium ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-cyan-600 transition-all duration-200 hover:text-cyan-700"
              >
                View Case Study{' '}
                <Icon
                  icon="mdi:arrow-right"
                  className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                  width="16"
                />
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div
            className="glow-border project-card reveal-right glass-light group overflow-hidden rounded-2xl"
            style={{ '--stagger': 1 } as any}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://picsum.photos/seed/streaming-dark-server/800/500.jpg"
                alt="Streaming"
                className="project-card-img size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-white"></span>
                </span>
                Live
              </div>
              <div className="glass-light absolute bottom-4 right-4 translate-y-2 rounded-lg px-3 py-2 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="mb-1.5 font-mono text-[9px] text-ink-400">
                  Server Load
                </div>
                <div className="flex h-5 items-end gap-0.5">
                  {[30, 50, 45, 70, 55, 40].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 animate-wave rounded-t bg-emerald-400"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-emerald-600">
                  Production
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink-800 transition-colors duration-300 group-hover:text-cyan-700">
                High-Concurrency Streaming
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-500">
                Real-time streaming platform handling 10K+ concurrent
                connections. Load-balanced WebSocket with NestJS and Redis
                pub/sub.
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {[
                  {
                    name: 'NestJS',
                    color: 'bg-cyan-500/8 text-cyan-700 border-cyan-500/10',
                  },
                  {
                    name: 'WebSocket',
                    color: 'bg-ember-500/8 text-ember-700 border-ember-500/10',
                  },
                  {
                    name: 'Redis Pub/Sub',
                    color: 'bg-green-500/8 text-green-700 border-green-500/10',
                  },
                  {
                    name: 'Docker',
                    color:
                      'bg-purple-500/8 text-purple-700 border-purple-500/10',
                  },
                ].map((tag) => (
                  <span
                    key={tag.name}
                    className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] font-medium ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 font-mono text-[11px] text-ink-400">
                <div className="flex items-center gap-1.5">
                  <Icon
                    icon="mdi:speedometer"
                    className="text-emerald-500"
                    width="14"
                  />
                  <span>
                    <span className="font-semibold text-emerald-600">12ms</span>{' '}
                    latency
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon
                    icon="mdi:account-group"
                    className="text-cyan-500"
                    width="14"
                  />
                  <span>
                    <span className="font-semibold text-cyan-600">10K+</span>{' '}
                    concurrent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
