'use client';

import { Icon } from '@iconify/react';

import { upcomingTasks } from '../../data';

interface UpcomingTasksSectionProps {
  onViewSchedule: () => void;
}

const typeIcon: Record<string, { icon: string; color: string }> = {
  test: {
    icon: 'mdi:clipboard-text-clock-outline',
    color: 'bg-rose-500/20 text-rose-400',
  },
  assignment: {
    icon: 'mdi:file-document-edit-outline',
    color: 'bg-amber-500/20 text-amber-400',
  },
  event: { icon: 'mdi:calendar-star', color: 'bg-teal-500/20 text-teal-400' },
};

const taskIconStyle = (type: string) => typeIcon[type] ?? typeIcon.event;

export function UpcomingTasksSection({
  onViewSchedule,
}: UpcomingTasksSectionProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:calendar-clock"
            width="20"
            className="text-teal-400"
          />
          <h3 className="text-sm font-bold text-white">
            Lịch Sắp Tới • Bài Tập & Kiểm Tra
          </h3>
        </div>
        <button
          onClick={onViewSchedule}
          className="font-mono text-[11px] text-slate-400 hover:text-white"
        >
          Xem thời khóa biểu →
        </button>
      </div>

      <div className="space-y-3">
        {upcomingTasks.map((task) => {
          const style = taskIconStyle(task.type);
          return (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/50 p-3.5 transition-all hover:border-white/15"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-xl p-2 ${style.color}`}>
                  <Icon icon={style.icon} width="20" />
                </div>

                <div>
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold text-cyan-400">
                      {task.subject}
                    </span>
                    {task.urgent && (
                      <span className="rounded bg-rose-500/20 px-1.5 py-0.2 font-mono text-[9px] text-rose-300">
                        Gấp
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold leading-snug text-white">
                    {task.title}
                  </h4>
                  <p className="mt-1 font-mono text-[11px] text-slate-400">
                    📅 {task.dueDate}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold ${
                    task.urgent
                      ? 'border border-rose-500/30 bg-rose-500/20 text-rose-300'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {task.timeLeft}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
