/* eslint-disable tailwindcss/no-custom-classname */

// eslint-disable-next-line check-file/filename-naming-convention
import { useState, useRef, useEffect, useCallback } from 'react';

import { Reveal } from '../ui';

interface TerminalLine {
  text: string;
  // eslint-disable-next-line prettier/prettier
  type: 'command' | 'error' | 'success' | 'info' | 'dim' | 'highlight' | 'output';
}

export function ContactSection() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: "Welcome to Toan's contact terminal v2.0", type: 'dim' },
    { text: 'Type "help" for available commands.', type: 'dim' },
    { text: '───────────────────────────────────────', type: 'dim' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [sendState, setSendState] = useState<
    'idle' | 'name' | 'email' | 'message'
  >('idle');
  const [messageData, setMessageData] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const addLine = useCallback(
    (text: string, type: TerminalLine['type'] = 'output') => {
      setLines((prev) => [...prev, { text, type }]);
    },
    [],
  );

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      if (sendState === 'name') {
        if (trimmed) {
          addLine(cmd, 'command');
          setMessageData((prev) => ({ ...prev, name: cmd.trim() }));
          addLine('Your email address:', 'info');
          setInput('');
          setSendState('email');
        }
        return;
      }

      if (sendState === 'email') {
        if (trimmed && trimmed.includes('@')) {
          addLine(cmd, 'command');
          setMessageData((prev) => ({ ...prev, email: cmd.trim() }));
          addLine('Your message (press Enter to send):', 'info');
          setInput('');
          setSendState('message');
        } else {
          addLine('Please enter a valid email address.', 'error');
        }
        return;
      }

      if (sendState === 'message') {
        addLine(cmd, 'command');
        if (cmd.trim()) {
          setMessageData((prev) => ({ ...prev, message: cmd.trim() }));
          addLine('───────────────────────────────────────', 'dim');
          addLine('✓ Message composed successfully!', 'success');
          addLine(`  Name:    ${messageData.name}`, 'output');
          addLine(`  Email:   ${messageData.email}`, 'output');
          addLine(`  Message: ${cmd.trim()}`, 'output');
          addLine('───────────────────────────────────────', 'dim');
          addLine('Opening mailto client...', 'info');
          setTimeout(() => {
            window.location.href = `mailto:toan@example.com?subject=${encodeURIComponent('Contact from ' + messageData.name)}&body=${encodeURIComponent(cmd.trim() + '\n\n— ' + messageData.name)}`;
          }, 1000);
        }
        setSendState('idle');
        setMessageData({});
        setInput('');
        return;
      }

      addLine(cmd, 'command');

      switch (trimmed) {
        case 'help':
          [
            ['Available commands:', 'highlight'],
            ['  help                 Show this help', 'output'],
            ['  about                About Toan', 'output'],
            ['  skills               Technical skills', 'output'],
            ['  projects             Featured projects', 'output'],
            ['  sudo send --message  Send a message', 'output'],
            ['  clear                Clear terminal', 'output'],
          ].forEach(([text, type]) =>
            addLine(text, type as TerminalLine['type']),
          );
          break;
        case 'about':
          [
            ['Nguyen Minh Toan — Full-Stack Developer', 'highlight'],
            ['', 'output'],
            ['Performance-driven developer with 3+ years', 'output'],
            ['building scalable web applications.', 'output'],
            ['', 'output'],
            ['Philosophy: "Every millisecond matters."', 'info'],
          ].forEach(([text, type]) =>
            addLine(text, type as TerminalLine['type']),
          );
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
          ].forEach(([text, type]) =>
            addLine(text, type as TerminalLine['type']),
          );
          break;
        case 'projects':
          [
            ['Featured Projects:', 'highlight'],
            ['', 'output'],
            ['  1. AgriTech Vision AI (In Development)', 'info'],
            ['     → AI crop detection, Laravel + TensorFlow', 'output'],
            ['  2. High-Concurrency Streaming (Production)', 'success'],
            ['     → 10K+ WebSocket connections, NestJS', 'output'],
          ].forEach(([text, type]) =>
            addLine(text, type as TerminalLine['type']),
          );
          break;
        case 'sudo send --message':
          setSendState('name');
          addLine('Initiating secure message protocol...', 'info');
          addLine('Your name:', 'info');
          setInput('');
          break;
        case 'clear':
          setLines([]);
          break;
        default:
          addLine(`command not found: ${cmd}`, 'error');
          addLine('Type "help" for available commands.', 'dim');
      }
    },
    [sendState, messageData, addLine],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input;
      if (cmd.trim()) {
        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(commandHistory.length + 1);
      }
      executeCommand(cmd);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setInput(commandHistory[historyIndex - 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setInput(commandHistory[historyIndex + 1]);
      } else {
        setHistoryIndex(commandHistory.length);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => inputRef.current?.focus(), 500);
        }
      },
      { threshold: 0.5 },
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  const executeQuickCommand = (cmd: string) => {
    setInput(cmd);
    executeCommand(cmd);
    setInput('');
    inputRef.current?.focus();
  };

  const getTypeColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-gray-200';
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-emerald-400';
      case 'info':
        return 'text-cyan-400';
      case 'dim':
        return 'text-gray-700';
      case 'highlight':
        return 'text-white font-semibold';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section id="contact" className="relative bg-white py-24 md:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-30"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[100px]"></div>
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="reveal active mb-12 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
            Contact Terminal
          </div>
          <h2 className="text-ink-800 text-3xl font-bold tracking-tight md:text-4xl">
            Let&apos;s <span className="text-gradient-cyan">Connect</span>
          </h2>
          <p className="text-ink-400 mt-4 text-sm">
            Prefer email?{' '}
            <a
              href="mailto:nguyenminhtoan2712py@gmail.com"
              className="font-medium text-cyan-600 transition-colors hover:text-cyan-700"
            >
              [EMAIL_ADDRESS]
            </a>
          </p>
        </div>

        <Reveal direction="scale">
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/10">
            <div className="bg-ink-900 flex items-center gap-2 border-b border-white/5 px-5 py-3.5">
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
              className="bg-ink-900 max-h-[400px] min-h-[280px] overflow-y-auto p-5 font-mono text-sm"
            >
              {lines.map((line, index) => (
                <div key={index} className={`mb-1 ${getTypeColor(line.type)}`}>
                  {line.text}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-cyan-400">~</span>
                <span className="shrink-0 text-gray-500">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder={
                    sendState === 'name'
                      ? 'Your name'
                      : sendState === 'email'
                        ? 'email@example.com'
                        : sendState === 'message'
                          ? 'Type your message...'
                          : 'Type a command...'
                  }
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="reveal active mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => executeQuickCommand('help')}
            className="border-ink-300/15 bg-surface-50 text-ink-500 cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 hover:shadow-md"
          >
            help
          </button>
          <button
            onClick={() => executeQuickCommand('about')}
            className="border-ink-300/15 bg-surface-50 text-ink-500 cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 hover:shadow-md"
          >
            about
          </button>
          <button
            onClick={() => executeQuickCommand('skills')}
            className="border-ink-300/15 bg-surface-50 text-ink-500 cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 hover:shadow-md"
          >
            skills
          </button>
          <button
            onClick={() => executeQuickCommand('sudo send --message')}
            className="cursor-pointer rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 font-mono text-[11px] font-semibold text-cyan-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 hover:shadow-md"
          >
            sudo send --message
          </button>
        </div>
      </div>
    </section>
  );
}
