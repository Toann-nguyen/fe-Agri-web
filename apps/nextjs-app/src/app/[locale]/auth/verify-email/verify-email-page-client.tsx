'use client';

import { useSearchParams } from 'next/navigation';

import { VerifyEmailStatus } from '@/features/auth/components/verify-email-status';

export const VerifyEmailPageClient = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  return <VerifyEmailStatus token={token} />;
};
