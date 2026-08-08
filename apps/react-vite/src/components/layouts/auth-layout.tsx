import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
// eslint-disable-next-line import/no-restricted-paths
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
      <div className='flex justify-end px-4 pt-4'>
        <LanguageSwitcher />
      </div>
      <AuthShell title={title} description={description}>
        {children}
      </AuthShell>
    </>
  );
};

export const AUTH_PAGE_META: Record<string, { titleKey: string; descriptionKey?: string }> = {
  [paths.auth.login.path]: {
    titleKey: 'auth.loginTitle',
    descriptionKey: 'auth.loginDescription',
  },
  [paths.auth.register.path]: {
    titleKey: 'auth.registerTitle',
    descriptionKey: 'auth.registerDescription',
  },
  [paths.auth.forgotPassword.path]: {
    titleKey: 'auth.forgotPasswordTitle',
    descriptionKey: 'auth.forgotPasswordDescription',
  },
  [paths.auth.resetPassword.path]: {
    titleKey: 'auth.resetPasswordTitle',
    descriptionKey: 'auth.resetPasswordDescription',
  },
  [paths.auth.verifyEmail.path]: {
    titleKey: 'auth.verifyEmailTitle',
    descriptionKey: 'auth.verifyEmailDescription',
  },
};

export const useAuthPageMeta = () => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const meta = AUTH_PAGE_META[location.pathname] ?? { titleKey: 'auth.defaultTitle' };
  return {
    title: t(meta.titleKey),
    description: meta.descriptionKey ? t(meta.descriptionKey) : undefined,
  };
};
