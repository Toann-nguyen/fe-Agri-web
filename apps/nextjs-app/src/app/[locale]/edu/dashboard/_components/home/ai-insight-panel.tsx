'use client';

import { Icon } from '@iconify/react';

interface AiInsightPanelProps {
  onOpenAiAssistant: () => void;
}

export function AiInsightPanel({ onOpenAiAssistant }: AiInsightPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-white">
          <Icon icon="mdi:brain" width="20" className="text-cyan-400" />
          <span>Phân Tích & Gợi Ý Học Tập AI</span>
        </h2>
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-xs text-cyan-400">
          Cập nhật hàng ngày
        </span>
      </div>

      <div className="relative space-y-4 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md">
        {/* Background glow */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 size-48 rounded-full bg-cyan-500/10 blur-3xl"></div>

        {/* Strength & Weakness Analysis */}
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div className="space-y-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Icon icon="mdi:check-circle-outline" width="16" />
              <span>Điểm Mạnh Rõ Rệt</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Toán Học (9.2), Vật Lý (9.0), GDCD (9.5) - Tư duy logic & tính
              toán tốt.
            </p>
          </div>

          <div className="space-y-1.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Icon icon="mdi:alert-circle-outline" width="16" />
              <span>Cần Tập Trung Thêm</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Lịch Sử (8.0) & Tiếng Anh (8.8) - Cần chú ý từ vựng Unit 8 & sự
              kiện chương 3.
            </p>
          </div>
        </div>

        {/* AI Alert Warning & Actionable Task */}
        <div className="space-y-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-rose-300">
              <Icon icon="mdi:clock-alert-outline" width="16" />
              Cảnh Báo Bài Kiểm Tra Sắp Tới
            </span>
            <span className="font-mono text-[10px] text-rose-300">
              Thứ 5, 12/08
            </span>
          </div>
          <p className="text-slate-300">
            Bài kiểm tra 1 tiết Toán (Chương 4: Phương trình). AI đề xuất em
            luyện tập 15 câu trắc nghiệm dạng nâng cao để giữ vững điểm 9.0+.
          </p>
        </div>

        {/* Ask AI Assistant Trigger */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="hidden font-mono text-xs text-slate-400 sm:inline">
            💬 Thắc mắc bài tập? Hỏi ngay gia sư AI
          </span>
          <button
            onClick={onOpenAiAssistant}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:opacity-95 hover:shadow-cyan-500/30 active:scale-95 sm:w-auto"
          >
            <Icon icon="mdi:robot" width="18" />
            <span>Hỏi Trợ Lý AI Edu-VN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
