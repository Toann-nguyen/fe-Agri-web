import { useEffect, useRef, useState } from 'react';

import { CodeBlock, CodeToken } from '../ui';

const phrases = ['Full-Stack Developer', 'Performance Architect', 'System Designer', 'Code Optimizer'];

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let pi = 0;
    let ci = 0;
    let del = false;

    const typeEffect = () => {
      const c = phrases[pi];
      if (del) {
        setTypedText(c.substring(0, ci - 1));
        ci--;
      } else {
        setTypedText(c.substring(0, ci + 1));
        ci++;
      }
      let d = del ? 40 : 80;
      if (!del && ci === c.length) {
        d = 2000;
        del = true;
      } else if (del && ci === 0) {
        del = false;
        pi = (pi + 1) % phrases.length;
        d = 400;
      }
      setTimeout(typeEffect, d);
    };

    const timeout = setTimeout(typeEffect, 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      bx: number;
      by: number;
      sz: number;
      a: number;
      ba: number;
    }> = [];
    const mouse = { x: null as number | null, y: null as number | null };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const createParticles = () => {
      particles = [];
      const s = 45;
      const cols = Math.ceil(canvas.offsetWidth / s);
      const rows = Math.ceil(canvas.offsetHeight / s);
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
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        const dx = mouse.x! - p.x;
        const dy = mouse.y! - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const md = 160;
        if (dist < md) {
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

      if (mouse.x !== null && mouse.y !== null) {
        const mx = mouse.x;
        const my = mouse.y;
        particles.forEach((p) => {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(8,145,178,${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      }
      requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id='hero' className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <canvas ref={canvasRef} id='hero-canvas' className='absolute inset-0 size-full'></canvas>
      <div className='dot-grid-light absolute inset-0 z-[1]'></div>
      <div className='morph-blob pointer-events-none absolute left-10 top-20 z-[1] size-72 bg-cyan-400/10 blur-3xl'></div>
      <div
        className='bg-ember-400/8 morph-blob pointer-events-none absolute bottom-20 right-10 z-[1] size-96 blur-3xl'
        style={{ animationDelay: '-4s' }}
      ></div>
      <div
        className='morph-blob pointer-events-none absolute left-1/2 top-1/2 z-[1] size-64 -translate-x-1/2 -translate-y-1/2 bg-purple-400/5 blur-3xl'
        style={{ animationDelay: '-2s' }}
      ></div>

      <div className='relative z-10 mx-auto max-w-7xl px-6 pt-20 text-center'>
        <div
          className='anim-fade-down glass-light mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-sm delay-100'
          style={{ opacity: 0 }}
        >
          <span className='relative flex size-2.5'>
            <span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
            <span className='relative inline-flex size-2.5 rounded-full bg-emerald-500'></span>
          </span>
          <span className='font-mono text-xs text-ink-500'>Available for opportunities</span>
        </div>

        <h1
          className='anim-fade-up mb-6 text-4xl font-bold leading-[1.1] tracking-tight delay-200 sm:text-5xl md:text-6xl lg:text-7xl'
          style={{ opacity: 0 }}
        >
          <span className='text-ink-800'>Nguyen Minh Toan</span>
          <br />
          <span className='text-gradient-mixed inline-block'>{typedText}</span>
          <span
            className={`ml-1 inline-block h-[0.85em] w-[3px] bg-cyan-500 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          ></span>
        </h1>

        <p
          className='anim-blur-in delay-400 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg'
          style={{ opacity: 0 }}
        >
          Building <span className='font-semibold text-ink-800'>high-performance</span>,{' '}
          <span className='font-semibold text-ink-800'>secure</span>, and{' '}
          <span className='font-semibold text-ink-800'>scalable</span> web applications with precision-engineered
          architecture.
        </p>

        <div className='anim-slide-up delay-600 mx-auto mb-10 max-w-lg' style={{ opacity: 0 }}>
          <CodeBlock filename='developer.profile.ts'>
            <div>
              <CodeToken type='keyword'>const</CodeToken> <CodeToken type='variable'>developer</CodeToken>{' '}
              <CodeToken type='operator'>=</CodeToken> <CodeToken type='operator'>{'{'}</CodeToken>
              <br />
              &nbsp;&nbsp;<CodeToken type='function'>focus</CodeToken>
              <CodeToken type='operator'>:</CodeToken>{' '}
              <CodeToken type='string'>&quot;Performance &amp; Scale&quot;</CodeToken>
              <CodeToken type='operator'>,</CodeToken>
              <br />
              &nbsp;&nbsp;<CodeToken type='function'>latency</CodeToken>
              <CodeToken type='operator'>:</CodeToken> <CodeToken type='type'>&lt;50ms</CodeToken>
              <CodeToken type='operator'>,</CodeToken>
              <br />
              &nbsp;&nbsp;<CodeToken type='function'>uptime</CodeToken>
              <CodeToken type='operator'>:</CodeToken> <CodeToken type='type'>99.9%</CodeToken>
              <br />
              <CodeToken type='operator'>{'}'}</CodeToken>
            </div>
          </CodeBlock>
        </div>

        <div
          className='anim-fade-up delay-800 flex flex-col items-center justify-center gap-4 sm:flex-row'
          style={{ opacity: 0 }}
        >
          <a
            href='#projects'
            className='group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-500 hover:to-cyan-400 hover:shadow-cyan-500/40'
          >
            View Projects
            <svg
              viewBox='0 0 24 24'
              fill='currentColor'
              width='18'
              height='18'
              className='transition-transform duration-300 group-hover:translate-x-1'
            >
              <path d='M10 17l5-5-5-5v10z' />
            </svg>
            <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-xl'>
              <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full'></div>
            </div>
          </a>
          <a
            href='#contact'
            className='inline-flex items-center gap-2 rounded-xl border border-ink-300/30 bg-white px-7 py-3.5 text-sm font-medium text-ink-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-md'
          >
            <svg viewBox='0 0 24 24' fill='currentColor' width='16' height='16'>
              <path d='M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z' />
            </svg>
            Open Terminal
          </a>
        </div>

        <div className='anim-fade-up mx-auto mt-20 grid max-w-md grid-cols-3 gap-8 delay-1000' style={{ opacity: 0 }}>
          <div className='group text-center'>
            <div className='counter font-mono text-3xl font-bold text-ink-800' data-target='3'>
              0
            </div>
            <div className='mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-400'>Years</div>
            <div className='mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100'></div>
          </div>
          <div className='group border-x border-ink-300/20 text-center'>
            <div className='counter font-mono text-3xl font-bold text-ink-800' data-target='20'>
              0
            </div>
            <div className='mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-400'>Projects</div>
            <div className='mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100'></div>
          </div>
          <div className='group text-center'>
            <div className='counter font-mono text-3xl font-bold text-cyan-600' data-target='99'>
              0
            </div>
            <div className='mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-400'>% Uptime</div>
            <div className='mx-auto mt-2 h-0.5 w-8 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100'></div>
          </div>
        </div>
      </div>

      <div
        className='anim-fade-in delay-1200 absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2'
        style={{ opacity: 0 }}
      >
        <span className='font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400'>Scroll</span>
        <div className='flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink-300/30 pt-2'>
          <div className='h-2.5 w-1 animate-bounce rounded-full bg-cyan-500'></div>
        </div>
      </div>
    </section>
  );
}
