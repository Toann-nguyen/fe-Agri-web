'use client';

import {
  Briefcase,
  FileSpreadsheet,
  Headset,
  Mails,
  ScanFace,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { gsap, motionAllowed, useGSAP } from '../motion/gsap';

import { SectionHeading } from './reveal';

const icons = {
  crm: Briefcase,
  mail: Mails,
  inbox: Headset,
  report: FileSpreadsheet,
  ai: ScanFace,
} as const;

type Project = {
  icon: keyof typeof icons;
  image: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  stat: string;
  statLabel: string;
};

// Static visuals keyed by position; copy lives in messages.
const visuals = [
  { icon: 'crm', image: '/portfolio/projects/crm.jpg' },
  { icon: 'mail', image: '/portfolio/projects/email.jpg' },
  { icon: 'inbox', image: '/portfolio/projects/inbox.jpg' },
  { icon: 'report', image: '/portfolio/projects/report.jpg' },
  { icon: 'ai', image: '/portfolio/projects/ai.jpg' },
] as const;

export const PortfolioProjects = () => {
  const t = useTranslations('common');
  const itemMap = t.raw('portfolio.projects.items') as Record<
    string,
    Omit<Project, 'icon' | 'image' | 'tags'> & {
      tags: Record<string, string>;
    }
  >;
  const items: Omit<Project, 'icon' | 'image'>[] = Object.values(itemMap).map(
    (item) => ({ ...item, tags: Object.values(item.tags) }),
  );
  const projects: Project[] = items.map((item, i) => ({
    ...item,
    ...visuals[i % visuals.length],
  }));

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root || !motionAllowed()) return;

      const items_ = gsap.utils.toArray<HTMLElement>('[data-stack-item]', root);

      items_.forEach((item, i) => {
        // Cover drifts against the scroll direction.
        const cover = item.querySelector('[data-parallax-cover]');
        if (cover) {
          gsap.fromTo(
            cover,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }

        // When the next plate rises, the previous one recedes.
        const next = items_[i + 1];
        if (!next) return;
        const card = item.querySelector('article');
        if (card) {
          gsap.to(card, {
            scale: 0.95,
            autoAlpha: 0.45,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: `top ${104 + (i + 1) * 16}px`,
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          eyebrow={t('portfolio.projects.eyebrow')}
          title={
            <>
              {t('portfolio.projects.titleA')}{' '}
              <em className="italic text-[color:var(--pf-accent)]">
                {t('portfolio.projects.titleB')}
              </em>
            </>
          }
          description={t('portfolio.projects.description')}
        />

        <div className="relative">
          {projects.map((p, i) => (
            <div
              key={p.title}
              data-stack-item
              className="relative"
              style={{
                minHeight: i < projects.length - 1 ? '76vh' : undefined,
              }}
            >
              <div
                className="sticky"
                style={{ top: `${88 + i * 16}px`, zIndex: i + 1 }}
              >
                <ProjectCard project={p} index={i} total={projects.length} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => {
  const Icon = icons[project.icon];
  const flip = index % 2 === 1;

  return (
    <article className="pf-card grid overflow-hidden lg:grid-cols-2">
      {/* Cover plate */}
      <div
        className={`relative min-h-[240px] overflow-hidden border-b border-[color:var(--pf-rule)] bg-[color:var(--pf-paper-2)] lg:min-h-[440px] lg:border-b-0 ${
          flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'
        }`}
      >
        <div data-parallax-cover className="absolute inset-x-0 inset-y-[-8%]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale-[12%]"
          />
        </div>
        <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference">
          0{index + 1} / 0{total}
        </span>
      </div>

      {/* Copy */}
      <div className="flex flex-col justify-between p-7 md:p-10">
        <div>
          <p className="pf-eyebrow flex items-center gap-2.5">
            <Icon size={14} className="text-[color:var(--pf-accent)]" />
            {project.period}
          </p>
          <h3 className="pf-serif mt-4 text-3xl leading-[1.1] md:text-[2.1rem]">
            {project.title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="pf-chip">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[color:var(--pf-ink-soft)] md:text-[15px]">
            {project.description}
          </p>
        </div>

        <div className="mt-8 flex items-end justify-between gap-6 border-t border-[color:var(--pf-rule)] pt-5">
          <span className="pf-serif text-4xl leading-none md:text-5xl">
            {project.stat}
          </span>
          <span className="max-w-52 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[color:var(--pf-ink-soft)]">
            {project.statLabel}
          </span>
        </div>
      </div>
    </article>
  );
};
