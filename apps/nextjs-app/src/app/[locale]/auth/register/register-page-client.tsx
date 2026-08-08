'use client';

import { useRouter } from 'next/navigation';

import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterPageClient = () => {
  const router = useRouter();

  return (
    <RegisterForm
      onSuccess={() => router.replace(paths.auth.login.getHref())}
    />
  );
};
