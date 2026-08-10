'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const Education = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="dot-grid-dark absolute inset-0 opacity-20"></div>
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-cyan-400 backdrop-blur-sm">
            <Icon icon="mdi:school" width="14" />
            Education
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Academic <span className="text-gradient-cyan">Background</span>
          </h2>
        </div>

        <div className="reveal-left relative">
          <svg
            className="absolute inset-y-0 left-[24px] z-[1] w-[2px] md:left-[24px]"
            preserveAspectRatio="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="url(#timeline-grad-edu)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="animate-dash-move"
            />
            <defs>
              <linearGradient
                id="timeline-grad-edu"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="20%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-8">
            <div className="relative">
              <div
                className="timeline-node active-node"
                style={{ top: '8px' }}
              ></div>
              <div className="group ml-14 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5 md:ml-14">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    03/2021 — 04/2025
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-cyan-400">
                  College — Information Technology
                </h3>
                <p className="mb-3 text-sm font-medium text-white/50">
                  Phuong Dong University
                </p>
                <p className="text-sm leading-relaxed text-white/70">
                  Pursuing a college degree in Information Technology with a
                  focus on software development, database management, and system
                  design. Building a strong foundation in programming
                  fundamentals and modern web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
