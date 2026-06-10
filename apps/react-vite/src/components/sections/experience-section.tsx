import { Reveal } from '../ui';

const experiences = [
  {
    period: '2024 — Present',
    isCurrent: true,
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
    color: 'cyan',
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
    color: 'purple',
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
                    <div className="mb-4 space-y-2">
                      {exp.description.map((line, i) => (
                        <p key={i} className="text-sm leading-relaxed text-ink-500">
                          {line}
                        </p>
                      ))}
                    </div>
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
