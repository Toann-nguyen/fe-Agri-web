'use client';

import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

// Danh sách skill với icon Iconify
const SKILL_GROUPS = [
  {
    category: 'Backend',
    color: 'from-orange-500 to-red-500',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-400/20',
    bgColor: 'bg-orange-500/8',
    glowClass: 'skill-glow-orange',
    skills: [
      { name: 'Laravel', icon: 'mdi:laravel', color: '#FF2D20' },
      { name: 'PHP', icon: 'mdi:language-php', color: '#777BB4' },
      { name: 'NestJS', icon: 'simple-icons:nestjs', color: '#E0234E' },
      { name: 'Node.js', icon: 'mdi:nodejs', color: '#339933' },
      { name: 'REST API', icon: 'mdi:api', color: '#FF6B35' },
    ],
  },
  {
    category: 'Frontend',
    color: 'from-cyan-500 to-blue-500',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-400/20',
    bgColor: 'bg-cyan-500/8',
    glowClass: 'skill-glow-cyan',
    skills: [
      { name: 'React', icon: 'mdi:react', color: '#61DAFB' },
      { name: 'Next.js', icon: 'ri:nextjs-fill', color: '#000000' },
      { name: 'TypeScript', icon: 'mdi:language-typescript', color: '#3178C6' },
      { name: 'Tailwind', icon: 'mdi:tailwind', color: '#06B6D4' },
      { name: 'TanStack', icon: 'simple-icons:reactquery', color: '#FF4154' },
    ],
  },
  {
    category: 'Database',
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-400/20',
    bgColor: 'bg-emerald-500/8',
    glowClass: 'skill-glow-green',
    skills: [
      { name: 'MySQL', icon: 'simple-icons:mysql', color: '#4479A1' },
      { name: 'Redis', icon: 'simple-icons:redis', color: '#DC382D' },
      { name: 'MongoDB', icon: 'simple-icons:mongodb', color: '#47A248' },
      { name: 'Prisma', icon: 'simple-icons:prisma', color: '#2D3748' },
      { name: 'Query Opt', icon: 'mdi:database-search', color: '#10B981' },
    ],
  },
  {
    category: 'DevOps',
    color: 'from-purple-500 to-indigo-500',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-400/20',
    bgColor: 'bg-purple-500/8',
    glowClass: 'skill-glow-purple',
    skills: [
      { name: 'Docker', icon: 'mdi:docker', color: '#2496ED' },
      { name: 'AWS S3', icon: 'mdi:aws', color: '#FF9900' },
      { name: 'Nginx', icon: 'simple-icons:nginx', color: '#009639' },
      { name: 'Git', icon: 'mdi:git', color: '#F05032' },
      { name: 'Linux', icon: 'mdi:linux', color: '#FCC624' },
    ],
  },
];

export const TechStack = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative py-20 md:py-28"
    >
      {/* Dot grid overlay */}
      <div className="dot-grid-dark absolute inset-0 opacity-20 pointer-events-none" />


      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Tiêu đề */}
        <div className="reveal mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-cyan-400 backdrop-blur-sm">
            <Icon icon="mdi:view-grid" width="14" />
            Tech Stack
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Tools of{' '}
            <span className="text-gradient-cyan">the Trade</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/50">
            Công nghệ tôi sử dụng hàng ngày để xây dựng sản phẩm chất lượng cao.
          </p>
        </div>

        {/* 4 cột skill groups */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className={`skill-card-dark reveal-scale group relative overflow-hidden rounded-2xl border ${group.borderColor} bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 hover:shadow-xl`}
            >
              {/* Header category */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${group.color} shadow-md`}
                >
                  <Icon icon="mdi:layers-triple" className="text-white" width="16" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{group.category}</h3>
                  <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${group.color} mt-0.5`} />
                </div>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-1.5 rounded-lg border ${group.borderColor} ${group.bgColor} px-2.5 py-1.5 transition-all duration-200 hover:scale-105`}
                  >
                    <Icon
                      icon={skill.icon}
                      width="14"
                      style={{ color: skill.color }}
                      className="shrink-0"
                    />
                    <span className={`font-mono text-[11px] font-medium ${group.textColor}`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decoration glow */}
              <div
                className={`pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br ${group.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15`}
              />
            </div>
          ))}
        </div>

        {/* Bottom featured tools strip */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-6 opacity-40">
          {[
            { icon: 'mdi:laravel', color: '#FF2D20' },
            { icon: 'mdi:react', color: '#61DAFB' },
            { icon: 'ri:nextjs-fill', color: '#ffffff' },
            { icon: 'mdi:language-typescript', color: '#3178C6' },
            { icon: 'simple-icons:mysql', color: '#4479A1' },
            { icon: 'simple-icons:redis', color: '#DC382D' },
            { icon: 'mdi:docker', color: '#2496ED' },
            { icon: 'mdi:aws', color: '#FF9900' },
            { icon: 'mdi:git', color: '#F05032' },
          ].map((item) => (
            <Icon
              key={item.icon}
              icon={item.icon}
              width="28"
              style={{ color: item.color }}
              className="transition-all duration-300 hover:opacity-100 hover:scale-125"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
