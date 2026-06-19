import NextLink from 'next/link';

import { paths } from '@/config/paths';

type AuthFooterLinksProps = {
  redirectTo?: string | null;
  variant: 'login' | 'register' | 'forgot' | 'reset' | 'verify';
};

const linkClass =
  'font-medium text-cyan-400 transition-colors hover:text-cyan-300';

export const AuthFooterLinks = ({
  redirectTo,
  variant,
}: AuthFooterLinksProps) => {
  switch (variant) {
    case 'login':
      return (
        <div className="mt-4 space-y-2 text-center text-sm text-ink-400">
          <p>
            <NextLink
              href={paths.auth.forgotPassword.getHref()}
              className={linkClass}
            >
              Forgot password?
            </NextLink>
          </p>
          <p>
            Don&apos;t have an account?{' '}
            <NextLink
              href={paths.auth.register.getHref(redirectTo)}
              className={linkClass}
            >
              Sign up
            </NextLink>
          </p>
        </div>
      );
    case 'register':
      return (
        <div className="mt-4 text-center text-sm text-ink-400">
          Already have an account?{' '}
          <NextLink
            href={paths.auth.login.getHref(redirectTo)}
            className={linkClass}
          >
            Sign in
          </NextLink>
        </div>
      );
    case 'forgot':
    case 'reset':
    case 'verify':
      return (
        <div className="mt-4 text-center text-sm text-ink-400">
          <NextLink
            href={paths.auth.login.getHref(redirectTo)}
            className={linkClass}
          >
            Back to sign in
          </NextLink>
        </div>
      );
  }
};
