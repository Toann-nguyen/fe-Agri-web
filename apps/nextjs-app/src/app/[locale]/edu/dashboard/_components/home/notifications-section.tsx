'use client';

import { Icon } from '@iconify/react';

import { NotificationItem } from '../../types';

interface NotificationsSectionProps {
  notifications: NotificationItem[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onMarkAsRead: (id: string) => void;
  onViewAll: () => void;
}

const roleLabel: Record<NotificationItem['role'], string> = {
  GVCN: 'GV Chủ Nhiệm',
  NhaTruong: 'Nhà Trường',
  GVBM: 'GV Bộ Môn',
};

const roleBadgeClass: Record<NotificationItem['role'], string> = {
  GVCN: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  NhaTruong: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  GVBM: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};

export function NotificationsSection({
  notifications,
  unreadCount,
  onMarkAllRead,
  onMarkAsRead,
  onViewAll,
}: NotificationsSectionProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:email-outline"
            width="20"
            className="text-indigo-400"
          />
          <h3 className="text-sm font-bold text-white">
            Sổ Liên Lạc • Thông Báo Mới
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="font-mono text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Đánh dấu đã đọc
            </button>
          )}
          <button
            onClick={onViewAll}
            className="font-mono text-[11px] text-slate-400 hover:text-white"
          >
            Xem tất cả →
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border p-3.5 transition-all ${
              item.read
                ? 'border-white/5 bg-slate-950/40 text-slate-300'
                : 'border-cyan-500/30 bg-cyan-500/5 text-white shadow-md'
            }`}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold ${roleBadgeClass[item.role]}`}
                >
                  {roleLabel[item.role]}
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  {item.sender}
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                {item.time}
              </span>
            </div>

            <h4 className="mb-1 text-xs font-bold text-white">{item.title}</h4>
            <p className="mb-2 text-xs leading-relaxed text-slate-300">
              {item.content}
            </p>

            {!item.read && (
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => onMarkAsRead(item.id)}
                  className="rounded-lg bg-cyan-500/20 px-2.5 py-1 font-mono text-[10px] text-cyan-300 hover:bg-cyan-500/30"
                >
                  Xác nhận đã xem
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
