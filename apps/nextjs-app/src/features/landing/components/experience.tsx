'use client';

import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const ym = {
  performance: {
    cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.12)]',
  },
  security: {
    cls: 'bg-amber-500/15 text-amber-300 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.12)]',
  },
  frontend: {
    cls: 'bg-blue-500/15 text-blue-300 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.12)]',
  },
  infra: {
    cls: 'bg-orange-500/15 text-orange-300 border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.12)]',
  },
  arch: {
    cls: 'bg-violet-500/15 text-violet-300 border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.12)]',
  },
  default: { cls: 'bg-white/[0.08] text-white/90 border-white/10' },
};

const gm = {
  performance: [
    'n+1',
    'indexes',
    'index',
    'eloquent',
    'window functions',
    'mysql',
    '85%',
    '70%',
    'latency',
    'zero-downtime',
    '8s',
    '1.2s',
  ],
  security: [
    'jwt',
    'cors',
    'csp',
    'x-frame',
    'rate limiting',
    'xss',
    'sqli',
    'authentication',
  ],
  frontend: [
    'react',
    'next.js',
    'tailwind',
    'ant design',
    'chart.js',
    'devextreme',
    'tanstack query',
    'hook form',
    'zod',
    'responsive',
    'ui implementation',
  ],
  infra: [
    'docker',
    'nginx',
    'ci/cd',
    'vps',
    'ec2',
    'rabbitmq',
    'horizon',
    'message queues',
    'axios',
    'gitlab',
    'compose',
    'ubuntu',
  ],
  arch: [
    'end-to-end',
    'b2b',
    'crm',
    'repository pattern',
    'schema design',
    'agile',
    'code reviews',
    'jira',
  ],
  default: [],
};

function wm(text: string): string {
  const lower = text.toLowerCase();
  const categories: (keyof typeof gm)[] = [
    'security',
    'performance',
    'frontend',
    'infra',
    'arch',
  ];
  for (const cat of categories) {
    if (gm[cat].some((kw) => lower.includes(kw))) return cat;
  }
  return 'default';
}

function highlightText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const keyword = part.slice(2, -2);
      const category = wm(keyword);
      const cls = ym[category as keyof typeof ym].cls;
      return (
        <span
          key={i}
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[12.5px] font-semibold tracking-wide leading-none translate-y-[-0.5px] ${cls}`}
        >
          {keyword}
        </span>
      );
    }
    return (
      <span key={i} className="text-white/70">
        {part}
      </span>
    );
  });
}

export const Experience = () => {
  const sectionRef = useScrollReveal();

  const experiences = [
    {
      period: '02/2024 — Present',
      title: 'Full-Stack Web Developer',
      company: 'Infinilab Asian — Cầu Giấy, Hà Nội',
      description: [
        'Built and maintained **end-to-end features** for **B2B and CRM platforms** using **Laravel (Repository Pattern)** and **Next.js/React**, owning tasks from **MySQL schema design** to **responsive UI implementation**.',
        'Optimized **MySQL performance** by fixing **N+1 queries** with **Eloquent Eager Loading**, adding **Composite Indexes** and **Window Functions**, reducing slow report API latency from **8s to ~1.2s (85% improvement)**.',
        'Secured backend services by implementing **JWT Authentication**, **CORS, CSP, X-Frame-Options**, **Rate Limiting**, and **XSS/SQLi mitigation** to prevent brute-force and injection attacks.',
        'Refactored legacy admin dashboards from **DevExtreme to Ant Design & Chart.js**, building modern responsive interfaces with **Tailwind CSS, TanStack Query, React Hook Form and Zod**.',
        'Ensured system reliability by managing background jobs and batch email processing with **Message Queues (RabbitMQ / Laravel Horizon)** and handling data fetching via **Axios**.',
        'Built **GitLab CI/CD pipelines with Docker & Docker Compose** to automate testing, image building and auto-deployment to **Ubuntu VPS/EC2 via Nginx**, reducing manual deployment time by **70%** and enabling **zero-downtime releases**.',
        'Collaborated in **Agile team of 4 devs** via **Jira and GitLab**, performed **code reviews** and documented technical solutions for production incidents.',
      ],
      tags: [
        'Laravel',
        'React',
        'Next.js',
        'MySQL',
        'RabbitMQ',
        'TanStack Query',
        'React Hook Form',
        'Zod',
        'Ant Design',
        'Chart.js',
        'Docker',
        'Docker Compose',
        'GitLab CI/CD',
        'Nginx',
        'JWT',
        'CORS',
        'CSP',
        'Rate Limiting',
      ],
      isCurrent: true,
      colorClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    },
    {
      period: '09/2023 — 12/2023',
      title: 'Intern .NET Web Developer',
      company: 'DEHA VietNam',
      description: [
        'Built a full-featured movie ticket booking and streaming platform from the ground up using ASP.NET Core, Entity Framework Core, MySQL, and Docker containerization.',
        'Implemented real-time seat selection leveraging SignalR WebSocket connections, allowing multiple users to see seat availability updates instantly without page refresh.',
        'Integrated a secure end-to-end booking flow with ZaloPay QR Code payment gateway, handling callback verification, transaction idempotency, and order state management.',
        'Designed normalized database schema for movies, showtimes, seats, bookings, and payments with proper indexing strategies for read-heavy queries.',
        'Developed admin dashboard for theater staff to manage movie schedules, pricing tiers, and view real-time booking analytics.',
      ],
      tags: [
        'ASP.NET Core',
        'Entity Framework Core',
        'MySQL',
        'Docker',
        'SignalR',
        'ZaloPay',
      ],
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
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-white/80"
                      >
                        {highlightText(line)}
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
