'use client';

import { Icon } from '@iconify/react';

export function SettingsTab() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-white">
          <Icon icon="mdi:cog-outline" width="28" className="text-slate-400" />
          <span>Cài Đặt Ứng Dụng</span>
        </h1>
        <p className="text-xs text-slate-400">
          Cấu hình thông báo, gia sư AI & trải nghiệm người dùng
        </p>
      </div>

      <div className="max-w-xl space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">
              Thông báo bài tập & điểm mới
            </div>
            <div className="text-[11px] text-slate-400">
              Nhận thông báo đẩy khi có điểm mới
            </div>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="size-5 rounded border-white/20 bg-slate-900 text-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <div className="text-xs font-bold text-white">
              Gia sư AI Edu-VN tự động gợi ý
            </div>
            <div className="text-[11px] text-slate-400">
              Phân tích điểm mạnh/yếu hàng tuần
            </div>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="size-5 rounded border-white/20 bg-slate-900 text-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}
