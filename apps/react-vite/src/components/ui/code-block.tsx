import { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode;
  filename?: string;
  className?: string;
}

export function CodeBlock({ children, filename, className = '' }: CodeBlockProps) {
  return (
    <div className={`code-block-light px-5 py-4 text-left shadow-xl shadow-black/10 ${className}`}>
      {filename && (
        <div className='mb-3 flex items-center gap-2 border-b border-white/5 pb-3'>
          <span className='size-2.5 rounded-full bg-red-500/70'></span>
          <span className='size-2.5 rounded-full bg-yellow-500/70'></span>
          <span className='size-2.5 rounded-full bg-green-500/70'></span>
          <span className='ml-2 font-mono text-[10px] text-gray-600'>{filename}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

interface CodeTokenProps {
  type: 'keyword' | 'string' | 'function' | 'comment' | 'variable' | 'type' | 'operator';
  children: ReactNode;
}

export function CodeToken({ type, children }: CodeTokenProps) {
  const tokenClass = `code-${type}`;
  return <span className={tokenClass}>{children}</span>;
}
