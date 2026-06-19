import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { useUser } from '@/lib/auth';

type LayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export const AuthLayout = ({ children, title, description }: LayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
        replace: true,
      });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <>
      <Head title={title} description={description} noIndex />
      <AuthShell title={title} description={description}>
        {children}
      </AuthShell>
    </>
  );
};

export const AUTH_PAGE_META: Record<string, { title: string; description?: string }> = {
  [paths.auth.login.path]: {
    title: 'Sign in to your account',
    description: 'Access your dashboard and manage your account.',
  },
  [paths.auth.register.path]: {
    title: 'Create your account',
    description: 'Sign up to get started with your team workspace.',
  },
  [paths.auth.forgotPassword.path]: {
    title: 'Forgot your password?',
    description: 'Enter your email and we will send you a reset link.',
  },
  [paths.auth.resetPassword.path]: {
    title: 'Reset your password',
    description: 'Choose a new password for your account.',
  },
  [paths.auth.verifyEmail.path]: {
    title: 'Verify your email',
    description: 'Confirm your email address to activate your account.',
  },
};

export const useAuthPageMeta = () => {
  const location = useLocation();
  return AUTH_PAGE_META[location.pathname] ?? { title: 'Authentication' };
};
