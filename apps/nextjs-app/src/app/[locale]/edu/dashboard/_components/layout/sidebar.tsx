'use client';

import { Icon } from '@iconify/react';

import { cn } from '@/utils/cn';

import { ActiveTab } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  unreadCount: number;
  onOpenAiAssistant: () => void;
}

const navigationItems: {
  id: ActiveTab;
  label: string;
  icon: string;
  color: string;
}[] = [
  {
    id: 'home',
    label: 'Trang chủ',
    icon: 'mdi:home-variant-outline',
    color: 'text-cyan-400',
  },
  {
    id: 'grades',
    label: 'Điểm số',
    icon: 'mdi:chart-bar',
    color: 'text-emerald-400',
  },
  {
    id: 'achievements',
    label: 'Thành tích',
    icon: 'mdi:trophy-outline',
    color: 'text-amber-400',
  },
  {
    id: 'contact_book',
    label: 'Sổ liên lạc',
    icon: 'mdi:book-account-outline',
    color: 'text-indigo-400',
  },
  {
    id: 'schedule',
    label: 'Lịch học',
    icon: 'mdi:calendar-clock',
    color: 'text-teal-400',
  },
  {
    id: 'profile',
    label: 'Hồ sơ',
    icon: 'mdi:account-box-outline',
    color: 'text-purple-400',
  },
  {
    id: 'settings',
    label: 'Cài đặt',
    icon: 'mdi:cog-outline',
    color: 'text-slate-400',
  },
];

export function Sidebar({
  activeTab,
  onTabChange,
  unreadCount,
  onOpenAiAssistant,
}: SidebarProps) {
  return (
    <aside className="flex w-16 shrink-0 flex-col justify-between border-r border-white/10 bg-slate-900/40 p-3 backdrop-blur-md md:w-60">
      <div className="space-y-1.5">
        <div className="hidden px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:block">
          Danh Mục Quản Lý
        </div>

        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          const showBadge = item.id === 'contact_book' && unreadCount > 0;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all',
                isActive
                  ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 font-semibold text-white shadow-md shadow-cyan-500/5'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
              )}
            >
              <Icon
                icon={item.icon}
                width="20"
                className={cn(
                  'shrink-0',
                  isActive
                    ? item.color
                    : 'text-slate-400 group-hover:text-slate-200',
                )}
              />
              <span className="hidden truncate md:inline">{item.label}</span>
              {showBadge ? (
                <span className="ml-auto hidden size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white md:flex">
                  {unreadCount}
                </span>
              ) : null}
              {isActive && (
                <div className="absolute left-0 top-1/2 hidden h-5 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400 md:block"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Sidebar Box */}
      <div className="hidden rounded-xl border border-cyan-500/20 bg-slate-950/60 p-3 text-xs md:block">
        <div className="mb-1 flex items-center gap-2 font-semibold text-cyan-400">
          <Icon icon="mdi:lightbulb-on-outline" width="16" />
          <span>Góc Học Tập AI</span>
        </div>
        <p className="mb-2 text-[11px] leading-relaxed text-slate-400">
          Học kỳ II còn 6 tuần. Giữ vững tiến độ để đạt danh hiệu Học sinh Xuất
          sắc!
        </p>
        <button
          onClick={onOpenAiAssistant}
          className="block w-full rounded-lg border border-cyan-500/40 bg-cyan-500/20 py-1.5 text-center font-mono text-[11px] text-cyan-300 transition-colors hover:bg-cyan-500/30"
        >
          Hỏi bài cùng AI
        </button>
      </div>
    </aside>
  );
}
