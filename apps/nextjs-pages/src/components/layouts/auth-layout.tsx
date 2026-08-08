import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from '@/components/seo';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  titleKey?: string;
};

export const AuthLayout = ({ children, title, titleKey }: LayoutProps) => {
  const { t } = useTranslation('common');
  const resolvedTitle = titleKey ? t(titleKey) : (title ?? '');

  const user = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user.data) {
      router.replace(paths.app.dashboard.getHref());
    }
  }, [user.data, router]);

  return (
    <>
      <Head title={resolvedTitle} />
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link
              className="flex items-center text-white"
              href={paths.home.getHref()}
            >
              <img className="h-24 w-auto" src="/logo.svg" alt="Workflow" />
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
            {resolvedTitle}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
