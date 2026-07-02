'use client';

import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

/**
 * Parse chuỗi có cú pháp **bold** thành array ReactNode,
 * highlight các keyword kỹ thuật quan trọng bằng <strong>.
 */
function highlightText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white/95">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export const Experience = () => {
  const sectionRef = useScrollReveal();

  const experiences = [
    {
      period: '2024 — Present',
      title: 'Full-Stack Web Developer',
      company: 'INFINILAB — Cầu Giấy, Hà Nội',
      description: [
        'Owned **feature development end-to-end** across backend and frontend for enterprise CRM and B2B platforms—from **database design** and **API implementation** to **React UI integration**—delivering production-ready features independently.',
        'Optimized backend performance and query execution; eliminated **N+1 query bottlenecks** using **Eloquent Eager Loading** and applied **Composite Indexes**, reducing API response times by **40%** in production.',
        'Enhanced application security; configured strict **Content-Security-Policy (CSP)** and **X-Frame-Options** on Nginx to mitigate Clickjacking, and neutralized **SQLi/XSS** risks globally via **ORM prepared statements** and strict server-side validation.',
        'Implemented secure stateless API authentication using **JWT** with instant session revocation via a **Redis-backed token blacklist**; applied **Redis-based Rate Limiting** to protect public endpoints against scraping and brute-force traffic.',
        'Improved client-side data reliability by implementing **TanStack Query** (caching, background refetching, optimistic updates), reducing redundant API calls and keeping UI state consistent.',
        'Delivered complex **multi-step form workflows** and conditional validation using **React Hook Form** & **Zod**, improving data integrity and system stability.',
        'Implemented async task processing using **Laravel Horizon** and **Redis queues** for background operations (email notifications, report generation, image processing), reducing request-response cycle time by **~45%**.',
      ],
      tags: [
        'Laravel',
        'React',
        'Next.js',
        'MySQL',
        'Redis',
        'TanStack Query',
        'React Hook Form',
        'Zod',
        'Nginx',
        'Docker',
        'Laravel Horizon',
      ],
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
                        className="text-sm leading-relaxed text-white/70"
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
