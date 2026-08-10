'use client';

import { Icon } from '@iconify/react';

import { subjects } from '../../data';

interface GradesSummaryTableProps {
  onViewGrades: () => void;
}

export function GradesSummaryTable({ onViewGrades }: GradesSummaryTableProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:format-list-checks"
            width="20"
            className="text-emerald-400"
          />
          <h3 className="text-sm font-bold text-white">Điểm Số Gần Đây</h3>
        </div>
        <button
          onClick={onViewGrades}
          className="font-mono text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline"
        >
          Bảng điểm đầy đủ →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 font-mono text-[11px] text-slate-400">
              <th className="px-3 py-2.5">Môn học</th>
              <th className="px-2 py-2.5 text-center">15 Phút</th>
              <th className="px-2 py-2.5 text-center">1 Tiết</th>
              <th className="px-2 py-2.5 text-center">Giữa Kỳ</th>
              <th className="px-2 py-2.5 text-center font-bold text-cyan-400">
                ĐTB
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {subjects.slice(0, 5).map((subj) => (
              <tr key={subj.id} className="transition-colors hover:bg-white/5">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-slate-800 p-1.5 text-cyan-400">
                      <Icon icon={subj.icon} width="16" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{subj.name}</div>
                      <div className="line-clamp-1 text-[10px] text-slate-400">
                        {subj.teacherComment}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-center font-mono text-slate-300">
                  {subj.score15m.join(', ')}
                </td>
                <td className="px-2 py-3 text-center font-mono text-slate-300">
                  {subj.score1Period.join(', ')}
                </td>
                <td className="px-2 py-3 text-center font-mono text-slate-300">
                  {subj.midTerm}
                </td>
                <td className="px-2 py-3 text-center font-mono text-sm font-bold text-emerald-400">
                  {subj.avgScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
