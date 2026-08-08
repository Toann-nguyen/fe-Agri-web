'use client';

import { Icon } from '@iconify/react';

export function ProfileTab() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-white">
          <Icon
            icon="mdi:account-box-outline"
            width="28"
            className="text-purple-400"
          />
          <span>Hồ Sơ Học Sinh</span>
        </h1>
        <p className="text-xs text-slate-400">
          Thông tin cá nhân & lý lịch học tập tại Trường THCS ABC
        </p>
      </div>

      <div className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <img
            src="https://picsum.photos/seed/student_vietnam_an/200/200"
            alt="Nguyễn Văn An"
            className="size-20 rounded-2xl border-2 border-cyan-500 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-white">Nguyễn Văn An</h2>
            <p className="font-mono text-xs text-cyan-400">
              MSHS: 20267A208 • Lớp 7A2
            </p>
            <p className="text-xs text-slate-400">
              Trường THCS ABC, Quận 1, TP. Hồ Chí Minh
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400">Ngày sinh:</span>
            <div className="font-semibold text-white">15/08/2013</div>
          </div>
          <div>
            <span className="text-slate-400">Giới tính:</span>
            <div className="font-semibold text-white">Nam</div>
          </div>
          <div>
            <span className="text-slate-400">Giáo viên chủ nhiệm:</span>
            <div className="font-semibold text-white">Cô Nguyễn Thị Mai</div>
          </div>
          <div>
            <span className="text-slate-400">Email Phụ huynh:</span>
            <div className="font-semibold text-white">
              phuhuynh.an@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
