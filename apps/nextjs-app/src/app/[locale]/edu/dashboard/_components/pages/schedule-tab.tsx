'use client';

import { Icon } from '@iconify/react';

import { scheduleDays } from '../../data';

const periodSubjects = ['Toán', 'Văn', 'Anh', 'Sử'];

export function ScheduleTab() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-white">
          <Icon
            icon="mdi:calendar-clock"
            width="28"
            className="text-teal-400"
          />
          <span>Thời Khóa Biểu & Lịch Thi</span>
        </h1>
        <p className="text-xs text-slate-400">
          Lịch học tuần này Lớp 7A2 - Trường THCS ABC
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-3 md:grid-cols-6">
          {scheduleDays.map((day) => (
            <div
              key={day}
              className="space-y-2 rounded-xl border border-white/10 bg-slate-950/60 p-3"
            >
              <div className="border-b border-white/10 pb-1.5 font-mono font-bold text-cyan-400">
                {day}
              </div>
              <div className="space-y-1.5 text-[11px]">
                {periodSubjects.map((subject, idx) => (
                  <div
                    key={idx}
                    className="rounded bg-slate-900 p-1.5 text-slate-200"
                  >
                    {idx + 1}. {subject}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
