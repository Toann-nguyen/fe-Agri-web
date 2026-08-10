'use client';

import { Icon } from '@iconify/react';

import { subjects } from '../../data';

export function GradesTab() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-white">
            <Icon
              icon="mdi:chart-bar"
              width="28"
              className="text-emerald-400"
            />
            <span>Bảng Điểm Học Tập Chi Tiết</span>
          </h1>
          <p className="text-xs text-slate-400">
            Học kỳ II • Năm học 2025 - 2026 • Lớp 7A2
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-bold text-emerald-300">
            ĐTB Chung: 8.8 (Giỏi)
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 font-mono text-xs text-slate-400">
                <th className="p-3">Môn Học</th>
                <th className="p-3 text-center">15 Phút</th>
                <th className="p-3 text-center">1 Tiết</th>
                <th className="p-3 text-center">Giữa Kỳ</th>
                <th className="p-3 text-center font-bold text-cyan-400">
                  ĐTB Môn
                </th>
                <th className="p-3 text-center">Xu Hướng</th>
                <th className="p-3">Nhận Xét Của Giáo Viên</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subjects.map((subj) => (
                <tr
                  key={subj.id}
                  className="transition-colors hover:bg-white/5"
                >
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`rounded-xl p-2 ${
                          subj.warning
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-slate-800 text-cyan-400'
                        }`}
                      >
                        <Icon icon={subj.icon} width="18" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-white">
                          <span>{subj.name}</span>
                          {subj.warning && (
                            <span className="py-0.2 rounded bg-rose-500/20 px-1.5 font-mono text-[9px] text-rose-300">
                              Cần chú ý
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-slate-500">
                          {subj.code}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono text-slate-200">
                    {subj.score15m.join(' • ')}
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono text-slate-200">
                    {subj.score1Period.join(' • ')}
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono font-semibold text-slate-200">
                    {subj.midTerm}
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono text-sm font-extrabold text-emerald-400">
                    {subj.avgScore}
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono text-xs">
                    {subj.trend === 'up' ? (
                      <span className="flex items-center justify-center gap-1 text-emerald-400">
                        <Icon icon="mdi:trending-up" width="16" /> Tăng
                      </span>
                    ) : subj.trend === 'down' ? (
                      <span className="flex items-center justify-center gap-1 text-rose-400">
                        <Icon icon="mdi:trending-down" width="16" /> Giảm
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1 text-slate-400">
                        <Icon icon="mdi:trending-neutral" width="16" /> Ổn định
                      </span>
                    )}
                  </td>
                  <td className="max-w-xs px-3 py-3.5 text-slate-300">
                    {subj.teacherComment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
