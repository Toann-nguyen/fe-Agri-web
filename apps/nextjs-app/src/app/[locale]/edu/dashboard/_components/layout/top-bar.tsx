'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme/theme-toggle';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  unreadCount: number;
  onOpenAiAssistant: () => void;
  onOpenNotifications: () => void;
}

export function TopBar({
  searchQuery,
  onSearchChange,
  unreadCount,
  onOpenAiAssistant,
  onOpenNotifications,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 backdrop-blur-xl sm:px-6">
      {/* Left: Brand Logo & Subdomain Badge */}
      <div className="flex items-center gap-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-2 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
            <Icon icon="mdi:school" width="24" className="text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-base font-extrabold tracking-tight text-white">
              Edu-<span className="text-gradient-hero">AI</span>-VN
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-cyan-400">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-400"></span>
              <span>edu.toanrobert.online</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Middle: Search Bar */}
      <div className="mx-6 hidden max-w-md flex-1 items-center md:flex">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Icon icon="mdi:magnify" width="18" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm môn học, điểm số, lịch thi, thông báo..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 transition-all focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={onOpenAiAssistant}
          className="group relative flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 via-teal-500/10 to-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-cyan-400"></span>
          </span>
          <Icon
            icon="mdi:robot"
            width="18"
            className="text-cyan-400 transition-transform group-hover:rotate-12"
          />
          <span className="hidden sm:inline">Trợ Lý AI</span>
        </button>

        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative flex size-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 transition-colors hover:border-white/20 hover:text-white"
          title="Thông báo mới từ nhà trường/giáo viên"
        >
          <Icon icon="mdi:bell-outline" width="20" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2.5 border-l border-white/10 pl-3">
          <div className="relative size-9 overflow-hidden rounded-full border-2 border-cyan-500/50 shadow-md">
            <img
              src="https://picsum.photos/seed/student_vietnam_an/200/200"
              alt="Nguyễn Văn An"
              className="size-full object-cover"
            />
          </div>
          <div className="hidden text-left lg:block">
            <div className="flex items-center gap-1 text-xs font-bold text-white">
              <span>Nguyễn Văn An</span>
              <Icon
                icon="mdi:check-decagram"
                width="14"
                className="text-cyan-400"
              />
            </div>
            <div className="font-mono text-[10px] text-slate-400">
              Lớp 7A2 • THCS ABC
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
