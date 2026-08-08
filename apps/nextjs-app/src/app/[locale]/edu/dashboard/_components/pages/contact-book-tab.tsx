'use client';

import { Icon } from '@iconify/react';

import { NotificationItem } from '../../types';

interface ContactBookTabProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

const roleDisplay: Record<NotificationItem['role'], string> = {
  GVCN: 'GVCN',
  NhaTruong: 'NhaTruong',
  GVBM: 'GVBM',
};

export function ContactBookTab({
  notifications,
  onMarkAllRead,
}: ContactBookTabProps) {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-white">
            <Icon
              icon="mdi:book-account-outline"
              width="28"
              className="text-indigo-400"
            />
            <span>Sổ Liên Lạc Điện Tử</span>
          </h1>
          <p className="text-xs text-slate-400">
            Kết nối giữa Nhà trường, Giáo viên & Gia đình học sinh
          </p>
        </div>
        <button
          onClick={onMarkAllRead}
          className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-300"
        >
          Đánh dấu đã đọc tất cả
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded border border-indigo-500/30 bg-indigo-500/20 px-2.5 py-1 font-mono text-xs font-bold text-indigo-300">
                  {item.sender} ({roleDisplay[item.role]})
                </span>
                <span className="text-xs font-bold text-white">
                  {item.title}
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">
                {item.time}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-300">
              {item.content}
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs">
              <span className="text-[11px] text-slate-400">
                Trạng thái: {item.read ? 'Đã xem' : 'Chưa xem'}
              </span>
              <button
                onClick={() =>
                  alert(`Đã gửi xác nhận phản hồi cho ${item.sender}`)
                }
                className="rounded-xl bg-slate-800 px-3 py-1.5 font-mono text-xs text-cyan-400 hover:bg-slate-700"
              >
                Gửi phản hồi cho GV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
