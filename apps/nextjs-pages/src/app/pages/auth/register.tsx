import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterPage = () => {
  const router = useRouter();

  return (
    <RegisterForm
      onSuccess={() => router.replace(paths.auth.login.getHref())}
    />
  );
};

RegisterPage.getLayout = (page: ReactElement) => {
  return <AuthLayout title="Register your account">{page}</AuthLayout>;
};
