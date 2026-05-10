'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const Counter = ({
  target,
  suffix = '',
  decimal = false,
}: {
  target: number;
  suffix?: string;
  decimal?: boolean;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = ease * target;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasStarted, target]);

  return (
    <div
      ref={countRef}
      className="mb-1 font-mono text-4xl font-bold text-ink-800"
    >
      {decimal ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </div>
  );
};

export const StatsDashboard = () => {
  const sectionRef = useScrollReveal();
  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-40"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <Icon icon="mdi:chart-areaspline" width="14" />
            By The Numbers
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            Impact <span className="text-gradient-cyan">Dashboard</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {/* Stat 1 */}
          <div className="glow-border reveal glass-light rounded-2xl p-6 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-cyan-500/15 bg-cyan-500/10">
              <Icon
                icon="mdi:rocket-launch"
                className="text-cyan-600"
                width="28"
              />
            </div>
            <Counter target={20} suffix="+" />
            <div className="text-sm font-medium text-ink-400">
              Projects Delivered
            </div>
            <div className="mt-4 flex h-16 items-end justify-center gap-1">
              {[40, 60, 45, 80, 100, 75, 90].map((h, i) => (
                <div
                  key={i}
                  className="chart-bar w-3 rounded-t bg-cyan-400"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${0.1 * (i + 1)}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Stat 2 */}
          <div
            className="glow-border reveal glass-light rounded-2xl p-6 text-center"
            style={{ animationDelay: '120ms' }}
          >
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-ember-500/15 bg-ember-500/10">
              <Icon
                icon="mdi:lightning-bolt"
                className="text-ember-500"
                width="28"
              />
            </div>
            <Counter target={23} suffix="ms" />
            <div className="text-sm font-medium text-ink-400">
              Avg Response Time
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              <svg
                width="80"
                height="40"
                viewBox="0 0 80 40"
                className="overflow-visible"
              >
                <polyline
                  points="0,35 12,28 24,30 36,15 48,18 60,8 72,12 80,5"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-draw-line"
                />
                <polyline
                  points="0,35 12,28 24,30 36,15 48,18 60,8 72,12 80,5"
                  fill="url(#ember-fill)"
                  stroke="none"
                  opacity="0.1"
                  className="animate-draw-line"
                />
                <defs>
                  <linearGradient id="ember-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Stat 3 */}
          <div
            className="glow-border reveal glass-light rounded-2xl p-6 text-center"
            style={{ animationDelay: '240ms' }}
          >
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/10">
              <Icon
                icon="mdi:shield-check"
                className="text-emerald-500"
                width="28"
              />
            </div>
            <Counter target={99.9} suffix="%" decimal />
            <div className="text-sm font-medium text-ink-400">
              Uptime Guarantee
            </div>
            <div className="relative mx-auto mt-4 size-16">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="99.9, 100"
                  strokeLinecap="round"
                  className="animate-draw-line"
                  style={{ strokeDashoffset: 100 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon
                  icon="mdi:check-bold"
                  className="text-emerald-500"
                  width="18"
                />
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div
            className="glow-border reveal glass-light rounded-2xl p-6 text-center"
            style={{ animationDelay: '360ms' }}
          >
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-purple-500/15 bg-purple-500/10">
              <Icon
                icon="mdi:code-braces"
                className="text-purple-600"
                width="28"
              />
            </div>
            <Counter target={50} suffix="K+" />
            <div className="text-sm font-medium text-ink-400">
              Lines of Code
            </div>
            <div className="mt-4 flex h-16 items-end justify-center gap-[3px]">
              {[20, 35, 50, 45, 70, 65, 85, 80, 95, 100, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="chart-bar w-1.5 rounded-t bg-purple-400"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${0.05 * (i + 1)}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
