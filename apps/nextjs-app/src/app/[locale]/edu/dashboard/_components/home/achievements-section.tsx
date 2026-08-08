'use client';

import { Icon } from '@iconify/react';

import { badges } from '../../data';

interface AchievementsSectionProps {
  onViewAll: () => void;
}

export function AchievementsSection({ onViewAll }: AchievementsSectionProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:trophy" width="20" className="text-amber-400" />
          <h3 className="text-sm font-bold text-white">Thành Tích Nổi Bật</h3>
        </div>
        <button
          onClick={onViewAll}
          className="font-mono text-[11px] text-amber-400 hover:text-amber-300 hover:underline"
        >
          Tất cả huy hiệu →
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
          <div className="shrink-0 rounded-xl bg-amber-500/20 p-2.5 text-amber-300">
            <Icon icon="mdi:certificate" width="24" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-200">
              Danh hiệu Học sinh Giỏi HK I
            </div>
            <p className="text-[11px] text-amber-300/80">
              Cấp bởi Ban Giám Hiệu Trường THCS ABC
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-slate-950/50 p-3">
          <div className="shrink-0 rounded-xl bg-cyan-500/20 p-2.5 text-cyan-300">
            <Icon icon="mdi:medal" width="24" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              Giải Nhì HSG Toán Cấp Trường 2026
            </div>
            <p className="text-[11px] text-slate-400">
              Đạt điểm 18.5/20 kỳ thi tháng 04/2026
            </p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="pt-2">
          <div className="mb-2 font-mono text-xs font-semibold text-slate-400">
            Huy Hiệu Động Lực
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="rounded-xl border border-white/5 bg-slate-950/60 p-2 text-center"
              >
                <Icon
                  icon={badge.icon}
                  width="22"
                  className={`mx-auto mb-1 ${badge.color}`}
                />
                <div className="truncate text-[9px] font-medium text-slate-300">
                  {badge.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
