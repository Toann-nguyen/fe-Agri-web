import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'strong';
  glow?: boolean;
  emberGlow?: boolean;
}

export function GlassCard({
  children,
  className = '',
  variant = 'light',
  glow = false,
  emberGlow = false,
}: GlassCardProps) {
  const glassClass = variant === 'strong' ? 'glass-strong-light' : 'glass-light';
  const glowClass = glow ? 'glow-border' : '';
  const emberClass = emberGlow ? 'ember-glow' : '';

  return (
    <div className={`${glassClass} rounded-2xl ${glowClass} ${emberClass} ${className}`}>
      {children}
    </div>
  );
}
