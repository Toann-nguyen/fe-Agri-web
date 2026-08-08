'use client';

import { Icon } from '@iconify/react';

import { achievements } from '../../data';

export function AchievementsTab() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-white">
          <Icon icon="mdi:trophy" width="28" className="text-amber-400" />
          <span>Thành Tích & Khen Thưởng</span>
        </h1>
        <p className="text-xs text-slate-400">
          Ghi nhận nỗ lực xuất sắc của học sinh Nguyễn Văn An
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-colors hover:border-amber-500/40"
          >
            <div className="flex size-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-amber-300">
              <Icon icon={item.icon} width="28" />
            </div>
            <h3 className="text-sm font-bold text-white">{item.title}</h3>
            <p className="text-xs leading-relaxed text-slate-300">
              {item.desc}
            </p>
            <div className="border-t border-white/5 pt-2 font-mono text-[10px] text-amber-400/80">
              📅 {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
