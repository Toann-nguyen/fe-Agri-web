import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'cyan' | 'ember' | 'purple' | 'emerald' | 'amber' | 'ink';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-surface-100 text-ink-500',
    cyan: 'bg-cyan-500/8 text-cyan-700 border-cyan-500/10',
    ember: 'bg-ember-500/8 text-ember-700 border-ember-500/10',
    purple: 'bg-purple-500/8 text-purple-700 border-purple-500/10',
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/15',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/15',
    ink: 'bg-ink-500/10 text-ink-600 border-ink-300/20',
  };

  return (
    <span
      className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
