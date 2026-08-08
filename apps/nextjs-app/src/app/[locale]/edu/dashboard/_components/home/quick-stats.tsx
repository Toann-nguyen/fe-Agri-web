'use client';

import { Icon } from '@iconify/react';

const stats = [
  {
    label: 'Điểm TB Hiện Tại',
    icon: 'mdi:star-circle',
    iconColor: 'text-amber-400',
    value: '8.8',
    badge: 'Giỏi',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    footnote: '📈 Tăng +0.3 so với HK1',
  },
  {
    label: 'Chuyên Cần',
    icon: 'mdi:calendar-check',
    iconColor: 'text-teal-400',
    value: '98%',
    sub: '49/50 buổi',
    footnote: '0 vắng không phép',
  },
  {
    label: 'Hạnh Kiểm',
    icon: 'mdi:shield-account',
    iconColor: 'text-purple-400',
    value: 'Tốt',
    valueColor: 'text-emerald-400',
    footnote: 'Tích cực phát biểu',
  },
  {
    label: 'Thành Tích',
    icon: 'mdi:trophy',
    iconColor: 'text-amber-400',
    value: 'Top 3 Lớp',
    valueColor: 'text-amber-300',
    footnote: '8 Huy hiệu đã đạt',
  },
];

export function QuickStats() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-white">
          <Icon
            icon="mdi:chart-box-outline"
            width="20"
            className="text-cyan-400"
          />
          <span>Thống Kê Nhanh</span>
        </h2>
        <span className="font-mono text-xs text-slate-400">
          HK II • 2025-2026
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition-colors hover:border-cyan-500/30"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{stat.label}</span>
              <Icon icon={stat.icon} width="18" className={stat.iconColor} />
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-extrabold ${stat.valueColor ?? 'text-white'}`}
              >
                {stat.value}
              </span>
              {stat.badge ? (
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${stat.badgeColor}`}
                >
                  {stat.badge}
                </span>
              ) : (
                stat.sub && (
                  <span className="text-[10px] text-slate-400">{stat.sub}</span>
                )
              )}
            </div>
            <p className="font-mono text-[11px] text-slate-400">
              {stat.footnote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
