import { ReactNode } from 'react';

import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

import { AuthBackground } from './auth-background';

type AuthShellProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export const AuthShell = ({ children, title, description }: AuthShellProps) => (
  <>
    <AuthBackground />
    <div className='relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8'>
      {/* Ambient gradient blobs behind glass */}
      <div
        className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        aria-hidden='true'
      >
        <div className='h-[300px] w-[300px] animate-morph rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-cyan-500/20 blur-3xl' />
        <div className='-ml-20 mt-10 h-[250px] w-[250px] animate-morph rounded-[30%_60%_70%_40%/50%_60%_30%_60%] bg-ember-500/10 blur-3xl' />
      </div>

      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <Link className='flex items-center' to={paths.home.getHref()}>
            <img className='h-16 w-auto' src='/logo.svg' alt='Nguyen Minh Toan' />
          </Link>
        </div>

        <h1 className='text-gradient-hero mt-6 animate-fade-up text-center text-3xl font-extrabold delay-150'>
          {title}
        </h1>
        {description && (
          <p className='mt-2 animate-fade-up text-center text-sm text-ink-400 delay-300'>{description}</p>
        )}
      </div>

      <div className='mt-8 animate-slide-up sm:mx-auto sm:w-full sm:max-w-md delay-500'>
        <div className='glow-border glass-hero rounded-2xl px-4 py-8 sm:px-10'>{children}</div>
      </div>
    </div>
  </>
);
