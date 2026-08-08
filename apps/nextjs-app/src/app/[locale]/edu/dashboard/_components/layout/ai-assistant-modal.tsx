'use client';

import { Icon } from '@iconify/react';

import { aiQuickPrompts } from '../../data';
import { AiChatMessage } from '../../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: AiChatMessage[];
  isThinking: boolean;
  question: string;
  onQuestionChange: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
}

export function AiAssistantModal({
  isOpen,
  onClose,
  chatHistory,
  isThinking,
  question,
  onQuestionChange,
  onSend,
}: AiAssistantModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col space-y-4 overflow-hidden rounded-2xl border border-cyan-500/40 bg-slate-900 p-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 p-2 font-bold text-slate-950">
              <Icon icon="mdi:robot" width="24" />
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-white">
                <span>Trợ Lý Gia Sư AI Edu-VN</span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                  Online 24/7
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Hỗ trợ học sinh giải đáp bài tập, tóm tắt bài học & lập kế hoạch
                ôn tập
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-slate-800 p-1.5 text-slate-400 hover:text-white"
          >
            <Icon icon="mdi:close" width="20" />
          </button>
        </div>

        {/* Chat History Box */}
        <div className="min-h-[300px] flex-1 space-y-3 overflow-y-auto rounded-xl border border-white/5 bg-slate-950/60 p-3">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === 'user'
                  ? 'flex justify-end gap-3 text-xs'
                  : 'flex justify-start gap-3 text-xs'
              }
            >
              {msg.role === 'ai' && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/20 text-cyan-400">
                  <Icon icon="mdi:robot" width="18" />
                </div>
              )}

              <div
                className={`max-w-[80%] space-y-1 rounded-2xl p-3 ${
                  msg.role === 'user'
                    ? 'bg-cyan-500 font-medium text-slate-950'
                    : 'border border-white/10 bg-slate-900 text-slate-200'
                }`}
              >
                <div className="leading-relaxed">{msg.text}</div>
                <div
                  className={`text-right font-mono text-[9px] ${msg.role === 'user' ? 'text-slate-800' : 'text-slate-400'}`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start gap-3 text-xs">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/20 text-cyan-400">
                <Icon icon="mdi:robot" width="18" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900 p-3 font-mono text-xs text-cyan-400">
                <Icon icon="mdi:loading" width="18" className="animate-spin" />
                <span>Trợ lý AI đang suy nghĩ câu trả lời...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompt Suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-[11px]">
          <span className="shrink-0 text-slate-500">Gợi ý câu hỏi:</span>
          {aiQuickPrompts.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onQuestionChange(suggestion)}
              className="shrink-0 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-cyan-300 hover:bg-cyan-500/20"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Chat Input Form */}
        <form
          onSubmit={onSend}
          className="flex gap-2 border-t border-white/10 pt-2"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder="Nhập câu hỏi hoặc bài tập cần giải đáp..."
            className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={isThinking || !question.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
          >
            <span>Gửi</span>
            <Icon icon="mdi:send" width="16" />
          </button>
        </form>
      </div>
    </div>
  );
}
