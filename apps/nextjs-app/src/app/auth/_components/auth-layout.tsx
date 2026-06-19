'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { paths } from '@/config/paths';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { useUser } from '@/lib/auth';

type LayoutProps = {
  children: ReactNode;
};

const AUTH_PAGE_META: Record<string, { title: string; description?: string }> =
  {
    [paths.auth.login.getHref()]: {
      title: 'Sign in to your account',
      description: 'Access your dashboard and manage your account.',
    },
    [paths.auth.register.getHref()]: {
      title: 'Create your account',
      description: 'Sign up to get started with your team workspace.',
    },
    [paths.auth.forgotPassword.getHref()]: {
      title: 'Forgot your password?',
      description: 'Enter your email and we will send you a reset link.',
    },
    [paths.auth.resetPassword.getHref()]: {
      title: 'Reset your password',
      description: 'Choose a new password for your account.',
    },
    [paths.auth.verifyEmail.getHref()]: {
      title: 'Verify your email',
      description: 'Confirm your email address to activate your account.',
    },
  };

export const AuthLayout = ({ children }: LayoutProps) => {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  const pageMeta = AUTH_PAGE_META[pathname ?? ''] ?? {
    title: 'Authentication',
  };

  useEffect(() => {
    if (user.data) {
      router.replace(
        `${redirectTo ? `${decodeURIComponent(redirectTo)}` : paths.app.dashboard.getHref()}`,
      );
    }
  }, [user.data, router, redirectTo]);

  return (
    <AuthShell title={pageMeta.title} description={pageMeta.description}>
      {children}
    </AuthShell>
  );
};
