import { CodeToken, Reveal } from '../ui';

const codeSnippets = [
  {
    filename: 'n-plus-one-fix.ts',
    tag: '-85% queries',
    tagColor: 'emerald',
    lines: [
      { type: 'comment', text: '// ❌ Before: N+1 Problem (1200 queries)' },
      { type: 'keyword', text: 'const' },
      { type: 'variable', text: 'orders' },
      { type: 'operator', text: ' = ' },
      { type: 'keyword', text: 'await' },
      { type: 'function', text: 'Order' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'all' },
      { type: 'operator', text: '();' },
      { type: 'keyword', text: 'for' },
      { type: 'operator', text: ' (' },
      { type: 'keyword', text: 'const' },
      { type: 'variable', text: 'order' },
      { type: 'keyword', text: 'of' },
      { type: 'variable', text: 'orders' },
      { type: 'operator', text: ') ' },
      { type: 'operator', text: '{' },
      { type: 'variable', text: 'order' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'user' },
      { type: 'operator', text: ' = ' },
      { type: 'keyword', text: 'await' },
      { type: 'variable', text: 'order' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'user' },
      { type: 'operator', text: '(); ' },
      { type: 'comment', text: '// 💀' },
      { type: 'operator', text: '}' },
    ],
    afterLines: [
      { type: 'comment', text: '// ✅ After: Eager Loading (2 queries)' },
      { type: 'keyword', text: 'const' },
      { type: 'variable', text: 'orders' },
      { type: 'operator', text: ' = ' },
      { type: 'keyword', text: 'await' },
      { type: 'function', text: 'Order' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'with' },
      { type: 'operator', text: '(' },
      { type: 'string', text: "'user'" },
      { type: 'operator', text: ')' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'get' },
      { type: 'operator', text: '(); ' },
      { type: 'comment', text: '// 🚀' },
    ],
  },
  {
    filename: 'redis-cache.middleware.ts',
    tag: '98% hit rate',
    tagColor: 'cyan',
    lines: [
      { type: 'keyword', text: 'export' },
      { type: 'keyword', text: 'async function' },
      { type: 'function', text: 'cacheMiddleware' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'req' },
      { type: 'operator', text: ':' },
      { type: 'type', text: 'Request' },
      { type: 'operator', text: ',' },
      { type: 'variable', text: 'res' },
      { type: 'operator', text: ':' },
      { type: 'type', text: 'Response' },
      { type: 'operator', text: ',' },
      { type: 'variable', text: 'next' },
      { type: 'operator', text: ':' },
      { type: 'type', text: 'NextFunction' },
      { type: 'operator', text: ') ' },
      { type: 'operator', text: '{' },
      { type: 'keyword', text: 'const' },
      { type: 'variable', text: 'key' },
      { type: 'operator', text: ' = ' },
      { type: 'string', text: '`cache:${req.url}`' },
      { type: 'operator', text: ';' },
      { type: 'keyword', text: 'const' },
      { type: 'variable', text: 'cached' },
      { type: 'operator', text: ' = ' },
      { type: 'keyword', text: 'await' },
      { type: 'variable', text: 'redis' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'get' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'key' },
      { type: 'operator', text: ');' },
    ],
    afterLines: [
      { type: 'keyword', text: 'if' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'cached' },
      { type: 'operator', text: ') ' },
      { type: 'operator', text: '{' },
      { type: 'keyword', text: 'return' },
      { type: 'variable', text: 'res' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'json' },
      { type: 'operator', text: '(' },
      { type: 'type', text: 'JSON' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'parse' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'cached' },
      { type: 'operator', text: '));' },
      { type: 'operator', text: '}' },
    ],
  },
];

function CodeLine({ tokens }: { tokens: { type: string; text: string }[] }) {
  return (
    <div>
      {tokens.map((token, i) => (
        <CodeToken
          key={i}
          type={
            token.type as
              | 'keyword'
              | 'string'
              | 'function'
              | 'comment'
              | 'variable'
              | 'type'
              | 'operator'
          }
        >
          {token.text}
        </CodeToken>
      ))}
    </div>
  );
}

export function CodeShowcaseSection() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-30"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal active mb-16 text-center">
          <div className="glass-light mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-cyan-600 shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
            Code Showcase
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-ink-800 md:text-4xl">
            Real <span className="text-gradient-cyan">Code</span>, Real Impact
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-ink-400">
            Snippets that demonstrate my approach to solving real engineering problems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {codeSnippets.map((snippet, index) => (
            <Reveal key={index} direction={index === 0 ? 'left' : 'right'} staggerIndex={index}>
              <div className="glass-light overflow-hidden rounded-2xl shadow-lg shadow-black/5 transition-shadow duration-500 hover:shadow-xl">
                <div className="flex items-center justify-between bg-ink-900 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-500/70"></span>
                    <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                    <span className="size-2.5 rounded-full bg-green-500/70"></span>
                    <span className="ml-2 font-mono text-[10px] text-gray-500">
                      {snippet.filename}
                    </span>
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[9px] ${
                      snippet.tagColor === 'emerald'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}
                  >
                    {snippet.tag}
                  </span>
                </div>
                <div className="bg-ink-900 p-5 font-mono text-[12px] leading-[1.8]">
                  <CodeLine tokens={snippet.lines} />
                  {snippet.afterLines && (
                    <div className="mt-3">
                      <CodeLine tokens={snippet.afterLines} />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
