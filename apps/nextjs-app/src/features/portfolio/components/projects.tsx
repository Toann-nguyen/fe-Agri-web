'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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

import { Reveal, SectionHeading } from './reveal';

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
  gradient: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  stat: string;
  statLabel: string;
};

// Static visuals keyed by position; copy lives in messages.
const visuals = [
  {
    icon: 'crm',
    image: '/portfolio/projects/crm.jpg',
    gradient: 'from-[#7c3aed] via-[#4f46e5] to-[#2563eb]',
  },
  {
    icon: 'mail',
    image: '/portfolio/projects/email.jpg',
    gradient: 'from-[#f59e0b] via-[#ea580c] to-[#e11d48]',
  },
  {
    icon: 'inbox',
    image: '/portfolio/projects/inbox.jpg',
    gradient: 'from-[#06b6d4] via-[#0284c7] to-[#1d4ed8]',
  },
  {
    icon: 'report',
    image: '/portfolio/projects/report.jpg',
    gradient: 'from-[#10b981] via-[#0d9488] to-[#0891b2]',
  },
  {
    icon: 'ai',
    image: '/portfolio/projects/ai.jpg',
    gradient: 'from-[#d946ef] via-[#9333ea] to-[#7c3aed]',
  },
] as const;

export const PortfolioProjects = () => {
  const t = useTranslations('common');
  const itemMap = t.raw('portfolio.projects.items') as Record<
    string,
    Omit<Project, 'icon' | 'image' | 'gradient' | 'tags'> & {
      tags: Record<string, string>;
    }
  >;
  const items: Omit<Project, 'icon' | 'image' | 'gradient'>[] = Object.values(
    itemMap,
  ).map((item) => ({ ...item, tags: Object.values(item.tags) }));
  const projects: Project[] = items.map((item, i) => ({
    ...item,
    ...visuals[i % visuals.length],
  }));

  return (
    <section id="projects" className="relative scroll-mt-20 py-24 md:py-32">
      <div
        className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#6366f1]/10 blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t('portfolio.projects.eyebrow')}
          title={
            <>
              {t('portfolio.projects.titleA')}{' '}
              <span className="text-gradient">
                {t('portfolio.projects.titleB')}
              </span>
            </>
          }
          description={t('portfolio.projects.description')}
        />

        <div className="space-y-6 md:space-y-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              total={projects.length}
            />
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
  const ref = useRef<HTMLDivElement>(null);
  // Parallax: the cover drifts against the scroll direction.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const Icon = icons[project.icon];
  const flip = index % 2 === 1;

  return (
    <Reveal>
      <motion.article
        ref={ref}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="glass card-shine grid overflow-hidden rounded-[1.75rem] lg:grid-cols-2"
      >
        {/* Parallax cover */}
        <div
          className={`relative min-h-[260px] overflow-hidden lg:min-h-[320px] ${
            flip ? 'lg:order-2' : ''
          }`}
        >
          <motion.div
            style={{ y: coverY }}
            className="absolute -inset-y-14 inset-x-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-55 mix-blend-multiply`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060c]/85 via-[#06060c]/25 to-[#06060c]/15" />
          </motion.div>
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex size-24 items-center justify-center rounded-3xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md"
            >
              <Icon size={44} strokeWidth={1.6} />
            </motion.span>
          </div>
          <span className="absolute bottom-4 left-5 font-mono text-sm text-white/70">
            0{index + 1} / 0{total} · {project.period}
          </span>
          <span className="glass absolute right-4 top-4 rounded-full px-4 py-1.5 font-mono text-xs text-white">
            {project.stat} {project.statLabel}
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center p-7 md:p-10">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-medium text-[#ddd6fe] ring-1 ring-[#a78bfa]/25"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 leading-relaxed text-zinc-400">
            {project.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono text-xs text-zinc-500">
              {project.tags.slice(0, 3).join(' · ')}
            </span>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
};
