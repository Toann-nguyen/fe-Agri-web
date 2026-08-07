'use client';

import { Icon } from '@iconify/react';
import NextLink from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

export const LoginUiPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen flex-col justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Ambient gradient blobs behind glass */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="h-[300px] w-[300px] animate-morph rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-cyan-500/20 blur-3xl" />
        <div className="-ml-20 mt-10 h-[250px] w-[250px] animate-morph rounded-[30%_60%_70%_40%/50%_60%_30%_60%] bg-ember-500/10 blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <NextLink className="flex items-center" href={paths.home.getHref()}>
            <img
              className="h-16 w-auto"
              src="/logo.webp"
              alt="Nguyen Minh Toan"
            />
          </NextLink>
        </div>

        <h1 className="text-gradient-hero mt-6 animate-fade-up text-center text-3xl font-extrabold delay-150">
          Sign in to Edu-AI-VN
        </h1>
        <p className="mt-2 animate-fade-up text-center text-sm text-ink-400 delay-300">
          Access your dashboard and manage your account.
        </p>
      </div>

      <div className="animate-slide-up delay-500 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glow-border glass-hero rounded-2xl px-4 py-8 sm:px-10">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
          >
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-white/70"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/70"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-900/50 px-2 text-ink-400 backdrop-blur-sm">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google social login */}
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10"
            onClick={() => console.log('Mock Google login')}
          >
            <Icon icon="mdi:google" className="mr-2" width={18} />
            Continue with Google
          </Button>

          {/* Footer links */}
          <div className="mt-4 space-y-2 text-center text-sm text-ink-400">
            <p>
              Don&apos;t have an account?{' '}
              <NextLink
                href={paths.auth.register.getHref()}
                className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
              >
                Sign up
              </NextLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
