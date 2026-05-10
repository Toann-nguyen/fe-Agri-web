'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef } from 'react';

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedTextRef = useRef<HTMLSpanElement>(null);

  // Typing Effect
  useEffect(() => {
    const phrases = [
      'Full-Stack Developer',
      'Performance Architect',
      'System Designer',
      'Code Optimizer',
    ];
    let pi = 0;
    let ci = 0;
    let del = false;
    let timeoutId: NodeJS.Timeout;

    const typeEffect = () => {
      const current = phrases[pi];
      if (typedTextRef.current) {
        if (del) {
          typedTextRef.current.textContent = current.substring(0, ci - 1);
          ci--;
        } else {
          typedTextRef.current.textContent = current.substring(0, ci + 1);
          ci++;
        }
      }

      let delay = del ? 40 : 80;
      if (!del && ci === current.length) {
        delay = 2000;
        del = true;
      } else if (del && ci === 0) {
        del = false;
        pi = (pi + 1) % phrases.length;
        delay = 400;
      }
      timeoutId = setTimeout(typeEffect, delay);
    };

    const startTimeout = setTimeout(typeEffect, 1200);
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  // Hero Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const mouse = { x: null as number | null, y: null as number | null };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth * window.devicePixelRatio;
      canvas.height = parent.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0,
      );
    };

    const createParticles = () => {
      particles = [];
      const s = 45;
      const cols = Math.ceil(canvas.width / (s * window.devicePixelRatio));
      const rows = Math.ceil(canvas.height / (s * window.devicePixelRatio));
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const ba = 0.06 + Math.random() * 0.03;
          particles.push({
            x: i * s + s / 2,
            y: j * s + s / 2,
            bx: i * s + s / 2,
            by: j * s + s / 2,
            sz: 1.2,
            a: ba,
            ba,
          });
        }
      }
    };

    const drawParticles = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      ctx.clearRect(0, 0, parent.offsetWidth, parent.offsetHeight);
      particles.forEach((p) => {
        const dx = (mouse.x ?? 0) - p.x;
        const dy = (mouse.y ?? 0) - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const md = 160;

        if (mouse.x !== null && dist < md) {
          const f = (md - dist) / md;
          p.x = p.bx - dx * f * 0.18;
          p.y = p.by - dy * f * 0.18;
          p.a = p.ba + f * 0.25;
          p.sz = 1.2 + f * 2;
        } else {
          p.x += (p.bx - p.x) * 0.06;
          p.y += (p.by - p.y) * 0.06;
          p.a += (p.ba - p.a) * 0.03;
          p.sz += (1.2 - p.sz) * 0.06;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(8,145,178,${p.a})`;
        ctx.fill();
      });

      if (mouse.x !== null) {
        particles.forEach((p) => {
          const dx = mouse.x! - p.x;
          const dy = mouse.y! - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x!, mouse.y!);
            ctx.strokeStyle = `rgba(8,145,178,${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      }
      requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        className="absolute inset-0 size-full"
      />
      <div className="dot-grid-light absolute inset-0 z-[1]"></div>
      <div className="morph-blob pointer-events-none absolute left-10 top-20 z-[1] size-72 bg-cyan-400/10 blur-3xl"></div>
      <div
        className="morph-blob bg-ember-400/8 pointer-events-none absolute bottom-20 right-10 z-[1] size-96 blur-3xl"
        style={{ animationDelay: '-4s' }}
      ></div>
      <div
        className="morph-blob pointer-events-none absolute left-1/2 top-1/2 z-[1] size-64 -translate-x-1/2 -translate-y-1/2 bg-purple-400/5 blur-3xl"
        style={{ animationDelay: '-2s' }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 text-center">
        <div className="anim-fade-down glass-light mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-sm delay-100">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs text-ink-500">
            Available for opportunities
          </span>
        </div>

        <h1 className="anim-fade-up mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-ink-800 delay-200 sm:text-5xl md:text-6xl lg:text-7xl">
          Nguyen Minh Toan
          <br />
          <span
            ref={typedTextRef}
            id="typed-text"
            className="text-gradient-mixed inline-block min-h-[1.2em]"
          ></span>
          <span
            id="typed-cursor"
            className="ml-1 inline-block h-[0.85em] w-[3px] bg-cyan-500 align-middle"
            style={{ animation: 'blink 1s step-end infinite' }}
          ></span>
        </h1>

        <p className="anim-blur-in delay-400 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">
          Building{' '}
          <span className="font-semibold text-ink-800">high-performance</span>,{' '}
          <span className="font-semibold text-ink-800">secure</span>, and{' '}
          <span className="font-semibold text-ink-800">scalable</span> web
          applications with precision-engineered architecture.
        </p>

        <div className="anim-slide-up delay-600 mx-auto mb-10 max-w-lg">
          <div className="code-block-light px-5 py-4 text-left shadow-xl shadow-black/10">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="size-2.5 rounded-full bg-red-500/70"></span>
              <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
              <span className="size-2.5 rounded-full bg-green-500/70"></span>
              <span className="ml-2 font-mono text-[10px] text-gray-600">
                developer.profile.ts
              </span>
            </div>
            <div>
              <span className="code-keyword">const</span>{' '}
              <span className="code-variable">developer</span>{' '}
              <span className="code-operator">=</span>{' '}
              <span className="code-operator">{'{'}</span>
              <br />
              &nbsp;&nbsp;<span className="code-function">focus</span>
              <span className="code-operator">:</span>{' '}
              <span className="code-string">
                &quot;Performance & Scale&quot;
              </span>
              <span className="code-operator">,</span>
              <br />
              &nbsp;&nbsp;<span className="code-function">latency</span>
              <span className="code-operator">:</span>{' '}
              <span className="code-type">&lt;50ms</span>
              <span className="code-operator">,</span>
              <br />
              &nbsp;&nbsp;<span className="code-function">uptime</span>
              <span className="code-operator">:</span>{' '}
              <span className="code-type">99.9%</span>
              <br />
              <span className="code-operator">{'}'};</span>
            </div>
          </div>
        </div>

        <div className="anim-fade-up delay-800 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-500 hover:to-cyan-400 hover:shadow-cyan-500/40"
          >
            View Projects
            <Icon
              icon="mdi:arrow-right"
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="18"
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full"></div>
            </div>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-ink-300/30 bg-white px-7 py-3.5 text-sm font-medium text-ink-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-md"
          >
            <Icon icon="mdi:terminal" width="16" />
            Open Terminal
          </a>
        </div>

        <div className="anim-fade-up mx-auto mt-20 grid max-w-md grid-cols-3 gap-8 delay-1000">
          <div className="group text-center">
            <div
              className="counter font-mono text-3xl font-bold text-ink-800"
              data-target="3"
            >
              3
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-400">
              Years
            </div>
            <div className="mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100"></div>
          </div>
          <div className="group border-x border-ink-300/20 text-center">
            <div
              className="counter font-mono text-3xl font-bold text-ink-800"
              data-target="20"
            >
              20
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-400">
              Projects
            </div>
            <div className="mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100"></div>
          </div>
          <div className="group text-center">
            <div
              className="counter font-mono text-3xl font-bold text-cyan-600"
              data-target="99"
            >
              99
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-400">
              % Uptime
            </div>
            <div className="mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100"></div>
          </div>
        </div>
      </div>

      <div className="anim-fade-in delay-1200 absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
          Scroll
        </span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink-300/30 pt-2">
          <div className="h-2.5 w-1 animate-bounce rounded-full bg-cyan-500"></div>
        </div>
      </div>
    </section>
  );
};
