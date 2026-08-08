'use client';

import { Icon } from '@iconify/react';

export function HeroSection() {
  return (
    <div className="glass-hero glow-border relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90 p-6 shadow-xl sm:p-8">
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
            <Icon icon="mdi:school-outline" width="14" />
            <span>Lớp 7A2 • Trường THCS ABC</span>
            <span className="text-slate-500">•</span>
            <span>MSHS: 20267A208</span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Chào mừng học sinh{' '}
            <span className="text-gradient-hero">Nguyễn Văn An</span>! 👋
          </h1>

          <p className="flex items-center gap-2 text-xs text-slate-300 sm:text-sm">
            <Icon icon="mdi:calendar" width="16" className="text-cyan-400" />
            <span>Hôm nay: Thứ Bảy, 08/08/2026</span>
            <span className="text-slate-500">•</span>
            <span>GVCN: Cô Nguyễn Thị Mai</span>
          </p>
        </div>

        {/* Academic Progress Indicator */}
        <div className="w-full space-y-2 rounded-xl border border-white/10 bg-slate-950/60 p-4 lg:w-72">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400">Tiến độ Học kỳ II</span>
            <span className="font-mono font-bold text-cyan-400">
              Tuần 12 / 18
            </span>
          </div>
          <div className="w-full overflow-hidden rounded-full border border-white/5 bg-slate-800 p-0.5">
            <div className="h-full w-[66%] rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-1000"></div>
          </div>
          <div className="text-right font-mono text-[11px] text-slate-400">
            66% Hoàn thành
          </div>
        </div>
      </div>
    </div>
  );
}
