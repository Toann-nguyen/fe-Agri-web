'use client';

import { Icon } from '@iconify/react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const Experience = () => {
  const sectionRef = useScrollReveal();

  const experiences = [
    {
      period: '2024 — Present',
      title: 'Full-Stack Web Developer',
      company: 'INFINILAB — Cầu Giấy, Hà Nội',
      description: [
        'Database Optimization: Diagnosed and resolved deep-rooted N+1 query pathologies across the product catalog and order management modules by refactoring with Eloquent Eager Loading and designing strategic Composite Indexes on high-frequency query columns (user_id, status, created_at), achieving ~40% reduction in API response times and ~55% improvement in complex join query latency under production load.',
        'Data Integrity & Transaction Safety: Architected a robust ACID-compliant transaction layer for critical business workflows including payment processing, booking confirmations, and inventory adjustments — guaranteeing automatic rollback on failure to eliminate data inconsistency, reducing transaction-related incidents by ~90%.',
        'Application Security Hardening: Strengthened the entire application infrastructure by deploying strict Content-Security-Policy (CSP) headers and X-Frame-Options on Nginx to prevent Clickjacking and XSS vectors. Enforced parameterized queries via ORM prepared statements across all data access layers, achieving full SQLi neutralization.',
        'Multi-layered Authentication & Rate Limiting: Engineered a stateless JWT-based API authentication layer with dual access/refresh token rotation, paired with an in-memory Redis blacklist for instant session revocation. Implemented Redis-backed sliding window rate limiting that effectively blocks ~85% of DDoS and scraping attempts on public endpoints.',
        'Client-side State Architecture: Re-architected the frontend data layer using TanStack Query with aggressive caching strategies, optimistic updates, and background refetching — reducing perceived loading times by ~60% and delivering a fluid single-page experience.',
        'Complex Form Workflows: Designed multi-step form logic and cross-field conditional validation using React Hook Form integrated with Zod schemas, handling nested dynamic fields and real-time error feedback with zero unnecessary re-renders.',
        'Background Job Processing: Configured Laravel Horizon with Redis queues for async task execution (email notifications, report generation, image processing), cutting request-response cycle time by ~45% by offloading heavy operations to workers.',
      ],
      tags: ['Laravel', 'React', 'Next.js', 'MySQL', 'Redis', 'TanStack Query', 'React Hook Form', 'Zod', 'Nginx', 'Docker', 'Laravel Horizon'],
      isCurrent: true,
      colorClass: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/15',
    },
    {
      period: '09/2024 — 12/2024',
      title: 'Intern .NET Web Developer',
      company: 'DEHA VietNam',
      description: [
        'Built a full-featured movie ticket booking and streaming platform from the ground up using ASP.NET Core, Entity Framework Core, MySQL, and Docker containerization.',
        'Implemented real-time seat selection leveraging SignalR WebSocket connections, allowing multiple users to see seat availability updates instantly without page refresh.',
        'Integrated a secure end-to-end booking flow with ZaloPay QR Code payment gateway, handling callback verification, transaction idempotency, and order state management.',
        'Designed normalized database schema for movies, showtimes, seats, bookings, and payments with proper indexing strategies for read-heavy queries.',
        'Developed admin dashboard for theater staff to manage movie schedules, pricing tiers, and view real-time booking analytics.',
      ],
      tags: ['ASP.NET Core', 'Entity Framework Core', 'MySQL', 'Docker', 'SignalR', 'ZaloPay'],
      isCurrent: false,
      colorClass: 'bg-purple-500/10 text-purple-700 border-purple-500/15',
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="dot-grid-dark absolute inset-0 opacity-20"></div>
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-cyan-400 backdrop-blur-sm">
            <Icon icon="mdi:timeline-clock" width="14" />
            Experience
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            The <span className="text-gradient-cyan">Journey</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/60">
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
                <div className="bg-slate-900/50 border border-white/10 backdrop-blur-sm group ml-14 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5 md:ml-14">
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
                  <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-cyan-400">
                    {exp.title}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-white/50">
                    {exp.company}
                  </p>
                   <div className="mb-4 space-y-2">
                    {exp.description.map((line, i) => (
                      <p key={i} className="text-sm leading-relaxed text-white/70">
                        {line}
                      </p>
                    ))}
                  </div>
                  {exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-white/5 border border-white/5 px-2 py-0.5 font-mono text-[9px] text-white/60"
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
