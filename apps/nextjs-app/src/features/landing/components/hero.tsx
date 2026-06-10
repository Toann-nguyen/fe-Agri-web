'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
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

  // Hero Canvas — particle effect nhẹ nhàng lên background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animId: number;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const s = 60;
      const cols = Math.ceil(canvas.width / s);
      const rows = Math.ceil(canvas.height / s);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const ba = 0.04 + Math.random() * 0.03;
          particles.push({
            x: i * s + s / 2,
            y: j * s + s / 2,
            bx: i * s + s / 2,
            by: j * s + s / 2,
            sz: 1.0,
            a: ba,
            ba,
          });
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += (p.bx - p.x) * 0.06;
        p.y += (p.by - p.y) * 0.06;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >

      {/* ── Particle canvas overlay ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] size-full opacity-30" />

      {/* ── Blob decorative ── */}
      <div className="morph-blob pointer-events-none absolute left-10 top-20 z-[2] size-72 bg-cyan-400/15 blur-3xl" />
      <div
        className="morph-blob pointer-events-none absolute bottom-20 right-10 z-[2] size-96 bg-orange-400/10 blur-3xl"
        style={{ animationDelay: '-4s' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 text-center">
        {/* Badge trạng thái */}
        <div className="anim-fade-down glass-hero mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-sm delay-100">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs text-white/80">
            Available for opportunities
          </span>
        </div>

        {/* ── Ảnh cá nhân ── */}
        <div className="anim-fade-down mb-6 flex justify-center delay-150">
          <div className="relative">
            {/* Vòng ring hiệu ứng */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-orange-400 opacity-80 blur-sm" />
            <div className="absolute -inset-[1px] rounded-full bg-gradient-to-br from-cyan-500 to-orange-400" />
            <div className="relative size-24 overflow-hidden rounded-full border-2 border-white/20 sm:size-28">
              <Image
                src="/avatar.jpg"
                alt="Nguyen Minh Toan"
                fill
                className="object-cover object-top"
                sizes="112px"
              />
            </div>
            {/* Badge online */}
            <span className="absolute bottom-1 right-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
              <span className="size-2 rounded-full bg-white" />
            </span>
          </div>
        </div>

        {/* Tên + typing effect */}
        <h1 className="anim-fade-up mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-white delay-200 sm:text-5xl md:text-6xl lg:text-7xl">
          Nguyen Minh Toan
          <br />
          <span
            ref={typedTextRef}
            id="typed-text"
            className="text-gradient-hero inline-block min-h-[1.2em]"
          />
          <span
            id="typed-cursor"
            className="ml-1 inline-block h-[0.85em] w-[3px] bg-cyan-400 align-middle"
            style={{ animation: 'blink 1s step-end infinite' }}
          />
        </h1>

        <p className="anim-blur-in delay-400 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Building{' '}
          <span className="font-semibold text-white">high-performance</span>,{' '}
          <span className="font-semibold text-white">secure</span>, and{' '}
          <span className="font-semibold text-white">scalable</span> web
          applications with precision-engineered architecture.
        </p>

        {/* Code snippet */}
        <div className="anim-slide-up delay-600 mx-auto mb-10 max-w-lg">
          <div className="code-block-light px-5 py-4 text-left shadow-xl shadow-black/30">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-yellow-500/70" />
              <span className="size-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 font-mono text-[10px] text-gray-400">
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
                &quot;Performance &amp; Scale&quot;
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

        {/* CTA buttons */}
        <div className="anim-fade-up delay-800 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-500 hover:to-cyan-400 hover:shadow-cyan-500/50"
          >
            View Projects
            <Icon
              icon="mdi:arrow-right"
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="18"
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
            </div>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-white/15 hover:shadow-md"
          >
            <Icon icon="mdi:terminal" width="16" />
            Open Terminal
          </a>
        </div>

        {/* Stats */}
        <div className="anim-fade-up mx-auto mt-16 grid max-w-md grid-cols-3 gap-8 delay-1000">
          <div className="group text-center">
            <div className="counter font-mono text-3xl font-bold text-white" data-target="3">
              3
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
              Years
            </div>
            <div className="mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
          </div>
          <div className="group border-x border-white/15 text-center">
            <div className="counter font-mono text-3xl font-bold text-white" data-target="20">
              20
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
              Projects
            </div>
            <div className="mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
          </div>
          <div className="group text-center">
            <div className="counter font-mono text-3xl font-bold text-cyan-400" data-target="99">
              99
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
              % Uptime
            </div>
            <div className="mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="anim-fade-in delay-1200 absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Scroll
        </span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 pt-2">
          <div className="h-2.5 w-1 animate-bounce rounded-full bg-cyan-400" />
        </div>
      </div>
    </section>
  );
};
