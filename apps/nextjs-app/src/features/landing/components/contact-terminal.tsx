'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

type TerminalLine = {
  content: string;
  type:
    | 'command'
    | 'error'
    | 'success'
    | 'info'
    | 'dim'
    | 'highlight'
    | 'output';
};

export const ContactTerminal = () => {
  const sectionRef = useScrollReveal();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalStatus, setTerminalStatus] = useState<
    'idle' | 'name' | 'email' | 'message'
  >('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (content: string, type: TerminalLine['type'] = 'output') => {
    setLines((prev) => [...prev, { content, type }]);
  };

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const lowerCmd = trimmedCmd.toLowerCase();

    if (terminalStatus === 'name') {
      if (trimmedCmd) {
        addLine(cmd, 'command');
        setFormData((prev) => ({ ...prev, name: trimmedCmd }));
        addLine('Your email address:', 'info');
        setTerminalStatus('email');
      }
      return;
    }

    if (terminalStatus === 'email') {
      if (trimmedCmd && trimmedCmd.includes('@')) {
        addLine(cmd, 'command');
        setFormData((prev) => ({ ...prev, email: trimmedCmd }));
        addLine('Your message (press Enter to send):', 'info');
        setTerminalStatus('message');
      } else {
        addLine('Please enter a valid email address.', 'error');
      }
      return;
    }

    if (terminalStatus === 'message') {
      addLine(cmd, 'command');
      if (trimmedCmd) {
        const finalData = { ...formData, message: trimmedCmd };
        addLine('───────────────────────────────────────', 'dim');
        addLine('✓ Message composed successfully!', 'success');
        addLine(`  Name:    ${finalData.name}`, 'output');
        addLine(`  Email:   ${finalData.email}`, 'output');
        addLine(`  Message: ${finalData.message}`, 'output');
        addLine('───────────────────────────────────────', 'dim');
        addLine('Opening mailto client...', 'info');

        setTimeout(() => {
          window.location.href = `mailto:toan@example.com?subject=${encodeURIComponent(
            'Contact from ' + finalData.name,
          )}&body=${encodeURIComponent(finalData.message + '\n\n— ' + finalData.name)}`;
        }, 1000);
      }
      setTerminalStatus('idle');
      return;
    }

    addLine(cmd, 'command');
    if (trimmedCmd) {
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(history.length + 1);
    }

    switch (lowerCmd) {
      case 'help':
        [
          ['Available commands:', 'highlight'],
          ['  help                 Show this help', 'output'],
          ['  about                About Toan', 'output'],
          ['  skills               Technical skills', 'output'],
          ['  projects             Featured projects', 'output'],
          ['  sudo send --message  Send a message', 'output'],
          ['  clear                Clear terminal', 'output'],
        ].forEach(([t, p]) => addLine(t, p as any));
        break;
      case 'about':
        [
          ['Nguyen Minh Toan — Full-Stack Developer', 'highlight'],
          ['', 'output'],
          ['Performance-driven developer with 3+ years', 'output'],
          ['building scalable web applications.', 'output'],
          ['', 'output'],
          ['Philosophy: "Every millisecond matters."', 'info'],
        ].forEach(([t, p]) => addLine(t, p as any));
        break;
      case 'skills':
        [
          ['Technical Skills:', 'highlight'],
          ['', 'output'],
          ['  Frontend:   React, Next.js, TypeScript, Tailwind', 'output'],
          ['  Backend:    Laravel, NestJS, Node.js, PHP', 'output'],
          ['  Database:   MySQL, MongoDB, Redis', 'output'],
          ['  DevOps:     Docker, Git, CI/CD, Linux', 'output'],
          ['  Patterns:   Repository, Observer, Factory', 'output'],
        ].forEach(([t, p]) => addLine(t, p as any));
        break;
      case 'projects':
        [
          ['Featured Projects:', 'highlight'],
          ['', 'output'],
          ['  1. AgriTech Vision AI (In Development)', 'info'],
          ['     → AI crop detection, Laravel + TensorFlow', 'output'],
          ['  2. High-Concurrency Streaming (Production)', 'success'],
          ['     → 10K+ WebSocket connections, NestJS', 'output'],
        ].forEach(([t, p]) => addLine(t, p as any));
        break;
      case 'sudo send --message':
        setTerminalStatus('name');
        addLine('Initiating secure message protocol...', 'info');
        addLine('Your name:', 'info');
        break;
      case 'clear':
        setLines([]);
        break;
      case '':
        break;
      default:
        addLine(`command not found: ${cmd}`, 'error');
        addLine('Type "help" for available commands.', 'dim');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      } else {
        setHistoryIndex(history.length);
        setInputValue('');
      }
    }
  };

  const getPlaceholder = () => {
    if (terminalStatus === 'name') return 'Your name';
    if (terminalStatus === 'email') return 'email@example.com';
    if (terminalStatus === 'message') return 'Type your message...';
    return 'Type a command...';
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-white py-24 md:py-32"
    >
      <div className="dot-grid-light absolute inset-0 opacity-30"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[100px]"></div>
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="reveal mb-12 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <Icon icon="mdi:console" width="14" />
            Contact Terminal
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            Let&apos;s <span className="text-gradient-cyan">Connect</span>
          </h2>
          <p className="mt-4 text-sm text-ink-400">
            Prefer email?{' '}
            <a
              href="mailto:toan@example.com"
              className="font-medium text-cyan-600 transition-colors hover:text-cyan-700"
            >
              toan@example.com
            </a>
          </p>
        </div>

        <div className="reveal-scale overflow-hidden rounded-2xl shadow-2xl shadow-black/10">
          <div className="flex items-center gap-2 border-b border-white/5 bg-ink-900 px-5 py-3.5">
            <span className="size-3 cursor-pointer rounded-full bg-red-500/80 transition-colors hover:bg-red-400"></span>
            <span className="size-3 cursor-pointer rounded-full bg-yellow-500/80 transition-colors hover:bg-yellow-400"></span>
            <span className="size-3 cursor-pointer rounded-full bg-green-500/80 transition-colors hover:bg-green-400"></span>
            <span className="ml-3 font-mono text-xs text-gray-500">
              contact@toan-dev:~
            </span>
            <div className="ml-auto flex items-center gap-1">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400"></span>
              <span className="font-mono text-[9px] text-emerald-400/60">
                connected
              </span>
            </div>
          </div>
          <div
            ref={terminalBodyRef}
            className="max-h-[400px] min-h-[280px] overflow-y-auto bg-ink-900 p-5 font-mono text-sm"
          >
            <div className="mb-1 text-gray-500">
              Welcome to Toan&apos;s contact terminal v2.0
            </div>
            <div className="mb-1 text-gray-500">
              Type <span className="text-cyan-400">help</span> for available
              commands.
            </div>
            <div className="mb-4 text-gray-700">
              ───────────────────────────────────────
            </div>

            {lines.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === 'command' ? (
                  <>
                    <span className="text-cyan-400">~</span>{' '}
                    <span className="text-gray-500">$</span>{' '}
                    <span className="text-gray-200">{line.content}</span>
                  </>
                ) : (
                  <span
                    className={
                      line.type === 'error'
                        ? 'text-red-400'
                        : line.type === 'success'
                          ? 'text-emerald-400'
                          : line.type === 'info'
                            ? 'text-cyan-400'
                            : line.type === 'dim'
                              ? 'text-gray-700'
                              : line.type === 'highlight'
                                ? 'font-semibold text-white'
                                : 'text-gray-400'
                    }
                  >
                    {line.content}
                  </span>
                )}
              </div>
            ))}

            <div id="terminal-input-line" className="flex items-center gap-2">
              <span className="shrink-0 text-cyan-400">~</span>
              <span className="shrink-0 text-gray-500">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input w-full border-none bg-transparent font-mono text-sm text-gray-200 caret-cyan-500 outline-none"
                placeholder={getPlaceholder()}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        <div className="reveal mt-6 flex flex-wrap justify-center gap-2">
          {['help', 'about', 'skills'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                processCommand(cmd);
                inputRef.current?.focus();
              }}
              className="cursor-pointer rounded-lg border border-ink-300/15 bg-surface-50 px-3 py-1.5 font-mono text-[11px] text-ink-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 hover:shadow-md"
            >
              {cmd}
            </button>
          ))}
          <button
            onClick={() => {
              processCommand('sudo send --message');
              inputRef.current?.focus();
            }}
            className="cursor-pointer rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 font-mono text-[11px] font-semibold text-cyan-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 hover:shadow-md"
          >
            sudo send --message
          </button>
        </div>
      </div>
    </section>
  );
};
